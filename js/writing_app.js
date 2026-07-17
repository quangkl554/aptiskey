(() => {
  const PART_META = {
    1: { title: "Trả lời ngắn", subtitle: "5 câu · mỗi câu 1–5 từ", duration: 3 * 60, targets: ["1–5 từ"] },
    2: { title: "Tin nhắn câu lạc bộ", subtitle: "1 câu trả lời · khoảng 20–30 từ", duration: 7 * 60, targets: ["20–30 từ"] },
    3: { title: "Trao đổi với thành viên", subtitle: "3 câu trả lời · khoảng 30–40 từ/câu", duration: 10 * 60, targets: ["30–40 từ"] },
    4: { title: "Email thân mật & trang trọng", subtitle: "2 email · khoảng 50 từ và 120–150 từ", duration: 30 * 60, targets: ["Khoảng 50 từ", "120–150 từ"] },
  };

  let activePart = 1;
  let activeClub = 0;
  let answersVisible = false;
  let timerSeconds = PART_META[1].duration;
  let timerRunning = false;
  let timerHandle = null;

  const clubs = typeof writingDB !== "undefined" && Array.isArray(writingDB.clubs) ? writingDB.clubs : [];
  const draftPrefix = "aptisWritingDraft";
  const completePrefix = "aptisWritingComplete";

  const byId = (id) => document.getElementById(id);

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function cleanText(value) {
    const holder = document.createElement("div");
    holder.innerHTML = String(value ?? "").replace(/<br\s*\/?>/gi, "\n");
    return (holder.textContent || "")
      .replace(/\r/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function countWords(value) {
    const text = String(value || "").trim();
    return text ? text.split(/\s+/).length : 0;
  }

  function draftKey(questionIndex) {
    return `${draftPrefix}:${activeClub}:${activePart}:${questionIndex}`;
  }

  function completeKey() {
    return `${completePrefix}:${activeClub}:${activePart}`;
  }

  function loadDraft(questionIndex) {
    try { return localStorage.getItem(draftKey(questionIndex)) || ""; } catch (_) { return ""; }
  }

  function saveDraft(questionIndex, value) {
    try { localStorage.setItem(draftKey(questionIndex), value); } catch (_) {}
  }

  function isComplete() {
    try { return localStorage.getItem(completeKey()) === "1"; } catch (_) { return false; }
  }

  function setComplete(value) {
    try {
      if (value) localStorage.setItem(completeKey(), "1");
      else localStorage.removeItem(completeKey());
    } catch (_) {}
  }

  function getQuestions() {
    const club = clubs[activeClub];
    if (!club) return [];
    if (activePart === 1) {
      return Object.entries(club.questions1 || {}).map(([key, prompt], index) => ({
        label: `Câu ${index + 1}`,
        prompt,
        answer: club.questions1_answer?.[`${key}_answer`] || "",
        target: "1–5 từ",
        short: true,
      }));
    }
    if (activePart === 2) {
      const item = Object.entries(club.questions2 || {})[0] || ["question2", ""];
      return [{
        label: "Bài viết ngắn",
        prompt: item[1],
        answer: club.questions2_answer?.[item[0]] || "",
        target: "20–30 từ",
      }];
    }
    if (activePart === 3) {
      return Object.entries(club.questions3 || {}).map(([key, prompt], index) => ({
        label: `Câu ${index + 1}`,
        prompt,
        answer: club.questions3_answer?.[`${key}_answer`] || "",
        target: "30–40 từ",
      }));
    }
    return [
      {
        label: "Email cho bạn bè",
        prompt: club.question4_1_text || "",
        answer: club.question4_1_text_answer || "",
        target: "Khoảng 50 từ",
      },
      {
        label: "Email cho quản lý câu lạc bộ",
        prompt: club.question4_2_text || "",
        answer: club.question4_2_text_answer || "",
        target: "120–150 từ",
      },
    ];
  }

  function renderQuestion(item, index) {
    const value = loadDraft(index);
    const answer = cleanText(item.answer);
    const modelWords = countWords(answer);
    const response = item.short
      ? `<input class="writing-short-input" id="writing-response-${index}" value="${escapeHtml(value)}" maxlength="120" placeholder="Nhập câu trả lời 1–5 từ..." oninput="handleWritingInput(${index})" />`
      : `<textarea class="writing-area" id="writing-response-${index}" placeholder="Viết câu trả lời của bạn ở đây..." oninput="handleWritingInput(${index})">${escapeHtml(value)}</textarea>`;
    return `
      <article class="writing-question">
        <div class="writing-question-head"><b>${escapeHtml(item.label)}</b><span>${escapeHtml(item.target)}</span></div>
        <p>${escapeHtml(cleanText(item.prompt))}</p>
        ${response}
        <div class="wc-row"><span class="wc-count">Số từ: <strong id="writing-word-count-${index}">${countWords(value)}</strong></span><span class="wc-count" id="writing-save-${index}">Tự động lưu trên máy</span></div>
        <div class="writing-answer"><div class="writing-answer-head"><strong>Đáp án mẫu</strong><span>Mẫu tham khảo: ${modelWords} từ</span></div>${escapeHtml(answer)}</div>
      </article>`;
  }

  function renderWorkspace() {
    const club = clubs[activeClub];
    const meta = PART_META[activePart];
    const questions = getQuestions();
    const situation = activePart === 4 && club?.questions4_main
      ? `<div class="task-prompt"><strong>Tình huống chung</strong><br/>${escapeHtml(cleanText(club.questions4_main))}</div>`
      : "";

    byId("writing-club-name").textContent = club?.club_name || "Writing Club";
    byId("writing-part-title").textContent = `Part ${activePart} · ${meta.title}`;
    byId("writing-part-subtitle").textContent = meta.subtitle;
    byId("writing-counter").textContent = `${activeClub + 1} / ${clubs.length}`;
    byId("writing-club-select").value = String(activeClub);
    byId("writing-question-list").innerHTML = situation + questions.map(renderQuestion).join("");
    byId("writing-workspace").classList.toggle("show-answers", answersVisible);
    byId("writing-answer-toggle").innerHTML = answersVisible ? "🙈 Ẩn đáp án mẫu" : "👁 Xem đáp án mẫu";
    updatePartTabs();
    updateCompleteButton();
    updateTimerDisplay();
    updateProgressSummary();
    document.title = `${club?.club_name || "Writing"} · Part ${activePart} — Aptis Studio`;
  }

  function updatePartTabs() {
    document.querySelectorAll("[data-writing-part]").forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.writingPart) === activePart);
    });
  }

  function updateCompleteButton() {
    const button = byId("writing-complete");
    const complete = isComplete();
    button.classList.toggle("secondary", !complete);
    button.textContent = complete ? "✓ Đã học phần này" : "○ Đánh dấu đã học";
  }

  function updateProgressSummary() {
    let done = 0;
    for (let club = 0; club < clubs.length; club += 1) {
      for (let part = 1; part <= 4; part += 1) {
        try { if (localStorage.getItem(`${completePrefix}:${club}:${part}`) === "1") done += 1; } catch (_) {}
      }
    }
    byId("writing-progress-summary").textContent = `${done} / ${clubs.length * 4} mục đã học`;
  }

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function updateTimerDisplay() {
    byId("writing-timer").textContent = formatTime(timerSeconds);
    byId("writing-timer-toggle").textContent = timerRunning ? "Tạm dừng" : (timerSeconds < PART_META[activePart].duration ? "Tiếp tục" : "Bắt đầu");
  }

  function stopTimer() {
    clearInterval(timerHandle);
    timerHandle = null;
    timerRunning = false;
  }

  window.toggleWritingTimer = function toggleWritingTimer() {
    if (timerRunning) {
      stopTimer();
      updateTimerDisplay();
      return;
    }
    if (timerSeconds <= 0) timerSeconds = PART_META[activePart].duration;
    timerRunning = true;
    timerHandle = setInterval(() => {
      timerSeconds -= 1;
      updateTimerDisplay();
      if (timerSeconds <= 0) {
        stopTimer();
        updateTimerDisplay();
      }
    }, 1000);
    updateTimerDisplay();
  };

  window.resetWritingTimer = function resetWritingTimer() {
    stopTimer();
    timerSeconds = PART_META[activePart].duration;
    updateTimerDisplay();
  };

  window.startWritingPart = function startWritingPart(part) {
    const next = Number(part);
    if (!PART_META[next]) return;
    activePart = next;
    answersVisible = false;
    stopTimer();
    timerSeconds = PART_META[activePart].duration;
    renderWorkspace();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.changeWritingClub = function changeWritingClub(value) {
    const next = Number(value);
    if (!Number.isInteger(next) || next < 0 || next >= clubs.length) return;
    activeClub = next;
    answersVisible = false;
    renderWorkspace();
  };

  window.moveWritingClub = function moveWritingClub(direction) {
    activeClub = (activeClub + Number(direction) + clubs.length) % clubs.length;
    answersVisible = false;
    renderWorkspace();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.randomWritingClub = function randomWritingClub() {
    if (clubs.length < 2) return;
    let next = activeClub;
    while (next === activeClub) next = Math.floor(Math.random() * clubs.length);
    activeClub = next;
    answersVisible = false;
    renderWorkspace();
  };

  window.toggleWritingAnswers = function toggleWritingAnswers() {
    answersVisible = !answersVisible;
    byId("writing-workspace").classList.toggle("show-answers", answersVisible);
    byId("writing-answer-toggle").innerHTML = answersVisible ? "🙈 Ẩn đáp án mẫu" : "👁 Xem đáp án mẫu";
  };

  window.toggleWritingComplete = function toggleWritingComplete() {
    setComplete(!isComplete());
    updateCompleteButton();
    updateProgressSummary();
  };

  window.handleWritingInput = function handleWritingInput(index) {
    const field = byId(`writing-response-${index}`);
    if (!field) return;
    saveDraft(index, field.value);
    byId(`writing-word-count-${index}`).textContent = String(countWords(field.value));
    const status = byId(`writing-save-${index}`);
    status.textContent = "Đã lưu";
    clearTimeout(status._saveTimer);
    status._saveTimer = setTimeout(() => { status.textContent = "Tự động lưu trên máy"; }, 1000);
  };

  function init() {
    if (!clubs.length) {
      byId("writing-question-list").innerHTML = '<div class="instr">Không tìm thấy dữ liệu Writing.</div>';
      return;
    }
    byId("writing-club-select").innerHTML = clubs.map((club, index) =>
      `<option value="${index}">Bộ ${String(index + 1).padStart(2, "0")} · ${escapeHtml(club.club_name || "Writing Club")}</option>`
    ).join("");
    renderWorkspace();

    document.addEventListener("keydown", (event) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key === "ArrowLeft") moveWritingClub(-1);
      if (event.key === "ArrowRight") moveWritingClub(1);
      if (event.key.toLowerCase() === "a") toggleWritingAnswers();
      if (event.code === "Space") { event.preventDefault(); toggleWritingTimer(); }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
