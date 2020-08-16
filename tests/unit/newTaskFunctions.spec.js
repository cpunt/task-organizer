import { dateOperatorTimeframe, convertDateToInputString, validDate } from '@/js/newTask/newTaskFunctions.js';

test('Add or subtract one timeframe unit from date', () => {
  const date = new Date(2022, 5, 7)
  expect(dateOperatorTimeframe('yearly', date, '+'))
    .toEqual(new Date(2023, 5, 7));
  expect(dateOperatorTimeframe('monthly', date, '-'))
    .toEqual(new Date(2022, 4, 7));
  expect(dateOperatorTimeframe('weekly', date, '+'))
    .toEqual(new Date(2022, 5, 14));
});

test('Converts date input into date string', () => {
  expect(convertDateToInputString(new Date('2024/08/09')))
    .toBe('2024-08-09');
});

test('Check if date is inbetween min and max date', () => {
  const minDate = '2021/01/01';
  const maxDate = '2021/12/12';
  expect(validDate('2021/05/01', minDate, maxDate))
    .toBeTruthy();
  expect(validDate('2020/05/01', minDate, maxDate))
    .toBeFalsy();
  expect(validDate('', minDate, maxDate))
    .toBeFalsy();
});
