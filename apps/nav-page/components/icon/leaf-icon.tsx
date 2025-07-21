export function LeafIcon({ fillColor }:{
  fillColor:boolean
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill={fillColor ? '#11f233' : 'null'} stroke={fillColor ? '#11f233' : 'currentColor'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 21q1-6 6-7t6-3m5-9q-2 4-8 4a1 1 0 0 0 0 14a10 11 0 0 0 8-18"/></svg>
}
