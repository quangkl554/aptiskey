export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { part, clubName, questions } = req.body;
  if (!part || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY environment variable is not set.' });
  }

  const systemPrompt = `Bạn là một giám khảo chấm thi APTIS chuẩn của British Council. Hãy chấm bài thi kỹ năng Writing của thí sinh.
Bạn phải trả về kết quả định dạng JSON thuần túy (không có markdown, không có text bao ngoài, chỉ JSON) với cấu trúc như sau:
{
  "overallBand": "A1" hoặc "A2" hoặc "B1" hoặc "B2" hoặc "C1",
  "criteria": {
    "taskFulfillment": { "band": "A1".."C1", "score": 0..5, "feedback": "Nhận xét tiếng Việt..." },
    "coherenceCohesion": { "band": "A1".."C1", "score": 0..5, "feedback": "Nhận xét tiếng Việt..." },
    "vocabularyRange": { "band": "A1".."C1", "score": 0..5, "feedback": "Nhận xét tiếng Việt..." },
    "grammaticalRange": { "band": "A1".."C1", "score": 0..5, "feedback": "Nhận xét tiếng Việt..." }
  },
  "generalFeedback": "Nhận xét tổng quan bằng tiếng Việt...",
  "improvements": ["Gợi ý cải thiện 1", "Gợi ý cải thiện 2", ...]
}

Quy định chấm điểm từng Part:
- Part 1: Điền thông tin cá nhân/câu trả lời ngắn (1-5 từ). Chỉ chấm Task Fulfillment và Vocabulary/Grammar ở mức tối giản (thường là A1-A2). Điểm tối đa mỗi câu là 0-5. Nếu đúng ngữ cảnh và chính tả, hãy cho A2/B1.
- Part 2: Viết một đoạn ngắn (20-30 từ). Đánh giá sự mạch lạc, sử dụng câu đơn giản và đúng chủ đề.
- Part 3: Trả lời 3 câu hỏi của các thành viên trong câu lạc bộ (30-40 từ mỗi câu). Đòi hỏi ngôn ngữ tự nhiên, hội thoại thân mật, liên kết ý tốt.
- Part 4: Viết 2 email (email 1 thân mật cho bạn bè khoảng 50 từ; email 2 trang trọng cho quản lý khoảng 120-150 từ). Chấm nghiêm ngặt sự khác biệt về văn phong (register) giữa trang trọng (formal) và thân mật (informal), sử dụng liên từ phức tạp, từ vựng nâng cao.

Hãy chấm điểm thật khách quan theo chuẩn CEFR của British Council.`;

  let userPrompt = `Đề bài thuộc câu lạc bộ: "${clubName}"\n`;
  userPrompt += `Phần thi: Writing Part ${part}\n\n`;
  questions.forEach((q, i) => {
    userPrompt += `--- Câu hỏi ${i + 1} ---\n`;
    userPrompt += `Đề bài: ${q.prompt}\n`;
    userPrompt += `Bài làm của thí sinh: "${q.userInput}"\n\n`;
  });
  userPrompt += `Hãy chấm điểm bài viết trên và trả về kết quả JSON đúng định dạng cấu trúc yêu cầu.`;

  const models = ['gpt-oss-20b', 'llama-3.3-70b-versatile'];
  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        lastError = `Groq API Error (${model}): ${errText}`;
        const isModelError = response.status === 404 || /model|not found|decommissioned/i.test(errText);
        if (isModelError && model !== models[models.length - 1]) continue;
        return res.status(response.status).json({ error: lastError });
      }

      const data = await response.json();
      const resultText = data.choices[0].message.content;
      const resultJson = JSON.parse(resultText);
      return res.status(200).json(resultJson);
    } catch (error) {
      lastError = `Server Error (${model}): ${error.message}`;
      if (model !== models[models.length - 1]) continue;
    }
  }

  return res.status(500).json({ error: lastError || 'Unknown server error' });
}
