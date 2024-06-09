import{a as L,S as F,i as a}from"./assets/vendor-ee72e1a4.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const A="https://pixabay.com/api/",w="44068350-6653723470485442d70381dc3";async function m(t,o=1){const r=new URLSearchParams({key:w,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}),n=`${A}?${r}`;return(await L.get(n)).data}const y=document.querySelector(".gallery");function p(t){const o=t.map(r=>`<li class='image-card'>
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
      </li>`).join("");y.insertAdjacentHTML("beforeend",o)}function S(){y.innerHTML=""}function g(){new F(".gallery a",{captionsData:"alt",captionDelay:250,overlay:!0,overlayOpacity:.8}).refresh()}const u=document.querySelector(".image-search-form"),f=document.querySelector(".loading-indicator"),i=document.querySelector(".load-more-btn");let c=1,l="";i.style.display="none";u.addEventListener("submit",async t=>{if(t.preventDefault(),S(),l=t.target.elements.inputSearch.value.trim(),c=1,!l){a.error({title:"Error",message:"The search field cannot be empty. Please enter your query.",position:"topRight"});return}h(),i.style.display="none";try{const o=await m(l,c);o.hits.length?setTimeout(()=>{p(o.hits),g(),i.style.display=o.totalHits>15?"block":"none"},2e3):a.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",color:"#EF4040",position:"topRight"})}catch(o){a.error({message:`An error occurred: ${o.message}`,messageColor:"#FAFAFB",color:"#EF4040",position:"topRight"})}finally{setTimeout(b,2e3)}u.reset()});i.addEventListener("click",async()=>{c++,h();try{const t=await m(l,c);t.hits.length?(p(t.hits),g()):(i.style.display="none",a.info({message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",color:"#17A2B8",position:"topRight"}))}catch(t){a.error({message:`An error occurred: ${t.message}`,messageColor:"#FAFAFB",color:"#EF4040",position:"topRight"})}finally{b()}v()});function h(){f.style.display="block"}function b(){f.style.display="none"}function v(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
