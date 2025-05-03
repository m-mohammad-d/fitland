import moment from "jalali-moment";

export function formatJalaliDate(input: string | number): string {
  const date = moment(Number(input));

  return date.format("jYYYY/jMM/jDD HH:mm");
}
