import {Locators} from "../../../utils/locator";
import {UIElement} from "../../../utils/WebControl";
import {WAIT_FOR} from "../../../utils/constants";

const UILocator = {
    sourceLabel: "[class*='source-destinations_header']",
    sourceText: "[class*='ant-table-cell'][4]",
    addDestinationIcon: "//span[text()='Add Destination']",
    newDestinationIcon: "//span[text()='New destination']",
    setDestinationSource: "[class*='ant-input ant-input-lg']",
    AddDestination: "[class*='directoryTab_name']",
    AddDestinationName: "[data-testid*='destination-name']",
    continueBtn: "[class*='ant-btn-primary ant-btn']",
    selectSrcToConnnect: "//div[text()='Python Test']",
    webhookUrl: "[data-testid*='textInput']",
    toastMessage: "[class*='footer_greetingMessage']",
    detailsLink: "[class*='source-list_cta_column']",
    eventTab: "[data-node-key*='Events'] [class*='ant-tabs-tab-btn']",
    eventDelivered: "[class*='events_delivered']",
    eventError: "[class*='events_error']",
}

export class DestinationPage {

    async getSourceCount(){
        let sourceLabel = await Locators.findElementByCssSelector(UILocator.sourceLabel);
        return UIElement.getText(sourceLabel);
    }

    async getSourceName(){
        let sourceText = await Locators.findElementByCssSelector(UILocator.sourceText);
        return UIElement.getText(sourceText);
    }

    async clickNewDestnBtn(){
        let newDestinationIcon = await Locators.findElementByCssSelector(UILocator.newDestinationIcon);
        await UIElement.click(newDestinationIcon)
    }

    async clickDetailsLink(){
        let detailsLink = await Locators.findElementByCssSelector(UILocator.detailsLink);
        await UIElement.fluentWaitFor(detailsLink, WAIT_FOR.ELEMENT_DISPLAYED)
        await UIElement.click(detailsLink)
    }

    async AddNewDestination(searchDestination: string, addDestinationName: string, srcName:string){
        let setDestinationSource = await Locators.findElementByCssSelector(UILocator.setDestinationSource);
        let AddDestination = await Locators.findElementByCssSelector(UILocator.AddDestination);
        let AddDestinationName = await Locators.findElementByCssSelector(UILocator.AddDestinationName);
        let continueBtn = await Locators.findElementByCssSelector(UILocator.continueBtn);
        let selectSrcToConnnect = await Locators.findElementByCssSelector("//div[text()='" + srcName + "']");
        // await this.clickNewDestnBtn();
        await UIElement.setSpecialCharacterText(setDestinationSource, searchDestination)
        await UIElement.fluentWaitFor(AddDestination, WAIT_FOR.ELEMENT_DISPLAYED)
        await UIElement.click(AddDestination)
        await UIElement.setSpecialCharacterText(AddDestinationName, addDestinationName)
        await UIElement.click(continueBtn)
        await UIElement.click(selectSrcToConnnect)

    }

    async createWebhookDestination(webhookUrl: string){
        let webhookUrlText = await Locators.findElementByCssSelector(UILocator.webhookUrl);
        let continueBtn = await Locators.findElementByCssSelector(UILocator.continueBtn);
        await UIElement.fluentWaitFor(continueBtn, WAIT_FOR.ELEMENT_DISPLAYED)
        await UIElement.click(continueBtn)
        await UIElement.setSpecialCharacterText(webhookUrlText, webhookUrl)
        await UIElement.click(continueBtn)
    }

    async getDestinationMsg(){
        let toastMessage = await Locators.findElementByCssSelector(UILocator.toastMessage);
        await UIElement.fluentWaitFor(toastMessage, WAIT_FOR.ELEMENT_DISPLAYED)
        return await UIElement.getText(toastMessage)
    }

    async goToEventTab(){
        let eventTab = await Locators.findElementByCssSelector(UILocator.eventTab);
        await UIElement.click(eventTab)
    }

    async getEventDeliveredText(){
        let eventdelivered = await Locators.findElementByCssSelector(UILocator.eventDelivered);
        await UIElement.fluentWaitFor(eventdelivered, WAIT_FOR.ELEMENT_DISPLAYED)
        return await UIElement.getText(eventdelivered)
    }

    async getEventFailedText(){
        let eventfailed = await Locators.findElementByCssSelector(UILocator.eventError);
        await UIElement.fluentWaitFor(eventfailed, WAIT_FOR.ELEMENT_DISPLAYED)
        return await UIElement.getText(eventfailed)
    }

}