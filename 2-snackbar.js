import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as s}from"./assets/vendor-BbbuE1sJ.js";const r=document.querySelector(".form"),o=document.querySelector('input[name="delay"]');r.addEventListener("submit",e=>{if(e.preventDefault(),o.value<0){l("Delay must be > 0"),o.value="";return}const i=document.querySelector("input[type='radio']:checked");c({delay:o.value,state:i.value}).then(t=>u(`Fulfilled promise in ${t}ms`)).catch(t=>a(`Rejected promise in ${t}ms`)),r.reset()});const c=({delay:e,state:i})=>new Promise((t,n)=>{setTimeout(()=>{i==="fulfilled"?t(e):i==="rejected"&&n(e)},e)});function u(e){s.success({title:"OK",message:e,class:"custom-noty success",position:"topRight",iconUrl:"../img/success.svg"})}function a(e){s.error({title:"Error",message:e,class:"custom-noty error",position:"topRight",iconUrl:"../img/error.svg"})}function l(e){s.warning({title:"Caution",message:e,class:"custom-noty warning",position:"topRight",iconUrl:"../img/warning.svg"})}
//# sourceMappingURL=2-snackbar.js.map
