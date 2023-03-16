import {
  asSubCycle,
  asChineseHour,
  getShiftedRemainder,
  getBinaryDigits,
} from "./algorithms";

test.each([
  [1, 1],
  [6, 6],
  [12, 12],
  [25, 1],
  [30, 6],
  [36, 12],
  [49, 1],
  [54, 6],
  [60, 12],
])("success asSubCycle(%d)", (cycle, expected) => {
  expect(asSubCycle(cycle)).toBe(expected);
});
test.each([0, -10, 61, 100])("failed asSubCycle(%d)", (cycle) => {
  expect(() => asSubCycle(cycle)).toThrow(RangeError);
});

test.each([
  [0, 1],
  [1, 2],
  [2, 2],
  [3, 3],
  [4, 3],
  [5, 4],
  [6, 4],
  [7, 5],
  [8, 5],
  [9, 6],
  [10, 6],
  [11, 7],
  [12, 7],
  [13, 8],
  [14, 8],
  [15, 9],
  [16, 9],
  [17, 10],
  [18, 10],
  [19, 11],
  [20, 11],
  [21, 12],
  [22, 12],
  [23, 1],
])("success asChineseHour(%d)", (hour, expected) => {
  expect(asChineseHour(hour)).toBe(expected);
});
test.each([-1, -10, 25, 100])("failed asChineseHour(%d)", (hour) => {
  expect(() => asChineseHour(hour)).toThrow(RangeError);
});

test.each([
  [0, 8, 8],
  [1, 8, 1],
  [4, 8, 4],
  [7, 8, 7],
  [16, 8, 8],
  [17, 8, 1],
  [20, 8, 4],
  [23, 8, 7],
  [0, 6, 6],
  [1, 6, 1],
  [3, 6, 3],
  [5, 6, 5],
  [12, 6, 6],
  [13, 6, 1],
  [15, 6, 3],
  [17, 6, 5],
])("getShiftedRemainder(%d, %d)", (dividend, divisor, expected) => {
  expect(getShiftedRemainder(dividend, divisor)).toBe(expected);
});

test.each([
  [0, [0, 0, 0]],
  [1, [0, 0, 1]],
  [2, [0, 1, 0]],
  [3, [0, 1, 1]],
  [4, [1, 0, 0]],
  [5, [1, 0, 1]],
  [6, [1, 1, 0]],
  [7, [1, 1, 1]],
])("success getBinaryDigits(%d)", (number, expected) => {
  expect(getBinaryDigits(number)).toEqual(expected);
});
test.each([-1, -10, 8, 20])("failed getBinaryDigits(%d)", (number) => {
  expect(() => getBinaryDigits(number)).toThrow(RangeError);
});
