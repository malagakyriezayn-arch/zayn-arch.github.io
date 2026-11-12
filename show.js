/* show */
let sc={},tvp={},ord=[],g=0,paused=false,skip=false;
const row=id=>$(`.row[data-id="${id}"]`);
function layout(){const L=act().sort((a,b)=>sc[b.id]-sc[a.id]||tvp[b.id]-tvp[a.id]),h=Math.ceil(L.length/2);
L.forEach((c,i)=>{const r=row(c.id);r.style.transform=`translate(${i>=h?'31cqw':'0'},calc(var(--p)*${i%h}))`;r.querySelector('.pt').textContent=sc[c.id]});ord=L.map(c=>c.id);return L}
function build(){const a=S.a,s=$('#stg');s.style.cssText=`--b1:${a.b1};--rowc:${a.rowc};--done:${a.done};--pc:${a.pc};--rt:${a.rt}ms`;s.dataset.style=a.style;
$('#hd').innerHTML=`${esc(S.title)}<span>SCOREBOARD</span>`;sc={};tvp={};act().forEach(c=>{sc[c.id]=0;tvp[c.id]=0});
const R_=$('#rows');R_.classList.remove('dim','mv');R_.classList.add('nt');R_.innerHTML=act().map(c=>`<div class="row" data-id="${c.id}"><span class="fl">${esc(c.f)}</span><span class="nm">${esc(c.n)}</span><span class="bd"></span><b class="pt">0</b></div>`).join('');
layout();requestAnimationFrame(()=>requestAnimationFrame(()=>R_.classList.remove('nt')));$('#cd').classList.remove('show');panel('🎤',S.title,'')}
function panel(f,h,s){$('#pn').innerHTML=`<div class="pf">${esc(f)}</div><div class="pnn">${esc(h)}</div><div class="pp">${esc(s)}</div>`}
async function z(ms,t){const e=Date.now()+ms/S.a.speed;do{if(t!==g)throw 0;await new Promise(r=>setTimeout(r,40))}while(paused||(Date.now()<e&&!skip))}
async function pts(list,t,tv,who){for(let i=9;i>=0;i--){const c=byId(list[i]),p=PD[i];
if(p===12&&S.a.twelve){panel(c.f,c.n,fmt(S.a.twelveTxt,{c:c.n,sp:who.sp,p}));await z(1500,t)}
sc[c.id]+=p;if(tv)tvp[c.id]+=p;const r=row(c.id);r.classList.remove('hit');void r.offsetWidth;r.classList.add('hit');r.querySelector('.bd').textContent='+'+p;layout();await z(S.a.rt+250,t)}
$$('.row').forEach(r=>{r.classList.remove('hit');r.querySelector('.bd').textContent=''});await z(300,t)}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const xy=k=>{const h=Math.ceil(ord.length/2);return `translate(${k>=h?'31cqw':'0'},calc(var(--p)*${k%h}))`};
async function hop(el,k){el.style.transition='opacity .08s';el.style.opacity=0;await sleep(90);el.style.transition='none';el.style.transform=xy(k);void el.offsetWidth;el.style.transition='opacity .12s';el.style.opacity='';await sleep(130);el.style.transition=''}
async function count(el,a,b,t){const ms=Math.min(1400,600+Math.abs(b-a)*8),n=Math.round(ms/45);for(let i=1;i<=n;i++){const x=i/n,e=x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;el.textContent=Math.round(a+(b-a)*e);await z(ms/n,t)}}
async function ascend(id,from,to,t){const n=from-to,st=Math.max(60,Math.min(150,1500/n)),R_=$('#rows'),h=Math.ceil(ord.length/2);R_.style.setProperty('--st',st+'ms');R_.classList.add('mv');
for(let k=from;k>to;k--){const o=ord[k-1];ord[k]=o;ord[k-1]=id;const a=row(id),b=row(o);
if(k===h)await Promise.all([hop(a,k-1),hop(b,k)]);else{a.style.transform=xy(k-1);b.style.transform=xy(k);await z(st,t)}}
R_.classList.remove('mv')}
async function televote(t){const L=act().map(c=>({c,p:S.tv.indexOf(c.id)<0?0:PD[S.tv.indexOf(c.id)]})).sort((a,b)=>a.p-b.p);
for(const {c,p} of L){const r=row(c.id),pt=r.querySelector('.pt'),nm=r.querySelector('.nm');
panel(c.f,c.n,p?'+'+p+' televote points':'No televote points');r.classList.add('rev');await z(600,t);
if(p){const f=sc[c.id];sc[c.id]+=p;tvp[c.id]=p;await count(pt,f,sc[c.id],t);await z(500,t);
const me=sc[c.id],old=ord.indexOf(c.id),nu=ord.filter(o=>o!==c.id&&(sc[o]>me||(sc[o]===me&&tvp[o]>=p))).length;
if(nu<old){const R_=$('#rows');R_.classList.add('dim');r.classList.add('lift');await z(450,t);await ascend(c.id,old,nu,t);
if(nu===0){r.classList.add('nl');for(let i=1;i<=10;i++){nm.textContent='NEW LEADER'.slice(0,i);await z(70,t)}await z(1500,t);r.classList.remove('nl');nm.textContent=c.n}
r.classList.remove('lift');R_.classList.remove('dim');await z(400,t)}}
r.classList.remove('rev');r.classList.add('done');await z(p?300:200,t)}}
async function play(){const t=++g;paused=false;skip=false;$('#pp').textContent='⏸ Pause';$('#su').hidden=true;$('#sh').hidden=false;build();
try{for(const v of vs()){skip=false;panel(v.f,'Jury of '+v.n,fmt(S.a.announce,{sp:v.sp||'The spokesperson',c:v.n}));await z(S.a.pause,t);await pts(jv(v.id),t,false,v)}
skip=false;panel('📞','Televote','The televote points…');await z(S.a.pause,t);await televote(t);
const w=layout()[0];panel(w.f,w.n,'Winner');$('#cd').innerHTML=`<div><div class="big">🏆</div><div class="big">${esc(w.f+' '+w.n)}</div><div>${sc[w.id]} points</div></div>`;$('#cd').classList.add('show')}catch(e){}}
$('#pp').onclick=()=>{paused=!paused;$('#pp').textContent=paused?'▶ Resume':'⏸ Pause'};$('#sk').onclick=()=>{skip=true;setTimeout(()=>skip=false,1500)};
$('#cd').onclick=()=>$('#cd').classList.remove('show');
$('#fs').onclick=()=>{try{document.fullscreenElement?document.exitFullscreen():$('#stg').requestFullscreen().catch(()=>{})}catch(e){}};
$('#ex2').onclick=()=>{g++;$('#sh').hidden=true;$('#su').hidden=false};
