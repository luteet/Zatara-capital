export default function aboutCompanyVideo(){function t(t){let e=t.getBoundingClientRect();return{top:e.top+window.scrollY,right:e.right+window.scrollX,bottom:e.bottom+window.scrollY,left:e.left+window.scrollX}}document.querySelectorAll(".about-company__video").forEach(e=>{const o=document.createElement("canvas");o.width=1e3,o.height=1e3,e.append(o);const i=o.getContext("2d"),n=e.querySelector(".about-company__video_link");function l(){if(window.innerWidth>=992){const o={size:2*e.offsetWidth},l={x:2*(t(n).left-t(e).left),y:2*(t(n).top-t(e).top)};i.reset(),i.lineWidth=.002*o.size,i.moveTo(o.size/2-1.25*n.offsetHeight,o.size/2+1.25*n.offsetHeight),i.lineTo(l.x+2*n.offsetWidth,l.y+1.95*n.offsetHeight),i.strokeStyle="#FFF",i.stroke()}}l(),window.addEventListener("resize",l)})}