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

