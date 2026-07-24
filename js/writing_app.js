(() => {
  const PART_META = {
    1: { title: "Trả lời ngắn", subtitle: "5 câu · mỗi câu 1–5 từ", duration: 3 * 60, targets: ["1–5 từ"] },
    2: { title: "Tin nhắn câu lạc bộ", subtitle: "1 câu trả lời · khoảng 20–30 từ", duration: 7 * 60, targets: ["20–30 từ"] },
    3: { title: "Trao đổi với thành viên", subtitle: "3 câu trả lời · khoảng 30–40 từ/câu", duration: 10 * 60, targets: ["30–40 từ"] },
    4: { title: "Email thân mật & trang trọng", subtitle: "2 email · 40–50 từ và 120–150 từ", duration: 30 * 60, targets: ["40–50 từ", "120–150 từ"] },
  };

  let activePart = 1;
  let activeClub = 0;
  let answersVisible = false;
  let timerSeconds = PART_META[1].duration;
  let timerRunning = false;
  let timerHandle = null;

  const clubs = typeof writingDB !== "undefined" && Array.isArray(writingDB.clubs) ? writingDB.clubs : [];
  const completePrefix = "aptisWritingComplete";
  const visitDrafts = new Map();
  const visitedClubs = new Set();

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
    return `${activeClub}:${activePart}:${questionIndex}`;
  }

  function completeKey() {
    return `${completePrefix}:${activeClub}:${activePart}`;
  }

  function loadDraft(questionIndex) {
    return visitDrafts.get(draftKey(questionIndex)) || "";
  }

  function saveDraft(questionIndex, value) {
    const key = draftKey(questionIndex);
    if (value) visitDrafts.set(key, value);
    else visitDrafts.delete(key);
  }

  function clearLegacyDrafts() {
    try {
      for (let index = localStorage.length - 1; index >= 0; index -= 1) {
        const key = localStorage.key(index);
        if (key?.startsWith("aptisWritingDraft:")) localStorage.removeItem(key);
      }
    } catch (_) {}
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
        minWords: 1,
        maxWords: 5,
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
        minWords: 20,
        maxWords: 30,
      }];
    }
    if (activePart === 3) {
      return Object.entries(club.questions3 || {}).map(([key, prompt], index) => ({
        label: `Câu ${index + 1}`,
        prompt,
        answer: club.questions3_answer?.[`${key}_answer`] || "",
        target: "30–40 từ",
        minWords: 30,
        maxWords: 40,
      }));
    }
    return [
      {
        label: "Email cho bạn bè",
        prompt: club.question4_1_text || "",
        answer: club.question4_1_text_answer || "",
        target: "40–50 từ",
        minWords: 40,
        maxWords: 50,
      },
      {
        label: "Email cho quản lý câu lạc bộ",
        prompt: club.question4_2_text || "",
        answer: club.question4_2_text_answer || "",
        target: "120–150 từ",
        minWords: 120,
        maxWords: 150,
      },
    ];
  }

  function getWordStatus(item, count) {
    const min = Number(item.minWords) || 0;
    const max = Number(item.maxWords) || Infinity;
    if (count === 0) return { state: "neutral", text: `Mục tiêu: ${item.target}` };
    if (count < min) return { state: "warning", text: `Cần thêm ${min - count} từ để đạt mục tiêu ${item.target}.` };
    if (count > max) return { state: "warning", text: `Đang vượt ${count - max} từ so với mục tiêu ${item.target}.` };
    return { state: "good", text: `Đúng mục tiêu ${item.target}.` };
  }
  function renderQuestion(item, index) {
    const value = loadDraft(index);
    const answer = cleanText(item.answer);
    const modelWords = countWords(answer);
    const words = countWords(value);
    const status = getWordStatus(item, words);
    const fieldId = `writing-response-${index}`;
    const promptId = `writing-prompt-${index}`;
    const targetId = `writing-target-${index}`;
    const feedbackId = `writing-word-feedback-${index}`;
    const describedBy = `${promptId} ${targetId} ${feedbackId}`;
    const response = item.short
      ? `<input class="writing-short-input" id="${fieldId}" name="writing-response-${activeClub}-${activePart}-${index}" value="${escapeHtml(value)}" placeholder="Nhập câu trả lời 1–5 từ..." aria-describedby="${describedBy}" oninput="handleWritingInput(${index})" />`
      : `<textarea class="writing-area" id="${fieldId}" name="writing-response-${activeClub}-${activePart}-${index}" placeholder="Viết câu trả lời của bạn ở đây..." aria-describedby="${describedBy}" oninput="handleWritingInput(${index})">${escapeHtml(value)}</textarea>`;
    return `
      <article class="writing-question" aria-labelledby="${promptId}">
        <div class="writing-question-head"><b>${escapeHtml(item.label)}</b><span id="${targetId}">${escapeHtml(item.target)}</span></div>
        <p id="${promptId}">${escapeHtml(cleanText(item.prompt))}</p>
        <label class="writing-response-label" for="${fieldId}">Phần trả lời của bạn — ${escapeHtml(item.label)}</label>
        ${response}
        <div class="wc-row">
          <span class="wc-count">Số từ: <strong id="writing-word-count-${index}">${words}</strong></span>
          <span class="wc-count writing-save-status" id="writing-save-${index}" role="status" aria-live="polite">Lưu trong lượt này · F5 sẽ xóa</span>
        </div>
        <p class="writing-word-feedback ${status.state}" id="${feedbackId}" role="status" aria-live="polite">${escapeHtml(status.text)}</p>
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

    if (typeof window.clearGradeResult === "function") {
      window.clearGradeResult();
    }

    byId("writing-club-name").textContent = club?.club_name || "Writing Club";
    byId("writing-part-title").textContent = `Part ${activePart} · ${meta.title}`;
    byId("writing-part-subtitle").textContent = meta.subtitle;
    byId("writing-counter").textContent = `${activeClub + 1} / ${clubs.length}`;
    byId("writing-club-select").value = String(activeClub);
    byId("writing-question-list").innerHTML = situation + questions.map(renderQuestion).join("");
    byId("writing-workspace").classList.toggle("show-answers", answersVisible);
    byId("writing-answer-toggle").textContent = answersVisible ? "Ẩn đáp án mẫu" : "Xem đáp án mẫu";
    byId("writing-answer-toggle").setAttribute("aria-expanded", String(answersVisible));
    visitedClubs.add(activeClub);
    updatePartTabs();
    updateCompleteButton();
    updateTimerDisplay();
    updateProgressSummary();
    updateRandomButton();
    document.title = `${club?.club_name || "Writing"} · Part ${activePart} — Aptis Studio`;
  }

  function updatePartTabs() {
    document.querySelectorAll("[data-writing-part]").forEach((button) => {
      const selected = Number(button.dataset.writingPart) === activePart;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  }

  function updateCompleteButton() {
    const button = byId("writing-complete");
    const complete = isComplete();
    button.classList.toggle("secondary", !complete);
    button.setAttribute("aria-pressed", String(complete));
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

  function updateRandomButton() {
    const button = byId("writing-random");
    if (!button) return;
    const remaining = Math.max(0, clubs.length - visitedClubs.size);
    button.textContent = remaining > 0 ? `Bộ ngẫu nhiên · còn ${remaining}` : "Bộ ngẫu nhiên · vòng mới";
    button.title = remaining > 0
      ? `${remaining} bộ chưa xuất hiện trong lượt mở trang này`
      : "Đã đi hết các bộ; lần bấm tiếp theo sẽ bắt đầu vòng mới";
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

  function focusWorkspace() {
    const workspace = byId("writing-workspace");
    if (!workspace) return;
    workspace.focus({ preventScroll: true });
    workspace.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  window.startWritingPart = function startWritingPart(part) {
    const next = Number(part);
    if (!PART_META[next]) return;
    activePart = next;
    answersVisible = false;
    stopTimer();
    timerSeconds = PART_META[activePart].duration;
    renderWorkspace();
    focusWorkspace();
  };

  window.changeWritingClub = function changeWritingClub(value) {
    const next = Number(value);
    if (!Number.isInteger(next) || next < 0 || next >= clubs.length) return;
    activeClub = next;
    answersVisible = false;
    renderWorkspace();
    focusWorkspace();
  };

  window.moveWritingClub = function moveWritingClub(direction) {
    activeClub = (activeClub + Number(direction) + clubs.length) % clubs.length;
    answersVisible = false;
    renderWorkspace();
    focusWorkspace();
  };

  window.randomWritingClub = function randomWritingClub() {
    if (clubs.length < 2) return;
    let candidates = clubs
      .map((_, index) => index)
      .filter((index) => index !== activeClub && !visitedClubs.has(index));
    if (!candidates.length) {
      visitedClubs.clear();
      visitedClubs.add(activeClub);
      candidates = clubs.map((_, index) => index).filter((index) => index !== activeClub);
    }
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    activeClub = next;
    answersVisible = false;
    renderWorkspace();
    focusWorkspace();
  };

  window.toggleWritingAnswers = function toggleWritingAnswers() {
    answersVisible = !answersVisible;
    byId("writing-workspace").classList.toggle("show-answers", answersVisible);
    byId("writing-answer-toggle").textContent = answersVisible ? "Ẩn đáp án mẫu" : "Xem đáp án mẫu";
    byId("writing-answer-toggle").setAttribute("aria-expanded", String(answersVisible));
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
    const words = countWords(field.value);
    byId(`writing-word-count-${index}`).textContent = String(words);
    const item = getQuestions()[index];
    const feedback = byId(`writing-word-feedback-${index}`);
    if (item && feedback) {
      const wordStatus = getWordStatus(item, words);
      feedback.className = `writing-word-feedback ${wordStatus.state}`;
      feedback.textContent = wordStatus.text;
    }
    const saveStatus = byId(`writing-save-${index}`);
    saveStatus.textContent = "Đã lưu trong lượt này";
    clearTimeout(saveStatus._saveTimer);
    saveStatus._saveTimer = setTimeout(() => { saveStatus.textContent = "Lưu trong lượt này · F5 sẽ xóa"; }, 1000);
  };

  window.toggleCourseNav = function toggleCourseNav(button) {
    const nav = byId(button.getAttribute("aria-controls"));
    if (!nav) return;
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Đóng menu điều hướng" : "Mở menu điều hướng");
    nav.classList.toggle("open", open);
    document.body.classList.toggle("course-nav-open", open);
    if (open) requestAnimationFrame(() => nav.querySelector("a")?.focus());
  };

  function closeCourseNav(returnFocus = false) {
    const button = document.querySelector(".nav-menu-toggle");
    const nav = document.querySelector(".nav-links");
    if (!button || !nav) return;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Mở menu điều hướng");
    nav.classList.remove("open");
    document.body.classList.remove("course-nav-open");
    if (returnFocus) button.focus();
  }
  function init() {
    if (!clubs.length) {
      byId("writing-question-list").innerHTML = '<div class="instr">Không tìm thấy dữ liệu Writing.</div>';
      return;
    }
    clearLegacyDrafts();
    byId("writing-club-select").innerHTML = clubs.map((club, index) =>
      `<option value="${index}">Bộ ${String(index + 1).padStart(2, "0")} · ${escapeHtml(club.club_name || "Writing Club")}</option>`
    ).join("");
    renderWorkspace();

    document.querySelector(".writing-part-tabs").addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const tabs = [...event.currentTarget.querySelectorAll('[role="tab"]')];
      const current = tabs.indexOf(document.activeElement);
      const next = (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].click();
      requestAnimationFrame(() => document.querySelector('.writing-part-tabs [aria-selected="true"]')?.focus());
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { closeCourseNav(true); return; }
      const target = event.target;
      const interactive = target instanceof HTMLElement && (target.matches("input, select, textarea, button, a, [role=\"link\"]") || target.isContentEditable);
      if (interactive || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft") moveWritingClub(-1);
      if (event.key === "ArrowRight") moveWritingClub(1);
      if (event.key.toLowerCase() === "a") toggleWritingAnswers();
      if (event.code === "Space") { event.preventDefault(); toggleWritingTimer(); }
    });
    document.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", closeCourseNav));
    document.addEventListener("click", (event) => {
      if (!document.body.classList.contains("course-nav-open")) return;
      if (event.target instanceof Element && event.target.closest(".nav-inner")) return;
      closeCourseNav();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
