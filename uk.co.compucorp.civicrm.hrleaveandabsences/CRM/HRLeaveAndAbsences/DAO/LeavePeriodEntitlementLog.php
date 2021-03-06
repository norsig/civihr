<?php
/*
+--------------------------------------------------------------------+
| CiviCRM version 4.7                                                |
+--------------------------------------------------------------------+
| Copyright CiviCRM LLC (c) 2004-2017                                |
+--------------------------------------------------------------------+
| This file is a part of CiviCRM.                                    |
|                                                                    |
| CiviCRM is free software; you can copy, modify, and distribute it  |
| under the terms of the GNU Affero General Public License           |
| Version 3, 19 November 2007 and the CiviCRM Licensing Exception.   |
|                                                                    |
| CiviCRM is distributed in the hope that it will be useful, but     |
| WITHOUT ANY WARRANTY; without even the implied warranty of         |
| MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.               |
| See the GNU Affero General Public License for more details.        |
|                                                                    |
| You should have received a copy of the GNU Affero General Public   |
| License and the CiviCRM Licensing Exception along                  |
| with this program; if not, contact CiviCRM LLC                     |
| at info[AT]civicrm[DOT]org. If you have questions about the        |
| GNU Affero General Public License or the licensing of CiviCRM,     |
| see the CiviCRM license FAQ at http://civicrm.org/licensing        |
+--------------------------------------------------------------------+
*/
/**
 * @package CRM
 * @copyright CiviCRM LLC (c) 2004-2017
 *
 * Generated from xml/schema/CRM/HRLeaveAndAbsences/LeavePeriodEntitlementLog.xml
 * DO NOT EDIT.  Generated by CRM_Core_CodeGen
 * (GenCodeChecksum:5e8e565d77ab7de370a19c219759ffc0)
 */
require_once 'CRM/Core/DAO.php';
require_once 'CRM/Utils/Type.php';
/**
 * CRM_HRLeaveAndAbsences_DAO_LeavePeriodEntitlementLog constructor.
 */
