import moment from "jalali-moment";

export function getWorkingDays(startOffset = 2, endOffset = 9) {
  const today = moment().locale("fa");
  const workingDays = [];

  const weekDays = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];

  for (let i = startOffset; i <= endOffset; i++) {
    const date = today.clone().add(i, "days");
    const dayOfWeek = date.day();
    const dayName = weekDays[dayOfWeek];

    if (dayOfWeek !== 5) {
      workingDays.push({
        date: date.format("jMM/jDD"),
        day: dayName,
      });
    }
  }

  return workingDays;
}
