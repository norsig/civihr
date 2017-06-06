/* eslint-env amd, jasmine */
/* global inject */

define([
  'common/moment',
  'mocks/data/work-pattern-data',
  'leave-absences/shared/models/instances/calendar-instance'
], function (moment, mockData) {
  'use strict';

  describe('CalendarInstance', function () {
    var instance, mockedCalendar;

    beforeEach(module('leave-absences.models.instances'));
    beforeEach(inject(['CalendarInstance', function (CalendarInstance) {
      mockedCalendar = mockData.daysData().values[0];
      instance = CalendarInstance.init(mockedCalendar);
    }]));

    describe('init()', function () {
      var key, date;

      beforeEach(function () {
        key = Object.keys(instance.days)[0];
        date = moment(instance.days[key].date).valueOf();
      });

      it('converts the dates array to an object with timestamps as keys', function () {
        expect(+key).toBe(date);
      });
    });

    describe('isWorkingDay()', function () {
      it('determines if a given date is a working day', function () {
        expect(instance.isWorkingDay(getDate('working_day'))).toBe(true);
        expect(instance.isWorkingDay(getDate('non_working_day'))).toBe(false);
      });
    });

    describe('isNonWorkingDay()', function () {
      it('determines if a given date is a non working day', function () {
        expect(instance.isNonWorkingDay(getDate('non_working_day'))).toBe(true);
        expect(instance.isNonWorkingDay(getDate('working_day'))).toBe(false);
      });
    });

    describe('isWeekend()', function () {
      it('determines if a given date is a weekend', function () {
        expect(instance.isWeekend(getDate('weekend'))).toBe(true);
        expect(instance.isWeekend(getDate('working_day'))).toBe(false);
      });
    });

    function getDate (dayType) {
      return moment(Object.values(instance.days).find(function (data) {
        return data.type.name === dayType;
      }).date);
    }
  });
});
