export function getMonthWeeks(year: number, month: number): string[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const weeks: string[][] = [];
  let currentWeek: string[] = [];

  const startPad = firstDay.getDay(); 
  for (let i = 0; i < startPad; i++) {
    currentWeek.push("");
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    currentWeek.push(toISODate(date));

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push("");
    weeks.push(currentWeek);
  }

  return weeks;
}

export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function formatWeekLabel(weekIndex: number): string {
  return `Wk ${weekIndex + 1}`;
}