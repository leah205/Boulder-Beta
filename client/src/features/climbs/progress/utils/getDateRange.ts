function getAllDatesBetween(startDate: Date, stopDate: Date) {
  const res = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    res.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log(res);
  return res;
}

const monthAbbr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getDate(date: Date) {
  return monthAbbr[date.getMonth()] + " " + date.getDate();
}

export default function getRangeOfDateArr(dateArr: string[]) {
  const datesSorted = dateArr
    .map((date) => new Date(date))
    .sort((a, b) => (a > b ? 1 : 0));
  const arr = getAllDatesBetween(
    datesSorted[0],
    datesSorted[datesSorted.length - 1],
  );
  const res = arr.map((date) => getDate(date));
  return res;
}
