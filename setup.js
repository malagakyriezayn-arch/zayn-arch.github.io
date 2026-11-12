/* setup */
function slots(a,self){const o=act().filter(c=>c.id!==self);return a.map((x,i)=>`<label>${PD[i]} points<select data-s="${i}"><option value="">Choose…</option>${o.map(c=>`<option value="${c.id}" ${c.id===x?'selected':''}>${esc(c.f+' '+c.n)}</option>`).join('')}</select></label>`).join('')}
function rC(){$('#p_c').innerHTML=`<div class="chips">${S.pool.map(c=>`<button class="chip ${c.on?'on':''}" data-c="${c.id}">${esc(c.f+' '+c.n)}</button>`).join('')}</div><p class="mut">Tap a country to include or leave it out. Each selected country is also a jury.</p>`}
function rJ(){const v=vs();if(!selJ||!v.some(c=>c.id===selJ))selJ=v[0]?.id;
$('#p_j').innerHTML=`<div class="grid">${v.map(c=>`<button class="jc ${c.id===selJ?'on':''}" data-j="${c.id}">${esc(c.f+' '+c.n)}<b>${cnt(jv(c.id))}/10</b></button>`).join('')}</div>`+(selJ?`<div data-o="${selJ}">${slots(jv(selJ),selJ)}</div>`:'')}
function rT(){$('#p_t').innerHTML=`<p class="mut">The televote gives one set of points.</p><div data-o="tv">${slots(S.tv,null)}</div>`}
function rO(){$('#p_o').innerHTML=`<p class="mut">The order the juries vote in during the show. Use the arrows to change it.</p>`+vs().map((c,i)=>`<div class="r"><span>${i+1}</span><span class="g">${esc(c.f+' '+c.n)}</span><button data-m="${i}" data-d="-1">▲</button><button data-m="${i}" data-d="1">▼</button></div>`).join('')+`<button id="shf">Shuffle the order</button>`}
function rZ(){$('#p_z').innerHTML=`<label>Contest title<input id="e_t" value="${esc(S.title)}"></label><h3>Countries &amp; spokespeople</h3>`+S.pool.map((c,i)=>`<div class="r"><input class="f" value="${esc(c.f)}" data-i="${i}" data-k="f"><input value="${esc(c.n)}" data-i="${i}" data-k="n"><input value="${esc(c.sp)}" placeholder="Spokesperson" data-i="${i}" data-k="sp"><button data-x="${i}">✕</button></div>`).join('')+`<button id="add">+ Add country</button><h3>Animation &amp; look</h3>`+
FM.map(([k,l,t,x,y,s])=>{const v=S.a[k];let i;
if(t==='range')i=`<input type="range" data-a="${k}" min="${x}" max="${y}" step="${s}" value="${v}"><output>${v}</output>`;
else if(t==='select')i=`<select data-a="${k}">${x.map(o=>`<option ${o===v?'selected':''}>${o}</option>`).join('')}</select>`;
else if(t==='check')i=`<input type="checkbox" data-a="${k}" ${v?'checked':''}>`;
else i=`<input type="${t}" data-a="${k}" value="${esc(v)}">`;
return `<label>${l}${i}</label>`}).join('')+`<p class="mut">Placeholders: {c} country, {sp} spokesperson.</p><h3>Data</h3><textarea id="js"></textarea><div class="r"><button id="ex">Export</button><button id="im">Import</button><button id="df">Reset all</button></div><span id="msg"></span>`}
function R(){clean();const m=miss(),n=act().length;
$('#sub').textContent=S.title+' · build your own voting show';
$('#n_c').textContent=n+'/'+S.pool.length;$('#n_j').textContent=vs().filter(v=>cnt(jv(v.id))>=10).length+'/'+n;$('#n_t').textContent=cnt(S.tv)+'/10';
$$('#tb button').forEach(b=>{const on=b.dataset.t===tab;b.classList.toggle('on',on);on?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current')});$('#tb').style.setProperty('--i','cjtoz'.indexOf(tab));$$('.pn').forEach(p=>p.hidden=p.id!=='p_'+tab);
({c:rC,j:rJ,t:rT,o:rO,z:rZ})[tab]();
$('#chk').textContent=n<11?'Select at least 11 countries.':m.length?'Every jury and the televote must give all 10 sets of points before the show can start. Missing: '+m.join(', ')+'.':'Ready to play.';
$('#play').disabled=n<11||m.length>0;save()}
const rndSet=(a,self)=>shuf(act().filter(c=>c.id!==self).map(c=>c.id)).slice(0,10);
