export default function sliders(){document.querySelectorAll(".stocks__slider").forEach(e=>{new Splide(e,{perPage:1,gap:10,mediaQuery:"min",padding:{right:"1.875rem"},arrows:!1,pagination:!1,breakpoints:{992:{destroy:!0},768:{perPage:2},360:{gap:20,padding:{right:"2.8125rem"}}}}).mount()})}