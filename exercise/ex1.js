import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // default export

const oggi = dayjs();
// console.log(oggi);
// const dopo = oggi.add(7, 'days');
// const dopo = oggi.add(1, 'months');
const dopo = oggi.subtract(1, 'months');
// console.log(dopo);
//console.log(dopo.format('M-D'))
// console.log(oggi.format('dddd'));

export default function isWeekend(oggi) {
  const day = oggi.format('dddd');
  return (day === 'Saturday' || day === 'Sunday') 
  ? true
  : false;
}