class CRM_HRLeaveAndAbsences_DAO_LeavePeriodEntitlementLog extends CRM_Core_DAO {
  /**
   * Static instance to hold the table name.
   *
   * @var string
   */
  static $_tableName = 'civicrm_hrleaveandabsences_leave_period_entitlement_log';
  /**
   * Should CiviCRM log any modifications to this table in the civicrm_log table.
   *
   * @var boolean
   */
  static $_log = true;
  /**
   * Unique LeavePeriodEntitlementLog ID
   *
   * @var int unsigned
   */
  public $id;
  /**
   * FK to LeavePeriodEntitlement
   *
   * @var int unsigned
   */
  public $entitlement_id;
  /**
   * FK to Contact. The contact that represents the user who made changes to this entitlement
   *
   * @var int unsigned
   */
  public $editor_id;
  /**
   * The entitlement amount for this Period Entitlement until created_date value
   *
   * @var float
   */
  public $entitlement_amount;
  /**
   * The comment added by the user about the calculation for this entitlement
   *
   * @var text
   */
  public $comment;
  /**
   * The date and time this entitlement was updated
   *
   * @var datetime
   */
  public $created_date;
  /**
   * Class constructor.
   */
  function __construct() {
    $this->__table = 'civicrm_hrleaveandabsences_leave_period_entitlement_log';
    parent::__construct();
  }
  /**
   * Returns foreign keys and entity references.
   *
   * @return array
   *   [CRM_Core_Reference_Interface]
   */
  static function getReferenceColumns() {
    if (!isset(Civi::$statics[__CLASS__]['links'])) {
      Civi::$statics[__CLASS__]['links'] = static ::createReferenceColumns(__CLASS__);
      Civi::$statics[__CLASS__]['links'][] = new CRM_Core_Reference_Basic(self::getTableName() , 'entitlement_id', 'civicrm_hrleaveandabsences_leave_period_entitlement', 'id');
      Civi::$statics[__CLASS__]['links'][] = new CRM_Core_Reference_Basic(self::getTableName() , 'editor_id', 'civicrm_contact', 'id');
      CRM_Core_DAO_AllCoreTables::invoke(__CLASS__, 'links_callback', Civi::$statics[__CLASS__]['links']);
    }
    return Civi::$statics[__CLASS__]['links'];
  }
  /**
   * Returns all the column names of this table
   *
   * @return array
   */
  static function &fields() {
    if (!isset(Civi::$statics[__CLASS__]['fields'])) {
      Civi::$statics[__CLASS__]['fields'] = array(
        'id' => array(
          'name' => 'id',
          'type' => CRM_Utils_Type::T_INT,
          'description' => 'Unique LeavePeriodEntitlementLog ID',
          'required' => true,
          'table_name' => 'civicrm_hrleaveandabsences_leave_period_entitlement_log',
          'entity' => 'LeavePeriodEntitlementLog',
          'bao' => 'CRM_HRLeaveAndAbsences_DAO_LeavePeriodEntitlementLog',
          'localizable' => 0,
        ) ,
        'entitlement_id' => array(
          'name' => 'entitlement_id',
          'type' => CRM_Utils_Type::T_INT,
          'description' => 'FK to LeavePeriodEntitlement',
          'required' => true,
          'table_name' => 'civicrm_hrleaveandabsences_leave_period_entitlement_log',
          'entity' => 'LeavePeriodEntitlementLog',
          'bao' => 'CRM_HRLeaveAndAbsences_DAO_LeavePeriodEntitlementLog',
          'localizable' => 0,
          'FKClassName' => 'CRM_HRLeaveAndAbsences_DAO_LeavePeriodEntitlement',
        ) ,
        'editor_id' => array(
          'name' => 'editor_id',
          'type' => CRM_Utils_Type::T_INT,
          'description' => 'FK to Contact. The contact that represents the user who made changes to this entitlement',
          'required' => true,
          'table_name' => 'civicrm_hrleaveandabsences_leave_period_entitlement_log',
          'entity' => 'LeavePeriodEntitlementLog',
          'bao' => 'CRM_HRLeaveAndAbsences_DAO_LeavePeriodEntitlementLog',
          'localizable' => 0,
          'FKClassName' => 'CRM_Contact_DAO_Contact',
        ) ,
        'entitlement_amount' => array(
          'name' => 'entitlement_amount',
          'type' => CRM_Utils_Type::T_MONEY,
          'title' => ts('Entitlement Amount') ,
          'description' => 'The entitlement amount for this Period Entitlement until created_date value',
          'required' => true,
          'precision' => array(
            20,
            2
          ) ,
          'table_name' => 'civicrm_hrleaveandabsences_leave_period_entitlement_log',
          'entity' => 'LeavePeriodEntitlementLog',
          'bao' => 'CRM_HRLeaveAndAbsences_DAO_LeavePeriodEntitlementLog',
          'localizable' => 0,
        ) ,
        'comment' => array(
          'name' => 'comment',
          'type' => CRM_Utils_Type::T_TEXT,
          'title' => ts('Comment') ,
          'description' => 'The comment added by the user about the calculation for this entitlement',
          'table_name' => 'civicrm_hrleaveandabsences_leave_period_entitlement_log',
          'entity' => 'LeavePeriodEntitlementLog',
          'bao' => 'CRM_HRLeaveAndAbsences_DAO_LeavePeriodEntitlementLog',
          'localizable' => 0,
        ) ,
        'created_date' => array(
          'name' => 'created_date',
          'type' => CRM_Utils_Type::T_DATE + CRM_Utils_Type::T_TIME,
          'title' => ts('Created Date') ,
          'description' => 'The date and time this entitlement was updated',
          'table_name' => 'civicrm_hrleaveandabsences_leave_period_entitlement_log',
          'entity' => 'LeavePeriodEntitlementLog',
          'bao' => 'CRM_HRLeaveAndAbsences_DAO_LeavePeriodEntitlementLog',
          'localizable' => 0,
        ) ,
      );
      CRM_Core_DAO_AllCoreTables::invoke(__CLASS__, 'fields_callback', Civi::$statics[__CLASS__]['fields']);
    }
    return Civi::$statics[__CLASS__]['fields'];
  }
  /**
   * Return a mapping from field-name to the corresponding key (as used in fields()).
   *
   * @return array
   *   Array(string $name => string $uniqueName).
   */
  static function &fieldKeys() {
    if (!isset(Civi::$statics[__CLASS__]['fieldKeys'])) {
      Civi::$statics[__CLASS__]['fieldKeys'] = array_flip(CRM_Utils_Array::collect('name', self::fields()));
    }
    return Civi::$statics[__CLASS__]['fieldKeys'];
  }
  /**
   * Returns the names of this table
   *
   * @return string
   */
  static function getTableName() {
    return self::$_tableName;
  }
  /**
   * Returns if this table needs to be logged
   *
   * @return boolean
   */
  function getLog() {
    return self::$_log;
  }
  /**
   * Returns the list of fields that can be imported
   *
   * @param bool $prefix
   *
   * @return array
   */
  static function &import($prefix = false) {
    $r = CRM_Core_DAO_AllCoreTables::getImports(__CLASS__, 'hrleaveandabsences_leave_period_entitlement_log', $prefix, array());
    return $r;
  }
  /**
   * Returns the list of fields that can be exported
   *
   * @param bool $prefix
   *
   * @return array
   */
  static function &export($prefix = false) {
    $r = CRM_Core_DAO_AllCoreTables::getExports(__CLASS__, 'hrleaveandabsences_leave_period_entitlement_log', $prefix, array());
    return $r;
  }
  /**
   * Returns the list of indices
   */
  public static function indices($localize = TRUE) {
    $indices = array();
    return ($localize && !empty($indices)) ? CRM_Core_DAO_AllCoreTables::multilingualize(__CLASS__, $indices) : $indices;
  }
}
