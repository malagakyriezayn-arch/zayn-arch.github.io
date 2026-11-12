/* events */
$('#play').onclick=play;
document.addEventListener('input',e=>{const t=e.target;
if(t.id==='e_t')S.title=t.value;
else if(t.dataset.k)S.pool[+t.dataset.i][t.dataset.k]=t.value;
else if(t.dataset.a){const k=t.dataset.a;S.a[k]=t.type==='checkbox'?t.checked:t.type==='range'?+t.value:t.value;if(t.type==='range')t.nextElementSibling.textContent=t.value}
else return;save()});
document.addEventListener('change',e=>{const t=e.target;
if(t.dataset.s!==undefined){const o=t.closest('[data-o]').dataset.o;setSlot(o==='tv'?S.tv:jv(o),+t.dataset.s,t.value);R()}
else if(t.dataset.a&&(t.tagName==='SELECT'||t.type==='checkbox')){S.a[t.dataset.a]=t.type==='checkbox'?t.checked:t.value;save()}});
document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t||t.closest('#sh'))return;const d=t.dataset;
if(d.t){tab=d.t}
else if(d.c){const c=byId(d.c);c.on=!c.on}
else if(d.j){selJ=d.j}
else if(d.m!==undefined){const i=+d.m,j=i+ +d.d;if(j>=0&&j<S.order.length)[S.order[i],S.order[j]]=[S.order[j],S.order[i]]}
else if(d.x!==undefined){S.pool.splice(+d.x,1)}
else if(t.id==='shf')shuf(S.order);
else if(t.id==='add')S.pool.push({id:uid(),n:'New country',f:'🏳️',sp:'',on:true});
else if(t.id==='fill'){vs().forEach(v=>S.votes[v.id]=rndSet(0,v.id));S.tv=rndSet(0,null)}
else if(t.id==='clr'){S.votes={};S.tv=Array(10).fill(null)}
else if(t.id==='ex'){$('#js').value=JSON.stringify(S);$('#msg').textContent='Exported below.';return}
else if(t.id==='im'){try{const o=JSON.parse($('#js').value);if(!o.pool||!o.pool.length)throw 0;S=o;S.a={...DA,...S.a};tab='z'}catch(x){$('#msg').textContent='Invalid data.';return}}
else if(t.id==='df'){S=DEF()}
else return;R()});
load();S.a={...DA,...S.a};R();
