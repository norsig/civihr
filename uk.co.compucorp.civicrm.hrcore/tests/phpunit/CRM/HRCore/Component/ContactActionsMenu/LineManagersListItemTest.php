<?php

use CRM_HRCore_Test_BaseHeadlessTest as BaseHeadlessTest;
use CRM_HRCore_Service_Manager as ManagerService;
use CRM_HRCore_Component_ContactActionsMenu_LineManagersListItem as LineManagersListItem;

/**
 * Class CRM_Tasksassignments_Component_ContactActionsMenu_LineManagersListItemTest
 * 
 * @group headless
 */
class CRM_HRCore_Component_ContactActionsMenu_LineManagersListItemTest extends BaseHeadlessTest {

  public function testRender() {
    $contactID = 2;
    $managerService = $this->prophesize(ManagerService::class);
    $lineManagers = [4 => 'Test Manager1', 5 => 'TestManager5'];
    $managerService->getLineManagersFor($contactID)->willReturn($lineManagers);

    $markup = '<p><span class="crm_contact_action--bold">Line Manager(s):</span> </p>';

    foreach($lineManagers as $lineManager) {
      $markup .= '<p><a href="#" class="text-primary"> ' . $lineManager . ' </a></p>';
    }

    $lineManagerList = new LineManagersListItem($managerService->reveal(), $contactID);
    $this->assertEquals($markup, $lineManagerList->render());
  }
}
