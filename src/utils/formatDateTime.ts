const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export interface FormattedDateTime {
  date: string;
  time: string;
}

export function formatDateTime(isoString?: string | null): FormattedDateTime {
  if (!isoString) {
    return { date: '-', time: '-' };
  }

  const [datePart, timePart = ''] = isoString.split('T');
  const [yearStr, monthStr, dayStr] = datePart.split('-');

  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1;
  const day = Number(dayStr);

  if (!year || isNaN(monthIndex) || !day || monthIndex < 0 || monthIndex > 11) {
    return { date: '-', time: '-' };
  }

  const month = MONTH_NAMES[monthIndex];
  const weekday = WEEKDAY_NAMES[new Date(Date.UTC(year, monthIndex, day)).getUTCDay()];
  const formattedDate = `${weekday}, ${day} ${month} ${year}`;

  const hours24 = Number(timePart.split(':')[0]) || 0;
  const period = hours24 >= 12 ? 'p.m' : 'a.m';
  const hours12 = hours24 % 12 || 12;
  const formattedTime = `${hours12} ${period} onwards`;

  return { date: formattedDate, time: formattedTime };
}
