<?php

use CRM_Contact_BAO_Relationship as Relationship;
use CRM_Contact_BAO_RelationshipType as RelationshipType;
use CRM_HRLeaveAndAbsences_BAO_LeaveRequest as LeaveRequest;
use CRM_HRLeaveAndAbsences_Service_LeaveManager as LeaveManagerService;

/**
 * This class is a very simple builder responsible to create an array with
 * conditions that can be used to apply ACLs to Comments linked to Leave
 * Requests.
 */
class CRM_HRLeaveAndAbsences_ACL_LeaveRequestCommentsWhereClause {

  use CRM_HRLeaveAndAbsences_ACL_LeaveInformationTrait;

  /**
   * @var \CRM_HRLeaveAndAbsences_Service_LeaveManager
   */
  private $leaveManagerService;

  public function __construct(LeaveManagerService $leaveManagerService) {
    $this->leaveManagerService = $leaveManagerService;
  }

  /**
   * Builds the ACL clauses array to limit comments linked to a Leave Request.
   *
   * The Comments ACL rules for a Leave Request are:
   * - staff members: can see any comments added to their Leave Requests (
   * including admin and manager comments)
   * - leave approvers: can see any comments added to the Leave Requests of
   * their managees
   * - admins: can see any comments added to any Leave Requests
   *
   * This method returns an array that can be merged to the $conditions array
   * inside an implementation of hook_hrcomments_selectWhereClause
   *
   * @return array
   */
  public function get() {
    $conditions = [];
    if($this->leaveManagerService->currentUserIsAdmin()) {
      return $conditions;
    }

    $whereClauses = $this->getLeaveInformationACLWhereConditions('lr.contact_id');
    $whereClauses .= ' AND (lr.is_deleted = 0)';

    $leaveRequestTable = LeaveRequest::getTableName();
    $relationshipTable = Relationship::getTableName();
    $relationshipTypeTable = RelationshipType::getTableName();

    $conditions[] = "
      a.entity_id IN (
       SELECT lr.id
       FROM {$leaveRequestTable} lr
        LEFT JOIN {$relationshipTable} r ON lr.contact_id = r.contact_id_a
        LEFT JOIN {$relationshipTypeTable} rt ON rt.id = r.relationship_type_id
        WHERE $whereClauses
      )
    ";

    return $conditions;
  }
}
