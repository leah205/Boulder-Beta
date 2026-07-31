export default function formatDate(date: string) {
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
