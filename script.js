const lightbox = document.getElementById("lightbox");
const lightboxImagem = document.querySelector(".lightbox__imagem");
const fechar = document.querySelector(".lightbox__fechar");

document.querySelectorAll(".portfolio-popup").forEach(link => {

    link.addEventListener("click", function (e) {
        e.preventDefault();

        lightboxImagem.src = this.href;
        lightbox.classList.add("ativo");
    });

});

fechar.addEventListener("click", () => {
    lightbox.classList.remove("ativo");
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("ativo");
    }
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
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
    const valorFinal = 699;
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
                precoValor.textContent = "699,00";
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