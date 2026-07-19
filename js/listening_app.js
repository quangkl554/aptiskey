(() => {
  const PARTS = {
    part1_13: {
      title: "Question 1–13",
      shortTitle: "Q1–13",
      subtitle: "Chọn đáp án đúng sau khi nghe một đoạn ngắn.",
      icon: "01",
      duration: 25 * 60,
      kind: "single",
    },
    part14: {
      title: "Question 14",
      shortTitle: "Q14",
      subtitle: "Ghép bốn người nói với ý kiến phù hợp.",
      icon: "14",
      duration: 10 * 60,
      kind: "matching",
    },
    part15: {
      title: "Question 15",
      shortTitle: "Q15",
      subtitle: "Xác định ý kiến của Man, Woman hoặc Both.",
      icon: "15",
      duration: 10 * 60,
      kind: "opinion",
    },
    part16_17: {
      title: "Question 16–17",
      shortTitle: "Q16–17",
      subtitle: "Hai câu trắc nghiệm cho mỗi bài nghe dài.",
      icon: "16",
      duration: 15 * 60,
      kind: "double",
    },
  };

  const db = globalThis.listeningDB || {};
  const byId = (id) => document.getElementById(id);
  const storagePrefix = "aptisListeningStudio";
  let activePart = "part1_13";
  let activeIndex = 0;
  let answersVisible = false;
  let transcriptVisible = false;
  let audioPlays = 0;
  let playedThisRun = false;
  let timerSeconds = PARTS[activePart].duration;
  let timerRunning = false;
  let timerHandle = null;

  const cleanText = (value) => String(value ?? "")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const escapeHtml = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const currentItems = () => Array.isArray(db[activePart]) ? db[activePart] : [];
  const currentRecord = () => currentItems()[activeIndex] || null;
  const recordIndex = () => currentRecord()?.index || activeIndex + 1;
  const answerKey = () => `${storagePrefix}:answers:${activePart}:${recordIndex()}`;
  const completeKey = () => `${storagePrefix}:complete:${activePart}:${recordIndex()}`;

  function safeGet(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function safeSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }

  function getAnswers() {
    return safeGet(answerKey(), {});
  }

  function setAnswer(name, value) {
    const answers = getAnswers();
    if (activePart === "part14" && value) {
      Object.keys(answers).forEach((answerKeyName) => {
        if (answerKeyName !== name && answers[answerKeyName] === value) answers[answerKeyName] = "";
      });
    }
    answers[name] = value;
    safeSet(answerKey(), answers);
    answersVisible = false;
    updateQuestionContent(name, value);
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

  function totalItems() {
    return Object.keys(PARTS).reduce((sum, id) => sum + (Array.isArray(db[id]) ? db[id].length : 0), 0);
  }

  function completedItems() {
    let count = 0;
    Object.keys(PARTS).forEach((partId) => {
      const list = Array.isArray(db[partId]) ? db[partId] : [];
      list.forEach((item, index) => {
        const id = item?.index || index + 1;
        try { if (localStorage.getItem(`${storagePrefix}:complete:${partId}:${id}`) === "1") count += 1; } catch (_) {}
      });
    });
    return count;
  }

  function formatTime(seconds) {
    const min = Math.floor(Math.max(0, seconds) / 60);
    const sec = Math.max(0, seconds) % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function updateTimer() {
    const output = byId("listening-timer");
    const toggle = byId("listening-timer-toggle");
    if (output) output.textContent = formatTime(timerSeconds);
    if (toggle) toggle.textContent = timerRunning ? "Tạm dừng" : (timerSeconds < PARTS[activePart].duration ? "Tiếp tục" : "Bắt đầu");
  }

  function stopTimer() {
    clearInterval(timerHandle);
    timerHandle = null;
    timerRunning = false;
  }

  function resetTimer() {
    stopTimer();
    timerSeconds = PARTS[activePart].duration;
    updateTimer();
  }

  function answerState(selected, correct, option) {
    if (!answersVisible) return "";
    if (option === correct) return selected === correct ? "correct" : "missed";
    return selected === option ? "incorrect" : "";
  }

  function renderAudio(record) {
    const path = record?.audioUrl || "";
    const audioMarkup = path
      ? `<audio id="listening-audio" controls preload="metadata" src="${escapeHtml(path)}"></audio>`
      : `<div class="listen-no-audio">Bài này là ghi chú luyện tập từ nguồn, không có audio gốc.</div>`;
    return `
      <section class="listen-audio-card">
        <div class="listen-audio-top">
          <div class="listen-wave"><span></span><span></span><span></span><span></span><span></span></div>
          <div>
            <span class="listen-overline">AUDIO OFFLINE</span>
            <h3>Nghe trước, trả lời sau</h3>
            <p id="listening-play-count">Lượt phát trong phiên: ${audioPlays} · Khuyến nghị tối đa 2 lần</p>
          </div>
          <button class="listen-transcript-toggle" type="button" aria-expanded="${transcriptVisible}" aria-controls="listening-transcript-region" onclick="toggleListeningTranscript()">${transcriptVisible ? "Ẩn transcript" : "Xem transcript"}</button>
        </div>
        ${audioMarkup}
      </section>`;
  }

  function renderTranscript(record) {
    if (!transcriptVisible) return "";
    const transcript = cleanText(record?.transcript);
    return `
      <article class="listen-transcript" aria-label="Transcript bài nghe">
        <div class="listen-card-label">Transcript</div>
        <div>${escapeHtml(transcript).replace(/\n/g, "<br/>") || "Chưa có transcript cho bài này."}</div>
      </article>`;
  }

  function renderChoice(name, option, selected, correct) {
    const state = answerState(selected, correct, option);
    const status = answersVisible && option === correct ? `<span class="listen-answer-tag">Đúng</span>` : "";
    return `
      <label class="listen-option ${state}">
        <input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(option)}" ${selected === option ? "checked" : ""} onchange="setListeningAnswer('${escapeHtml(name)}', this.value)" />
        <span>${escapeHtml(option)}</span>${status}
      </label>`;
  }

  function renderSingle(record, answers) {
    const selected = answers.q1 || "";
    const correct = record.correctAnswer || "";
    return `
      <article class="listen-question-card">
        <div class="listen-card-label">Câu hỏi</div>
        <h3>${escapeHtml(record.question)}</h3>
        <div class="listen-options">${(record.options || []).map((option) => renderChoice("q1", option, selected, correct)).join("")}</div>
      </article>`;
  }

  function selectClass(selected, correct) {
    if (!answersVisible) return "";
    return selected === correct ? "correct" : "incorrect";
  }

  function renderSelectQuestion(number, label, list, selected, correct, key) {
    const status = answersVisible ? `<span class="listen-select-answer">Đáp án: <b>${escapeHtml(correct)}</b></span>` : "";
    return `
      <article class="listen-question-card compact ${selectClass(selected, correct)}">
        <div class="listen-question-row"><div><span class="listen-number">${escapeHtml(number)}</span><h3>${escapeHtml(label)}</h3></div>${status}</div>
        <select class="listen-select" onchange="setListeningAnswer('${escapeHtml(key)}', this.value)">
          <option value="">— Chọn đáp án —</option>
          ${list.map((item) => `<option value="${escapeHtml(item)}" ${selected === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
        </select>
      </article>`;
  }

  function renderMatching(record, answers) {
    const options = record.options || [];
    return `
      <section class="listen-context-card">
        <div class="listen-card-label">Ghép ý kiến</div>
        <p>Bốn người đang trao đổi về <b>${escapeHtml(record.topic || "chủ đề này")}</b>. Chọn một đáp án cho mỗi người; mỗi đáp án chỉ dùng một lần (chọn lại sẽ chuyển đáp án sang người mới).</p>
      </section>
      <div class="listen-question-stack">
        ${(record.correctAnswers || []).map((correct, index) => renderSelectQuestion(`Person ${index + 1}`, `Ý kiến của Person ${index + 1}`, options, answers[`p${index}`] || "", correct, `p${index}`)).join("")}
      </div>`;
  }

  function renderOpinion(record, answers) {
    const choices = ["Man", "Woman", "Both"];
    return `
      <section class="listen-context-card">
        <div class="listen-card-label">Man · Woman · Both</div>
        <p>${escapeHtml(record.description || "Nghe hai người nói và xác định ý kiến thuộc về Man, Woman hay cả hai.")}</p>
      </section>
      <div class="listen-question-stack">
        ${(record.statements || []).map((statement, index) => renderSelectQuestion(String(index + 1).padStart(2, "0"), statement, choices, answers[`p${index}`] || "", record.correctAnswers?.[index] || "", `p${index}`)).join("")}
      </div>`;
  }

  function renderDouble(record, answers) {
    return `<div class="listen-question-stack">${(record.questions || []).map((question, index) => {
      const selected = answers[`q${index}`] || "";
      const correct = record.correctAnswers?.[index] || "";
      return `
        <article class="listen-question-card">
          <div class="listen-card-label">${escapeHtml(question.id || `16.${index + 1}`)}</div>
          <h3>${escapeHtml(question.question)}</h3>
          <div class="listen-options">${(question.options || []).map((option) => renderChoice(`q${index}`, option, selected, correct)).join("")}</div>
        </article>`;
    }).join("")}</div>`;
  }

  function getScore(record, answers) {
    const kind = PARTS[activePart].kind;
    if (kind === "single") return { correct: answers.q1 === record.correctAnswer ? 1 : 0, total: 1 };
    if (kind === "matching" || kind === "opinion") {
      const correct = record.correctAnswers || [];
      return { correct: correct.reduce((sum, item, index) => sum + (answers[`p${index}`] === item ? 1 : 0), 0), total: correct.length };
    }
    const correct = record.correctAnswers || [];
    return { correct: correct.reduce((sum, item, index) => sum + (answers[`q${index}`] === item ? 1 : 0), 0), total: correct.length };
  }

  function renderFeedback(record, answers) {
    if (!answersVisible) return "";
    const score = getScore(record, answers);
    const percentage = score.total ? Math.round(score.correct / score.total * 100) : 0;
    const message = percentage === 100 ? "Xuất sắc — bạn nắm đúng toàn bộ ý chính." : percentage >= 50 ? "Khá tốt — xem lại đáp án được tô màu để rút kinh nghiệm." : "Hãy đọc transcript, xác định từ khóa rồi nghe lại một lần nữa.";
    return `<div class="listen-feedback ${percentage === 100 ? "excellent" : ""}"><div><strong>${score.correct} / ${score.total} đúng</strong><span>${message}</span></div><div class="listen-feedback-score">${percentage}%</div></div>`;
  }

  function updateHeader(record) {
    const meta = PARTS[activePart];
    const list = currentItems();
    byId("listening-part-title").textContent = meta.title;
    byId("listening-part-subtitle").textContent = meta.subtitle;
    byId("listening-counter").textContent = `${activeIndex + 1} / ${list.length}`;
    byId("listening-set-select").value = String(activeIndex);
    byId("listening-topic").textContent = cleanText(record?.topic || (activePart === "part1_13" ? `Bài nghe ${recordIndex()}` : "Listening practice"));
    byId("listening-progress-summary").textContent = `${completedItems()} / ${totalItems()} bài đã đánh dấu`;
    const complete = isComplete();
    byId("listening-complete").textContent = complete ? "✓ Đã học bài này" : "○ Đánh dấu đã học";
    byId("listening-complete").classList.toggle("done", complete);
    byId("listening-complete").setAttribute("aria-pressed", String(complete));
    document.title = `${meta.title} · Bài ${activeIndex + 1} — Aptis Studio`;
  }

  function populateSetSelect() {
    const list = currentItems();
    byId("listening-set-select").innerHTML = list.map((item, index) => {
      const label = activePart === "part1_13" ? `Câu ${item.index || index + 1}` : `Bộ ${String(item.index || index + 1).padStart(2, "0")} · ${cleanText(item.topic || "Listening")}`;
      return `<option value="${index}">${escapeHtml(label)}</option>`;
    }).join("");
  }

  function renderPartTabs() {
    byId("listening-part-tabs").innerHTML = Object.entries(PARTS).map(([id, meta]) => {
      const count = Array.isArray(db[id]) ? db[id].length : 0;
      const selected = id === activePart;
      return `<button type="button" role="tab" aria-selected="${selected}" aria-controls="listening-workspace" tabindex="${selected ? "0" : "-1"}" class="${selected ? "active" : ""}" onclick="changeListeningPart('${id}')"><span aria-hidden="true">${meta.icon}</span>${meta.shortTitle}<small>${count}</small></button>`;
    }).join("");
  }

  function bindAudio() {
    const audio = byId("listening-audio");
    if (!audio) return;
    audio.addEventListener("play", () => {
      if (!playedThisRun) {
        playedThisRun = true;
        audioPlays += 1;
        const output = byId("listening-play-count");
        if (output) output.textContent = `Lượt phát trong phiên: ${audioPlays} · Khuyến nghị tối đa 2 lần`;
      }
    });
    audio.addEventListener("ended", () => { playedThisRun = false; });
  }

  function renderQuestionMarkup(record, answers) {
    const kind = PARTS[activePart].kind;
    if (kind === "single") return renderSingle(record, answers);
    if (kind === "matching") return renderMatching(record, answers);
    if (kind === "opinion") return renderOpinion(record, answers);
    return renderDouble(record, answers);
  }
  function renderWorkspace() {
    const record = currentRecord();
    const workspace = byId("listening-workspace");
    if (!record) {
      workspace.innerHTML = '<div class="listen-empty">Không tìm thấy dữ liệu Listening. Hãy mở lại trang sau khi dữ liệu offline đã được tạo.</div>';
      return;
    }
    const answers = getAnswers();
    const questionHtml = renderQuestionMarkup(record, answers);

    workspace.innerHTML = `
      <div class="listen-workspace-head">
        <div><span class="listen-card-label">Bài nghe ${recordIndex()}</span><h2 id="listening-topic"></h2></div>
        <div class="listen-workspace-meta"><span class="listen-counter" id="listening-counter"></span><span class="listen-status-pill">Offline ready</span></div>
      </div>
      ${renderAudio(record)}
      <div id="listening-transcript-region">${renderTranscript(record)}</div>
      <div class="listen-question-zone">${questionHtml}</div>
      <div id="listening-feedback-region" aria-live="polite">${renderFeedback(record, answers)}</div>
      <div class="listen-workspace-actions">
        <button class="listen-ghost" onclick="moveListeningSet(-1)">← Bài trước</button>
        <button class="listen-check" onclick="checkListeningAnswers()">Kiểm tra đáp án</button>
        <button class="listen-ghost" onclick="moveListeningSet(1)">Bài tiếp →</button>
      </div>`;
    updateHeader(record);
    bindAudio();
    updateTimer();
  }

  function updateQuestionContent(focusName = "", focusValue = "") {
    const record = currentRecord();
    const zone = document.querySelector(".listen-question-zone");
    const feedback = byId("listening-feedback-region");
    if (!record || !zone || !feedback) return;
    const answers = getAnswers();
    zone.innerHTML = renderQuestionMarkup(record, answers);
    feedback.innerHTML = renderFeedback(record, answers);
    if (focusName) {
      const controls = [...zone.querySelectorAll(`[name="${focusName}"]`)];
      const control = controls.find((item) => item.value === focusValue) || controls[0];
      if (control) control.focus({ preventScroll: true });
    }
  }

  function focusWorkspace() {
    const workspace = byId("listening-workspace");
    if (!workspace) return;
    workspace.focus({ preventScroll: true });
    workspace.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function resetRecordView() {
    answersVisible = false;
    transcriptVisible = false;
    audioPlays = 0;
    playedThisRun = false;
  }

  window.changeListeningPart = (partId) => {
    if (!PARTS[partId]) return;
    activePart = partId;
    activeIndex = 0;
    resetRecordView();
    resetTimer();
    populateSetSelect();
    renderPartTabs();
    renderWorkspace();
    focusWorkspace();
  };

  window.changeListeningSet = (value) => {
    const next = Number(value);
    if (!Number.isInteger(next) || next < 0 || next >= currentItems().length) return;
    activeIndex = next;
    resetRecordView();
    renderWorkspace();
    focusWorkspace();
  };

  window.moveListeningSet = (direction) => {
    const list = currentItems();
    if (!list.length) return;
    activeIndex = (activeIndex + Number(direction) + list.length) % list.length;
    resetRecordView();
    renderWorkspace();
    focusWorkspace();
  };

  window.randomListeningSet = () => {
    const list = currentItems();
    if (list.length < 2) return;
    let next = activeIndex;
    while (next === activeIndex) next = Math.floor(Math.random() * list.length);
    activeIndex = next;
    resetRecordView();
    renderWorkspace();
    focusWorkspace();
  };

  window.setListeningAnswer = (name, value) => setAnswer(name, value);

  window.checkListeningAnswers = () => {
    answersVisible = true;
    updateQuestionContent();
  };

  window.toggleListeningTranscript = () => {
    transcriptVisible = !transcriptVisible;
    const region = byId("listening-transcript-region");
    const button = document.querySelector(".listen-transcript-toggle");
    if (region) region.innerHTML = renderTranscript(currentRecord());
    if (button) {
      button.textContent = transcriptVisible ? "Ẩn transcript" : "Xem transcript";
      button.setAttribute("aria-expanded", String(transcriptVisible));
    }
  };

  window.toggleListeningComplete = () => {
    setComplete(!isComplete());
    updateHeader(currentRecord());
  };

  window.toggleListeningTimer = () => {
    if (timerRunning) {
      stopTimer();
      updateTimer();
      return;
    }
    if (timerSeconds <= 0) timerSeconds = PARTS[activePart].duration;
    timerRunning = true;
    timerHandle = setInterval(() => {
      timerSeconds -= 1;
      updateTimer();
      if (timerSeconds <= 0) stopTimer();
    }, 1000);
    updateTimer();
  };

  window.resetListeningTimer = () => resetTimer();

  window.toggleCourseNav = (button) => {
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
    if (!Object.keys(PARTS).some((id) => currentItemsFor(id).length)) {
      byId("listening-workspace").innerHTML = '<div class="listen-empty">Đang chuẩn bị dữ liệu Listening offline…</div>';
      return;
    }
    renderPartTabs();
    populateSetSelect();
    renderWorkspace();
    byId("listening-part-tabs").addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const tabs = [...event.currentTarget.querySelectorAll('[role="tab"]')];
      const current = tabs.indexOf(document.activeElement);
      const next = (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].click();
      requestAnimationFrame(() => document.querySelector('#listening-part-tabs [aria-selected="true"]')?.focus());
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { closeCourseNav(true); return; }
      const target = event.target;
      const interactive = target instanceof HTMLElement && (target.matches("input, select, textarea, button, audio, a, [role=\"link\"]") || target.isContentEditable);
      if (interactive || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft") moveListeningSet(-1);
      if (event.key === "ArrowRight") moveListeningSet(1);
      if (event.key.toLowerCase() === "t") toggleListeningTranscript();
      if (event.key.toLowerCase() === "a") checkListeningAnswers();
      if (event.code === "Space") { event.preventDefault(); toggleListeningTimer(); }
    });
    document.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", closeCourseNav));
    document.addEventListener("click", (event) => {
      if (!document.body.classList.contains("course-nav-open")) return;
      if (event.target instanceof Element && event.target.closest(".nav-inner")) return;
      closeCourseNav();
    });
  }

  function currentItemsFor(partId) {
    return Array.isArray(db[partId]) ? db[partId] : [];
  }

  document.addEventListener("DOMContentLoaded", init);
})();
