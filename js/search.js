// 资料页核心逻辑
// 资料汇总页逻辑
function getCoverForSubject(subject) {
    if (!subject) return 'images/cover_general.jpg';
    if (subject.includes('语文')) return 'images/cover_chinese.jpg';
    if (subject.includes('数学')) return 'images/cover_math.jpg';
    if (subject.includes('英语')) return 'images/cover_english.jpg';
    if (subject.includes('物理')) return 'images/cover_physics.jpg';
    if (subject.includes('化学')) return 'images/cover_chemistry.jpg';
    if (subject.includes('生物')) return 'images/cover_biology.jpg';
    if (subject.includes('地理')) return 'images/cover_geography.jpg';
    if (subject.includes('历史')) return 'images/cover_history.jpg';
    if (subject.includes('道德')) return 'images/cover_morality.jpg';
    return 'images/cover_general.jpg';
}
function detectXhsCover(title) {
    if (title.includes('语文')) return 'images/cover_chinese.jpg';
    if (title.includes('数学')) return 'images/cover_math.jpg';
    if (title.includes('英语') || title.includes('Unit') || title.includes('单词')) return 'images/cover_english.jpg';
    return 'images/cover_general.jpg';
}

function loadList(filter = "") {
    let box = document.getElementById("materialsContainer");
    let kw = filter.toLowerCase().trim();
    
    let subject = document.getElementById("filterSubject").value;
    let grade = document.getElementById("filterGrade").value;
    let volume = document.getElementById("filterVolume").value;
    let type = document.getElementById("filterType").value;
    let version = document.getElementById("filterVersion").value;
    
    let hasF = kw || subject || grade || volume || type || version;
    if (!hasF && !showAll) {
        box.innerHTML = '';
        let r = document.getElementById("filterResult");
        if (r) r.textContent = '共 ' + materials.length + ' 份资料，使用上方筛选器或搜索框快速查找';
        return;
    }
    
    let list = materials.filter(m => {
        if (subject && m.subject !== subject) return false;
        if (grade && m.grade !== grade) return false;
        if (volume && m.volume !== volume) return false;
        if (type && m.type !== type) return false;
        if (version && m.version !== version) return false;
        if (kw && !m.name.toLowerCase().includes(kw) && 
            !m.type.toLowerCase().includes(kw) && 
            !m.grade.toLowerCase().includes(kw) &&
            !m.subject.toLowerCase().includes(kw)) return false;
        return true;
    });
    
    let r = document.getElementById("filterResult");
    if (r) {
        let cond = [];
        if (subject) cond.push(subject);
        if (grade) cond.push(grade);
        if (volume) cond.push(volume);
        if (type) cond.push(type);
        if (version) cond.push(version);
        if (kw) cond.push('关键词:"' + kw + '"');
        r.textContent = cond.length > 0 
            ? '筛选条件：' + cond.join(' · ') + '，共找到 ' + list.length + ' 份资料'
            : '共 ' + list.length + ' 份资料，使用上方筛选器或搜索框快速查找';
    }
    
    let html = '';
    if (list.length > 0) {
        html += '<div class="material-grid">';
        list.forEach(m => {
            let isXhs = m.name === "2026年陕西省中考数学试题";
            let xhsBtn = isXhs ? '<a href="https://xhslink.cn/o/3DAHQDqtNqr" target="_blank" class="material-btn btn-preview xhs-inline-btn">小红书</a>' : '';
            
            let previewBtn = '';
            let downloadBtn = '';
            let tag = '';
            
            if (m.downloadUrl) {
                downloadBtn = `<a href="${m.downloadUrl}" target="_blank" class="material-btn btn-download">下载</a>`;
                if (m.previewFile) {
                    let pp = pathOf({ ...m, file: m.previewFile });
                    let ep = encodeURIComponent(pp).replace(/%2F/g, '/');
                    previewBtn = `<a href="${ep}" target="_blank" class="material-btn btn-preview">预览</a>`;
                }
                if (m.tagColor === 'red') tag = '<img src="images/textbook_tag_red.png" class="textbook-tag" alt="">';
                else if (m.tagColor === 'green') tag = '<img src="images/textbook_tag_green.png" class="textbook-tag" alt="">';
            } else {
                let p = pathOf(m);
                let enc = encodeURIComponent(p).replace(/%2F/g, '/');
                if (m.previewFile) {
                    let pp = pathOf({ ...m, file: m.previewFile });
                    let ep = encodeURIComponent(pp).replace(/%2F/g, '/');
                    previewBtn = `<a href="${ep}" target="_blank" class="material-btn btn-preview">预览</a>`;
                } else {
                    previewBtn = `<a href="${enc}" target="_blank" class="material-btn btn-preview">预览</a>`;
                }
                downloadBtn = `<a href="${enc}" download class="material-btn btn-download">下载</a>`;
            }
            
            html += `
            <div class="material-card">
                <div class="material-icon" style="background-image:url('${getCoverForSubject(m.subject)}');"></div>
                <div class="material-info">
                    <div class="material-name">${m.name}${tag}</div>
                    <div class="material-meta">${m.subject} · ${m.grade} · ${m.volume} · ${m.type}${m.size ? ' · ' + m.size : ''}${isXhs ? ' · 小红书同步更新' : ''}</div>
                </div>
                <div class="material-actions">
                    ${xhsBtn}
                    ${previewBtn}
                    ${downloadBtn}
                </div>
            </div>`;
        });
        html += '</div>';
    } else {
        html = '<div class="empty-state"><div class="icon"><i class="fa-solid fa-magnifying-glass"></i></div><div class="title">没有找到匹配的资料</div><div class="hint">试试调整筛选条件或搜索关键词</div></div>';
    }
    
    box.innerHTML = html;
}

function pathOf(m) {
    if (m.type === "电子教材") {
        if (m.grade === "高中") return `materials/高中数学/${m.file}`;
        let dir = m.grade + m.volume;
        return `materials/电子课本/初中/${dir}/${m.file}`;
    }
    let map = {
        "全品作业本": "全品作业本",
        "试卷": m.grade === "八年级" ? "八下试卷" : (m.grade === "七年级" ? "七上试卷" : "专题训练"),
        "专题训练": "专题训练"
    };
    let cat = map[m.type] || m.type;
    return `materials/${cat}/${m.file}`;
}

function doFilter() {
    let kw = document.getElementById("materialSearch").value;
    let subject = document.getElementById("filterSubject").value;
    let grade = document.getElementById("filterGrade").value;
    let volume = document.getElementById("filterVolume").value;
    let type = document.getElementById("filterType").value;
    let version = document.getElementById("filterVersion").value;
    let hasF = kw.trim() || subject || grade || volume || type || version;
    
    loadXhs(kw);
    loadList(kw);
    
    let latest = document.getElementById("latestSection");
    let xhs = document.getElementById("xhsSection");
    let wrap = document.getElementById("toggleAllWrap");
    if (latest) latest.style.display = hasF ? "none" : "";
    if (xhs) xhs.style.display = hasF ? "none" : "";
    if (wrap) wrap.style.display = hasF ? "none" : "";
}

loadXhs();
loadList();
loadNewest();
