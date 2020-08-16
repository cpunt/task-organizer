import { getDateIndex, addZero, setDateToTimeframe, formatDate, setWeeklyDate } from '@/js/sharedFunctions.js';

test('Get Index of date', () => {
  expect(getDateIndex('yearly', new Date('2020-06-03'), new Date('2025-01-10')))
    .toBe(5);
  expect(getDateIndex('monthly', new Date('2020-03-20'), new Date('2020-03-10')))
    .toBe(0);
  expect(getDateIndex('weekly', new Date('2020-03-03'), new Date('2020-03-11')))
    .toBe(1);
  expect(getDateIndex('daily', new Date('2020-03-20'), new Date('2020-03-10')))
    .toBe(-10);
});

test('Add zero to number under 10', () => {
  expect(addZero(20))
    .toBe(20);
  expect(addZero(7))
    .toBe('07');
});

test('Set date to timeframe', () => {
  expect(setDateToTimeframe('yearly', new Date('2020-08-11')))
    .toEqual(new Date(2020, 0));
  expect(setDateToTimeframe('monthly', new Date('2020-08-11')))
    .toEqual(new Date(2020, 7));
  expect(setDateToTimeframe('weekly', new Date('2020-08-11')))
    .toEqual(new Date(2020, 7, 10));
  expect(setDateToTimeframe('daily', new Date('2020-08-11')))
    .toEqual(new Date(2020, 7, 11));
});

test('Format date in day/month/year order', () => {
  expect(formatDate('2020-07-02'))
    .toBe('02/07/2020');
});

test('Set date to start of week ei monday', () => {
  expect(setWeeklyDate(new Date('2020-08-11')))
    .toEqual(new Date('2020-08-10'));
  expect(setWeeklyDate(new Date('2020-08-16')))
    .toEqual(new Date('2020-08-10'));
});
