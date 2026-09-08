// ==== UTILITIES ====
function showSection(id) {
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

function showExamTab(id) {
    document.querySelectorAll('.exam-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

function getColor(score) {
    if(score>=80) return 'a';
    if(score>=50) return 'b';
    return 'c';
}

// ==== SUBJEK PERLU FOKUS ====
let focusList = JSON.parse(localStorage.getItem('focusList')||'[]');
function renderFocus(){
    let html='';
    focusList.forEach((r,i)=>{
        html += `<tr><td>${i+1}</td><td>${r.subject}</td><td>${r.reason}</td><td>${r.target}%</td></tr>`;
    });
    document.getElementById('focusTable').innerHTML=html;
}
function addFocusSubject(){
    let subj=document.getElementById('focusSubject').value;
    let reason=document.getElementById('focusReason').value;
    let target=document.getElementById('focusTarget').value;
    if(!subj||!reason||!target) return alert('Isi semua ruang!');
    focusList.push({subject:subj,reason:reason,target:target});
    localStorage.setItem('focusList',JSON.stringify(focusList));
    renderFocus();
    document.getElementById('focusSubject').value='';
    document.getElementById('focusReason').value='';
    document.getElementById('focusTarget').value='';
}

// ==== REKOD MC ====
let mcList = JSON.parse(localStorage.getItem('mcList')||'[]');
function renderMC(){
    let html='';
    mcList.forEach((r,i)=>{
        html += `<tr><td>${i+1}</td><td>${r.date}</td><td>${r.days}</td><td>${r.reason}</td><td><button onclick="delMC(${i})">Padam</button></td></tr>`;
    });
    document.getElementById('mcTable').innerHTML=html;
}
function addMC(){
    let date=document.getElementById('mcDate').value;
    let days=document.getElementById('mcDays').value;
    let reason=document.getElementById('mcReason').value;
    if(!date||!days||!reason) return alert('Isi semua ruang!');
    mcList.push({date:date,days:days,reason:reason});
    localStorage.setItem('mcList',JSON.stringify(mcList));
    renderMC();
    document.getElementById('mcDate').value='';
    document.getElementById('mcDays').value='';
    document.getElementById('mcReason').value='';
}
function delMC(i){ if(confirm('Padam rekod ini?')){ mcList.splice(i,1); localStorage.setItem('mcList',JSON.stringify(mcList)); renderMC(); }}

// ==== UJIAN PENGGAL ====
let penggalList = JSON.parse(localStorage.getItem('penggalList')||'[]');
function renderPenggal(){
    let html='';
    penggalList.forEach((r)=>{
        let avg = ((r.p1+r.p2+r.p3)/3).toFixed(1);
        html += `<tr><td>${r.subject}</td><td>${r.p1}%</td><td>${r.p2}%</td><td>${r.p3}%</td><td class="${getColor(avg)}">${avg}%</td></tr>`;
    });
    document.getElementById('penggalTable').innerHTML=html;
}
function addPenggalResult(){
    let s=document.getElementById('pSubj').value;
    let p1=parseInt(document.getElementById('p1').value)||0;
    let p2=parseInt(document.getElementById('p2').value)||0;
    let p3=parseInt(document.getElementById('p3').value)||0;
    if(!s) return alert('Isi nama subjek!');
    penggalList.push({subject:s,p1:p1,p2:p2,p3:p3});
    localStorage.setItem('penggalList',JSON.stringify(penggalList));
    renderPenggal();
    document.getElementById('pSubj').value='';
    document.getElementById('p1').value='';
    document.getElementById('p2').value='';
    document.getElementById('p3').value='';
}

// ==== SPM ====
let spmList = JSON.parse(localStorage.getItem('spmList')||'[]');
function renderSPM(){
    let html='';
    spmList.forEach((r,i)=>{
        html += `<tr><td>${r.subject}</td><td>${r.grade}</td><td>${r.year}</td></tr>`;
    });
    document.getElementById('spmTable').innerHTML=html;
}
function addSPM(){
    let s=document.getElementById('spmSubj').value;
    let g=document.getElementById('spmGrade').value;
    let y=document.getElementById('spmYear').value;
    if(!s||!g||!y) return alert('Isi semua ruang!');
    spmList.push({subject:s,grade:g,year:y});
    localStorage.setItem('spmList',JSON.stringify(spmList));
    renderSPM();
    document.getElementById('spmSubj').value='';
    document.getElementById('spmGrade').value='';
    document.getElementById('spmYear').value='';
}

// ==== STPM ====
let stpmList = JSON.parse(localStorage.getItem('stpmList')||'[]');
function renderSTPM(){
    let html='';
    stpmList.forEach((r,i)=>{
        html += `<tr><td>${r.subject}</td><td>${r.grade}</td><td>${r.period}</td></tr>`;
    });
    document.getElementById('stpmTable').innerHTML=html;
}
function addSTPM(){
    let s=document.getElementById('stpmSubj').value;
    let g=document.getElementById('stpmGrade').value;
    let p=document.getElementById('stpmYear').value;
    if(!s||!g||!p) return alert('Isi semua ruang!');
    stpmList.push({subject:s,grade:g,period:p});
    localStorage.setItem('stpmList',JSON.stringify(stpmList));
    renderSTPM();
    document.getElementById('stpmSubj').value='';
    document.getElementById('stpmGrade').value='';
    document.getElementById('stpmYear').value='';
}

// ==== KERJA RUMAH ====
let hwList = JSON.parse(localStorage.getItem('hwList')||'[]');
let hwFilter = 'all';
function renderHW(){
    let list = hwFilter==='all' ? hwList : hwList.filter(x=>x.status===hwFilter);
    let html='';
    list.forEach((r,i)=>{
        html += `<div style="padding:12px; margin:8px 0; background:#f8f9fa; border-radius:8px;">
            <strong>${r.subject}</strong> — ${r.task} <br>
            Tarikh Hantar: ${r.duedate} | 
            <span class="${r.status}">${r.status==='pending'?'⏳ Belum Siap':'✅ Sudah Siap'}</span>
            <br>
            <button onclick="toggleHW(${i})">Tukar Status</button>
            <button onclick="delHW(${i})">Padam</button>
        </div>`;
    });
    document.getElementById('hwList').innerHTML=html;
}
function filterHomework(f){ hwFilter=f; renderHW(); }
function addHomework(){
    let subj=document.getElementById('hwSubj').value;
    let task=document.getElementById('hwTask').value;
    let date=document.getElementById('hwDate').value;
    if(!task||!date) return alert('Isi tugasan & tarikh!');
    hwList.push({subject:subj,task:task,duedate:date,status:'pending'});
    localStorage.setItem('hwList',JSON.stringify(hwList));
    renderHW();
    document.getElementById('hwTask').value='';
    document.getElementById('hwDate').value='';
}
function toggleHW(i){ hwList[i].status = hwList[i].status==='pending'?'done':'pending'; localStorage.setItem('hwList',JSON.stringify(hwList)); renderHW(); }
function delHW(i){ if(confirm('Padam tugasan ini?')){ hwList.splice(i,1); localStorage.setItem('hwList',JSON.stringify(hwList)); renderHW(); }}

// ==== REKOD MARKAH ====
let marksList = JSON.parse(localStorage.getItem('marksList')||'[]');
function renderMarks(){
    let html='';
    marksList.forEach((r,i)=>{
        let c = getColor(r.score);
        html += `<tr>
            <td>${r.subject}</td>
            <td>${r.test}</td>
            <td>${r.score}/100</td>
            <td class="${c}">${r.score}%</td>
            <td><button onclick="delMark(${i})">Padam</button></td>
        </tr>`;
    });
    document.getElementById('marksTable').innerHTML=html;
}
function addMark(){
    let subj=document.getElementById('mSubj').value;
    let test=document.getElementById('mTest').value;
    let score=parseInt(document.getElementById('mScore').value);
    if(!test||isNaN(score)) return alert('Isi nama ujian & markah!');
    marksList.push({subject:subj,test:test,score:score});
    localStorage.setItem('marksList',JSON.stringify(marksList));
    renderMarks();
    document.getElementById('mTest').value='';
    document.getElementById('mScore').value='';
}
function delMark(i){ if(confirm('Padam markah ini?')){ marksList.splice(i,1); localStorage.setItem('marksList',JSON.stringify(marksList)); renderMarks(); }}

// ==== ON LOAD ====
window.onload = function(){
    renderFocus();
    renderMC();
    renderPenggal();
    renderSPM();
    renderSTPM();
    renderHW();
    renderMarks();
};
