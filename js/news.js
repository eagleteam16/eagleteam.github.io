(function () {
  let modalEl;
  let modalPanelEl;
  let modalTitleEl;
  let modalBodyEl;
  let modalCloseEl;

  function getLang() {
    const attr = document.body.getAttribute("data-news-lang");
    return attr === "en" ? "en" : "zh";
  }

  function getText(lang, zhText, enText) {
    return lang === "en" ? enText : zhText;
  }

  function ensureModal(lang) {
    if (modalEl) return;

    modalEl = document.createElement("div");
    modalEl.className = "news-modal";
    modalEl.setAttribute("hidden", "");
    modalEl.innerHTML =
      '<div class="news-modal-panel" role="dialog" aria-modal="true">' +
      '<button type="button" class="news-modal-close" aria-label="' + getText(lang, "關閉", "Close") + '">×</button>' +
      '<h2 class="news-modal-title"></h2>' +
      '<div class="news-modal-body"></div>' +
      "</div>";

    document.body.appendChild(modalEl);

    modalPanelEl = modalEl.querySelector(".news-modal-panel");
    modalTitleEl = modalEl.querySelector(".news-modal-title");
    modalBodyEl = modalEl.querySelector(".news-modal-body");
    modalCloseEl = modalEl.querySelector(".news-modal-close");

    modalCloseEl.addEventListener("click", closeModal);
    modalEl.addEventListener("click", function (e) {
      if (e.target === modalEl) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalEl && !modalEl.hasAttribute("hidden")) {
        closeModal();
      }
    });
  }

  function openModal(lang, title, content, image, imageAlt) {
    ensureModal(lang);
    modalTitleEl.textContent = title;
    const imageHtml = image
      ? '<img class="news-modal-image" src="' + image + '" alt="' + (imageAlt || title) + '">'
      : "";
    const textHtml = content
      .split(/\n\s*\n/)
      .map(function (p) {
        return p.trim();
      })
      .filter(Boolean)
      .map(function (p) {
        return "<p>" + p + "</p>";
      })
      .join("");
    modalBodyEl.innerHTML = imageHtml + textHtml;

    modalEl.removeAttribute("hidden");
    document.body.classList.add("news-modal-open");
    requestAnimationFrame(function () {
      modalEl.classList.add("is-visible");
      modalPanelEl.classList.add("is-visible");
    });
  }

  function closeModal() {
    if (!modalEl || modalEl.hasAttribute("hidden")) return;
    modalEl.classList.remove("is-visible");
    modalPanelEl.classList.remove("is-visible");
    window.setTimeout(function () {
      modalEl.setAttribute("hidden", "");
      document.body.classList.remove("news-modal-open");
    }, 220);
  }

  function renderNewsList(items) {
    const lang = getLang();
    ensureModal(lang);
    const section = document.getElementById("news-list");
    if (!section) return;

    section.innerHTML = "";

    if (!Array.isArray(items) || items.length === 0) {
      const empty = document.createElement("div");
      empty.className = "news-card";
      empty.innerHTML = "<p>" + getText(lang, "目前沒有最新消息。", "No news yet.") + "</p>";
      section.appendChild(empty);
      return;
    }

    items
      .slice()
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .forEach(function (item) {
        const card = document.createElement("div");
        card.className = "news-card";

        const dateText = lang === "en" ? (item.date_en || item.date || "") : (item.date_zh || item.date || "");
        const title = lang === "en" ? (item.title_en || "") : (item.title_zh || "");
        const summary = lang === "en" ? (item.summary_en || "") : (item.summary_zh || "");
        const summary2 = lang === "en" ? (item.summary2_en || "") : (item.summary2_zh || "");
        const content = lang === "en" ? (item.content_en || "") : (item.content_zh || "");
        const image = item.image || "";
        const imageAlt = lang === "en" ? (item.image_alt_en || "") : (item.image_alt_zh || "");
        const readMore = getText(lang, "閱讀更多", "Read More");
        var actionHtml = "";
        if (content) {
          actionHtml =
            '<button type="button" class="read-more read-more-btn" data-open-modal>' +
            readMore +
            ' <i class="fas fa-arrow-right"></i></button>';
        }

        const imageHtml = image
          ? '<img class="news-cover-image" src="' + image + '" alt="' + (imageAlt || title) + '">'
          : "";

        card.innerHTML =
          '<div class="news-date">' + dateText + "</div>" +
          "<h2>" + title + "</h2>" +
          imageHtml +
          "<p>" + summary + "</p>" +
          (summary2 ? "<p>" + summary2 + "</p>" : "") +
          actionHtml;

        const openButton = card.querySelector("[data-open-modal]");
        if (openButton) {
          openButton.addEventListener("click", function () {
            openModal(lang, title, content, image, imageAlt);
          });
        }

        section.appendChild(card);
      });
  }

  fetch("data/news.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to load news.json");
      return res.json();
    })
    .then(renderNewsList)
    .catch(function () {
      renderNewsList([]);
    });
})();
