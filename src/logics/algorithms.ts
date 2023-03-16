import { CalendarChinese } from "date-chinese";

import { Hexagram, Line, Trigram, TrigramLines } from "./models";

const calendar = new CalendarChinese();

export function asSubCycle(cycle: number): number {
  if (1 > cycle || cycle > 60) {
    throw new RangeError(`Invalid cycle: ${cycle}`);
  }
  return ((cycle - 1) % 12) + 1;
}

export function asChineseHour(hour: number): number {
  if (0 > hour || hour >= 24) {
    throw new RangeError(`Invalid hour: ${hour}`);
  }
  const shifted = hour < 23 ? hour + 1 : 0;
  return Math.floor(shifted / 2) + 1;
}

export function getShiftedRemainder(dividend: number, divisor: number): number {
  const remainder = dividend % divisor;
  return remainder > 0 ? remainder : divisor;
}

export function getBinaryDigits(number: number): [number, number, number] {
  if (0 > number || number >= 8) {
    throw new RangeError(`Invalid number: ${number}`);
  }
  return [(number >> 2) % 2, (number >> 1) % 2, number % 2];
}

function getTrigramFromIndex(index: number): Trigram {
  return new Trigram(
    getBinaryDigits(index - 1).map(
      (digit) => new Line(digit ? false : true)
    ) as TrigramLines
  );
}

export function createHexagramFromDateTime(dateTime: Date): Hexagram {
  calendar.fromDate(dateTime);
  const [, cycle, month, , day] = calendar.get();
  const subCycle = asSubCycle(cycle);
  const hour = asChineseHour(dateTime.getHours());
  const dateSum = subCycle + month + day;
  const allSum = dateSum + hour;
  const upper = getTrigramFromIndex(getShiftedRemainder(dateSum, 8));
  const lower = getTrigramFromIndex(getShiftedRemainder(allSum, 8));
  return Hexagram.fromTrigrams(lower, upper, getShiftedRemainder(allSum, 6));
}

export type NumberTriplet = [number, number, number];
export function createHexagramFromNumbers(numbers: NumberTriplet): Hexagram {
  const lower = getTrigramFromIndex(getShiftedRemainder(numbers[0], 8));
  const upper = getTrigramFromIndex(getShiftedRemainder(numbers[1], 8));
  return Hexagram.fromTrigrams(
    lower,
    upper,
    getShiftedRemainder(numbers[2], 6)
  );
}
