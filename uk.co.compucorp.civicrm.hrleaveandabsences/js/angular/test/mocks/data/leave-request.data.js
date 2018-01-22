/* eslint-env amd, jasmine */

define([
  'common/lodash',
  'common/moment',
  'mocks/data/option-group.data',
  'mocks/data/absence-type.data'
], function (_, moment, optionGroupMock, absenceTypeData) {
  var mockData = {
    allData: {
      'is_error': 0,
      'version': 3,
      'count': 6,
      'values': [{
        'id': '17',
        'type_id': absenceTypeData.all().values[0]['id'],
        'contact_id': '202',
        'status_id': optionGroupMock.specificValue('hrleaveandabsences_leave_request_status', 'value', '1'),
        'from_date': '2016-02-02 00:00:00',
        'from_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'to_date': '2016-02-03 23:59:00',
        'to_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'balance_change': -2,
        'request_type': 'leave',
        'dates': [{
          'id': '21',
          'date': '2016-02-02'
        },
        {
          'id': '22',
          'date': '2016-02-03'
        }
        ]
      }, {
        'id': '18',
        'type_id': absenceTypeData.all().values[0]['id'],
        'contact_id': '202',
        'status_id': optionGroupMock.specificValue('hrleaveandabsences_leave_request_status', 'value', '1'),
        'from_date': '2016-08-17 00:00:00',
        'from_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'to_date': '2016-08-25 23:59:00',
        'to_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'balance_change': -1.5,
        'request_type': 'leave',
        'dates': [{
          'id': '23',
          'date': '2016-08-17'
        },
        {
          'id': '24',
          'date': '2016-08-18'
        },
        {
          'id': '25',
          'date': '2016-08-19'
        },
        {
          'id': '26',
          'date': '2016-08-20'
        },
        {
          'id': '27',
          'date': '2016-08-21'
        },
        {
          'id': '28',
          'date': '2016-08-22'
        },
        {
          'id': '29',
          'date': '2016-08-23'
        },
        {
          'id': '30',
          'date': '2016-08-24'
        },
        {
          'id': '31',
          'date': '2016-08-25'
        }
        ]
      }, {
        'id': '19',
        'type_id': absenceTypeData.all().values[0]['id'],
        'contact_id': '202',
        'status_id': optionGroupMock.specificValue('hrleaveandabsences_leave_request_status', 'value', '6'),
        'from_date': '2016-01-30 00:00:00',
        'from_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'to_date': '2016-02-01 23:59:00',
        'to_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'balance_change': -1,
        'request_type': 'leave',
        'dates': [{
          'id': '17',
          'date': '2016-01-30'
        },
        {
          'id': '18',
          'date': '2016-01-31'
        },
        {
          'id': '19',
          'date': '2016-02-01'
        }
        ]
      }, {
        'id': '20',
        'type_id': absenceTypeData.all().values[0]['id'],
        'contact_id': '202',
        'status_id': optionGroupMock.specificValue('hrleaveandabsences_leave_request_status', 'value', '3'),
        'from_date': '2016-11-23 00:00:00',
        'from_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'to_date': '2016-11-28 23:59:00',
        'to_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'balance_change': -5,
        'request_type': 'leave',
        'dates': [{
          'id': '32',
          'date': '2016-11-23'
        },
        {
          'id': '33',
          'date': '2016-11-24'
        },
        {
          'id': '34',
          'date': '2016-11-25'
        },
        {
          'id': '35',
          'date': '2016-11-26'
        },
        {
          'id': '36',
          'date': '2016-11-27'
        },
        {
          'id': '37',
          'date': '2016-11-28'
        }
        ]
      }, {
        'id': '21',
        'type_id': absenceTypeData.all().values[2]['id'],
        'contact_id': '202',
        'status_id': optionGroupMock.specificValue('hrleaveandabsences_leave_request_status', 'value', '5'),
        'from_date': '2016-06-03 00:00:00',
        'from_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'to_date': '2016-06-13 23:59:00',
        'to_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'balance_change': -10,
        'request_type': 'sickness',
        'sickness_reason': '2',
        'sickness_required_documents': '1,2',
        'dates': [{
          'id': '38',
          'date': '2016-06-03'
        },
        {
          'id': '39',
          'date': '2016-06-04'
        },
        {
          'id': '40',
          'date': '2016-06-05'
        },
        {
          'id': '41',
          'date': '2016-06-06'
        },
        {
          'id': '42',
          'date': '2016-06-07'
        },
        {
          'id': '43',
          'date': '2016-06-08'
        },
        {
          'id': '44',
          'date': '2016-06-09'
        },
        {
          'id': '45',
          'date': '2016-06-10'
        },
        {
          'id': '46',
          'date': '2016-06-11'
        },
        {
          'id': '47',
          'date': '2016-06-12'
        },
        {
          'id': '48',
          'date': '2016-06-13'
        }
        ]
      }, {
        'id': '22',
        'type_id': absenceTypeData.all().values[1]['id'],
        'contact_id': '202',
        'status_id': optionGroupMock.specificValue('hrleaveandabsences_leave_request_status', 'value', '4'),
        'from_date': '2016-01-01 00:00:00',
        'from_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'to_date': '2016-01-01 23:59:00',
        'to_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'balance_change': -1,
        'request_type': 'toil',
        'toil_duration': '181',
        'toil_expiry_date': '2017-05-25',
        'toil_to_accrue': '1',
        'dates': [{
          'id': '49',
          'date': '2016-06-01'
        }]
      }]
    },
    singleDataSuccess: {
      'is_error': 0,
      'version': 3,
      'count': 1,
      'values': [{
        'id': '17',
        'type_id': absenceTypeData.all().values[0]['id'],
        'contact_id': '202',
        'status_id': optionGroupMock.specificValue('hrleaveandabsences_leave_request_status', 'value', '1'),
        'from_date': '2016-02-01 00:00:00',
        'from_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'to_date': '2016-02-03 23:59:00',
        'to_date_type': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'value', '1'),
        'dates': [{
          'id': '20',
          'date': '2016-02-01'
        },
        {
          'id': '21',
          'date': '2016-02-02'
        },
        {
          'id': '22',
          'date': '2016-02-03'
        }
        ]
      }]
    },
    singleDataError: {
      'is_error': 1,
      'error_message': jasmine.any(String)
    },
    balanceChangeByAbsenceTypeData: {
      'is_error': 0,
      'version': 3,
      'count': 3,
      'values': (function () {
        var values = {};

        absenceTypeData.all().values.forEach(function (absenceType) {
          values[absenceType.id] = -1 * _.random(0, 25);
        });

        return values;
      })()
    },
    calculateBalanceChangeData: {
      'is_error': 0,
      'version': 3,
      'count': 2,
      'values': {
        'amount': -4,
        'breakdown': [{
          'date': '2016-11-05',
          'amount': 0,
          'type': {
            'id': 4,
            'value': 4,
            'label': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'label', 'Weekend')
          }
        }, {
          'date': '2016-11-06',
          'amount': 0,
          'type': {
            'id': 4,
            'value': 4,
            'label': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'label', 'Weekend')
          }
        }, {
          'date': '2016-11-07',
          'amount': 1,
          'type': {
            'id': 1,
            'value': 1,
            'label': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'label', 'All Day')
          }
        }, {
          'date': '2016-11-08',
          'amount': 1,
          'type': {
            'id': 1,
            'value': 1,
            'label': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'label', 'All Day')
          }
        }, {
          'date': '2016-11-09',
          'amount': 1,
          'type': {
            'id': 1,
            'value': 1,
            'label': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'label', 'All Day')
          }
        }, {
          'date': '2016-11-10',
          'amount': 1,
          'type': {
            'id': 1,
            'value': 1,
            'label': optionGroupMock.specificValue('hrleaveandabsences_leave_request_day_type', 'label', 'All Day')
          }
        }]
      }
    },
    /**
     * Generates random balance change breakdown
     *
     * @return {Object} mocking a response from LeaveRequest.getBreakdown API
     */
    balanceChangeBreakdown: (function () {
      var breakdown = [];
      var days = optionGroupMock.getCollection('hrleaveandabsences_leave_request_day_type');
      var dateFrom = moment('2017-06-09');

      for (var i = 1; i <= Math.ceil(Math.random() * 20); i++) {
        var day = _.sample(days);

        breakdown.push({
          id: i.toString(),
          type: day.value,
          label: day.label,
          date: dateFrom.add(1, 'days').format('YYYY-MM-DD'),
          amount: (-(Math.round(Math.random() * 4) / 4).toFixed(2)).toString()
        });
      }

      return {
        is_error: 0,
        version: 3,
        count: breakdown.length,
        values: breakdown
      };
    })(),
    isValidData: {
      'is_error': 0,
      'count': 0,
      'values': []
    },
    isNotValidData: {
      'is_error': 0,
      'count': 1,
      'values': {
        'from_date': [
          'Error 1',
          'Error 2'
        ],
        'to_date': [
          'Error 3',
          'Error 4'
        ]
      }
    },
    half_day_am_calculateBalanceChange: {
      'is_error': 0,
      'version': 3,
      'count': 2,
      'values': {
        'amount': -0.5,
        'breakdown': [{
          'date': '2017-01-04',
          'amount': 0.5,
          'type': {
            'id': 2,
            'value': 2,
            'label': 'Half-day AM'
          }
        }]
      }
    },
    all_day_calculateBalanceChange: {
      'is_error': 0,
      'version': 3,
      'count': 2,
      'values': {
        'amount': -2,
        'breakdown': [{
          'date': '2017-01-04',
          'amount': 1,
          'type': {
            'id': 1,
            'value': 1,
            'label': 'All Day'
          }
        }, {
          'date': '2017-01-05',
          'amount': 1,
          'type': {
            'id': 1,
            'value': 1,
            'label': 'All Day'
          }
        }]
      }
    },
    getComments: {
      'is_error': 0,
      'version': 3,
      'count': 1,
      'id': 3,
      'values': [{
        'comment_id': '3',
        'leave_request_id': '17',
        'text': 'test comment message',
        'contact_id': '202',
        'created_at': '2017-02-14 13:48:33'
      }]
    },
    addComment: {
      'is_error': 0,
      'version': 3,
      'count': 1,
      'id': 4,
      'values': [{
        'comment_id': '4',
        'leave_request_id': '17',
        'text': '111',
        'contact_id': '202',
        'created_at': '20170214200205'
      }]
    },
    deleteComment: {
      'is_error': 0,
      'version': 3,
      'count': 1,
      'values': 1
    },
    getAttachments: {
      'is_error': 0,
      'version': 3,
      'count': 2,
      'values': [{
        'name': 'LeaveRequestSampleFile1.txt',
        'mime_type': 'text/plain',
        'upload_date': '2017-03-02 13:38:02',
        'url': 'http://localhost:8900/index.php?q=civicrm/file&amp;reset=1&id=63&eid=1',
        'attachment_id': '63'
      },
      {
        'name': 'LeaveRequestSampleFile2.txt',
        'mime_type': 'text/plain',
        'upload_date': '2017-03-02 13:38:02',
        'url': 'http://localhost:8900/index.php?q=civicrm/file&amp;reset=1&id=64&eid=1',
        'attachment_id': '64'
      }
      ]
    },
    deleteAttachment: {
      'is_error': 0,
      'version': 3,
      'count': 0,
      'values': []
    },
    delete: {
      'is_error': 0,
      'version': 3,
      'count': 1,
      'values': true
    },
    isManagedByData: {
      'is_error': 0,
      'version': 3,
      'count': 1,
      'values': true
    },
    /**
     * Generates random work day for date
     *
     * @return {Object} mocking a response from LeaveRequest.getWorkDayForDate API
     */
    workDayForDate: (function () {
      var timeFrom = moment({
        hours: Math.ceil(Math.random() * 14),
        minutes: Math.ceil(Math.random() * 20)
      });

      return {
        is_error: 0,
        version: 3,
        count: 3,
        values: {
          time_from: timeFrom.format('hh:mm'),
          time_to: timeFrom
            .add(Math.ceil(Math.random() * 9), 'hours')
            .add(Math.ceil(Math.random() * 39), 'minutes')
            .format('hh:mm'),
          number_of_hours: '' + (Math.ceil(Math.random() * 24 / 0.25) * 0.25)
        }
      };
    })()
  };

  return {
    all: function () {
      return mockData.allData;
    },
    hoursTypeLeaveRequests: function () {
      return _.map(mockData.allData, function (request) {
        return _.assign(request, {
          from_date: request.from_date + ' 12:45:00',
          to_date: request.to_date + ' 16:15:00'
        });
      });
    },
    singleDataSuccess: function () {
      return mockData.singleDataSuccess;
    },
    singleDataError: function () {
      return mockData.singleDataError;
    },
    balanceChangeByAbsenceType: function () {
      return mockData.balanceChangeByAbsenceTypeData;
    },
    calculateBalanceChange: function () {
      return mockData.calculateBalanceChangeData;
    },
    getisValid: function () {
      return mockData.isValidData;
    },
    getNotIsValid: function () {
      return mockData.isNotValidData;
    },
    singleDayCalculateBalanceChange: function () {
      return mockData.half_day_am_calculateBalanceChange;
    },
    multipleDayCalculateBalanceChange: function () {
      return mockData.all_day_calculateBalanceChange;
    },
    findBy: function (key, value) {
      return _.find(mockData.allData.values, function (leaveRequest) {
        return leaveRequest[key] === value;
      });
    },
    balanceChangeBreakdown: function () {
      return _.cloneDeep(mockData.balanceChangeBreakdown);
    },
    workDayForDate: function () {
      return mockData.workDayForDate;
    },
    getComments: function () {
      return mockData.getComments;
    },
    addComment: function () {
      return mockData.addComment;
    },
    deleteComment: function () {
      return mockData.deleteComment;
    },
    getAttachments: function () {
      return mockData.getAttachments;
    },
    deleteAttachment: function () {
      return mockData.deleteAttachment;
    },
    delete: function () {
      return mockData.delete;
    },
    isManagedBy: function () {
      return mockData.isManagedByData;
    }
  };
});
