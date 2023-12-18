export class Locators {
    /**
     * Method to find a element by Id within a view or within a parent element
     * @param Id
     * @param {ElementFinder} currEl
     * @returns {ElementFinder}
     */
    static async findElementByIDs(Id: string, currEl?) {
        if (currEl) {
            currEl = currEl instanceof Promise<WebdriverIO.Element> ? await currEl : currEl;
            return currEl.$(Id);
        }
        return $(Id);
    }

    /**
     * find a element by given css selector within a view or within a parent element
     * @param {string} cssSelector
     * @param parentElement
     * @returns {ElementFinder}
     */
    static async findElementByCssSelector(cssSelector: string, parentElement?) {
        if (parentElement) {
            parentElement = parentElement instanceof Promise<WebdriverIO.Element> ? await parentElement : parentElement;
            return parentElement.$(cssSelector);
        } else {
            return $(cssSelector);
        }
    }

    /**
     * Find all elements by given css selector within a view or within a parent element
     * @param {string} cssSelector
     * @param parentElement
     * @returns {Array<WebdriverIO.Element>>}
     */
    static async findAllElementByCssSelector(cssSelector: string, parentElement?) {
        if (parentElement) {
            parentElement = parentElement instanceof Promise<WebdriverIO.Element> ? await parentElement : parentElement;
            return parentElement.$$(cssSelector);
        } else {
            return $$(cssSelector);
        }
    }

    /**
     * find a element by given xpath selector within a view or within a parent element
     * @param {string} xpathSelector
     * @param parentElement
     * @returns {ElementFinder}
     */
    static async findElementByXpathSelector(xpathSelector: string, parentElement?) {
        if (parentElement) {
            parentElement = parentElement instanceof Promise<WebdriverIO.Element> ? await parentElement : parentElement;
            return parentElement.$(xpathSelector);
        } else {
            return $(xpathSelector);
        }
    }

    /**
     * Find all elements by given xpath selector within a view or within a parent element
     * @param {string} xpathSelector
     * @param parentElement
     * @returns {ElementArrayFinder}
     */
    static async findAllElementsByXpathSelector(xpathSelector: string, parentElement?) {
        if (parentElement) {
            parentElement = parentElement instanceof Promise<WebdriverIO.Element> ? await parentElement : parentElement;
            return parentElement.$$(xpathSelector);
        } else {
            return $$(xpathSelector);
        }
    }

    /**
     * Find all elements by given Id within a view or within a parent element
     * @param {string} Id
     * @param parentElement
     * @returns {ElementArrayFinder}
     */
    static async findAllElementsById(Id: string, parentElement?) {
        if (parentElement) {
            parentElement = parentElement instanceof Promise<WebdriverIO.Element> ? await parentElement : parentElement;
            return parentElement.$$(Id);
        } else {
            return $$(Id);
        }
    }

    /**
     * find a element by given css selector within a view or within a parent element
     * @param {string} cssSelector
     * @param searchText
     * @param parentElement
     * @returns {ElementFinder}
     */
    static async findElementByCssSelectorContainingText(cssSelector: string, searchText: string, parentElement?) {
        if (parentElement) {
            parentElement = parentElement instanceof Promise<WebdriverIO.Element> ? await parentElement : parentElement;
            return parentElement.$("//*[contains(text(),'" + searchText + "')])");
        } else {
            return $("//*[contains(text(),'" + searchText + "')]");
        }
    }

    static async findAllElementsByCssSelectorContainingText(cssSelector: string, searchText: string, parentElement?) {
        if (parentElement) {
            parentElement = parentElement instanceof Promise<WebdriverIO.Element> ? await parentElement : parentElement;
            return parentElement.$$("//*[contains(text(),'" + searchText + "')]");
        } else {
            return $$(`//*[contains(text(),'${searchText}')]`);
        }
    }
}
