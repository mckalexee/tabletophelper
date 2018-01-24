(function (d, script) {
  script = d.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.onload = function () {
    // remote script has loaded
  };
  script.src = 'https://www.google-analytics.com/ga.js';
  d.getElementsByTagName('head')[0].appendChild(script);
}(document));

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-76102300-2');