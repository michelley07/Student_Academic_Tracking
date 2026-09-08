// ===== UTILITY FUNCTIONS =====
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

function showExamTab(id) {
    document.querySelectorAll('.exam-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

function getColorClass(score) {
    score = Number(score);
    if(score >= 75) return 'excellent';
    if(score >= 50) return 'average';
    return 'needsimprove';
}

// ===== FOCUS SUBJECTS =====
let focusList = [];
// PRELOAD: 3 Focus Subjects as requested
focusList.push({ subject: 'Bahasa Melayu', reason: 'Need to improve', target: 90 });
focusList.push({ subject: 'English Language', reason: 'Need to improve', target: 90 });
focusList.push({ subject: 'Mathematics', reason: 'Need to improve', target: 90 });
localStorage.setItem('focusList', JSON.stringify(focusList));

function renderFocus() {
    const table = document.getElementById('focusTable');
    if(!table) return;
    let html = '';
    focusList.forEach((r, i) => {
        html += `<tr><td>${i+1}</td><td>${r.subject}</td><td>${r.reason}</td><td>${r.target}%</td></tr>`;
    });
    table.innerHTML = html;
}
function addFocusSubject() {
    const subject = document.getElementById('focusSubject').value;
    const reason = document.getElementById('focusReason').value;
    const target = document.getElementById('focusTarget').value;
    if(!subject || !reason || !target) return alert('Please fill in all fields!');
    focusList.push({ subject, reason, target });
    localStorage.setItem('focusList', JSON.stringify(focusList));
    renderFocus();
    document.getElementById('focusSubject').value = '';
    document.getElementById('focusReason').value = '';
    document.getElementById('focusTarget').value = '';
}

// ===== MEDICAL LEAVE / MC =====
let mcList = [];
function renderMC() {
    const table = document.getElementById('mcTable');
    if(!table) return;
    let html = '';
    mcList.forEach((r, i) => {
        html += `<tr><td>${i+1}</td><td>${r.date}</td><td>${r.days}</td><td>${r.reason}</td>
            <td><button onclick="deleteMC(${i})">Delete</button></td></tr>`;
    });
    table.innerHTML = html;
}
function addMC() {
    const date = document.getElementById('mcDate').value;
    const days = document.getElementById('mcDays').value;
    const reason = document.getElementById('mcReason').value;
    if(!date || !days || !reason) return alert('Please fill in all fields!');
    mcList.push({ date, days, reason });
    localStorage.setItem('mcList', JSON.stringify(mcList));
    renderMC();
    document.getElementById('mcDate').value = '';
    document.getElementById('mcDays').value = '';
    document.getElementById('mcReason').value = '';
}
function deleteMC(i) {
    if(confirm('Delete this record?')) {
        mcList.splice(i, 1);
        localStorage.setItem('mcList', JSON.stringify(mcList));
        renderMC();
    }
}

// ===== TERM TEST RESULTS =====
let termList = [];
// PRELOAD: ALL 7 SUBJECTS
termList.push({ subject: 'Bahasa Melayu', t1: 80, t2: 60, t3: 70 });
termList.push({ subject: 'English Language', t1: 55, t2: 48, t3: 62 });
termList.push({ subject: 'Mathematics', t1: 75, t2: 68, t3: 82 });
termList.push({ subject: 'Science', t1: 40, t2: 52, t3: 45 });
termList.push({ subject: 'History', t1: 60, t2: 50, t3: 58 });
termList.push({ subject: 'Geography', t1: 70, t2: 65, t3: 72 });
termList.push({ subject: 'Computer Science', t1: 35, t2: 42, t3: 38 });
localStorage.setItem('termList', JSON.stringify(termList));

function renderTerm() {
    const table = document.getElementById('termTable');
    if(!table) return;
    let html = '';
    termList.forEach(r => {
        const avg = ((r.t1 + r.t2 + r.t3) / 3).toFixed(1);
        const cls = getColorClass(avg);

        html += `<tr>
            <td>${r.subject}</td>
            <td>${r.t1}</td>
            <td>${r.t2}</td>
            <td>${r.t3}</td>
            <td class="${cls}">${avg}</td>
        </tr>`;
    });
    table.innerHTML = html;
}
function addTermResult() {
    const subject = document.getElementById('tSubj').value;
    const t1 = parseInt(document.getElementById('t1').value) || 0;
    const t2 = parseInt(document.getElementById('t2').value) || 0;
    const t3 = parseInt(document.getElementById('t3').value) || 0;
    if(!subject) return alert('Please enter subject name!');
    termList.push({ subject, t1, t2, t3 });
    localStorage.setItem('termList', JSON.stringify(termList));
    renderTerm();
    document.getElementById('tSubj').value = '';
    document.getElementById('t1').value = '';
    document.getElementById('t2').value = '';
    document.getElementById('t3').value = '';
}

// ===== PT3 RESULTS =====
let pt3List = [];
// PRELOAD PT3 DATA
pt3List.push({ subject: 'Bahasa Melayu', mark: 72 });
pt3List.push({ subject: 'English Language', mark: 65 });
pt3List.push({ subject: 'Mathematics', mark: 78 });
pt3List.push({ subject: 'Science', mark: 68 });
pt3List.push({ subject: 'History', mark: 55 });
localStorage.setItem('pt3List', JSON.stringify(pt3List));

function renderPT3() {
    const table = document.getElementById('pt3Table');
    if(!table) return;
    let html = '';
    pt3List.forEach(r => {
        const passed = r.mark >= 50;
        const status = passed ? '<span class="passed">✅ PASSED</span>' : '<span class="failed">❌ FAILED</span>';
        html += `<tr><td>${r.subject}</td><td>${r.mark}</td><td>${status}</td></tr>`;
    });
    table.innerHTML = html;
}
function addPT3() {
    const subject = document.getElementById('pt3Subj').value;
    const mark = parseInt(document.getElementById('pt3Mark').value);
    if(!subject || isNaN(mark)) return alert('Please enter subject and mark!');
    pt3List.push({ subject, mark });
    localStorage.setItem('pt3List', JSON.stringify(pt3List));
    renderPT3();
    document.getElementById('pt3Subj').value = '';
    document.getElementById('pt3Mark').value = '';
}

// ===== SPM RESULTS =====
let spmList = [];
function renderSPM() {
    const table = document.getElementById('spmTable');
    if(!table) return;
    let html = '';
    spmList.forEach(r => {
        html += `<tr><td>${r.subject}</td><td>${r.grade}</td><td>${r.year}</td></tr>`;
    });
    table.innerHTML = html;
}
function addSPM() {
    const subject = document.getElementById('spmSubj').value;
    const grade = document.getElementById('spmGrade').value;
    const year = document.getElementById('spmYear').value;
    if(!subject || !grade || !year) return alert('Please fill in all fields!');
    spmList.push({ subject, grade, year });
    localStorage.setItem('spmList', JSON.stringify(spmList));
    renderSPM();
    document.getElementById('spmSubj').value = '';
    document.getElementById('spmGrade').value = '';
    document.getElementById('spmYear').value = '';
}

// ===== HOMEWORK =====
let hwList = [];
let hwFilter = 'all';
function renderHomework() {
    const list = hwFilter === 'all' ? hwList : hwList.filter(x => x.status === hwFilter);
    let html = '';
    list.forEach((r, i) => {
        const statusText = r.status === 'pending' ? '⏳ Pending' : '✅ Completed';
        const statusClass = r.status === 'pending' ? 'pending' : 'completed';
        html += `<div style="padding:12px; margin:8px 0; background:#fef7ff; border-radius:8px;">
            <strong>${r.subject}</strong> — ${r.task}<br>
            Due Date: ${r.dueDate} | <span class="${statusClass}">${statusText}</span><br>
            <button onclick="toggleHWStatus(${i})">Toggle Status</button>
            <button onclick="deleteHW(${i})">Delete</button>
        </div>`;
    });
    const container = document.getElementById('hwList');
    if(container) container.innerHTML = html;
}
function filterHomework(filter) {
    hwFilter = filter;
    renderHomework();
}
function addHomework() {
    const subject = document.getElementById('hwSubj').value;
    const task = document.getElementById('hwTask').value;
    const dueDate = document.getElementById('hwDueDate').value;
    if(!task || !dueDate) return alert('Please enter task and due date!');
    hwList.push({ subject, task, dueDate, status: 'pending' });
    localStorage.setItem('hwList', JSON.stringify(hwList));
    renderHomework();
    document.getElementById('hwTask').value = '';
    document.getElementById('hwDueDate').value = '';
}
function toggleHWStatus(i) {
    hwList[i].status = hwList[i].status === 'pending' ? 'completed' : 'pending';
    localStorage.setItem('hwList', JSON.stringify(hwList));
    renderHomework();
}
function deleteHW(i) {
    if(confirm('Delete this homework?')) {
        hwList.splice(i, 1);
        localStorage.setItem('hwList', JSON.stringify(hwList));
        renderHomework();
    }
}

// ===== TEST MARKS =====
let marksList = [];
function renderMarks() {
    const table = document.getElementById('marksTable');
    if(!table) return;
    let html = '';
    marksList.forEach((r, i) => {
        const cls = getColorClass(r.score);
        html += `<tr>
            <td>${r.subject}</td>
            <td>${r.testName}</td>
            <td>${r.score}/100</td>
            <td class="${cls}">${r.score}%</td>
            <td><button onclick="deleteMark(${i})">Delete</button></td>
        </tr>`;
    });
    table.innerHTML = html;
}
function addMark() {
    const subject = document.getElementById('mSubj').value;
    const testName = document.getElementById('mTest').value;
    const score = parseInt(document.getElementById('mScore').value);
    if(!testName || isNaN(score)) return alert('Please enter test name and score!');
    marksList.push({ subject, testName, score });
    localStorage.setItem('marksList', JSON.stringify(marksList));
    renderMarks();
    document.getElementById('mTest').value = '';
    document.getElementById('mScore').value = '';
}
function deleteMark(i) {
    if(confirm('Delete this mark?')) {
        marksList.splice(i, 1);
        localStorage.setItem('marksList', JSON.stringify(marksList));
        renderMarks();
    }
}

// ===== LOAD ALL DATA ON PAGE START =====
window.onload = function() {
    renderFocus();
    renderMC();
    renderTerm();
    renderPT3();
    renderSPM();
    renderHomework();
    renderMarks();
};
