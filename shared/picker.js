/* Shared client-review bar. Shows only on a full-page view, never inside the hub's live previews. */
(function () {
  if (window.self !== window.top) return;

  var designs = [
    { id: 'blueprint', name: 'Blueprint', href: '../t1-blueprint/index.html' },
    { id: 'monolith', name: 'Monolith', href: '../t2-monolith/index.html' },
    { id: 'daylight', name: 'Daylight', href: '../t3-daylight/index.html' },
    { id: 'twist', name: 'Twist', href: '../t4-twist/index.html' }
  ];
  var KEY = 'architector.choice';
  var current = document.body.getAttribute('data-design');
  var idx = designs.findIndex(function (d) { return d.id === current; });
  if (idx < 0) return;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var css = document.createElement('style');
  css.textContent =
    '.arc-bar{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:2147483000;display:flex;align-items:center;gap:4px;padding:6px;border-radius:999px;background:#15181b;color:#fff;font:500 13px/1 system-ui,-apple-system,Segoe UI,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35);max-width:calc(100vw - 24px)}' +
    '.arc-bar a,.arc-bar button{all:unset;box-sizing:border-box;cursor:pointer;padding:10px 14px;border-radius:999px;white-space:nowrap}' +
    '.arc-bar a:hover,.arc-bar button:hover{background:rgba(255,255,255,.14)}' +
    '.arc-bar a:focus-visible,.arc-bar button:focus-visible{outline:2px solid #fff;outline-offset:1px}' +
    '.arc-bar .arc-name{padding:10px 8px;opacity:.8;min-width:96px;text-align:center}' +
    '.arc-bar .arc-pick{background:#fff;color:#15181b;font-weight:600}' +
    '.arc-bar .arc-pick:hover{background:#e6e6e6}' +
    '.arc-bar .arc-pick[aria-pressed="true"]{background:#3ddc84}' +
    '@media(max-width:560px){.arc-bar .arc-all span{display:none}.arc-bar .arc-name{min-width:0}}';
  document.head.appendChild(css);

  var prev = designs[(idx + designs.length - 1) % designs.length];
  var next = designs[(idx + 1) % designs.length];

  var bar = document.createElement('div');
  bar.className = 'arc-bar';
  bar.setAttribute('role', 'navigation');
  bar.setAttribute('aria-label', 'Design review');
  bar.innerHTML =
    '<a class="arc-all" href="../index.html">&larr; <span>All designs</span></a>' +
    '<a href="' + prev.href + '" aria-label="Previous design: ' + prev.name + '">&lsaquo;</a>' +
    '<span class="arc-name">' + (idx + 1) + ' / ' + designs.length + ' &middot; ' + designs[idx].name + '</span>' +
    '<a href="' + next.href + '" aria-label="Next design: ' + next.name + '">&rsaquo;</a>' +
    '<button class="arc-pick" type="button" aria-pressed="false">Choose this design</button>';
  document.body.appendChild(bar);

  var btn = bar.querySelector('.arc-pick');
  function paint() {
    var on = read() === current;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.textContent = on ? 'Chosen ✓' : 'Choose this design';
  }
  btn.addEventListener('click', function () { write(current); paint(); });
  paint();
})();
