// JSZip CDN loader and Download All PDFs logic
(function(){
  function ensureJSZip(cb) {
    if (window.JSZip) return cb();
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
    script.onload = cb;
    document.head.appendChild(script);
  }
  function downloadAllPDFs() {
    ensureJSZip(function() {
      var zip = new JSZip();
      var files = [
        { name: 'human-continuity-blueprint-full.pdf', url: 'human-continuity-blueprint-full.pdf' },
        { name: 'War Survival Kit — Human Continuity Blueprint.pdf', url: 'War Survival Kit — Human Continuity Blueprint.pdf' },
        { name: 'Field Navigation Guide — Compass, Map, and Natural North.pdf', url: 'Field Navigation Guide — Compass, Map, and Natural North.pdf' }
      ];
      var fetches = files.map(f => fetch(encodeURI(f.url)).then(r => {
        if (!r.ok) return null;
        return r.blob().then(b => zip.file(f.name, b));
      }));
      Promise.all(fetches).then(function() {
        zip.generateAsync({type:'blob'}).then(function(content) {
          var a = document.createElement('a');
          a.href = URL.createObjectURL(content);
          a.download = 'survival-guides.zip';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          setTimeout(function(){
            URL.revokeObjectURL(a.href);
            a.remove();
          }, 1000);
        });
      });
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('download-all-pdfs');
    if (btn) btn.addEventListener('click', downloadAllPDFs);
  });
})();
