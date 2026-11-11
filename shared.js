export const JURY_VALUES = [1,2,3,4,5,6,7,8,10,12];
export function flagMarkup(flag) {
  if (!flag) return "🏳️";
  if (/^https?:\/\//i.test(flag)) return `<img src="${escapeHtml(flag)}" alt="" referrerpolicy="no-referrer">`;
  return escapeHtml(flag);
}
export function escapeHtml(value="") {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
export function calculateScores(countries={}, juryVotes={}, televote={}) {
  return Object.entries(countries).map(([code,country]) => {
    const jury = Object.values(juryVotes).reduce((sum,vote) => sum + Number(vote.points?.[code] || 0),0);
    const tv = Number(televote[code] || 0);
    return {code, ...country, jury, televote:tv, total:jury+tv};
  }).sort((a,b) => b.total-a.total || b.jury-a.jury || a.name.localeCompare(b.name));
}
