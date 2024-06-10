import{a as A,S as L,i}from"./assets/vendor-ee72e1a4.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const w="https://pixabay.com/api/",v="44068350-6653723470485442d70381dc3";async function p(t,o=1){const r=new URLSearchParams({key:v,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}),l=`${w}?${r}`;return(await A.get(l)).data}const m=document.querySelector(".gallery");let f=new L(".gallery a",{captionsData:"alt",captionDelay:250,overlay:!0,overlayOpacity:.8});function g(t){const o=t.map(r=>`<li class='image-card'>
        <a href="${r.largeImageURL}" class="gallery-link">
          <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" class="gallery-image">
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${r.likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${r.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${r.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${r.downloads}</b>
          </p>
        </div>
      </li>`).join("");m.insertAdjacentHTML("beforeend",o)}function S(){m.innerHTML=""}const y=document.querySelector(".image-search-form"),h=document.querySelector(".loading-indicator"),n=document.querySelector(".load-more-btn");let a=1,c="",d=0;n.style.display="none";y.addEventListener("submit",async t=>{if(t.preventDefault(),S(),c=t.target.elements.inputSearch.value.trim(),a=1,!c){i.error({title:"Error",message:"The search field cannot be empty. Please enter your query.",position:"topRight"});return}b(),n.style.display="none";try{const o=await p(c,a);d=Math.ceil(o.totalHits/15),o.hits.length?setTimeout(()=>{g(o.hits),f.refresh(),n.style.display=a<d?"block":"none"},2e3):i.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",color:"#EF4040",position:"topRight"})}catch(o){i.error({message:`An error occurred: ${o.message}`,messageColor:"#FAFAFB",color:"#EF4040",position:"topRight"})}finally{setTimeout(F,2e3)}y.reset()});n.addEventListener("click",async()=>{a++,b();try{const t=await p(c,a);!t.hits.length||a>d?(n.style.display="none",i.info({message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",color:"#17A2B8",position:"topRight"})):(g(t.hits),f.refresh(),a>=d&&(n.style.display="none",i.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",color:"#17A2B8",position:"topRight"})))}catch(t){i.error({message:`An error occurred: ${t.message}`,messageColor:"#FAFAFB",color:"#EF4040",position:"topRight"})}finally{F()}B()});function b(){h.style.display="block"}function F(){h.style.display="none"}function B(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
