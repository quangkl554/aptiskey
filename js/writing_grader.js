(function () {
  const byId = (id) => document.getElementById(id);

  window.gradeCurrentPart = async function () {
    const gradePanel = byId("writing-grade-panel");
    if (!gradePanel) return;

    // Determine current part and club index
    const activeTab = document.querySelector(".writing-part-tabs button.active");
    if (!activeTab) return;
    const part = Number(activeTab.dataset.writingPart);
    const clubSelect = byId("writing-club-select");
    const clubName = byId("writing-club-name").textContent;

    // Collect questions and user inputs from the workspace
    const questionElements = document.querySelectorAll(".writing-question");
    const questions = [];
    let hasInput = false;

    questionElements.forEach((el, index) => {
      const promptEl = el.querySelector(`#writing-prompt-${index}`);
      const inputEl = el.querySelector(`#writing-response-${index}`);
      if (promptEl && inputEl) {
        const userInput = inputEl.value.trim();
        if (userInput) hasInput = true;
        questions.push({
          prompt: promptEl.textContent.trim(),
          userInput: userInput
        });
      }
    });

    if (!hasInput) {
      alert("Vui lòng nhập bài viết trước khi chấm điểm!");
      return;
    }

    // Show loading state
    gradePanel.innerHTML = `
      <div class="grade-card grade-loading-card">
        <div class="grade-spinner"></div>
        <p>Đang gửi bài viết đến AI chấm điểm theo chuẩn APTIS British Council...</p>
      </div>
    `;
    gradePanel.style.display = "block";
    gradePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });

    try {
      const response = await fetch("/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          part,
          clubName,
          questions
        })
      });

      if (!response.ok) {
        let errText = "Lỗi kết nối server.";
        try {
          const errData = await response.json();
          errText = errData.error || errText;
        } catch (_) {}
        throw new Error(errText);
      }

      const result = await response.json();
      renderGradeResult(gradePanel, result);
    } catch (error) {
      console.error(error);
      gradePanel.innerHTML = `
        <div class="grade-card grade-error-card">
          <h4>⚠️ Lỗi chấm điểm</h4>
          <p>${error.message || "Không thể kết nối đến máy chủ chấm điểm."}</p>
          <div style="margin-top: 15px; display: flex; gap: 10px;">
            <button onclick="gradeCurrentPart()" class="grade-btn primary">Thử lại</button>
            <button onclick="clearGradeResult()" class="grade-btn secondary">Đóng</button>
          </div>
        </div>
      `;
    }
  };

  window.clearGradeResult = function () {
    const gradePanel = byId("writing-grade-panel");
    if (gradePanel) {
      gradePanel.innerHTML = "";
      gradePanel.style.display = "none";
    }
  };

  function renderGradeResult(container, result) {
    const overallBand = result.overallBand || "A1";
    const feedback = result.generalFeedback || "Không có nhận xét.";
    const improvements = result.improvements || [];
    const crit = result.criteria || {};

    const criteriaList = [
      { name: "Task Fulfillment (Hoàn thành nhiệm vụ)", key: "taskFulfillment" },
      { name: "Coherence & Cohesion (Mạch lạc & Liên kết)", key: "coherenceCohesion" },
      { name: "Vocabulary Range & Accuracy (Từ vựng)", key: "vocabularyRange" },
      { name: "Grammatical Range & Accuracy (Ngữ pháp)", key: "grammaticalRange" }
    ];

    let criteriaHtml = "";
    criteriaList.forEach(item => {
      const cData = crit[item.key] || { band: "A1", score: 1, feedback: "Chưa có nhận xét chi tiết." };
      const bandClass = cData.band.toLowerCase();
      // Normalize score to fit standard percentage (e.g. score out of 5)
      const pct = Math.min(100, Math.max(0, (cData.score / 5) * 100));
      criteriaHtml += `
        <div class="grade-criterion-row">
          <div class="grade-criterion-header">
            <span class="crit-title">${item.name}</span>
            <span class="crit-band band-${bandClass}">Band ${cData.band}</span>
          </div>
          <div class="grade-progress-bar-outer">
            <div class="grade-progress-bar-inner band-${bandClass}" style="width: ${pct}%"></div>
          </div>
          <p class="grade-criterion-feedback">${cData.feedback}</p>
        </div>
      `;
    });

    let improvementsHtml = "";
    if (improvements.length > 0) {
      improvementsHtml = `
        <div class="grade-improvements-section">
          <h4>💡 Gợi ý cải thiện:</h4>
          <ul>
            ${improvements.map(imp => `<li>${imp}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="grade-card grade-result-card">
        <div class="grade-result-header">
          <div>
            <h3>📊 Kết quả đánh giá APTIS</h3>
            <p>Được chấm tự động dựa trên tiêu chí British Council</p>
          </div>
          <div class="grade-overall-badge band-${overallBand.toLowerCase()}">Band ${overallBand}</div>
        </div>
        
        <div class="grade-general-feedback">
          <strong>Nhận xét tổng quan:</strong>
          <p>${feedback}</p>
        </div>

        <div class="grade-criteria-container">
          ${criteriaHtml}
        </div>

        ${improvementsHtml}

        <div class="grade-result-actions">
          <button onclick="gradeCurrentPart()" class="grade-btn primary">Chấm lại</button>
          <button onclick="clearGradeResult()" class="grade-btn secondary">Đóng kết quả</button>
        </div>
      </div>
    `;
    container.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
})();
