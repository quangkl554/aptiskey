(function () {
  const byId = (id) => document.getElementById(id);

  const SPEAKING_RUBRIC = {
    pronunciation: {
      name: "Pronunciation (Phát âm)",
      levels: {
        A1: "Phát âm rất khó hiểu. Nói từ đơn lẻ, ngữ điệu và trọng âm không chính xác, ảnh hưởng nặng bởi tiếng mẹ đẻ.",
        A2: "Phát âm có nhiều lỗi lớn gây khó khăn cho người nghe. Thường xuyên sai phát âm nguyên âm/phụ âm cơ bản.",
        B1: "Phát âm tương đối dễ hiểu. Từ vựng quen thuộc phát âm rõ. Có thể sai ở từ khó nhưng không cản trở việc hiểu nghĩa tổng thể.",
        B2: "Phát âm rõ ràng, tự nhiên. Kiểm soát tốt trọng âm từ, trọng âm câu và ngữ điệu. Lỗi phát âm rất ít và không gây mệt mỏi cho người nghe.",
        C1: "Phát âm chuẩn xác, trôi chảy với ngữ điệu tự nhiên. Giọng địa phương không ảnh hưởng đến việc truyền tải thông tin."
      }
    },
    fluency: {
      name: "Fluency (Lưu loát)",
      levels: {
        A1: "Nói ngập ngừng cực kỳ nhiều. Chỉ nói được từ đơn lẻ hoặc cụm từ ngắn với các khoảng ngắt quãng dài và liên tục.",
        A2: "Nói có nhiều khoảng ngừng lớn, thường xuyên lặp lại hoặc tự sửa lỗi để tìm từ hoặc cấu trúc ngữ pháp. Chỉ nói được các lượt rất ngắn.",
        B1: "Tốc độ nói trung bình ở các chủ đề quen thuộc. Có ngập ngừng để chuẩn bị ý hoặc từ vựng, nhưng có thể duy trì cuộc đối thoại không bị gián đoạn quá lâu.",
        B2: "Nói trôi chảy, tự nhiên. Ngập ngừng chủ yếu để tổ chức nội dung ý kiến chứ không phải để tìm từ vựng hay ngữ pháp. Có thể nói dài dễ dàng.",
        C1: "Nói cực kỳ trôi chảy, không tốn sức. Tốc độ nói tự nhiên, quản lý cấu trúc bài nói linh hoạt và tự tin."
      }
    },
    vocabulary: {
      name: "Vocabulary Range (Từ vựng)",
      levels: {
        A1: "Từ vựng rất hạn chế, chỉ gồm một số từ đơn lẻ cơ bản về thông tin cá nhân và đồ vật quen thuộc.",
        A2: "Đủ từ vựng cho nhu cầu giao tiếp cá nhân cơ bản và chủ đề cụ thể. Thường xuyên lặp từ khi nói về chủ đề rộng hơn.",
        B1: "Vốn từ vựng tương đối tốt để diễn đạt trải nghiệm cá nhân, ý kiến và cảm xúc về các chủ đề quen thuộc trong cuộc sống.",
        B2: "Từ vựng phong phú, đa dạng cho các chủ đề phức tạp, so sánh tranh hoặc thảo luận trừu tượng. Sử dụng tốt cụm từ cố định (collocations).",
        C1: "Vốn từ vựng rộng và linh hoạt. Có thể sử dụng từ đồng nghĩa, từ ẩn dụ và sắc thái ý nghĩa một cách dễ dàng và chính xác."
      }
    },
    grammar: {
      name: "Grammatical Range & Accuracy (Ngữ pháp)",
      levels: {
        A1: "Chỉ sử dụng các cấu trúc câu đơn lẻ hoặc câu học thuộc lòng. Sai sót ngữ pháp chiếm đa số.",
        A2: "Sử dụng đúng các cấu trúc câu đơn giản (thì hiện tại, quá khứ). Vẫn còn nhiều lỗi chia động từ, số nhiều và giới từ nhưng nghĩa vẫn hiểu được.",
        B1: "Kiểm soát tốt ngữ pháp đơn giản. Có cố gắng sử dụng một số cấu trúc phức tạp (câu điều kiện, mệnh đề quan hệ) nhưng còn lỗi nhỏ.",
        B2: "Sử dụng chính xác nhiều cấu trúc ngữ pháp phức tạp. Lỗi sai không mang tính hệ thống và không cản trở việc hiểu nội dung.",
        C1: "Luôn kiểm soát tốt ngữ pháp phức tạp một cách tự nhiên. Độ chính xác rất cao, lỗi sai cực kỳ hiếm gặp."
      }
    },
    coherence: {
      name: "Coherence & Task Fulfillment (Mạch lạc)",
      levels: {
        A1: "Không trả lời đúng trọng tâm câu hỏi. Nội dung nói rời rạc, không có tính liên kết ý.",
        A2: "Trả lời trực tiếp được các câu hỏi ngắn, đơn giản nhưng hầu như không triển khai hoặc mở rộng ý. Chỉ dùng liên từ cơ bản (and, but).",
        B1: "Trả lời đầy đủ các phần của câu hỏi quen thuộc. Sắp xếp ý logic, sử dụng tốt các từ nối thông dụng (firstly, also, in my opinion).",
        B2: "Hoàn thành xuất sắc nhiệm vụ (so sánh, suy luận, bày tỏ quan điểm). Bài nói có cấu trúc rõ ràng, lập luận chặt chẽ và mạch lạc.",
        C1: "Trả lời xuất sắc và sâu sắc mọi khía cạnh của các chủ đề trừu tượng. Tổ chức bài nói bài bản, liên kết chặt chẽ và tự nhiên."
      }
    }
  };

  const bandValues = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5 };
  const valueBands = { 1: "A1", 2: "A2", 3: "B1", 4: "B2", 5: "C1" };

  let selections = {
    pronunciation: null,
    fluency: null,
    vocabulary: null,
    grammar: null,
    coherence: null
  };

  window.toggleSpeakingRubric = function () {
    const panel = byId("speaking-rubric-panel");
    if (!panel) return;
    
    if (panel.style.display === "none" || !panel.style.display) {
      panel.style.display = "block";
      renderRubric();
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      panel.style.display = "none";
    }
  };

  window.resetSpeakingRubric = function () {
    selections = {
      pronunciation: null,
      fluency: null,
      vocabulary: null,
      grammar: null,
      coherence: null
    };
    renderRubric();
  };

  window.selectSpeakingBand = function (criterion, band) {
    selections[criterion] = band;
    renderRubric();
  };

  function calculateOverallBand() {
    const keys = Object.keys(selections);
    let sum = 0;
    for (const key of keys) {
      if (!selections[key]) return null;
      sum += bandValues[selections[key]];
    }
    const avg = sum / keys.length;
    const rounded = Math.round(avg);
    return valueBands[rounded] || "A1";
  }

  function renderRubric() {
    const panel = byId("speaking-rubric-panel");
    if (!panel) return;

    let html = `
      <div class="rubric-card">
        <div class="rubric-header">
          <h3>🎯 Tự đánh giá kỹ năng Speaking</h3>
          <p>Chọn band điểm A1–C1 phù hợp cho mỗi tiêu chí dưới đây.</p>
        </div>
        
        <div class="rubric-criteria-list">
    `;

    for (const key in SPEAKING_RUBRIC) {
      const crit = SPEAKING_RUBRIC[key];
      const selectedBand = selections[key];
      const desc = selectedBand ? crit.levels[selectedBand] : "Chọn một mức band để xem chi tiết...";

      html += `
        <div class="rubric-row">
          <div class="rubric-criterion-name">${crit.name}</div>
          <div class="rubric-bands">
            ${["A1", "A2", "B1", "B2", "C1"].map(band => {
              const activeClass = selectedBand === band ? "active" : "";
              const tooltip = crit.levels[band].replace(/"/g, "&quot;");
              return `
                <button 
                  type="button" 
                  class="rubric-band-btn band-${band.toLowerCase()} ${activeClass}" 
                  data-tooltip="${tooltip}"
                  aria-label="${crit.name} — Band ${band}"
                  onclick="selectSpeakingBand('${key}', '${band}')"
                >
                  ${band}
                </button>
              `;
            }).join("")}
          </div>
          <div class="rubric-descriptor">${desc}</div>
        </div>
      `;
    }

    const overall = calculateOverallBand();
    const overallHtml = overall 
      ? `<div class="rubric-overall">Band tổng kết của bạn: <span class="rubric-overall-badge band-${overall.toLowerCase()}">Band ${overall}</span></div>`
      : `<div class="rubric-overall-empty">Vui lòng chọn band cho cả 5 tiêu chí để tính điểm tổng.</div>`;

    html += `
        </div>
        
        <div class="rubric-footer">
          ${overallHtml}
          <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button type="button" class="rubric-btn secondary" onclick="resetSpeakingRubric()">Đặt lại</button>
            <button type="button" class="rubric-btn secondary" onclick="toggleSpeakingRubric()">Đóng</button>
          </div>
        </div>
      </div>
    `;

    panel.innerHTML = html;
  }
})();
