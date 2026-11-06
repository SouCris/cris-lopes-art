const lightbox = document.getElementById("lightbox");
const lightboxImagem = lightbox.querySelector(".lightbox__imagem");
const lightboxSite = lightbox.querySelector(".lightbox__site");
const fechar = lightbox.querySelector(".lightbox__fechar");

let linkAnterior = null;
let overflowAnterior = "";

const fecharLightbox = () => {
    if (!lightbox.classList.contains("ativo")) return;

    lightbox.classList.remove("ativo");

    lightboxSite.removeAttribute("src");
    lightboxSite.hidden = true;

    lightboxImagem.removeAttribute("src");
    lightboxImagem.hidden = true;

    document.body.style.overflow = overflowAnterior;
    linkAnterior?.focus();
};

document.querySelectorAll(".portfolio-popup").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        if (!lightbox.classList.contains("ativo")) {
            overflowAnterior = document.body.style.overflow;
        }

        linkAnterior = this;

        lightboxImagem.hidden = true;
        lightboxImagem.removeAttribute("src");

        lightboxSite.hidden = true;
        lightboxSite.removeAttribute("src");

        if (this.dataset.tipo === "site") {
            lightboxSite.src = this.href;
            lightboxSite.hidden = false;
        } else {
            lightboxImagem.src = this.href;
            lightboxImagem.alt =
                this.querySelector("img")?.alt || "Projeto do portfólio";
            lightboxImagem.hidden = false;
        }

        lightbox.classList.add("ativo");
        lightbox.scrollTop = 0;
        document.body.style.overflow = "hidden";
        fechar.focus();
    });
});

fechar.addEventListener("click", fecharLightbox);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) fecharLightbox();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharLightbox();
});

// ========================================
// BOTÃO FLUTUANTE DO WHATSAPP
// ========================================

const whatsappButton = document.querySelector(".whatsapp-float");

if (whatsappButton) {
    let collapseTimer;

    const collapseButton = () => {
        whatsappButton.classList.add("is-collapsed");
    };

    const expandButton = () => {
        whatsappButton.classList.remove("is-collapsed");
    };

    const scheduleCollapse = () => {
        clearTimeout(collapseTimer);

        collapseTimer = setTimeout(() => {
            collapseButton();
        }, 4000);
    };

    // Começa aberto e recolhe depois de 4 segundos.
    scheduleCollapse();

    // Mantém aberto durante a interação.
    whatsappButton.addEventListener("mouseenter", () => {
        clearTimeout(collapseTimer);
        expandButton();
    });

    whatsappButton.addEventListener("mouseleave", () => {
        scheduleCollapse();
    });

    whatsappButton.addEventListener("focus", () => {
        clearTimeout(collapseTimer);
        expandButton();
    });

    whatsappButton.addEventListener("blur", () => {
        scheduleCollapse();
    });

    // Quando o usuário voltar para a aba do site,
// agenda novamente o recolhimento.
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        scheduleCollapse();
    }
});

// Após clicar no botão, agenda novamente o recolhimento.
whatsappButton.addEventListener("click", () => {
    scheduleCollapse();
});
}




const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// ========================================
// CONTADOR ANIMADO DO PREÇO
// ========================================

const precoValor = document.querySelector(".plano__valor");

if (precoValor) {
    const valorFinal = 900;
    const duracao = 1500;
    let contadorExecutado = false;

    const animarPreco = () => {
        const inicio = performance.now();

        const atualizarValor = (tempoAtual) => {
            const tempoDecorrido = tempoAtual - inicio;
            const progresso = Math.min(tempoDecorrido / duracao, 1);

            const valorAtual = Math.floor(progresso * valorFinal);

            precoValor.textContent = `${valorAtual},00`;

            if (progresso < 1) {
                requestAnimationFrame(atualizarValor);
            } else {
                precoValor.textContent = "899,90";
            }
        };

        requestAnimationFrame(atualizarValor);
    };

    const precoObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !contadorExecutado) {
                    contadorExecutado = true;
                    animarPreco();
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    precoObserver.observe(precoValor);
}

const menuToggle = document.querySelector(".menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

if (menuToggle && menuPrincipal) {
    const fecharMenu = () => {
        menuPrincipal.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    };

    menuToggle.addEventListener("click", () => {
        const aberto = menuPrincipal.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", String(aberto));
        menuToggle.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );
        menuToggle.textContent = aberto ? "×" : "☰";
    });

    menuPrincipal.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") fecharMenu();
    });
}