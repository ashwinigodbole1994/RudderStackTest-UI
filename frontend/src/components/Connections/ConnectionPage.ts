import {Locators} from "../../../utils/locator";
import {UIElement} from "../../../utils/WebControl";
import {SourcePage} from "../Sources/SourcePage";
import {DestinationPage} from "../Destination/destinationPage";

const UILocator={
    srcList: "[class*='sc-lkMDMP sc-fTkLMS dGwtxh dGBCEQ']",
    destinationIcon: "[id*='fake-destination']",
    addSource: "[id*='sources-list'] [data-icon*='plus']",
    addDestination: "[id*='destinations-list'] [data-icon*='plus']"

}
export class ConnectionPage{

    async getCountOfSrc(){
        let srcList = await Locators.findAllElementByCssSelector(UILocator.srcList);
        return srcList.length
    }

    async clickAddSource(){
        let addSource = await Locators.findElementByCssSelector(UILocator.addSource);
        await UIElement.click(addSource)
        return new SourcePage();
    }

    async clickAddedSource(){
        let srcAdded = await Locators.findElementByCssSelector(UILocator.srcList);
        await UIElement.click(srcAdded);
    }

    async clickAddDestination(){
        let addDestination = await Locators.findElementByCssSelector(UILocator.addDestination);
        await UIElement.click(addDestination)
        return new DestinationPage();
    }
}