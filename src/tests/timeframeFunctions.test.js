import { getTaskDates, convertDateHeaderToDate, displayTask } from '../js/timeframe/timeframeFunctions.js';

test('Get dates from lowest start date to highest end date.', () => {
  const yearly = {
    '1bgFDzxn2me10pcNe1lz': {
      time: {
        startDate: "2020/05/03",
        endDate: "2021/07/02"
      }
    }
  };
  const monthly = {
    '1bgFDzxn2me10pcNe1lz': {
      time: {
        startDate: "2020/05/03",
        endDate: "2020/06/06"
      }
    }
  };
  const weekly = {
    '1bgFDzxn2me10pcNe1lz': {
      time: {
        startDate: "2020/08/11",
        endDate: "2020/08/18"
      }
    }
  };
  const daily = {
    '1bgFDzxn2me10pcNe1lz': {
      time: {
        startDate: "2020/05/03",
        endDate: "2020/05/03"
      }
    }
  };

  expect(getTaskDates(['1bgFDzxn2me10pcNe1lz'], yearly, 'yearly'))
    .toEqual([
      {
        date: new Date(2020, 0),
        tasks: []
      },
      {
        date: new Date(2021, 0),
        tasks: []
      }
    ]);
  expect(getTaskDates(['1bgFDzxn2me10pcNe1lz'], monthly, 'monthly'))
    .toEqual([
      {
        date: new Date(2020, 4),
        tasks: []
      },
      {
        date: new Date(2020, 5),
        tasks: []
      }
    ]);
    expect(getTaskDates(['1bgFDzxn2me10pcNe1lz'], weekly, 'weekly'))
      .toEqual([
        {
          date: new Date(2020, 7, 10),
          tasks: []
        },
        {
          date: new Date(2020, 7, 17),
          tasks: []
        }
      ]);
    expect(getTaskDates(['1bgFDzxn2me10pcNe1lz'], daily, 'daily'))
      .toEqual([
        {
          date: new Date(2020, 4, 3),
          tasks: []
        }
      ]);
});

test('Convert date header to date', () => {
  expect(convertDateHeaderToDate('yearly', '2020'))
    .toEqual(new Date(2020, 0));
  expect(convertDateHeaderToDate('monthly', '05/2020'))
    .toEqual(new Date(2020, 4));
  expect(convertDateHeaderToDate('weekly', '01/05/2020-08/05/2020'))
    .toEqual(new Date(2020, 4, 1));
  expect(convertDateHeaderToDate('daily', '01/05/2020'))
    .toEqual(new Date(2020, 4, 1));
  expect(convertDateHeaderToDate('daily', '...01/05/2020'))
    .toEqual(new Date(2020, 4, 1));
});

test('Check if task is equal to selected task', () => {
  const tasks = {
    '1bgFDzxn2me10pcNe1lz': {
      parent: ''
    },
    '9NuEAxhYIMrzGuQRYPqq': {
      parent: '1bgFDzxn2me10pcNe1lz'
    },
    'DPLKCYCgDKuhagAgdzzK': {
      parent: ''
    }
  };

  expect(displayTask('1bgFDzxn2me10pcNe1lz', tasks, '1bgFDzxn2me10pcNe1lz'))
    .toBeTruthy();
  expect(displayTask('1bgFDzxn2me10pcNe1lz', tasks, '9NuEAxhYIMrzGuQRYPqq'))
    .toBeTruthy();
  expect(displayTask('1bgFDzxn2me10pcNe1lz', tasks, 'DPLKCYCgDKuhagAgdzzK'))
    .toBeFalsy();
});
