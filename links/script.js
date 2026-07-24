document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -24px"
      }
    );

    revealElements.forEach((element, index) => {
      const delay = Math.min(index * 75, 375);

      element.style.transitionDelay = `${delay}ms`;

      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  const cards = document.querySelectorAll(".link-card");

  cards.forEach((card) => {
    const removePressedEffect = () => {
      card.classList.remove("is-pressed");
    };

    card.addEventListener("pointerdown", () => {
      card.classList.add("is-pressed");
    });

    card.addEventListener("pointerup", removePressedEffect);
    card.addEventListener("pointercancel", removePressedEffect);
    card.addEventListener("pointerleave", removePressedEffect);
  });

  const pendingLinks = document.querySelectorAll("[data-pendente]");

  pendingLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const linkName = link.dataset.pendente;

      console.info(
        `O link de "${linkName}" ainda precisa ser colocado no index.html.`
      );
    });
  });
});