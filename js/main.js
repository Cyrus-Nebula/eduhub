// Nebula EduHub 前端交互
function toggleMenu() {
    var links = document.getElementById('navLinks');
    if (links) links.classList.toggle('mobile-open');
}

function copyText(text, btn) {
    var orig = btn.textContent;
    var origStyle = btn.style.cssText;
    function done() {
        btn.textContent = '已复制 ✓';
        btn.style.cssText = 'background:#dcfce7;color:#16a34a;border-color:#86efac;';
        setTimeout(function () {
            btn.textContent = orig;
            btn.style.cssText = origStyle;
        }, 2000);
    }
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
    } else {
        fallbackCopy(text, done);
    }
}

function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    if (cb) cb();
}

function copyWechat(btn) { copyText('17795600558', btn); }
function copyQQ(btn) { copyText('3616927242', btn); }
function copyXhs(btn) { copyText('Nebula_official', btn); }

document.addEventListener('DOMContentLoaded', function () {
    // 点导航后收起移动端菜单
    document.querySelectorAll('.nav-links a').forEach(function (a) {
        a.addEventListener('click', function () {
            var links = document.getElementById('navLinks');
            if (links) links.classList.remove('mobile-open');
        });
    });
    // 锚点平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
