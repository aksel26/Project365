export default function Day365(input = new Date()) {
  let now = input;
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day365 = Math.floor(diff / oneDay);

  return day365;
}
