/*!
 * ROVER · case study embed loader
 * --------------------------------
 * Hosted at:  https://roverlabmx.github.io/rover-navy/embed.js
 *
 * Usage in Wix (or anywhere that allows custom HTML + scripts):
 *
 *   <div data-rover-case="navy"></div>
 *   <script src="https://roverlabmx.github.io/rover-navy/embed.js"></script>
 *
 * Available slugs are listed in the CASES registry below.
 * To add a new case: drop the case HTML into this repo, add an entry below,
 * commit and push. All Wix instances pick up the new slug automatically.
 */

(function () {
  'use strict';

  var BASE = 'https://roverlabmx.github.io/rover-navy/';

  /* ── Case registry ────────────────────────────────────────────────
     Each entry: { file, title } — file is relative to BASE.
     Slugs become the value of the data-rover-case attribute.
  */
  var CASES = {
    navy: {
      file:  'rover_case_study_navy.html',
      title: 'Navy Training Center · ROVER case study'
    },
    biocotech: {
      file:  'rover_case_study_biocotech.html',
      title: 'Biocotech Americas · ROVER case study'
    }
    /* Future:
    mpos:    { file: 'rover_case_study_mpos.html',    title: 'mPos Global · ROVER case study' },
    unruled: { file: 'rover_case_study_unruled.html', title: 'Unruled Foods · ROVER case study' },
    muan:    { file: 'rover_case_study_muan.html',    title: 'Muan · ROVER case study' }
    */
  };

  function mount() {
    var hosts = document.querySelectorAll('[data-rover-case]');
    if (!hosts.length) return;

    Array.prototype.forEach.call(hosts, function (host) {
      if (host.getAttribute('data-rover-mounted') === '1') return;
      host.setAttribute('data-rover-mounted', '1');

      var slug = host.getAttribute('data-rover-case');
      var cfg  = CASES[slug];
      if (!cfg) {
        host.innerHTML = '<div style="padding:24px; font-family:system-ui,sans-serif; ' +
                         'font-size:13px; color:#888; border:1px dashed #ccc;">' +
                         'ROVER embed: unknown case "' + slug + '". ' +
                         'Available: ' + Object.keys(CASES).join(', ') + '.</div>';
        return;
      }

      var iframe = document.createElement('iframe');
      iframe.src       = BASE + cfg.file;
      iframe.title     = cfg.title;
      iframe.loading   = 'lazy';
      iframe.scrolling = 'no';
      iframe.height    = 2400; /* initial — replaced by auto-resize */
      iframe.style.cssText = 'width:100%; border:0; display:block; background:#000;';
      host.appendChild(iframe);

      window.addEventListener('message', function (e) {
        if (!e || !e.data || e.data.type !== 'rover:case-height') return;
        if (e.source !== iframe.contentWindow) return;
        var h = parseInt(e.data.height, 10);
        if (h) iframe.style.height = (h + 8) + 'px';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
