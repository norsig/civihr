/* eslint-env amd, jasmine */

define([
  'common/angular',
  'common/lodash',
  'common/moment',
  'mocks/data/option-group.data',
  'mocks/data/absence-type.data',
  'mocks/data/leave-request.data',
  'common/services/notification.service',
  'common/services/pub-sub',
  'leave-absences/shared/config',
  'leave-absences/manager-leave/app'
], function (angular, _, moment, optionGroupMock, absenceTypeData, leaveRequestData) {
  'use strict';

  describe('leaveRequestActions', function () {
    var $componentController, $log, $q, $rootScope, controller,
      LeaveRequestInstance, dialog, sharedSettings, role, leaveRequest,
      LeavePopup, notification, pubSub;
    var absenceTypes = _.indexBy(absenceTypeData.all().values, 'id');
    var leaveRequestStatuses = _.indexBy(optionGroupMock.getCollection('hrleaveandabsences_leave_request_status'), 'value');

    beforeEach(module('manager-leave'));

    beforeEach(inject(['shared-settings', function (_sharedSettings_) {
      sharedSettings = _sharedSettings_;
    }]));

    beforeEach(inject(function (_$componentController_, _$log_, _$q_,
    _$rootScope_, _dialog_, _LeaveRequestInstance_, _LeavePopup_,
    _notificationService_, _pubSub_) {
      $componentController = _$componentController_;
      $log = _$log_;
      $q = _$q_;
      $rootScope = _$rootScope_;
      dialog = _dialog_;
      LeaveRequestInstance = _LeaveRequestInstance_;
      LeavePopup = _LeavePopup_;
      notification = _notificationService_;
      pubSub = _pubSub_;
    }));

    beforeEach(function () {
      window.alert = function () {}; // prevent alert from being logged in console

      spyOn($log, 'debug');
      spyOn(pubSub, 'publish').and.callThrough();
    });

    beforeEach(function () {
      role = 'staff';
      leaveRequest = getRequest();

      makeRequestExpired(leaveRequest, false);
      compileComponent();
    });

    it('is initialized', function () {
      expect($log.debug).toHaveBeenCalled();
    });

    describe('when leave request status is "awaiting for approval"', function () {
      beforeEach(function () {
        leaveRequest = getRequest('leave', 'awaitingApproval');
      });

      describe('when the user is admin', function () {
        beforeEach(function () {
          role = 'admin';

          compileComponent();
        });

        it('shows actions "Respond", "Approve", "Reject", "Cancel" and "Delete"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['respond', 'approve', 'reject', 'cancel', 'delete']);
        });
      });

      describe('when the user is manager', function () {
        beforeEach(function () {
          role = 'manager';

          compileComponent();
        });

        it('shows actions "Respond", "Approve", "Reject" and "Cancel"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['respond', 'approve', 'reject', 'cancel']);
        });
      });

      describe('when the user is staff', function () {
        beforeEach(function () {
          role = 'staff';

          compileComponent();
        });

        it('shows actions "Edit", "Cancel"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['edit', 'cancel']);
        });
      });
    });

    describe('when leave request status is "more information required"', function () {
      beforeEach(function () {
        leaveRequest = getRequest('leave', 'moreInformationRequired');
      });

      describe('when the user is admin', function () {
        beforeEach(function () {
          role = 'admin';

          compileComponent();
        });

        it('shows actions "Edit", "Cancel" and "Delete"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['edit', 'cancel', 'delete']);
        });
      });

      describe('when the user is manager', function () {
        beforeEach(function () {
          role = 'manager';

          compileComponent();
        });

        it('shows actions "Edit" and "Cancel"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['edit', 'cancel']);
        });
      });

      describe('when the user is staff', function () {
        beforeEach(function () {
          role = 'staff';

          compileComponent();
        });

        it('shows actions "Respond" and "Cancel"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['respond', 'cancel']);
        });
      });
    });

    describe('when leave request status is "approved"', function () {
      beforeEach(function () {
        leaveRequest = getRequest('leave', 'approved');
      });

      describe('when the user is admin', function () {
        beforeEach(function () {
          role = 'admin';

          compileComponent();
        });

        it('shows actions "Edit", "Cancel" and "Delete"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['edit', 'cancel', 'delete']);
        });
      });

      describe('when the user is manager', function () {
        beforeEach(function () {
          role = 'manager';

          compileComponent();
        });

        it('shows actions "Edit"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['edit']);
        });
      });

      describe('when the user is staff', function () {
        beforeEach(function () {
          role = 'staff';

          compileComponent();
        });

        it('shows actions "View"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['view']);
        });
      });
    });

    describe('when leave request status is "rejected"', function () {
      beforeEach(function () {
        leaveRequest = getRequest('leave', 'rejected');
      });

      describe('when the user is admin', function () {
        beforeEach(function () {
          role = 'admin';

          compileComponent();
        });

        it('shows actions "Edit", "Cancel" and "Delete"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['edit', 'cancel', 'delete']);
        });
      });

      describe('when the user is manager', function () {
        beforeEach(function () {
          role = 'manager';

          compileComponent();
        });

        it('shows actions "Edit"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['edit']);
        });
      });

      describe('when the user is staff', function () {
        beforeEach(function () {
          role = 'staff';

          compileComponent();
        });

        it('shows actions "View"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['view']);
        });
      });
    });

    describe('when leave request status is "cancelled"', function () {
      beforeEach(function () {
        leaveRequest = getRequest('leave', 'cancelled');
      });

      describe('when the user is admin', function () {
        beforeEach(function () {
          role = 'admin';

          compileComponent();
        });

        it('shows actions "Edit" and "Delete"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['edit', 'delete']);
        });
      });

      describe('when the user is manager', function () {
        beforeEach(function () {
          role = 'manager';

          compileComponent();
        });

        it('shows actions "Edit"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['edit']);
        });
      });

      describe('when the user is staff', function () {
        beforeEach(function () {
          role = 'staff';

          compileComponent();
        });

        it('shows actions "View"', function () {
          expect(flattenActions(controller.allowedActions)).toEqual(['view']);
        });
      });
    });

    describe('when leave request has TOIL type', function () {
      beforeEach(function () {
        leaveRequest = getRequest('toil', 'awaitingApproval');
      });

      describe('when not expired', function () {
        beforeEach(function () {
          makeRequestExpired(leaveRequest, false);
        });

        describe('when the user is admin', function () {
          beforeEach(function () {
            role = 'admin';

            compileComponent();
          });

          it('includes "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(true);
          });
        });

        describe('when the user is manager', function () {
          beforeEach(function () {
            role = 'manager';

            compileComponent();
          });

          it('includes "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(true);
          });
        });

        describe('when the user is staff', function () {
          beforeEach(function () {
            role = 'staff';

            compileComponent();
          });

          it('includes "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(true);
          });
        });
      });

      describe('when expired', function () {
        beforeEach(function () {
          makeRequestExpired(leaveRequest, true);
        });

        describe('when the user is admin', function () {
          beforeEach(function () {
            role = 'admin';

            compileComponent();
          });

          it('includes "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(true);
          });
        });

        describe('when the user is manager', function () {
          beforeEach(function () {
            role = 'manager';

            compileComponent();
          });

          it('includes "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(true);
          });
        });

        describe('when the user is staff', function () {
          beforeEach(function () {
            role = 'staff';

            compileComponent();
          });

          it('does not include "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(false);
          });
        });
      });
    });

    describe('when leave request has Sickness type', function () {
      beforeEach(function () {
        leaveRequest = getRequest('sick', 'awaitingApproval');
      });

      describe('when not expired', function () {
        beforeEach(function () {
          makeRequestExpired(leaveRequest, false);
        });

        describe('when the user is admin', function () {
          beforeEach(function () {
            role = 'admin';

            compileComponent();
          });

          it('includes "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(true);
          });
        });

        describe('when the user is manager', function () {
          beforeEach(function () {
            role = 'manager';

            compileComponent();
          });

          it('includes "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(true);
          });
        });

        describe('when the user is staff', function () {
          beforeEach(function () {
            role = 'staff';

            compileComponent();
          });

          it('does not include "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(false);
          });
        });
      });

      describe('when expired', function () {
        beforeEach(function () {
          makeRequestExpired(leaveRequest, true);
        });

        describe('when the user is admin', function () {
          beforeEach(function () {
            role = 'admin';

            compileComponent();
          });

          it('includes "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(true);
          });
        });

        describe('when the user is manager', function () {
          beforeEach(function () {
            role = 'manager';

            compileComponent();
          });

          it('includes "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(true);
          });
        });

        describe('when the user is staff', function () {
          beforeEach(function () {
            role = 'staff';

            compileComponent();
          });

          it('does not include "Cancel" action', function () {
            expect(_.includes(flattenActions(controller.allowedActions), 'cancel')).toBe(false);
          });
        });
      });
    });

    describe('when the leave request is a public holiday', function () {
      beforeEach(function () {
        leaveRequest.request_type = 'public_holiday';
      });

      describe('when the user is an admin', function () {
        beforeEach(function () {
          role = 'admin';

          compileComponent();
        });

        it('includes the "Delete" action', function () {
          expect(_.includes(flattenActions(controller.allowedActions), 'delete')).toBe(true);
        });
      });

      describe('when the user is a manager', function () {
        beforeEach(function () {
          role = 'manager';

          compileComponent();
        });

        it('does not include the "Delete" action', function () {
          expect(_.includes(flattenActions(controller.allowedActions), 'delete')).toBe(false);
        });
      });

      describe('when the user is a staff', function () {
        beforeEach(function () {
          role = 'staff';

          compileComponent();
        });

        it('does not include the "Delete" action', function () {
          expect(_.includes(flattenActions(controller.allowedActions), 'delete')).toBe(false);
        });
      });
    });

    describe('when the user wants to change status of leave request', function () {
      // Any action, role or request could be specified here
      var action = 'approve';

      beforeEach(function () {
        // Any role or request could be specified here
        role = 'admin';
        leaveRequest = getRequest();

        spyOn($rootScope, '$emit');
        resolveDialogWith(null);
        controller.action(action);
        $rootScope.$digest();
        compileComponent();
      });

      it('shows a confirmation dialog', function () {
        expect(dialog.open).toHaveBeenCalled();
      });

      it('does not emit an event', function () {
        expect($rootScope.$emit).not.toHaveBeenCalled();
      });

      describe('when the user confirms the action', function () {
        describe('when the action is successfully executed', function () {
          beforeEach(function () {
            spyOn(leaveRequest, action).and.returnValue($q.resolve());
            resolveDialogWith(true);
            controller.action(action);
            $rootScope.$digest();
          });

          it('emits an event', function () {
            expect(pubSub.publish)
              .toHaveBeenCalledWith('LeaveRequest::statusUpdate', {
                status: action,
                leaveRequest: leaveRequest
              });
          });
        });

        describe('when original balance change has changed', function () {
          beforeEach(function () {
            var currentBreakdown = leaveRequestData.balanceChangeBreakdown();

            currentBreakdown['amount']++;

            spyOn(leaveRequest, action).and.returnValue($q.resolve());
            spyOn(leaveRequest, 'calculateBalanceChange').and.returnValue($q.resolve(currentBreakdown));
            controller.action(action);
            $rootScope.$digest();
          });

          it('asks if user would like to proceed with balance recalculation', function () {
            expect(dialog.open)
              .toHaveBeenCalledWith(jasmine.objectContaining({
                title: 'Recalculate Balance Change?'
              }));
          });
        });

        describe('when the action is rejected by server', function () {
          beforeEach(function () {
            spyOn(leaveRequest, action).and.returnValue($q.reject());
            spyOn(notification, 'error').and.callThrough();
            resolveDialogWith(true);
            controller.action(action);
            $rootScope.$digest();
          });

          it('does not emit an event', function () {
            expect(pubSub.publish).not.toHaveBeenCalled();
          });

          it('shows a notification', function () {
            expect(notification.error).toHaveBeenCalled();
          });
        });
      });
    });

    describe('openLeavePopup()', function () {
      var event;
      var leaveRequest = { key: 'value' };
      var leaveType = 'some_leave_type';
      var selectedContactId = '101';
      var isSelfRecord = true;

      beforeEach(function () {
        event = jasmine.createSpyObj('event', ['stopPropagation']);
        spyOn(LeavePopup, 'openModal');
        controller.openLeavePopup(event, leaveRequest, leaveType, selectedContactId, isSelfRecord);
      });

      it('opens the leave request popup', function () {
        expect(LeavePopup.openModal).toHaveBeenCalledWith(leaveRequest, leaveType, selectedContactId, isSelfRecord);
      });

      it('stops the event from propagating', function () {
        expect(event.stopPropagation).toHaveBeenCalled();
      });
    });

    /**
     * Flattens actions object into an array of actions keys
     *
     * @param  {Object} actions - object, containing actions keys
     * @return {Array} actions keys
     */
    function flattenActions (actions) {
      return _.map(actions, function (action) {
        return action.key;
      });
    }

    /**
     * Returns a mocked request by a given absence type
     *
     * @param  {string} type - leave|toil|sick, optional
     * @param  {string} status - according to sharedSettings.statusNames, optional
     * @return {LeaveRequestInstance}
     */
    function getRequest (type, status) {
      type = type || 'leave';

      var map = { leave: '1', toil: '2', sick: '3' };
      var statuses = _.indexBy(optionGroupMock.getCollection('hrleaveandabsences_leave_request_status'), 'name');
      var leaveRequestMock = _.find(leaveRequestData.all().values, { type_id: map[type] });
      var leaveRequest = LeaveRequestInstance.init(leaveRequestMock, true);

      if (status) {
        leaveRequest.status_id = statuses[sharedSettings.statusNames[status]].value;
      }

      return leaveRequest;
    }

    /**
     * Mocks the current time in a such way
     * that a request becomes expired (or not expired)
     *
     * @param {LeaveRequestInstance} leaveRequest
     * @param {boolean} isExpired
     */
    function makeRequestExpired (leaveRequest, isExpired) {
      var dateMock = moment(leaveRequest.from_date).add((isExpired ? 1 : -1), 'days').toDate();
      jasmine.clock().mockDate(dateMock);
    }

    /**
     * Spies on dialog.open() method and resolves it with the given value
     *
     * @param {any} value
     */
    function resolveDialogWith (value) {
      var spy;

      if (typeof dialog.open.calls !== 'undefined') {
        spy = dialog.open;
      } else {
        spy = spyOn(dialog, 'open');
      }

      spy.and.callFake(function (options) {
        return $q.resolve()
          .then(function () {
            return options.onConfirm && value ? options.onConfirm() : null;
          })
          .then(function () {
            return value;
          });
      });
    }

    function compileComponent () {
      controller = $componentController('leaveRequestActions', null, {
        leaveRequest: leaveRequest,
        role: role,
        absenceTypes: absenceTypes,
        leaveRequestStatuses: leaveRequestStatuses
      });
    }
  });
});
