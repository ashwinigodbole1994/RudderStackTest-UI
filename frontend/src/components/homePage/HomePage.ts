import {Locators} from "../../../utils/locator";
import {UIElement} from "../../../utils/WebControl";
import {WAIT_FOR} from "../../../utils/constants";
import {ConnectionPage} from "../Connections/ConnectionPage";
import {DestinationPage} from "../Destination/destinationPage";

const UILocator = {
    collapseBtn: "[class*='arrow-right-from-line']",
    expandBtn: "[class*='arrow-left-from-line']",
    collectIcon: "[data-testid*='Collect-submenu-arrow']",
    connectionLabel: "//span[text()='Connections']",
    destinationLabel: "//span[text()='Destinations']"
}

export class HomePage{

    async expandLeftNav(){
        let collapseBtn = await Locators.findElementByIDs(UILocator.collapseBtn);
        let expandBtn = await Locators.findElementByIDs(UILocator.expandBtn);
        let isDis = await UIElement.isDisplayed(collapseBtn)
        if (isDis){
            await UIElement.click(collapseBtn)
        }
        await UIElement.fluentWaitFor(expandBtn, WAIT_FOR.ELEMENT_DISPLAYED)
    }

    async clickCollect(){
        let collectIcon = await Locators.findElementByCssSelector(UILocator.collectIcon);
        let isExpand = await UIElement.getAttribute(collectIcon, "data-icon")
        if (isExpand == "chevron-right"){
            await UIElement.click(collectIcon)
        }
        else {
            console.log("Collect menu is already expanded")
        }
    }

    async clickConnection(){
        let connectionIcon = await Locators.findElementByCssSelector(UILocator.connectionLabel);
        await UIElement.click(connectionIcon)
    }

    async clickDestination(){
        let destinationLabel = await Locators.findElementByCssSelector(UILocator.destinationLabel);
        await UIElement.click(destinationLabel)
    }

    async goToConnectionPage(){
        await this.expandLeftNav();
        await this.clickCollect();
        await this.clickConnection()
        return new ConnectionPage()

    }

    async goToDestinationPage(){
        await this.expandLeftNav();
        await this.clickCollect();
        await this.clickDestination()
        return new DestinationPage()

    }
}