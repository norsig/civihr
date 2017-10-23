/* eslint-env amd, jasmine */

define([
  'common/lodash',
  'common/moment',
  'mocks/helpers/controller-on-changes',
  'mocks/data/option-group-mock-data',
  'mocks/data/absence-period-data',
  'mocks/apis/leave-request-api-mock',
  'leave-absences/shared/components/leave-widget/leave-widget-next-leave.component'
], function (_, moment, controllerOnChanges, OptionGroupData) {
  describe('leaveWidgetNextLeave', function () {
    var $componentController, $provide, $rootScope, $scope, ctrl, LeaveRequest,
      leaveRequestStatuses, OptionGroup, sharedSettings;
    var childComponentName = 'leave-widget-next-leave';
    var contactId = 101;

    beforeEach(module('leave-absences.components.leave-widget',
      'leave-absences.mocks', function (_$provide_) {
        $provide = _$provide_;
      }));

    beforeEach(inject(function (LeaveRequestAPIMock, OptionGroupAPIMock) {
      $provide.value('LeaveRequestAPI', LeaveRequestAPIMock);
      $provide.value('OptionGroup', OptionGroupAPIMock);
    }));

    beforeEach(inject(['$componentController', '$rootScope', 'LeaveRequest',
      'OptionGroup', 'shared-settings', function (_$componentController_,
      _$rootScope_, _LeaveRequest_, _OptionGroup_, _sharedSettings_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        LeaveRequest = _LeaveRequest_;
        leaveRequestStatuses = OptionGroupData.getCollection(
          'hrleaveandabsences_leave_request_status');
        OptionGroup = _OptionGroup_;
        sharedSettings = _sharedSettings_;
        spyOn($scope, '$emit').and.callThrough();
        spyOn(OptionGroup, 'valuesOf').and.callThrough();
        spyOn(LeaveRequest, 'all').and.callThrough();
      }]));

    beforeEach(function () {
      ctrl = $componentController('leaveWidgetNextLeave', {
        $scope: $scope
      });
      controllerOnChanges.setupController(ctrl);
    });

    it('should be defined', function () {
      expect(ctrl).toBeDefined();
    });

    describe('on init', function () {
      it('sets next leave request to NULL', function () {
        expect(ctrl.nextLeaveRequest).toBe(null);
      });

      it('fires a leave widget child is loading event', function () {
        expect($scope.$emit).toHaveBeenCalledWith(
          'LeaveWidget::childIsLoading', childComponentName);
      });
    });

    describe('bindings and dependencies', function () {
      describe('when bindings are ready', function () {
        var leaveRequestStatusIds;

        beforeEach(function () {
          leaveRequestStatusIds = leaveRequestStatuses.map(function (status) {
            return status.value;
          });
          controllerOnChanges.mockChange('contactId', contactId);
          controllerOnChanges.mockChange('leaveRequestStatuses',
            leaveRequestStatuses);
          $rootScope.$digest();
        });

        it('gets the next leave request for the contact, in the absence period, and with the specified statuses', function () {
          expect(LeaveRequest.all).toHaveBeenCalledWith({
            contact_id: contactId,
            from_date: { '>=': moment().format(sharedSettings.serverDateFormat) },
            status_id: { IN: leaveRequestStatusIds },
            options: { limit: 1, sort: 'from_date DESC' }
          });
        });

        it('loads the leave request day types', function () {
          expect(OptionGroup.valuesOf).toHaveBeenCalledWith('hrleaveandabsences_leave_request_day_type');
        });

        describe('after loading dependencies', function () {
          var expectedNextLeave, expectedBalanceDeduction;

          beforeEach(function () {
            LeaveRequest.all({
              contact_id: contactId,
              from_date: { '>=': moment().format(sharedSettings.serverDateFormat) },
              status_id: { IN: leaveRequestStatusIds },
              options: { limit: 1, sort: 'from_date DESC' }
            })
            .then(function (response) {
              expectedNextLeave = response.list[0];
              expectedNextLeave = _.assign({
                from_date_type_label: getDayTypeLabel(expectedNextLeave.from_date_type),
                to_date_type_label: getDayTypeLabel(expectedNextLeave.to_date_type)
              }, expectedNextLeave);
              expectedBalanceDeduction = Math.abs(expectedNextLeave.balance_change);
            });
            $rootScope.$digest();
          });

          it('stores the next leave request', function () {
            expect(ctrl.nextLeaveRequest).toEqual(expectedNextLeave);
          });

          it('stores the balance deduction', function () {
            expect(ctrl.balanceDeduction).toBe(expectedBalanceDeduction);
          });

          it('fires a leave widget child is ready event', function () {
            expect($scope.$emit).toHaveBeenCalledWith(
              'LeaveWidget::childIsReady', childComponentName);
          });

          function getDayTypeLabel (dayTypeId) {
            var dayType = _.find(OptionGroupData.getCollection(
              'hrleaveandabsences_leave_request_day_type'),
              function (dayType) {
                return +dayType.value === +dayTypeId;
              });

            return dayType.label;
          }
        });
      });
    });
  });
});
