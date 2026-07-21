export default function formatDate(date: string) {
  console.log(date);
  const date_obj = new Date(date);
  return (
    date_obj.getMonth() +
    "/" +
    date_obj.getDate() +
    "/" +
    date_obj.getFullYear() +
    " " +
    date_obj.getHours() +
    ":" +
    date_obj.getMinutes()
  );
}
