export function formatDateTime(isoString: string): { date: string; time: string } {
  const dateObj = new Date(isoString);

  const weekday = dateObj.toLocaleString("en-US", { weekday: "long" });
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "long" });
  const year = dateObj.getFullYear();

  const formattedDate = `${weekday}, ${day} ${month} ${year}`;

  let hours = dateObj.getHours();
  const period = hours >= 12 ? "p.m" : "a.m";
  hours = hours % 12 || 12;
  const formattedTime = `${hours} ${period} onwards`;

  return { date: formattedDate, time: formattedTime };
}

