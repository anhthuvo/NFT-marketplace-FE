!(function (_) {
  (_.GORGIAS_CHAT_APP_ID = 'xxxx'),
    (_.GORGIAS_CHAT_BASE_URL = ''),
    (_.GORGIAS_API_BASE_URL = 'config.gorgias.chat');
  var e = new XMLHttpRequest();
  e.open('GET', '', !0),
    (e.onload = function (t) {
      if (4 === e.readyState)
        if (200 === e.status) {
          var n = JSON.parse(e.responseText);
          if (!n.application || !n.bundleVersion)
            throw new Error(
              'Missing fields in the response body - '
            );
          if (
            ((_.GORGIAS_CHAT_APP = n.application),
            (_.GORGIAS_CHAT_BUNDLE_VERSION = n.bundleVersion),
            n && n.texts && (_.GORGIAS_CHAT_TEXTS = n.texts),
            n && n.sspTexts && (_.GORGIAS_CHAT_SELF_SERVICE_PORTAL_TEXTS = n.sspTexts),
            !document.getElementById('gorgias-chat-container'))
          ) {
            var o = document.createElement('div');
            (o.id = 'gorgias-chat-container'), document.body.appendChild(o);
            var r = document.createElement('script');
            r.setAttribute('defer', !0),
              (r.src = 'https://client-builds.production.gorgias.chat/{bundleVersion}/static/js/main.js'.replace(
                '{bundleVersion}',
                n.bundleVersion
              )),
              document.body.appendChild(r);
          }
        } else console.error('Failed request GET - ');
    }),
    (e.onerror = function (_) {
      console.error(_);
    }),
    e.send();
})(window || {});
