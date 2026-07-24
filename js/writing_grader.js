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

  function safeScore(value, max = 5) {
    const score = Number(value);
    return Number.isFinite(score) ? Math.min(max, Math.max(0, score)) : 0;
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
      alert('Vui lòng nhập bài viết trước khi chấm điểm!');
      return;
    }

    gradePanel.setAttribute('role', 'status');
    gradePanel.setAttribute('aria-live', 'polite');
    gradePanel.innerHTML = `
      <div class="grade-card grade-loading-card">
        <div class="grade-spinner" aria-hidden="true"></div>
        <p>Đang chấm tổng thể và phân tích riêng từng câu của Writing Part ${part}...</p>
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
        let errorText = 'Lỗi kết nối server.';
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
          <h4>⚠️ Lỗi chấm điểm</h4>
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
    const score = safeScore(response?.score);
    const label = response?.label || `Câu ${position + 1}`;
    const errors = Array.isArray(response?.errors) ? response.errors : [];
    const strengths = Array.isArray(response?.strengths) ? response.strengths : [];
    const nextBand = response?.nextBand ? safeBand(response.nextBand) : null;

    const strengthsHtml = strengths.length
      ? `<div class="grade-response-block grade-strengths"><h6>Điểm đã làm tốt</h6>${renderList(strengths)}</div>`
      : '';

    const errorsHtml = errors.length
      ? `<div class="grade-response-block grade-errors">
          <h6>Lỗi cụ thể và nguyên nhân mất điểm</h6>
          <div class="grade-error-list">
            ${errors.map((error) => `
              <div class="grade-error-item">
                <span class="grade-error-type">${escapeHtml(error?.type || 'Diễn đạt')}</span>
                ${error?.quote ? `<code>${escapeHtml(error.quote)}</code>` : ''}
                <p><strong>Vì sao mất điểm:</strong> ${escapeHtml(error?.why || 'Chưa đáp ứng đầy đủ tiêu chí.')}</p>
                ${error?.fix ? `<p class="grade-error-fix"><strong>Sửa thành:</strong> ${escapeHtml(error.fix)}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>`
      : `<div class="grade-response-block grade-no-errors"><strong>✓ Không phát hiện lỗi cụ thể làm cản trở ý nghĩa.</strong></div>`;

    const nextBandHtml = nextBand
      ? `<div class="grade-response-block grade-next-band">
          <h6>Còn thiếu gì để lên ${escapeHtml(nextBand)}?</h6>
          ${renderList(response?.missingForNextBand, `Cần thể hiện ổn định hơn các tiêu chí của band ${nextBand}.`)}
        </div>`
      : `<div class="grade-response-block grade-max-band"><strong>✓ Câu này đã chạm mức mục tiêu cao nhất của Part.</strong></div>`;

    const improvedAnswerHtml = response?.improvedAnswer
      ? `<div class="grade-improved-answer"><strong>Phiên bản nâng band gợi ý</strong><p>${escapeHtml(response.improvedAnswer)}</p></div>`
      : '';

    return `
      <details class="grade-response-card" open>
        <summary>
          <span class="grade-response-title">${escapeHtml(label)}</span>
          <span class="grade-response-meta">${safeScore(response?.wordCount, 5000)} từ · ${score}/5</span>
          <span class="crit-band band-${band.toLowerCase()}">Band ${band}</span>
        </summary>
        <div class="grade-response-body">
          <p class="grade-response-summary">${escapeHtml(response?.summary || 'Chưa có nhận xét cho câu này.')}</p>
          ${strengthsHtml}
          ${errorsHtml}
          ${nextBandHtml}
          ${improvedAnswerHtml}
        </div>
      </details>
    `;
  }

  function renderGradeResult(container, result) {
    const overallBand = safeBand(result?.overallBand);
    const partMaxScore = safeScore(result?.partMaxScore, 10) || 5;
    const partScore = safeScore(result?.partScore, partMaxScore);
    const criteria = result?.criteria || {};
    const responses = Array.isArray(result?.responses) ? result.responses : [];

    const criteriaList = [
      { name: 'Hoàn thành nhiệm vụ', key: 'taskFulfillment' },
      { name: 'Mạch lạc & liên kết', key: 'coherenceCohesion' },
      { name: 'Từ vựng: độ rộng & chính xác', key: 'vocabularyRange' },
      { name: 'Ngữ pháp: độ rộng & chính xác', key: 'grammaticalRange' },
    ];

    const criteriaHtml = criteriaList.map((item) => {
      const criterion = criteria[item.key] || {};
      const band = safeBand(criterion.band || overallBand);
      const score = safeScore(criterion.score);
      const percentage = Math.round((score / 5) * 100);
      return `
        <div class="grade-criterion-row">
          <div class="grade-criterion-header">
            <span class="crit-title">${escapeHtml(item.name)}</span>
            <span class="crit-band band-${band.toLowerCase()}">Band ${band}</span>
          </div>
          <div class="grade-progress-bar-outer" aria-label="${escapeHtml(item.name)}: ${score}/5">
            <div class="grade-progress-bar-inner band-${band.toLowerCase()}" style="width: ${percentage}%"></div>
          </div>
          <p class="grade-criterion-feedback">${escapeHtml(criterion.feedback || 'Chưa có nhận xét chi tiết.')}</p>
        </div>
      `;
    }).join('');

    const responsesHtml = responses.length
      ? responses.map(renderResponseCard).join('')
      : '<p class="grade-empty-note">Máy chấm chưa trả về phân tích từng câu. Hãy bấm Chấm lại.</p>';

    const improvements = Array.isArray(result?.improvements) ? result.improvements : [];
    const improvementsHtml = improvements.length
      ? `<div class="grade-improvements-section"><h4>💡 Ưu tiên cải thiện toàn Part</h4>${renderList(improvements)}</div>`
      : '';

    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', 'Kết quả chấm Writing');
    container.innerHTML = `
      <div class="grade-card grade-result-card">
        <div class="grade-result-header">
          <div>
            <h3>📊 Kết quả Writing Part</h3>
            <p>Điểm tổng theo nhiệm vụ + chẩn đoán chi tiết từng câu</p>
          </div>
          <div class="grade-overall-stack">
            <div class="grade-overall-badge band-${overallBand.toLowerCase()}">Band ${overallBand}</div>
            <strong>Điểm Part: ${partScore}/${partMaxScore}</strong>
          </div>
        </div>

        <div class="grade-general-feedback">
          <strong>Vì sao Part nhận mức này?</strong>
          <p>${escapeHtml(result?.scoreRationale || result?.generalFeedback || 'Chưa có giải thích tổng quan.')}</p>
        </div>

        <section class="grade-response-section" aria-labelledby="grade-response-heading">
          <div class="grade-section-heading">
            <div><span>Quan trọng nhất</span><h4 id="grade-response-heading">Đánh giá từng câu</h4></div>
            <small>${responses.length} câu/email</small>
          </div>
          <div class="grade-response-list">${responsesHtml}</div>
        </section>

        <section class="grade-overall-section">
          <h4>Phân tích tiêu chí toàn Part</h4>
          <div class="grade-criteria-container">${criteriaHtml}</div>
        </section>

        <div class="grade-general-feedback grade-general-feedback-secondary">
          <strong>Nhận xét tổng quan</strong>
          <p>${escapeHtml(result?.generalFeedback || 'Chưa có nhận xét tổng quan.')}</p>
        </div>

        ${improvementsHtml}

        <p class="grade-diagnostic-note">${escapeHtml(result?.diagnosticNotice || 'Band từng câu là chẩn đoán AI để luyện tập, không phải kết quả thi chính thức.')}</p>

        <div class="grade-result-actions">
          <button onclick="gradeCurrentPart()" class="grade-btn primary">Chấm lại</button>
          <button onclick="clearGradeResult()" class="grade-btn secondary">Đóng kết quả</button>
        </div>
      </div>
    `;
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
})();
