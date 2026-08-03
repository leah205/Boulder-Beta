export function getDateAndTime(date: string) {
  const date_obj = new Date(date);
  return (
    date_obj.getMonth() +
    "/" +
    date_obj.getDate() +
    "/" +
    date_obj.getFullYear() +
    " " +
    String(date_obj.getHours()).padStart(2, "0") +
    ":" +
    String(date_obj.getMinutes()).padStart(2, "0")
  );
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

export function getDate(date: string) {
  const date_obj = new Date(date);
  return monthAbbr[date_obj.getMonth()] + " " + date_obj.getDay();
}
