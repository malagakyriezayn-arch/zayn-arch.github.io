const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const uid=()=>Math.random().toString(36).slice(2,8),K='douze-studio-v3',PD=[12,10,8,7,6,5,4,3,2,1];
const esc=s=>String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const fmt=(t,o)=>String(t).replace(/\{(\w+)\}/g,(_,k)=>o[k]??'');
const shuf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const DA={speed:1,rt:700,pause:1300,style:'slide',twelve:true,b1:'#0a0f33',rowc:'#ffffff',done:'#a9acec',pc:'#1b1f6b',announce:'{sp} from {c} is calling…',twelveTxt:'{c}: douze points!'};
const FM=[['speed','Speed','range',0.5,2,0.1],['rt','Reorder time (ms)','range',200,1500,50],['pause','Voter intro (ms)','range',300,3000,100],['style','Points animation','select',['slide','pop','flash']],['twelve','12-point card','check'],['b1','Stage colour','color'],['rowc','Row colour','color'],['done','Points-received colour','color'],['pc','Points pill colour','color'],['announce','Voter text','text'],['twelveTxt','12-point text','text']];
const DEF=()=>({title:'JESC 2026',votes:{},tv:Array(10).fill(null),order:[],a:{...DA},
pool:'Albania|🇦🇱;Armenia|🇦🇲;Cyprus|🇨🇾;France|🇫🇷;Georgia|🇬🇪;Ireland|🇮🇪;Italy|🇮🇹;Malta|🇲🇹;Montenegro|🇲🇪;Netherlands|🇳🇱;North Macedonia|🇲🇰;Poland|🇵🇱;Portugal|🇵🇹;San Marino|🇸🇲;Spain|🇪🇸;Ukraine|🇺🇦'.split(';').map(x=>{const[n,f]=x.split('|');return{id:uid(),n,f,sp:'',on:true}})});
let S,tab='c',selJ=null;
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const load=()=>{try{const r=localStorage.getItem(K);if(r){S=JSON.parse(r);if(S&&S.pool&&S.pool.length)return}}catch(e){}S=DEF()};
const act=()=>S.pool.filter(c=>c.on),byId=id=>S.pool.find(c=>c.id===id),cnt=a=>a.filter(Boolean).length;
const jv=id=>S.votes[id]||(S.votes[id]=Array(10).fill(null));
function vs(){const on=act();S.order=S.order.filter(x=>on.some(c=>c.id===x));on.forEach(c=>{if(!S.order.includes(c.id))S.order.push(c.id)});return S.order.map(byId)}
function clean(){const on=new Set(act().map(c=>c.id));vs();for(const k of Object.keys(S.votes)){if(!on.has(k))delete S.votes[k];else S.votes[k]=S.votes[k].map(x=>on.has(x)&&x!==k?x:null)}S.tv=S.tv.map(x=>on.has(x)?x:null)}
const miss=()=>{const m=vs().filter(v=>cnt(jv(v.id))<10).map(v=>v.n);if(cnt(S.tv)<10)m.push('Televote');return m};
function setSlot(a,i,v){if(v){const j=a.indexOf(v);if(j>=0&&j!==i)a[j]=null}a[i]=v||null}
