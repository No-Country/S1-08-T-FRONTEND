export default function FormatDate(date) {
  return new Date(date).toString().split(" ").slice(0, 3).join(" ");
}
