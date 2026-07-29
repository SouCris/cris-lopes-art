/* =========================================================
   FAQ — ABRIR E FECHAR RESPOSTAS
========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-item__question");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("is-open");

      const otherQuestion = otherItem.querySelector(
        ".faq-item__question"
      );

      otherQuestion.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

/* =========================================================
   ANO AUTOMÁTICO DO RODAPÉ
========================================================= */

const footerYear = document.querySelector("#footer-year");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* =========================================================
   MODAL — PRÉVIA DOS MODELOS
========================================================= */

const catalogModal = document.getElementById("catalogModal");
const modalButtons = document.querySelectorAll("[data-modal]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const modalTitle = document.getElementById("catalogModalTitle");
const modalPreviews = document.querySelectorAll("[data-preview-category]");
const body = document.body;

let lastFocusedElement = null;


/* Abrir o modal */
function openCatalogModal(category) {
  lastFocusedElement = document.activeElement;

  const titles = {
    todos: "Prévia Geral dos Modelos",
    meninas: "Modelos para Meninas",
    meninos: "Modelos para Meninos"
  };

  modalTitle.textContent = titles[category] || titles.todos;

  modalPreviews.forEach((preview) => {
    const previewCategory = preview.dataset.previewCategory;

    const shouldShow =
      category === "todos" ||
      previewCategory === category;

    preview.hidden = !shouldShow;
  });

  catalogModal.classList.add("is-open");
  catalogModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");

  const modalContent = catalogModal.querySelector(
    ".catalog-modal__content"
  );

  modalContent.scrollTop = 0;

  const closeButton = catalogModal.querySelector(
    ".catalog-modal__close"
  );

  closeButton.focus();
}


/* Fechar o modal */
function closeCatalogModal() {
  catalogModal.classList.remove("is-open");
  catalogModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}


/* Botões Todos, Meninas e Meninos */
modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.modal;

    openCatalogModal(category);
  });
});


/* Fechar pelo X ou pelo fundo */
modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeCatalogModal);
});


/* Fechar pela tecla Esc */
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    catalogModal.classList.contains("is-open")
  ) {
    closeCatalogModal();
  }
});