
(function(){
 function setTheme(){if(localStorage.getItem('theme')==='dark')document.body.classList.add('dark');} setTheme();
 window.toggleTheme=function(){document.body.classList.toggle('dark');localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');};
 document.addEventListener('DOMContentLoaded',()=>{const bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);const update=()=>{const d=document.documentElement;const max=d.scrollHeight-d.clientHeight;bar.style.width=(max>0?d.scrollTop/max*100:0)+'%';};update();addEventListener('scroll',update,{passive:true});});
})();
