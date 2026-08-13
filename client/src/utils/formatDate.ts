export function getDateAndTime(date: string) {
  const date_obj = new Date(date);
  console.log(date_obj)
  return (
    date_obj.getMonth() + 1+
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
