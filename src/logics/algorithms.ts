import { CalendarChinese } from "date-chinese";

import { Hexagram, Line, Trigram, TrigramLines } from "./models";

const calendar = new CalendarChinese();

function asChineseHour(hour: number): number {
  const shifted = hour > 0 ? hour - 1 : 23;
  return Math.floor(shifted / 2) + 1;
}

function getShiftedRemainder(dividend: number, divisor: number): number {
  const remainder = dividend % divisor;
  return remainder > 0 ? remainder : divisor;
}

function getBinaryDigits(number: number): [number, number, number] {
  return [(number >> 2) % 2, (number >> 1) % 2, number % 2];
}

function getTrigramFromIndex(index: number): Trigram {
  return new Trigram(
    getBinaryDigits(index).map(
      (digit) => new Line(digit ? false : true)
    ) as TrigramLines
  );
}

export function createHexagramFromDateTime(dateTime: Date): Hexagram {
  calendar.fromDate(dateTime);
  const [, year, month, , day] = calendar.get();
  const hour = asChineseHour(dateTime.getHours());
  const dateSum = year + month + day;
  const allSum = dateSum + hour;
  const upper = getTrigramFromIndex(getShiftedRemainder(dateSum, 8) - 1);
  const lower = getTrigramFromIndex(getShiftedRemainder(allSum, 8) - 1);
  return Hexagram.fromTrigrams(
    lower,
    upper,
    getShiftedRemainder(allSum, 6) - 1
  );
}
