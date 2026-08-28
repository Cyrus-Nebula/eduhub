// Nebula EduHub 前端交互
function toggleMenu() {
    var links = document.getElementById('navLinks');
    if (links) links.classList.toggle('mobile-open');
}

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
