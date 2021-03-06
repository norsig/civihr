<?php

trait CRM_HRCore_Upgrader_Steps_1001 {

  /**
   * Upgrader to remove unneeded default civicrm values
   * such as ( contact types, case types, option values .. etc )
   *
   * @return bool
   */
  public function upgrade_1001() {
    $this->up1001_listDelete('ContactType', 'name', $this->up1001_civicrmContactTypesList());
    $this->up1001_listDelete('CaseType', 'name', $this->up1001_civicrmCaseTypesList());

    $this->up1001_listDelete(
      'OptionValue', 
      'name', 
      $this->up1001_civicrmActivityTypesList(), 
      ['option_group_id' => 'activity_type']
    );

    $this->up1001_listDelete(
      'OptionValue', 
      'name', 
      $this->up1001_civicrmMobileProvidersList(), 
      ['option_group_id' => 'mobile_provider']
    );

    $this->up1001_listDelete(
      'OptionValue', 
      'name', 
      $this->up1001_civicrmEthnicityOptionsList(), 
      ['option_group_id' => $this->up1001_getEthnicityGroupName()], 
      'NOT IN'
    );

    $this->up1001_listDelete(
      'OptionValue',
      'name',
      ['Main'],
      ['option_group_id' => 'website_type']
    );

    CRM_Core_BAO_Navigation::resetNavigation();

    return true;
  }

  /**
   * Removes a list of options (e.g case types, option values..) from a specific table
   * based on a specific unique key in the table.
   *
   * @param string $entity
   *   The entity that contains the data that we want to remove
   * @param string $uniqueField
   *   A name of unique key in that entity that we want to
   *   use in order to match and delete the list items
   * @param array $toDelete
   *   The entity values that we want to remove
   * @param array $extraFields
   *   Any extra data that should be passed to the entity API
   *   end point to complete its work. (e.g if you want to delete an option
   *   value (values) then you should supply the option group name since
   *   the option value name is not enough)
   * @param string $operator
   *   The operator that should be applied on delete operation,
   *   for example if we want to delete all entity values except
   *   the ones from the callback method then we can set this to
   *   'NOT IN' instead
   */
  private function up1001_listDelete($entity, $uniqueField, $toDelete, $extraFields = [], $operator = 'IN') {
    if (!empty($toDelete)) {

      $params = array_merge(
        [$uniqueField => [$operator => $toDelete], "api.{$entity}.delete" => ['id' => "\$value.id"]], 
        $extraFields
      );

      civicrm_api3($entity, 'get', $params);
    }
  }

  /**
   * Removes a list of unneeded ethnicity options
   *
   * @return string
   */
  private function up1001_getEthnicityGroupName() {
    $ethnicityGroup = civicrm_api3('CustomField', 'get', [
      'sequential' => 1,
      'return' => ['option_group_id'],
      'name' => 'Ethnicity',
      'options' => ['limit' => 1]
    ]);

    if ($ethnicityGroup['count'] > 0) {
      return $ethnicityGroup['values'][0]['option_group_id'];
    }
  }

  /**
   * A list of sample CiviCRM contact types which need to be removed.
   *
   * @return array
   */
  private function up1001_civicrmContactTypesList() {
    return [
      'Student',
      'Parent',
      'Staff',
      'Team',
      'Sponsor',
    ];
  }

  /**
   * A list of sample CiviCRM case types which need to be removed.
   *
   * @return array
   */
  private function up1001_civicrmCaseTypesList() {
    return [
      'adult_day_care_referral',
      'housing_support'
    ];
  }

  /**
   * A list of sample CiviCRM Activity types which need to be removed.
   *
   * @return array
   */
  private function up1001_civicrmActivityTypesList() {
    return [
      'Medical evaluation',
      'Mental health evaluation',
      'Secure temporary housing',
      'Income and benefits stabilization',
      'Long-term housing plan',
      'ADC referral',
    ];
  }

  /**
   * A list of sample CiviCRM mobile providers which need to be removed.
   *
   * @return array
   */
  private function up1001_civicrmMobileProvidersList() {
    $mobileProviders = civicrm_api3('OptionValue', 'get', [
      'sequential' => 1,
      'option_group_id' => 'mobile_provider',
      'options' => ['limit' => 0],
    ]);

    $providers = [];
    if (!empty($mobileProviders['values'])) {
      $providers = array_column($mobileProviders['values'], 'name');
    }

    return $providers;
  }

  /**
   * A list of sample CiviCRM Ethnicity Options which need to be removed.
   *
   * @return array
   */
  private function up1001_civicrmEthnicityOptionsList() {
    return [
      'Prefer_Not_to_Say',
      'Not_Applicable'
    ];
  }

}
