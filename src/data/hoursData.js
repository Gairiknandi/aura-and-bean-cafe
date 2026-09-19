/**
 * Operating Hours Dataset & Real-Time Status Helpers
 */

export const WEEKLY_SCHEDULE = [
  { dayIndex: 1, name: 'Monday', hours: '7:00 AM – 9:00 PM' },
  { dayIndex: 2, name: 'Tuesday', hours: '7:00 AM – 9:00 PM' },
  { dayIndex: 3, name: 'Wednesday', hours: '7:00 AM – 9:00 PM' },
  { dayIndex: 4, name: 'Thursday', hours: '7:00 AM – 9:00 PM' },
  { dayIndex: 5, name: 'Friday', hours: '7:00 AM – 10:00 PM', lateNote: '(Late Night Jazz)' },
  { dayIndex: 6, name: 'Saturday', hours: '8:00 AM – 10:00 PM' },
  { dayIndex: 0, name: 'Sunday', hours: '8:00 AM – 8:00 PM' }
];

export function getLiveHoursStatus(date = new Date()) {
  const day = date.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = date.getHours();
  const minute = date.getMinutes();
  const timeDecimal = hour + minute / 60;

  let schedule = { open: 7, close: 21, closeStr: '9:00 PM', openStr: '7:00 AM' };
  if (day === 5) {
    schedule = { open: 7, close: 22, closeStr: '10:00 PM', openStr: '7:00 AM' };
  } else if (day === 6) {
    schedule = { open: 8, close: 22, closeStr: '10:00 PM', openStr: '8:00 AM' };
  } else if (day === 0) {
    schedule = { open: 8, close: 20, closeStr: '8:00 PM', openStr: '8:00 AM' };
  }

  const isOpen = timeDecimal >= schedule.open && timeDecimal < schedule.close;

  return {
    isOpen,
    currentDay: day,
    schedule,
    headerText: isOpen
      ? `Open Now • Closes ${schedule.closeStr}`
      : `Closed Now • Opens ${schedule.openStr}`,
    bannerText: isOpen
      ? `Open Today Until ${schedule.closeStr}`
      : `Currently Closed • Reopens at ${schedule.openStr}`,
    bigStatusTitle: isOpen ? 'OPEN NOW' : 'CLOSED NOW',
    bigStatusHeadline: isOpen
      ? 'Brewing Fresh Coffee Right Now'
      : 'Resting Our Grinders For The Evening',
    bigStatusDetail: isOpen
      ? `Today's hours: ${schedule.openStr} – ${schedule.closeStr}. Drop in or book ahead!`
      : `We will reopen tomorrow at ${schedule.openStr}. Table bookings for tomorrow are open!`,
    mobileHours: `${schedule.openStr} – ${schedule.closeStr}`
  };
}

export function formatDateToYMD(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayDateString() {
  return formatDateToYMD(new Date());
}

export function getTomorrowDateString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatDateToYMD(d);
}
