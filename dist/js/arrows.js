export default function schemeArrows(t){const e=document.querySelectorAll(".arrow-canvas");let h=[];function i(t,e,i,o){h.push({x:t,y:e,ctx:i,dir:o})}function o(t,e,h,i,o,l=[]){const a=document.createElement("span");a.classList.add("arrow-label"),l.length&&l.map(t=>{a.classList.add(t)}),a.style.left=e+"px",a.style.top=h+"px",a.textContent=t,"bottom-to-top"==o?a.style.transform="translate(-100%, -50%) rotate(-180deg)":"top-to-bottom"==o?a.style.transform="translate(100%, -50%)":"above"==o&&(a.style.transform="translate(0%, -100%)"),setTimeout(()=>i.parentElement.append(a),0)}window.addEventListener("load",(function(){e.forEach(e=>{const l=e.parentElement.querySelectorAll(".arrow-item");let a=0,f=0;setInterval((function(){e.offsetWidth==a&&e.offsetHeight==f||(a=e.offsetWidth,f=e.offsetHeight,function(e){let l=e.canvas,a=e.arrowItems;if(l.getContext){l.offsetWidth,l.offsetHeight;let e=l.getContext("2d");e.canvas.width=l.offsetWidth,e.canvas.height=l.offsetHeight;let f=2;e.lineWidth=f,e.strokeStyle="#1C2E50",e.fillStyle="#1C2E50",document.querySelectorAll(".arrow-label").forEach(t=>t.remove()),a.forEach(a=>{h=[],e.beginPath();const f={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight,halfWidth:a.offsetWidth/2,halfHeight:a.offsetHeight/2};if(a.dataset.arrowTo){let s=a.dataset.arrowTo.split("; ");for(let h=0;h<s.length;h++){s[h]=s[h].substring(1),s[h]=s[h].slice(0,-1),s[h]=s[h].split(", ");const n=a.closest(".arrows-wrapper"),d=n.querySelector(`[data-arrow-id="${s[h][0]}"]`),r=n.classList.contains("arrows-large-padding")&&t>=992?50:25,g=50,y={x:d.offsetLeft,y:d.offsetTop,width:d.offsetWidth,height:d.offsetHeight,halfWidth:d.offsetWidth/2,halfHeight:d.offsetHeight/2};if("right"==s[h][1])"left"==s[h][2]&&Math.abs(Math.round(f.y+f.halfHeight-(y.y+y.halfHeight)))<=1?"doubleArrows"==s[h][3]?(e.moveTo(f.x+10+f.width,f.y+f.halfHeight),e.lineTo(f.x+10+f.width,f.y+f.halfHeight),e.lineTo(y.x-10,f.y+f.halfHeight),i(y.x-10,y.y+y.halfHeight,e,"right"),i(f.x+f.width+10,f.y+f.halfHeight,e,"left")):(e.moveTo(f.x+f.width,f.y+f.halfHeight),e.lineTo(f.x+f.width,f.y+f.halfHeight),e.lineTo(y.x-10,f.y+f.halfHeight),i(y.x-10,y.y+y.halfHeight,e,"right")):"left"==s[h][2]&&f.y<y.y?(e.moveTo(f.x+f.width,f.y+f.halfHeight),e.lineTo(f.x+f.width+g,f.y+f.halfHeight),e.lineTo(f.x+f.width+g,y.y+y.halfHeight),e.lineTo(y.x-5,y.y+y.halfHeight),i(y.x-5,y.y+y.halfHeight,e,"right"),d.dataset.successLabel&&o(d.dataset.successLabel,y.x-g-10,y.y,l,"top-to-bottom",["success-color"])):"right"==s[h][2]&&(e.moveTo(f.x+f.width,f.y+f.halfHeight),e.lineTo(f.x+f.width,f.y+f.halfHeight),f.y<y.y?(e.lineTo(f.x+f.width+r,f.y+f.halfHeight),e.lineTo(f.x+f.width+r,y.y+y.halfHeight),e.lineTo(y.x+y.width,y.y+y.halfHeight),"centerArrow"==s[h][3]?(a.dataset.arrowLabel&&o(a.dataset.arrowLabel,f.x+y.width+15,(f.y+f.halfHeight+y.y+y.halfHeight)/2-5,e.canvas,"top-to-bottom"),i(f.x+y.width+25,(f.y+f.halfHeight+y.y+y.halfHeight)/2,e,"bottom-large")):"noneArrow"!=s[h][3]&&i(y.x+y.width,y.y+y.halfHeight,e,"left")):f.y>y.y&&(e.lineTo(f.x+f.width+r,f.y+f.halfHeight),e.lineTo(f.x+f.width+r,y.y+y.halfHeight),e.lineTo(y.x+y.width,y.y+y.halfHeight)));else if("left"==s[h][1])e.moveTo(f.x,f.y+f.halfHeight),e.lineTo(f.x,f.y+f.halfHeight),"right"==s[h][2]&&Math.abs(Math.round(f.y+f.halfHeight-(y.y+y.halfHeight)))<=1?"doubleArrows"==s[h][3]?(e.moveTo(f.x-2,f.y+f.halfHeight),e.lineTo(f.x-2,f.y+f.halfHeight),e.lineTo(y.x+10+y.width,f.y+f.halfHeight),i(y.x-10,y.y+y.halfHeight,e,"left"),i(f.x+f.width+10,f.y+f.halfHeight,e,"right")):(e.moveTo(f.x-2,f.y+f.halfHeight),e.lineTo(f.x-2,f.y+f.halfHeight),e.lineTo(y.x+10+y.width,f.y+f.halfHeight),i(y.x+10+y.width,y.y+y.halfHeight,e,"left")):"right"==s[h][2]&&f.x>y.x||("left"==s[h][2]?f.y<y.y?(e.lineTo(f.x-r,f.y+f.halfHeight),e.lineTo(f.x-r,y.y+y.halfHeight),e.lineTo(y.x,y.y+y.halfHeight),"centerArrow"==s[h][3]||("doubleArrows"==s[h][3]?i(f.x,f.y+f.halfHeight,e,"right"):"noneArrow"!=s[h][3]&&i(y.x,y.y+y.halfHeight,e,"right"))):f.y>y.y&&(e.lineTo(f.x-r,f.y+f.halfHeight),e.lineTo(f.x-r,y.y+y.halfHeight),e.lineTo(y.x,y.y+y.halfHeight),"centerArrow"==s[h][3]?(a.dataset.arrowLabel&&o(a.dataset.arrowLabel,f.x-35,(f.y+f.halfHeight+y.y+y.halfHeight)/2-5,e.canvas,"bottom-to-top"),i(f.x-r,(f.y+f.halfHeight+y.y+y.halfHeight)/2-5,e,"top-large")):i(y.x,y.y+y.halfHeight,e,"right"),s[h][2]):s[h][2]);else if("bottom"==s[h][1])if(a.classList.contains("visible-on-desktop")){if(t>=992&&(e.moveTo(f.x+f.halfWidth,f.y+f.height+5),e.lineTo(f.x+f.halfWidth,f.y+f.height+5),"top"==s[h][2]))if(f.x+f.halfWidth==y.x+y.halfWidth)e.lineTo(f.x+f.halfWidth,y.y-5),i(y.x+y.halfWidth,y.y-5,e,"bottom"),"doubleArrows"==s[h][3]&&i(y.x+y.halfWidth,f.y+f.height+5,e,"top");else if(f.x+f.halfWidth>y.x+y.halfWidth)console.log("kek");else if(f.x+f.halfWidth<y.x+y.halfWidth){let t=a.classList.contains("_min-padding")?15:35;e.lineTo(f.x+f.halfWidth,f.y+f.height+t),e.lineTo(y.x+y.halfWidth-2.5,f.y+f.height+t+10),e.lineTo(y.x+y.halfWidth+2.5,y.y),i(y.x+y.halfWidth+2.5,y.y,e,"bottom")}}else y.width<f.width?(e.moveTo(y.x+y.halfWidth,f.y+f.height+5),e.lineTo(y.x+y.halfWidth,f.y+f.height+5),"top"==s[h][2]&&(e.lineTo(y.x+y.halfWidth,y.y-5),i(y.x+y.halfWidth,y.y-5,e,"bottom"),"doubleArrows"==s[h][3]&&i(y.x+y.halfWidth,f.y+f.height+5,e,"top"))):(e.moveTo(f.x+f.halfWidth,f.y+f.height+5),e.lineTo(f.x+f.halfWidth,f.y+f.height+5),"top"==s[h][2]?(e.lineTo(f.x+f.halfWidth,y.y-5),i(f.x+f.halfWidth,y.y-5,e,"bottom"),"doubleArrows"==s[h][3]&&i(y.x+y.halfWidth,f.y+f.height+5,e,"top")):"bottom"==s[h][2]&&y.x<f.x&&(e.moveTo(f.x+f.halfWidth/2,f.y+f.height),e.lineTo(f.x+f.halfWidth/2,f.y+f.height+25),e.lineTo(y.x+y.halfWidth,f.y+f.height+25),e.lineTo(y.x+y.halfWidth,y.y+y.height+5),i(y.x+y.halfWidth,y.y+y.height+5,e,"top"),a.dataset["successLabel-1"]&&o(a.dataset["successLabel-1"],y.x+y.halfWidth+20,f.y+f.height+15,l,"above",["success-color","horizontal-mode"]),a.dataset["successLabel-2"]&&o(a.dataset["successLabel-2"],y.x+y.halfWidth+20,f.y+f.height+75,l,"above",["success-color","horizontal-mode"])));else"top"==s[h][1]&&(e.moveTo(f.x+f.halfWidth,f.y-5),"bottom"==s[h][2]&&(e.lineTo(f.x+f.halfWidth,y.y+y.height+5),i(y.x+y.halfWidth,y.y+y.height+5,e,"top")))}e.stroke(),e.beginPath(),h.map(t=>{const{dir:e,x:h,y:i,ctx:o}=t;"left"==e?(o.moveTo(h+5,i-4),o.lineTo(h+5,i-4),o.lineTo(h,i),o.lineTo(h+5,i+4),o.closePath()):"right"==e?(o.moveTo(h-5,i-4),o.lineTo(h-5,i-4),o.lineTo(h,i),o.lineTo(h-5,i+4),o.closePath()):"bottom"==e?(o.moveTo(h-4,i-5),o.lineTo(h-4,i-5),o.lineTo(h,i),o.lineTo(h+4,i-5),o.closePath()):"top"==e?(o.moveTo(h-4,i+5),o.lineTo(h-4,i+5),o.lineTo(h,i),o.lineTo(h+4,i+5),o.closePath()):"top-large"==e?(o.moveTo(h-5,i+8),o.lineTo(h-5,i+8),o.lineTo(h,i),o.lineTo(h+5,i+8),o.closePath()):"bottom-large"==e&&(o.moveTo(h-5,i-4),o.lineTo(h-5,i-4),o.lineTo(h,i+4),o.lineTo(h+5,i-4),o.closePath())}),e.fill()}})}}({canvas:e,arrowItems:l}))}),100)})}))}