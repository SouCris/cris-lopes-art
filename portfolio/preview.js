/* Prévia modal independente do carrossel. */
(function(){
 const modal=document.getElementById('folio-modal');
 const frame=document.getElementById('folio-modal-frame');
 const photo=document.getElementById('folio-modal-image');
 const title=document.getElementById('folio-modal-title');
 const external=document.getElementById('folio-modal-external');
 const close=document.getElementById('folio-modal-close');
 if(!modal||!frame||!photo||!close)return;
 let lastLink=null;
 function hide(){modal.hidden=true;frame.removeAttribute('src');frame.hidden=true;photo.hidden=true;photo.removeAttribute('src');document.body.classList.remove('folio-modal-open');lastLink?.focus();}
 function show(link){
   lastLink=link;
   const path=link.dataset.previewUrl||link.getAttribute('href');
   const resolved=new URL(path,document.baseURI).href;
   const card=link.closest('.folio-card');
   title.textContent=card?.querySelector('h3')?.textContent||'Visualização do projeto';
   external.href=resolved;
   if(link.dataset.previewType==='image'){photo.src=resolved;photo.hidden=false;frame.hidden=true;frame.removeAttribute('src');}
   else {photo.hidden=true;photo.removeAttribute('src');frame.src=resolved;frame.hidden=false;}
   modal.hidden=false;modal.querySelector('.folio-modal-content').scrollTop=0;document.body.classList.add('folio-modal-open');close.focus();
 }
 document.addEventListener('click',function(e){
   const target=e.target.closest?.('a[data-preview-url]');
   if(!target)return;
   if(target.dataset.openExternal==='true')return;
   e.preventDefault();e.stopPropagation();show(target);
 },true);
 close.addEventListener('click',hide);
 modal.addEventListener('click',e=>{if(e.target===modal)hide()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)hide()});
 const dismiss=document.querySelector('.folio-whatsapp-dismiss');
 dismiss?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();document.querySelector('#folio-whatsapp-hint')?.remove()},true);
 hide();
})();
