<?php

use CRM_HRLeaveAndAbsences_BAO_LeaveRequest as LeaveRequest;

/**
 * Class CRM_HRLeaveAndAbsences_Service_LeaveHoursBalanceChangeCalculation
 */
class CRM_HRLeaveAndAbsences_Service_LeaveHoursBalanceChangeCalculation
  implements CRM_HRLeaveAndAbsences_Service_LeaveBalanceChangeCalculation {

  /**
   * Returns the balance change amount in hours for a leave request
   * date
   *
   * @param CRM_HRLeaveAndAbsences_BAO_LeaveRequest $leaveRequest
   * @param DateTime $leaveDate
   * @param array $balanceChanges
   *   An array containing balance changes for the
   *   Leave Request dates.
   *
   * @return float
   */
  public function getAmount(LeaveRequest $leaveRequest, DateTime $leaveDate, $balanceChanges) {
    $fromDate = new DateTime($leaveRequest->from_date);
    $toDate = new DateTime($leaveRequest->to_date);

    $amount = $balanceChanges['breakdown'][$leaveDate->format('Y-m-d')]['amount'];

    if($leaveDate->format('Y-m-d') == $fromDate->format('Y-m-d') && $amount != 0) {
      return $leaveRequest->from_date_amount;
    }

    if($leaveDate->format('Y-m-d') == $toDate->format('Y-m-d') && $amount != 0) {
      return $leaveRequest->to_date_amount;
    }

    return $amount;
  }
}
