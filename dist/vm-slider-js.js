this.sliderJS=function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=7)}([function(e,n,t){var r=t(5),i=t(6);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var a={insert:"head",singleton:!1};r(i,a);e.exports=i.locals||{}},function(e,n){e.exports='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 343.089 343.089" style="enable-background:new 0 0 343.089 343.089;" xml:space="preserve"><g><g><g><path d="M239.122,124.473h-125.91V72.228c-0.057-4.328-3.611-7.79-7.939-7.733c-2.146,0.028-4.186,0.935-5.645,2.509 L2.452,166.269c-2.885,2.397-3.281,6.679-0.885,9.564c0.267,0.321,0.563,0.618,0.885,0.885l97.176,99.265 c1.501,1.588,3.563,2.526,5.747,2.612h3.135c2.983-1.448,4.828-4.523,4.702-7.837v-47.02h125.91 c5.262-0.892,9.305-5.148,9.927-10.449v-83.592C249.048,125.518,243.824,124.473,239.122,124.473z"></path><path d="M272.558,121.86c-4.328,0-7.837,3.509-7.837,7.837v83.592c0,4.328,3.509,7.837,7.837,7.837s7.837-3.509,7.837-7.837 v-83.592C280.395,125.369,276.887,121.86,272.558,121.86z"></path><path d="M303.905,121.86c-4.328,0-7.837,3.509-7.837,7.837v83.592c0,4.328,3.509,7.837,7.837,7.837s7.837-3.509,7.837-7.837 v-83.592C311.742,125.369,308.233,121.86,303.905,121.86z"></path><path d="M335.252,121.86c-4.328,0-7.837,3.509-7.837,7.837v83.592c0,4.328,3.509,7.837,7.837,7.837s7.837-3.509,7.837-7.837 v-83.592C343.089,125.369,339.58,121.86,335.252,121.86z"></path></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'},function(e,n){e.exports.getNextPosition=function(e,n,t,r,i){let a=e,o=n,s=t;switch(i){case"right":return s===r-1?(o=s,a=s-1,s=0):o===r-1?(a=o,o=0,s=o+1):(o+=1,a=o-1,s=o+1),{prevNumber:a,currentNumber:o,nextNumber:s};case"left":return a===r-1?(o=a,a=o-1,s=0):1===o?(o=0,a=r-1,s=o+1):(o-=1,a=o-1,s=o+1),{prevNumber:a,currentNumber:o,nextNumber:s}}}},function(e,n){e.exports='<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve"><g><g><polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093 "></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'},function(e,n,t){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=function(e,n){var t=e[1]||"",r=e[3];if(!r)return t;if(n&&"function"==typeof btoa){var i=(o=r,s=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),a=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[t].concat(a).concat([i]).join("\n")}var o,s,c;return[t].join("\n")}(n,e);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,r){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(r)for(var a=0;a<this.length;a++){var o=this[a][0];null!=o&&(i[o]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);r&&i[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),n.push(c))}},n}},function(e,n,t){"use strict";var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},a=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),o=[];function s(e){for(var n=-1,t=0;t<o.length;t++)if(o[t].identifier===e){n=t;break}return n}function c(e,n){for(var t={},r=[],i=0;i<e.length;i++){var a=e[i],c=n.base?a[0]+n.base:a[0],l=t[c]||0,d="".concat(c," ").concat(l);t[c]=l+1;var u=s(d),p={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(o[u].references++,o[u].updater(p)):o.push({identifier:d,updater:h(p,n),references:1}),r.push(d)}return r}function l(e){var n=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=t.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){n.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(n);else{var o=a(e.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}return n}var d,u=(d=[],function(e,n){return d[e]=n,d.filter(Boolean).join("\n")});function p(e,n,t,r){var i=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=u(n,i);else{var a=document.createTextNode(i),o=e.childNodes;o[n]&&e.removeChild(o[n]),o.length?e.insertBefore(a,o[n]):e.appendChild(a)}}function g(e,n,t){var r=t.css,i=t.media,a=t.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),a&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var f=null,m=0;function h(e,n){var t,r,i;if(n.singleton){var a=m++;t=f||(f=l(n)),r=p.bind(null,t,a,!1),i=p.bind(null,t,a,!0)}else t=l(n),r=g.bind(null,t,n),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else i()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=i());var t=c(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<t.length;r++){var i=s(t[r]);o[i].references--}for(var a=c(e,n),l=0;l<t.length;l++){var d=s(t[l]);0===o[d].references&&(o[d].updater(),o.splice(d,1))}t=a}}}},function(e,n,t){"use strict";t.r(n);var r=t(4),i=t.n(r)()(!1);i.push([e.i,":root {\r\n    --checkedWidth: 940px;\r\n    --height: 270px;\r\n}\r\n._3xKYZGvy7lvnXqXxxtTzEX {\r\n    position: relative;\r\n    left: 0px;\r\n    width: var(--checkedWidth);\r\n    height: var(--height);\r\n}\r\n\r\n.IjvhiUQvVT55Iisdr1PAL {\r\n    overflow: hidden;\r\n    position: relative;\r\n    width: var(--checkedWidth);\r\n    height: var(--height);\r\n}\r\n\r\n._1U77gOiKryBvstDT7cCkPQ {\r\n    outline: none;\r\n    width: calc(var(--checkedWidth) - 100px);\r\n    bottom: 0;\r\n    padding: 10px;\r\n    margin-top: 10px;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n    -ms-flex-align: center;\r\n    align-items: center;\r\n    -webkit-box-pack: justify;\r\n    -ms-flex-pack: justify;\r\n    justify-content: space-between;\r\n}\r\n\r\n.sVkkTIWg73TQIOB0s1k_0 {\r\n    border: none;\r\n    outline: none;\r\n    padding: 0;\r\n    background-color: transparent;\r\n    -webkit-transition: -webkit-transform 0.7s ease-in-out;\r\n    transition: -webkit-transform 0.7s ease-in-out;\r\n    -o-transition: transform 0.7s ease-in-out;\r\n    transition: transform 0.7s ease-in-out;\r\n    transition: transform 0.7s ease-in-out, -webkit-transform 0.7s ease-in-out;\r\n    -webkit-transform-origin: 50% 50%;\r\n    -ms-transform-origin: 50% 50%;\r\n    transform-origin: 50% 50%;\r\n}\r\n\r\n.sVkkTIWg73TQIOB0s1k_0 svg {\r\n    height: 60px;\r\n}\r\n\r\n.XY7MDigS6V5-4EYQyvfFq {\r\n    border: none;\r\n    outline: none;\r\n    padding: 0;\r\n    background-color: transparent;\r\n    -webkit-transition: opacity 0.7s ease-in-out;\r\n    -o-transition: opacity 0.7s ease-in-out;\r\n    transition: opacity 0.7s ease-in-out;\r\n}\r\n\r\n.XY7MDigS6V5-4EYQyvfFq svg {\r\n    fill: #000;\r\n    -webkit-transition: opacity 0.7s ease-in-out;\r\n    -o-transition: opacity 0.7s ease-in-out;\r\n    transition: opacity 0.7s ease-in-out;\r\n    height: 60px;\r\n}\r\n\r\n._3KdKKqYGXy0_4BzL3cQk5_ {\r\n    border: none;\r\n    outline: none;\r\n    padding: 0;\r\n    background-color: transparent;\r\n    -webkit-transform: rotate(180deg);\r\n    -ms-transform: rotate(180deg);\r\n    transform: rotate(180deg);\r\n    -webkit-transition: opacity 0.7s ease-in-out;\r\n    -o-transition: opacity 0.7s ease-in-out;\r\n    transition: opacity 0.7s ease-in-out;\r\n}\r\n\r\n._3KdKKqYGXy0_4BzL3cQk5_ svg {\r\n    fill: #000;\r\n    width: 100px;\r\n    height: 60px;\r\n    -webkit-transition: opacity 0.7s ease-in-out;\r\n    -o-transition: opacity 0.7s ease-in-out;\r\n    transition: opacity 0.7s ease-in-out;\r\n}\r\n\r\n._3u6yzGRFELd8wiGKnSr4qD {\r\n    display: none;\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 0px;\r\n    width: var(--checkedWidth);\r\n    height: var(--height);\r\n    z-index: 0;\r\n    -webkit-backface-visibility: hidden;\r\n    backface-visibility: hidden;\r\n}\r\n\r\n\r\n._39-y7Ek2VO_xDjwYQpJrkM, ._3u6yzGRFELd8wiGKnSr4qD img {\r\n    width: var(--checkedWidth);\r\n    height: var(--height);\r\n}\r\n\r\nimg {\r\n    width: 100%;\r\n}\r\n\r\n._3SfbN-2TUO4pBeqA48-OMt {\r\n    overflow: hidden;\r\n    display: block;\r\n}\r\n\r\n._3SfbN-2TUO4pBeqA48-OMt ._3F13T4jJzzjWUt1LDSSOCh svg {\r\n    fill: #000;\r\n    height: 60px;\r\n    -webkit-transition: opacity 0.7s ease-in-out;\r\n    -o-transition: opacity 0.7s ease-in-out;\r\n    transition: opacity 0.7s ease-in-out;\r\n    display: block;\r\n    margin: 0 auto;\r\n}\r\n\r\n._3SfbN-2TUO4pBeqA48-OMt ._3F13T4jJzzjWUt1LDSSOCh {\r\n    border: none;\r\n    outline: none;\r\n    padding: 0;\r\n    background-color: transparent;\r\n    -webkit-transition: opacity 0.7s ease-in-out;\r\n    -o-transition: opacity 0.7s ease-in-out;\r\n    transition: opacity 0.7s ease-in-out;\r\n}\r\n\r\nbutton {\r\n    cursor: pointer;\r\n}\r\n\r\nbutton:disabled {\r\n    cursor: default;\r\n}\r\n\r\n._3p9ZupDBFx9zbD2Mt2T0Ii,\r\n._3p9ZupDBFx9zbD2Mt2T0Ii svg {\r\n    opacity: 0;\r\n}\r\n\r\n._3_aj5ez1awyuCScQrl2Hty {\r\n    -webkit-transition: -webkit-transform 0.7s ease-in-out;\r\n    transition: -webkit-transform 0.7s ease-in-out;\r\n    -o-transition: transform 0.7s ease-in-out;\r\n    transition: transform 0.7s ease-in-out;\r\n    transition: transform 0.7s ease-in-out, -webkit-transform 0.7s ease-in-out;\r\n    -webkit-transform: translateX(calc(-1 * var(--checkedWidth)));\r\n    -ms-transform: translateX(calc(-1 * var(--checkedWidth)));\r\n    transform: translateX(calc(-1 * var(--checkedWidth)));\r\n}\r\n\r\n._26NLBmQW2N2WtBbIZNz191 {\r\n    -webkit-transition: -webkit-transform 0.7s ease-in-out;\r\n    transition: -webkit-transform 0.7s ease-in-out;\r\n    -o-transition: transform 0.7s ease-in-out;\r\n    transition: transform 0.7s ease-in-out;\r\n    transition: transform 0.7s ease-in-out, -webkit-transform 0.7s ease-in-out;\r\n    -webkit-transform: translateX(var(--checkedWidth));\r\n    -ms-transform: translateX(var(--checkedWidth));\r\n    transform: translateX(var(--checkedWidth));\r\n}\r\n\r\n.xKr16BMLCmwRuZnJLjbJH {\r\n    -webkit-transform: rotateX(180deg);\r\n    transform: rotateX(180deg);\r\n}\r\n\r\n.lWo5Pn687qBMMnD9Kisr9 {\r\n    display: block;\r\n    z-index: 0;\r\n    left: calc(-1 * var(--checkedWidth));\r\n}\r\n\r\n._2T0xHIAlMJ3ohixo3iuGnv {\r\n    display: block;\r\n    z-index: 10;\r\n    left: 0;\r\n}\r\n\r\n._1KczTzYLFRAmONWpAENvka {\r\n    display: block;\r\n    z-index: 0;\r\n    left: var(--checkedWidth);\r\n}\r\n\r\n",""]),i.locals={controlContainer:"_3xKYZGvy7lvnXqXxxtTzEX",slidesContainer:"IjvhiUQvVT55Iisdr1PAL",buttonContainer:"_1U77gOiKryBvstDT7cCkPQ",btnHideActionBar:"sVkkTIWg73TQIOB0s1k_0",btnPrev:"XY7MDigS6V5-4EYQyvfFq",btnNext:"_3KdKKqYGXy0_4BzL3cQk5_",imageDefault:"_3u6yzGRFELd8wiGKnSr4qD",singleImage:"_39-y7Ek2VO_xDjwYQpJrkM",slider:"_3SfbN-2TUO4pBeqA48-OMt",playPauseBtn:"_3F13T4jJzzjWUt1LDSSOCh",opacityInvisible:"_3p9ZupDBFx9zbD2Mt2T0Ii",nextClick:"_3_aj5ez1awyuCScQrl2Hty",prevClick:"_26NLBmQW2N2WtBbIZNz191",hideClick:"xKr16BMLCmwRuZnJLjbJH",prevNumber:"lWo5Pn687qBMMnD9Kisr9",currentNumber:"_2T0xHIAlMJ3ohixo3iuGnv",nextNumber:"_1KczTzYLFRAmONWpAENvka"},n.default=i},function(e,n,t){"use strict";t.r(n);var r=t(1),i=t.n(r),a=t(3),o=t.n(a),s=t(0),c=t.n(s),l=t(2);n.default=(e,{width:n=940,height:t=270,timeout:r=3e3,hideControls:a=!1}={})=>{const s=window.innerWidth>0&&window.innerWidth>=n?n:window.innerWidth,d=document.documentElement;d.style.setProperty("--checkedWidth",s+"px"),d.style.setProperty("--height",t+"px");const u=document.getElementById(e);if(!u)return void console.log("Не был найден слайдер с id "+e);u.className="slider";let p=u.children.length;if(0===p)return void console.log("Слайдер не содержит элементов внутри");const g=document.createElement("div"),f=document.createElement("div");if(f.className=c.a.controlContainer,g.className=c.a.slidesContainer,1===p){const e=[...u.children][0].cloneNode(!0),n=[...u.children][0].cloneNode(!0),t=[...u.children,e,n];f.append(...t),p+=2}else if(2===p){const e=[...u.children][0].cloneNode(!0),n=[...u.children][1].cloneNode(!0),t=[...u.children,e,n];f.append(...t),p+=2}else f.append(...u.children);g.append(f),u.append(g),u.className=c.a.slider;[...f.children].forEach(e=>{e.className=c.a.imageDefault});let m,h=!0,b=1,v=p-1,y=0,w=!1;f.children[v].className=`${c.a.imageDefault} ${c.a.prevNumber}`,f.children[y].className=`${c.a.imageDefault} ${c.a.currentNumber}`,f.children[b].className=`${c.a.imageDefault} ${c.a.nextNumber}`;const k=()=>{f.children[v].className=c.a.imageDefault,f.classList.add(c.a.nextClick);const e=Object(l.getNextPosition)(v,y,b,p,"right");v=e.prevNumber,y=e.currentNumber,b=e.nextNumber},x=()=>{f.children[b].className=c.a.imageDefault,f.classList.add(c.a.prevClick);const e=Object(l.getNextPosition)(v,y,b,p,"left");v=e.prevNumber,y=e.currentNumber,b=e.nextNumber};f.addEventListener("transitionstart",()=>{w=!0}),f.addEventListener("transitionend",()=>{f.children[b].className=`${c.a.imageDefault} ${c.a.nextNumber}`,f.children[y].className=`${c.a.imageDefault} ${c.a.currentNumber}`,f.children[v].className=`${c.a.imageDefault} ${c.a.prevNumber}`,f.className=c.a.controlContainer,w=!1});let N=setInterval(()=>{k()},r);const _=()=>{N&&clearInterval(N),N=setInterval(()=>{k()},r)};g.addEventListener("touchstart",e=>{e.preventDefault(),clearInterval(N),m=e.changedTouches[0].clientX},!1),g.addEventListener("touchend",e=>{e.preventDefault(),e.changedTouches[0].clientX-m>0?(x(),h&&_()):(k(),h&&_())},!1),g.addEventListener("mousedown",e=>{e.preventDefault(),w||(clearInterval(N),m=e.clientX)},!1),g.addEventListener("mouseup",e=>{e.preventDefault(),w||(e.clientX-m>0?(x(),h&&_()):e.clientX-m<0&&(k(),h&&_()))},!1),window.addEventListener("focus",()=>{_()}),window.addEventListener("blur",()=>{clearInterval(N)}),!a&&window.innerWidth>=724&&function(){let e=!0;const n=document.createElement("div");n.className=c.a.buttonContainer,u.append(n);const t=document.createElement("button"),r=document.createElement("div");t.append(r),r.outerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" id="playpause" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="7,3 19,3 19,47 7,47" id="leftbar" /><polygon points="31,3 43,3 43,26 43,47 31,47" id="rightbar" /><animate to="7,3 19,3 19,47 7,47" class="lefttopause" id="lefttopause" xlink:href="#leftbar" attributeName="points" dur=".3s" begin="indefinite" fill="freeze" /><animate to="12,0 25,11.5 25,39 12,50" class="lefttoplay" id="lefttoplay" xlink:href="#leftbar" attributeName="points" dur=".3s" begin="indefinite" fill="freeze" /><animate to="31,3 43,3 43,26 43,47 31,47" class="righttopause" id="righttopause" xlink:href="#rightbar" attributeName="points" dur=".3s" begin="indefinite" fill="freeze" /><animate to="25,11.5 39.7,24.5 41.5,26 39.7,27.4 25,39" class="righttoplay" id="righttoplay" xlink:href="#rightbar" attributeName="points" dur=".3s" begin="indefinite" fill="freeze" /></svg>',t.className=c.a.playPauseBtn;const a=t.getElementsByClassName("lefttoplay")[0],s=t.getElementsByClassName("righttoplay")[0],l=t.getElementsByClassName("lefttopause")[0],d=t.getElementsByClassName("righttopause")[0],p=document.createElement("button"),g=document.createElement("button"),f=document.createElement("button");p.className=c.a.btnPrev,g.className=c.a.btnNext,f.className=c.a.btnHideActionBar,p.innerHTML=i.a,g.innerHTML=i.a,f.innerHTML=o.a,n.append(p,t,g,f),f.addEventListener("click",()=>{e?(f.classList.toggle(c.a.hideClick),g.classList.toggle(c.a.opacityInvisible),p.classList.toggle(c.a.opacityInvisible),t.classList.toggle(c.a.opacityInvisible),t.disabled=!0,g.disabled=!0,p.disabled=!0,e=!1):(f.classList.toggle(c.a.hideClick),g.classList.toggle(c.a.opacityInvisible),p.classList.toggle(c.a.opacityInvisible),t.classList.toggle(c.a.opacityInvisible),t.disabled=!1,g.disabled=!1,p.disabled=!1,e=!0)}),t.addEventListener("click",e=>{e.preventDefault(),h?(a.beginElement(),s.beginElement(),h=!1,clearInterval(N)):(l.beginElement(),d.beginElement(),h=!0,_())},!1),g.addEventListener("click",()=>{w||(k(),h&&_())}),p.addEventListener("click",()=>{w||(x(),h&&_())})}()}}]).default;