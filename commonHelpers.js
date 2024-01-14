import{S as h,a as g,i as c}from"./assets/vendor-89feecc5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const v=document.querySelector(".form"),b=document.querySelector(".input-text"),u=document.querySelector(".gallery"),f=document.querySelector(".loader"),n=document.querySelector(".load-more-btn");let d;f.style.display="none";n.style.display="none";let s={key:"41702324-4ff2c897c89b5acf667452ea5",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:1};const k=new h(".gallery a",{captionsData:"alt",captionDelay:250});v.addEventListener("submit",async a=>{a.preventDefault(),u.textContent="",s.q=b.value,s.page=1,await p()});n.addEventListener("click",async a=>{a.preventDefault(),s.page++,await p(),window.scrollBy({top:u.firstElementChild.getBoundingClientRect().height*2,left:0,behavior:"smooth"})});async function p(){f.style.display="block",n.style.display="none";const a=new URLSearchParams(s);return await g.get(`https://pixabay.com/api/?${a}`).then(o=>(d=Math.ceil(o.data.totalHits/s.per_page),d===0?c.error({position:"topRight",maxWidth:350,message:"Sorry, there are no images matching your search query. Please try again!"}):(s.page>=d?c.info({position:"topRight",maxWidth:350,message:"We're sorry, but you've reached the end of search results."}):n.style.display="block",L(o.data)))).catch(o=>c.error({position:"topRight",title:"Error",message:`${o.message}`})).finally(()=>f.style.display="none")}function L(a){const o=a.hits.map(({webformatURL:l,largeImageURL:r,tags:e,likes:t,views:i,comments:y,downloads:m})=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${r}">
            <img
                class="gallery-image"
                src="${l}"
                alt="${e}"/>
            </a>
            <div class="info-item">
                <div class="info-image">
                    <h3 class="info-key">Likes</h3>
                    <p class="info-value">${t}</p>
                </div>
                <div class="info-image">
                    <h3 class="info-key">Views</h3>
                    <p class="info-value">${i}</p>
                </div>
                <div class="info-image">
                    <h3 class="info-key">Comments</h3>
                    <p class="info-value">${y}</p>
                </div>
                <div class="info-image">
                    <h3 class="info-key">Downloads</h3>
                    <p class="info-value">${m}</p>
                </div>
            </div>  
        </li>`).join("");u.insertAdjacentHTML("beforeend",o),k.refresh()}
//# sourceMappingURL=commonHelpers.js.map
