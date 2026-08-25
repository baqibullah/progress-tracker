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
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d); // local midnight, not UTC
}

export function formatWeekLabel(weekIndex: number): string {
  return `Week ${weekIndex + 1}`;
}

export function getMonthWeeksStrict(year: number, month: number): string[][] {
  const lastDay = new Date(year, month + 1, 0).getDate();
  const allDates: string[] = [];
  for (let d = 1; d <= lastDay; d++) {
    allDates.push(toISODate(new Date(year, month, d)));
  }

  const weeks: string[][] = [];
  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7));
  }
  return weeks;
}

export function getDayAbbrev(date: string): string {
  return fromISODate(date).toLocaleDateString("default", { weekday: "short" });
}
