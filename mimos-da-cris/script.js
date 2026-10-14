// ============================================================
//  MIMOS DA CRIS — CONFIGURAÇÃO DOS LINKS
//  Aqui você poderá trocar os links sem mexer no design.
// ============================================================

const LINKS = {
  // IMPORTANTE: cole o checkout Kiwify do Papel de Carta Cristão
  papelDeCarta: "https://pay.kiwify.com.br/A8X0S4d",

  // Checkout Kiwify do Kit de Etiquetas Escolares
  etiquetas: "https://pay.kiwify.com.br/Fe74RXt",

  // Quando a loja estiver publicada, insira aqui o endereço
  loja: "",

  // Mesmo WhatsApp utilizado no site Cris Lopes Art (confirme antes de publicar)
  whatsapp: "5564984188628",

  // Link para contratar criação de lojas virtuais
  siteCrisLopesArt: "https://www.crislopesart.com.br/",

  // Confirme que esta caixa postal está ativa antes de divulgar
  email: "crislopes.contato26@gmail.com"
};

function mostrarAviso(mensagem) {
  const aviso = document.querySelector('#aviso');
  aviso.textContent = mensagem;
  aviso.hidden = false;
  // Sem temporizador: fechar tocando no aviso, para ser acessível
  aviso.onclick = () => { aviso.hidden = true; };
}

function configurarLink(id, url, mensagem, options = {}) {
  const elemento = document.getElementById(id);
  if (!elemento) return;
  if (!url) {
    elemento.addEventListener('click', event => {
      event.preventDefault();
      mostrarAviso(mensagem);
    });
    return;
  }
  if (elemento.tagName === 'A') elemento.href = url;
  if (options.novaAba && elemento.tagName === 'A') {
    elemento.target = '_blank';
    elemento.rel = 'noopener noreferrer';
  }
}

configurarLink('link-papel', LINKS.papelDeCarta, 'O link de compra do Papel de Carta Cristão ainda está sendo configurado. 💗', { novaAba: true });
configurarLink('link-etiquetas', LINKS.etiquetas, 'Link de compra indisponível.', { novaAba: true });

const numero = LINKS.whatsapp.replace(/\D/g, '');
const mensagemWhats = encodeURIComponent('Olá! Vim pelo Instagram da Mimos da Cris e gostaria de saber mais sobre os arquivos digitais.');
const urlWhats = numero ? `https://wa.me/${numero}?text=${mensagemWhats}` : '';
configurarLink('link-whatsapp', urlWhats, 'WhatsApp em configuração.', { novaAba: true });
configurarLink('rodape-whatsapp', urlWhats, 'WhatsApp em configuração.', { novaAba: true });
configurarLink('link-site', LINKS.siteCrisLopesArt, 'Site da Cris Lopes Art em configuração.', { novaAba: true });
configurarLink('rodape-email', LINKS.email ? `mailto:${LINKS.email}` : '', 'E-mail em configuração.');

const linkLoja = document.querySelector('#link-loja');
linkLoja.addEventListener('click', () => {
  if (LINKS.loja) window.location.href = LINKS.loja;
  else mostrarAviso('Nossa loja está chegando! Por enquanto, acompanhe as novidades no Instagram. 💗');
});
