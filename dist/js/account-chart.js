export default function accountChart(){const t=t=>{const{chart:o,tooltip:a}=t,e=(t=>{let o=document.querySelector(`[data-tooltip-for="${t.canvas.dataset.id}"]`);return o||(o=document.createElement("div"),o.classList.add("chart-tooltip"),o.setAttribute("data-tooltip-for",t.canvas.dataset.id),o.style.opacity=1,document.body.appendChild(o)),o})(o);if(0!==a.opacity){if(a.body){const t=a.body.map(t=>t.lines);e.innerHTML="",t.forEach((t,o)=>{e.insertAdjacentHTML("beforeend",`\n\t\t\t\t<div class="chart-tooltip__footer">\n\t\t\t\t\t${a.dataPoints[0].formattedValue.toLocaleString("ru")}${a.dataPoints[0].dataset.after}\n\t\t\t\t</div>`)})}e.style.opacity=1,e.style.left=o.canvas.getBoundingClientRect().left+a.caretX+"px",e.style.top=function(t){let o=t.getBoundingClientRect();return{top:o.top+window.scrollY,right:o.right+window.scrollX,bottom:o.bottom+window.scrollY,left:o.left+window.scrollX}}(o.canvas).top+a.caretY+"px",e.style.font=a.options.bodyFont.string,e.style.padding=a.options.padding+"px "+a.options.padding+"px"}else e.style.opacity=0};function o(t){let o=[{label:t.data.name,data:t.data.values,fill:!0,borderColor:"rgba(0, 0, 0, 0)",pointBackgroundColor:t.data.gradient[1],pointRadius:0,pointHoverRadius:7,pointBorderWidth:7,pointBorderColor:"#FFF",hoverBorderWidth:7,after:t.data.after?t.data.after:"",backgroundColor:function(o){const a=o.chart,{ctx:e,chartArea:n}=a;if(n)return function(t,o,a,e){const n=o.right-o.left,r=o.bottom-o.top;let i,l,d;return d&&i===n&&l===r||(i=n,l=r,d=t.createLinearGradient(0,o.bottom,0,o.top),d.addColorStop(0,a),d.addColorStop(1,e)),d}(e,n,t.data.gradient[0],t.data.gradient[1])},tension:.5}];return{labels:t.labels,datasets:o}}let a=[];document.querySelectorAll(".chart canvas").forEach((e,n)=>{const r=e.getContext("2d");if(dataObj){const e={type:"line",data:o(dataObj),options:{responsive:!0,parsing:{yAxisKey:"value",xAxisKey:"value"},interaction:{intersect:!1},animation:!1,plugins:{tooltip:{enabled:!1,position:"nearest",external:t},legend:{display:!1}},scales:{x:{grid:{color:"light"==localStorage.getItem("zatara-capital-theme")?"#EBEBEB":"#102140"},ticks:{color:"#66789A"}},y:{grid:{color:"light"==localStorage.getItem("zatara-capital-theme")?"#EBEBEB":"#102140"},ticks:{color:"#66789A",callback:function(t,o,a){return`${dataObj.data.after}${t}`}}}}}};a.push(new Chart(r,e))}}),document.documentElement.addEventListener("theme-change",()=>{a.map(t=>{t.options.scales.y.grid.color="#EBEBEB",t.options.scales.x.grid.color="#EBEBEB",t.update()})})}