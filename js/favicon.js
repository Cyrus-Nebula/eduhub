/**
 * Nebula EduHub - 深色/浅色模式 favicon 自动切换
 * 监听系统 prefers-color-scheme，动态切换标签页图标
 */
(function () {
    'use strict';

    var FAVICON_VERSION = '?v=3';

    function setFavicon(isDark) {
        var theme = isDark ? 'dark' : 'light';

        document.querySelectorAll('link[data-favicon]').forEach(function (link) {
            link.href = 'favicon-' + theme + '-32.png' + FAVICON_VERSION;
        });

        var appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
        if (appleTouchIcon) {
            appleTouchIcon.href = 'apple-touch-icon-' + theme + '.png' + FAVICON_VERSION;
        }
    }

    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setFavicon(mediaQuery.matches);
    mediaQuery.addEventListener('change', function (e) {
        setFavicon(e.matches);
    });
})();
