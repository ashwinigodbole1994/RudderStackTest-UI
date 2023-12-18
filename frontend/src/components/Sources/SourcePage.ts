import {Locators} from "../../../utils/locator";
import {UIElement} from "../../../utils/WebControl";
import {WAIT_FOR} from "../../../utils/constants";

const UILocator = {
    destinationLabel: "[class*='source-destinations_header']",
    destinationText: "[class*='ant-table-cell'][4]",
    noDestinationText: "[class*='source-destinations_noDestinationsContainer']",
    addSourceIcon: "//span[text()='New source']",
    setSearchSource: "[class*='ant-input ant-input-lg']",
    AddSource: "[class*='directoryTab_name']",
    AddSourceName: "[data-testid*='source-name']",
    continueBtn: "[class*='ant-btn-primary ant-btn']",
    addDestinationBtn: "//span[text()='Add Destination ']",
    createNewDestinationOptn: "[class*='ant-dropdown-menu-title-content']",
    closePopUp: "[data-action*='close']"
}

export class SourcePage{

    async getDestinationCount(){
        let destinationLabel = await Locators.findElementByCssSelector(UILocator.destinationLabel);
        return UIElement.getText(destinationLabel);
    }

    async getDestinationName(){
        let destinationText = await Locators.findElementByCssSelector(UILocator.destinationText);
        return UIElement.getText(destinationText);
    }

    async noDestinationForSource(){
        let noDestinationText = await Locators.findElementByCssSelector(UILocator.noDestinationText);
        return UIElement.getText(noDestinationText)
    }

    async clickNewSourceBtn(){
        let addSourceIcon = await Locators.findElementByCssSelector(UILocator.addSourceIcon);
        await UIElement.click(addSourceIcon)
    }

    async AddNewSource(searchSource: string, addSourceName: string){
        let setSearchSource = await Locators.findElementByCssSelector(UILocator.setSearchSource);
        let AddSource = await Locators.findElementByCssSelector(UILocator.AddSource);
        let AddSourceName = await Locators.findElementByCssSelector(UILocator.AddSourceName);
        let continueBtn = await Locators.findElementByCssSelector(UILocator.continueBtn);
        // await this.clickNewSourceBtn();
        await UIElement.setSpecialCharacterText(setSearchSource, searchSource)
        await UIElement.fluentWaitFor(AddSource, WAIT_FOR.ELEMENT_DISPLAYED)
        await UIElement.click(AddSource)
        await UIElement.setSpecialCharacterText(AddSourceName, addSourceName)
        await UIElement.click(continueBtn)
        await this.closeToastPopup();

    }

    async closeToastPopup(){
        let closePopup = await Locators.findElementByCssSelector(UILocator.closePopUp);
        await UIElement.fluentWaitFor(closePopup, WAIT_FOR.ELEMENT_DISPLAYED)
        let isDis= await UIElement.isDisplayed(closePopup)
        if(isDis){
            await UIElement.click(closePopup)
        }
    }
}