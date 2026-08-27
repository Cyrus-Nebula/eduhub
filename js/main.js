/* ===== Nebula EduHub 交互脚本 ===== */

// 移动端菜单切换
function toggleMenu() {
    const links = document.getElementById('navLinks');
    if (links) {
        links.classList.toggle('mobile-open');
    }
}

// 首页资料分类筛选
function filterResources(btn, cat) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.resource-card').forEach(card => {
        const cats = card.getAttribute('data-cat') || '';
        if (cat === 'all' || cats.includes(cat)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 搜索页 - 关键词搜索
function doSearch() {
    const kw = document.getElementById('searchInput');
    if (!kw) return;
    const keyword = kw.value.trim().toLowerCase();
    const rows = document.querySelectorAll('.resource-row');
    let count = 0;
    rows.forEach(row => {
        const name = (row.getAttribute('data-name') || '').toLowerCase();
        const grade = (row.getAttribute('data-grade') || '').toLowerCase();
        const subject = (row.getAttribute('data-subject') || '').toLowerCase();
        const type = (row.getAttribute('data-type') || '').toLowerCase();
        const note = (row.querySelector('.note')?.textContent || '').toLowerCase();
        if (!keyword || name.includes(keyword) || grade.includes(keyword) || subject.includes(keyword) || type.includes(keyword) || note.includes(keyword)) {
            row.style.display = 'flex';
            count++;
        } else {
            row.style.display = 'none';
        }
    });
}

// 搜索页 - 下拉筛选
function applyFilter() {
    const grade = document.getElementById('filterGrade')?.value || '';
    const subject = document.getElementById('filterSubject')?.value || '';
    const type = document.getElementById('filterType')?.value || '';
    const keyword = document.getElementById('searchInput')?.value.trim().toLowerCase() || '';

    document.querySelectorAll('.resource-row').forEach(row => {
        const rowGrade = row.getAttribute('data-grade') || '';
        const rowSubject = row.getAttribute('data-subject') || '';
        const rowType = row.getAttribute('data-type') || '';
        const rowName = (row.getAttribute('data-name') || '').toLowerCase();
        const rowNote = (row.querySelector('.note')?.textContent || '').toLowerCase();

        const matchGrade = !grade || rowGrade === grade || rowGrade.includes(grade) || grade.includes(rowGrade);
        const matchSubject = !subject || rowSubject === subject;
        const matchType = !type || rowType === type;
        const matchKeyword = !keyword || rowName.includes(keyword) || rowNote.includes(keyword) || rowSubject.toLowerCase().includes(keyword) || rowGrade.toLowerCase().includes(keyword);

        if (matchGrade && matchSubject && matchType && matchKeyword) {
            row.style.display = 'flex';
        } else {
            row.style.display = 'none';
        }
    });
}

// 重置筛选
function resetFilter() {
    const grade = document.getElementById('filterGrade');
    const subject = document.getElementById('filterSubject');
    const type = document.getElementById('filterType');
    const search = document.getElementById('searchInput');
    if (grade) grade.value = '';
    if (subject) subject.value = '';
    if (type) type.value = '';
    if (search) search.value = '';
    document.querySelectorAll('.resource-row').forEach(row => row.style.display = 'flex');
}

// 通用复制函数
function copyText(text, btn) {
    const oldText = btn.textContent;
    const oldBg = btn.style.background;
    const oldColor = btn.style.color;
    const oldBorder = btn.style.borderColor;

    const done = () => {
        btn.textContent = '已复制 ✓';
        btn.style.background = '#dcfce7';
        btn.style.color = '#16a34a';
        btn.style.borderColor = '#86efac';
        setTimeout(() => {
            btn.textContent = oldText;
            btn.style.background = oldBg;
            btn.style.color = oldColor;
            btn.style.borderColor = oldBorder;
        }, 2000);
    };

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
        fallbackCopy(text, done);
    }
}

function fallbackCopy(text, callback) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    if (callback) callback();
}

// 复制微信号
function copyWechat() {
    const btn = event.target;
    copyText('17795600558', btn);
}

// 复制QQ号
function copyQQ() {
    const btn = event.target;
    copyText('3616927242', btn);
}

// 复制小红书号
function copyXhs() {
    const btn = event.target;
    copyText('Nebula_official', btn);
}

// 页面加载完成后
document.addEventListener('DOMContentLoaded', function() {
    // 如果URL带了搜索关键词，自动填入并搜索
    const params = new URLSearchParams(window.location.search);
    const kw = params.get('kw');
    if (kw && document.getElementById('searchInput')) {
        document.getElementById('searchInput').value = kw;
        doSearch();
    }

    // 点击导航链接后关闭移动端菜单
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            const links = document.getElementById('navLinks');
            if (links) links.classList.remove('mobile-open');
        });
    });

    // 平滑滚动（锚点链接）
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
