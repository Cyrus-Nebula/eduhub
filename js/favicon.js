// favicon 深浅色自动切换
(function () {
    var ver = '?v=3';
    function setFav(dark) {
        var s = dark ? 'dark' : 'light';
        document.querySelectorAll('link[data-favicon]').forEach(function (l) {
            l.href = 'favicon-' + s + '-32.png' + ver;
        });
        var ati = document.querySelector('link[rel="apple-touch-icon"]');
        if (ati) ati.href = 'apple-touch-icon-' + s + '.png' + ver;
    }
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    setFav(mq.matches);
    mq.addEventListener('change', function (e) { setFav(e.matches); });
})();
