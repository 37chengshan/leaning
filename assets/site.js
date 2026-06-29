
(function(){
  function applyTheme(){
    const saved = localStorage.getItem('theme');
    if(saved === 'dark') document.body.classList.add('dark');
  }
  applyTheme();
  window.toggleTheme = function(){
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  };
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.formula').forEach((el) => {
      if (el.querySelector('.formula-copy')) return;
      const btn = document.createElement('button');
      btn.className = 'formula-copy';
      btn.type = 'button';
      btn.textContent = '复制公式';
      btn.addEventListener('click', async () => {
        const clone = el.cloneNode(true);
        const oldBtn = clone.querySelector('.formula-copy');
        if (oldBtn) oldBtn.remove();
        const txt = clone.innerText.trim();
        try {
          await navigator.clipboard.writeText(txt);
          btn.textContent = '已复制';
          setTimeout(() => btn.textContent = '复制公式', 1200);
        } catch {
          btn.textContent = '复制失败';
          setTimeout(() => btn.textContent = '复制公式', 1200);
        }
      });
      el.prepend(btn);
    });

    document.querySelectorAll('[data-progress-key]').forEach(cb => {
      const key = cb.getAttribute('data-progress-key');
      cb.checked = localStorage.getItem(key) === '1';
      cb.addEventListener('change', () => {
        localStorage.setItem(key, cb.checked ? '1' : '0');
        updateProgress();
      });
    });
    updateProgress();
  });

  function updateProgress(){
    const boxes = document.querySelectorAll('[data-progress-scope]');
    boxes.forEach(box => {
      const items = box.querySelectorAll('[data-progress-key]');
      const done = Array.from(items).filter(x => x.checked).length;
      const total = items.length || 1;
      const pct = Math.round(done / total * 100);
      const text = box.querySelector('[data-progress-text]');
      const bar = box.querySelector('[data-progress-bar]');
      if(text) text.textContent = done + '/' + total + ' 已完成（' + pct + '%）';
      if(bar) bar.style.width = pct + '%';
    });
  }
})();


(function(){
  function ensureProgressBar(){
    if(!document.querySelector('.reading-progress')){
      const bar = document.createElement('div');
      bar.className = 'reading-progress';
      document.body.appendChild(bar);
    }
  }
  function updateReadingProgress(){
    const bar = document.querySelector('.reading-progress');
    if(!bar) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max * 100) : 0;
    bar.style.width = pct + '%';
  }
  document.addEventListener('DOMContentLoaded', () => {
    ensureProgressBar();
    updateReadingProgress();
    window.addEventListener('scroll', updateReadingProgress, {passive:true});
  });
})();
