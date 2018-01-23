<?php

use CRM_HRCore_Test_BaseHeadlessTest as BaseHeadlessTest;
use CRM_HRCore_Component_ContactActionsMenu_NoSelectedLineManagerTextItem as NoSelectedLineManagerTextItem;

/**
 * Class CRM_HRCore_Component_ContactActionsMenu_NoSelectedLineManagerTextItemTest
 *
 * @group headless
 */
class CRM_HRCore_Component_ContactActionsMenu_NoSelectedLineManagerTextItemTest extends BaseHeadlessTest {

  public function testRender() {
    $noSelectedLineMangerText = new NoSelectedLineManagerTextItem();
    $expectedMarkup = '<p>You have not selected a Line Manager</p>';

    $this->assertEquals($expectedMarkup, $noSelectedLineMangerText->render());
  }
}
