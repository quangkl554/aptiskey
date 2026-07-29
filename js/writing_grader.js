(function () {
  const byId = (id) => document.getElementById(id);

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function safeBand(value) {
    const band = String(value || 'A0').toUpperCase();
    return /^(A0|A1|A2|B1|B2|C1)$/.test(band) ? band : 'A0';
  }

  function safeWordCount(value) {
    const wordCount = Number(value);
    return Number.isFinite(wordCount) ? Math.min(5000, Math.max(0, Math.round(wordCount))) : 0;
  }

  function renderList(items, emptyText = '') {
    const values = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!values.length) return emptyText ? `<p class="grade-empty-note">${escapeHtml(emptyText)}</p>` : '';
    return `<ul>${values.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  window.gradeCurrentPart = async function () {
    const gradePanel = byId('writing-grade-panel');
    if (!gradePanel) return;

    const activeTab = document.querySelector('.writing-part-tabs button.active');
    if (!activeTab) return;
    const part = Number(activeTab.dataset.writingPart);
    const clubName = byId('writing-club-name').textContent;

    const questionElements = document.querySelectorAll('.writing-question');
    const questions = [];
    let hasInput = false;

    questionElements.forEach((element, index) => {
      const promptElement = element.querySelector(`#writing-prompt-${index}`);
      const inputElement = element.querySelector(`#writing-response-${index}`);
      const labelElement = element.querySelector('.writing-question-head b');
      const targetElement = element.querySelector('.writing-question-head span');
      if (!promptElement || !inputElement) return;

      const userInput = inputElement.value.trim();
      if (userInput) hasInput = true;
      questions.push({
        label: labelElement?.textContent.trim() || `Câu ${index + 1}`,
        prompt: promptElement.textContent.trim(),
        target: targetElement?.textContent.trim() || '',
        userInput,
      });
    });

    if (!hasInput) {
      alert('Vui lòng nhập bài viết trước khi chấm band!');
      return;
    }

    gradePanel.setAttribute('role', 'status');
    gradePanel.setAttribute('aria-live', 'polite');
    gradePanel.innerHTML = `
      <div class="grade-card grade-loading-card">
        <div class="grade-spinner" aria-hidden="true"></div>
        <p>Đang chấm band độc lập cho từng câu của Writing Part ${part}...</p>
      </div>
    `;
    gradePanel.style.display = 'block';
    gradePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    try {
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ part, clubName, questions }),
      });

      if (!response.ok) {
        let errorText = 'Lỗi kết nối máy chủ.';
        try {
          const errorData = await response.json();
          errorText = errorData.error || errorText;
        } catch (_) {}
        throw new Error(errorText);
      }

      const result = await response.json();
      renderGradeResult(gradePanel, result);
    } catch (error) {
      console.error(error);
      gradePanel.innerHTML = `
        <div class="grade-card grade-error-card">
          <h4>⚠️ Lỗi chấm band</h4>
          <p>${escapeHtml(error.message || 'Không thể kết nối đến máy chủ chấm điểm.')}</p>
          <div class="grade-error-actions">
            <button onclick="gradeCurrentPart()" class="grade-btn primary">Thử lại</button>
            <button onclick="clearGradeResult()" class="grade-btn secondary">Đóng</button>
          </div>
        </div>
      `;
    }
  };

  window.clearGradeResult = function () {
    const gradePanel = byId('writing-grade-panel');
    if (!gradePanel) return;
    gradePanel.innerHTML = '';
    gradePanel.style.display = 'none';
    gradePanel.removeAttribute('role');
    gradePanel.removeAttribute('aria-live');
  };

  function renderResponseCard(response, position) {
    const band = safeBand(response?.band);
    const label = response?.label || `Câu ${position + 1}`;
    const errors = Array.isArray(response?.errors) ? response.errors : [];
    const strengths = Array.isArray(response?.strengths) ? response.strengths : [];
    const nextBand = response?.nextBand ? safeBand(response.nextBand) : null;

    const strengthsHtml = strengths.length
      ? `<div class="grade-response-block grade-strengths"><h6>Điểm đã làm tốt</h6>${renderList(strengths)}</div>`
      : '';

    const errorsHtml = errors.length
      ? `<div class="grade-response-block grade-errors">
          <h6>Lỗi cụ thể</h6>
          <div class="grade-error-list">
            ${errors.map((error) => `
              <div class="grade-error-item">
                <span class="grade-error-type">${escapeHtml(error?.type || 'Diễn đạt')}</span>
                ${error?.quote ? `<code>${escapeHtml(error.quote)}</code>` : ''}
                <p><strong>Vì sao:</strong> ${escapeHtml(error?.why || 'Chưa đáp ứng đầy đủ yêu cầu của câu.')}</p>
                ${error?.fix ? `<p class="grade-error-fix"><strong>Sửa thành:</strong> ${escapeHtml(error.fix)}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>`
      : `<div class="grade-response-block grade-no-errors"><strong>✓ Không phát hiện lỗi cụ thể làm cản trở ý nghĩa.</strong></div>`;

    const nextBandHtml = nextBand
      ? `<div class="grade-response-block grade-next-band">
          <h6>Còn thiếu gì để lên band ${escapeHtml(nextBand)}?</h6>
          ${renderList(response?.missingForNextBand, `Cần thể hiện rõ hơn các đặc điểm của band ${nextBand}.`)}
        </div>`
      : `<div class="grade-response-block grade-max-band"><strong>✓ Câu này đã đạt band cao nhất áp dụng cho Part.</strong></div>`;

    const improvedAnswerHtml = response?.improvedAnswer
      ? `<div class="grade-improved-answer"><strong>Phiên bản nâng band gợi ý</strong><p>${escapeHtml(response.improvedAnswer)}</p></div>`
      : '';

    return `
      <article class="grade-response-card">
        <header class="grade-response-card-header">
          <div>
            <span class="grade-response-order">Câu ${position + 1}</span>
            <h5>${escapeHtml(label)}</h5>
            <span class="grade-response-meta">${safeWordCount(response?.wordCount)} từ${response?.target ? ` · Mục tiêu ${escapeHtml(response.target)}` : ''}</span>
          </div>
          <span class="grade-band-badge band-${band.toLowerCase()}">Band ${band}</span>
        </header>
        <div class="grade-response-body">
          ${response?.prompt ? `<div class="grade-response-question"><strong>Đề bài</strong><p>${escapeHtml(response.prompt)}</p></div>` : ''}
          <div class="grade-response-answer">
            <strong>Câu trả lời của bạn</strong>
            <p>${response?.answer ? escapeHtml(response.answer) : '<em>Không có câu trả lời</em>'}</p>
          </div>
          <div class="grade-response-explanation">
            <strong>Vì sao nhận band ${band}?</strong>
            <p>${escapeHtml(response?.explanation || 'Chưa có giải thích cho câu này.')}</p>
          </div>
          ${strengthsHtml}
          ${errorsHtml}
          ${nextBandHtml}
          ${improvedAnswerHtml}
        </div>
      </article>
    `;
  }

  function renderGradeResult(container, result) {
    const responses = Array.isArray(result?.responses) ? result.responses : [];
    const responsesHtml = responses.length
      ? responses.map(renderResponseCard).join('')
      : '<p class="grade-empty-note">Máy chấm chưa trả về band cho từng câu. Hãy bấm Chấm lại.</p>';

    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', 'Kết quả band từng câu Writing');
    container.innerHTML = `
      <div class="grade-card grade-result-card">
        <div class="grade-result-header">
          <div>
            <h3>📋 Kết quả band từng câu</h3>
            <p>Mỗi câu được chấm độc lập; không gộp thành điểm tổng của Part.</p>
          </div>
          <span class="grade-response-count">${responses.length} câu/email</span>
        </div>

        <div class="grade-response-list">${responsesHtml}</div>

        <p class="grade-diagnostic-note">${escapeHtml(result?.diagnosticNotice || 'Mỗi câu được chấm độc lập theo band để luyện tập; đây không phải kết quả thi chính thức.')}</p>

        <div class="grade-result-actions">
          <button onclick="gradeCurrentPart()" class="grade-btn primary">Chấm lại từng câu</button>
          <button onclick="clearGradeResult()" class="grade-btn secondary">Đóng kết quả</button>
        </div>
      </div>
    `;
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
})();
