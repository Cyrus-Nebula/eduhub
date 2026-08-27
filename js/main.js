// Nebula EduHub 前端交互
function toggleMenu() {
    var links = document.getElementById('navLinks');
    if (links) links.classList.toggle('mobile-open');
}

function filterResources(btn, cat) {
    document.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.material-card').forEach(function (card) {
        var cats = card.getAttribute('data-cat') || '';
        card.style.display = (cat === 'all' || cats.indexOf(cat) > -1) ? 'flex' : 'none';
    });
}

function doSearch() {
    var kw = document.getElementById('searchInput');
    if (!kw) return;
    var keyword = kw.value.trim().toLowerCase();
    document.querySelectorAll('.resource-row').forEach(function (row) {
        var name = (row.getAttribute('data-name') || '').toLowerCase();
        var grade = (row.getAttribute('data-grade') || '').toLowerCase();
        var subject = (row.getAttribute('data-subject') || '').toLowerCase();
        var type = (row.getAttribute('data-type') || '').toLowerCase();
        var note = (row.querySelector('.note') ? row.querySelector('.note').textContent : '').toLowerCase();
        var hit = !keyword || name.indexOf(keyword) > -1 || grade.indexOf(keyword) > -1
            || subject.indexOf(keyword) > -1 || type.indexOf(keyword) > -1 || note.indexOf(keyword) > -1;
        row.style.display = hit ? 'flex' : 'none';
    });
}

function applyFilter() {
    var grade = (document.getElementById('filterGrade') || {}).value || '';
    var subject = (document.getElementById('filterSubject') || {}).value || '';
    var type = (document.getElementById('filterType') || {}).value || '';
    var keyword = ((document.getElementById('searchInput') || {}).value || '').trim().toLowerCase();

    document.querySelectorAll('.resource-row').forEach(function (row) {
        var rg = row.getAttribute('data-grade') || '';
        var rs = row.getAttribute('data-subject') || '';
        var rt = row.getAttribute('data-type') || '';
        var rn = (row.getAttribute('data-name') || '').toLowerCase();
        var rnote = (row.querySelector('.note') ? row.querySelector('.note').textContent : '').toLowerCase();

        var ok = (!grade || rg === grade || rg.indexOf(grade) > -1 || grade.indexOf(rg) > -1)
            && (!subject || rs === subject)
            && (!type || rt === type)
            && (!keyword || rn.indexOf(keyword) > -1 || rnote.indexOf(keyword) > -1
                || rs.toLowerCase().indexOf(keyword) > -1 || rg.toLowerCase().indexOf(keyword) > -1);

        row.style.display = ok ? 'flex' : 'none';
    });
}

function resetFilter() {
    ['filterGrade', 'filterSubject', 'filterType', 'searchInput'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.querySelectorAll('.resource-row').forEach(function (row) { row.style.display = 'flex'; });
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
    // URL带kw参数时自动搜索
    var kw = new URLSearchParams(window.location.search).get('kw');
    if (kw && document.getElementById('searchInput')) {
        document.getElementById('searchInput').value = kw;
        doSearch();
    }
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
