import {MOUSE_ACTIONS, TIMEOUTS, WAIT_FOR} from "./constants";

declare type WaitForOptions = {
    timeout?: number;
    interval?: number;
    timeoutMsg?: string;
    reverse?: boolean;
};

export class UIElement {

    static async get(url: string) {
        await browser.url(url);
    }

    static async getCurrentUrl() {
        return browser.getUrl();
    }

    static async quit() {
        // await browser.quit();
    }

    static async close() {
        await browser.closeWindow();
    }

    static async refresh() {
        await browser.refresh();
    }

    static async setWindowMaximize() {
        await browser.maximizeWindow();
    }

    static async count(elements) {
        elements = elements instanceof Promise<WebdriverIO.Element> ? await elements : elements;
        return elements.length || 0;
    }


    static async sleep(timeInMilliSeconds: number, msg?: string): Promise<any> {
        if (msg) console.log("Explicit sleep for " + timeInMilliSeconds + "ms.", msg);
        await browser.pause(timeInMilliSeconds);
        // console.log(`Sleep for ${timeInMilliSeconds} milliseconds complete`);
    }

    static async getProductApiData({ path, method = "GET", payload = "" }): Promise<any> {
        const REQUEST_TIMEOUT_DURATION = 1000 * 5; // 5 seconds
        const CONTENT_TYPE_GET = "application/json, text/javascript, */*";
        const CONTENT_TYPE_POST_PUT = "application/json, text/javascript, */*";
        method = method.toUpperCase();
        if (method === "GET") {
            // @ts-ignore
            return browser.executeAsync(
                async function (path, CONTENT_TYPE_GET, done) {
                    const encodedCustId = window.location.pathname.match(/\b(?!ni\b)\w+/g)?.join("_");
                    const propName = encodedCustId ? `${encodedCustId}_csrf_token_value` : "csrf_token_value";

                    // @ts-ignore
                    const csrfTokenValue = window?.jStorage?.get(propName) || window?.$?.jStorage?.get(propName) || "";

                    // @ts-ignore
                    const apiEndPoint = `${HostURL}${path}`;
                    const controller = new AbortController();
                    const signal = controller.signal;

                    const response = await fetch(apiEndPoint, {
                        signal: signal,
                        headers: {
                            // @ts-ignore
                            accept: CONTENT_TYPE_GET,
                            "x-vrni-csrf-token": csrfTokenValue,
                        },
                        method: "GET",
                        credentials: "include",
                    });
                    const parsedResponse = await response.json();
                    parsedResponse["apiEndPoint"] = apiEndPoint;

                    done(parsedResponse);

                    setTimeout(() => {
                        controller.abort();
                    }, REQUEST_TIMEOUT_DURATION);
                },
                path,
                CONTENT_TYPE_GET
            );
        } else if (method === "POST" || method === "PUT") {
            // @ts-ignore
            return browser.executeAsync(
                // @ts-ignore
                async function (path, method, payload, CONTENT_TYPE_POST_PUT, done) {
                    const encodedCustId = window.location.pathname.match(/\b(?!ni\b)\w+/g)?.join("_");
                    const propName = encodedCustId ? `${encodedCustId}_csrf_token_value` : "csrf_token_value";

                    // @ts-ignore
                    const csrfTokenValue = window?.jStorage?.get(propName) || window?.$?.jStorage?.get(propName) || "";

                    // @ts-ignore
                    const apiEndPoint = `${HostURL}${path}`;
                    const controller = new AbortController();
                    const signal = controller.signal;

                    const response = await fetch(apiEndPoint, {
                        signal: signal,
                        headers: {
                            // @ts-ignore
                            accept: CONTENT_TYPE_POST_PUT,
                            "x-vrni-csrf-token": csrfTokenValue,
                            "Content-Type": "application/json",
                        },
                        method: method,
                        body: payload,
                        credentials: "include",
                    });
                    const parsedResponse = await response.json();
                    parsedResponse["apiEndPoint"] = apiEndPoint;

                    done(parsedResponse);
                    setTimeout(() => {
                        controller.abort();
                    }, REQUEST_TIMEOUT_DURATION);
                },
                path,
                method,
                payload,
                CONTENT_TYPE_POST_PUT
            );
        } else {
            throw Error(`Unsupported method type - ${method}`);
        }
    }

    static async executeScript(script: string, additionalArguments?: any): Promise<any> {
        return additionalArguments ? browser.executeScript(script, additionalArguments) : browser.execute(script);
    }

    static async getTitle() {
        return browser.getTitle();
    }

    static async getValue(element) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        try {
            return element.getValue();
        } catch (e) {
            throw Error(e);
        }
    }

    static async getText(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, elementName?: string, errorMessage?: string) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        try {
            return element.getText();
        } catch (e) {
            throw Error(e);
        }
    }

    static async getInnerText(element: Promise<WebdriverIO.Element> | WebdriverIO.Element): Promise<string>  {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        return await browser.execute("return arguments[0].innerText", element);
    }

    static async isDisplayedInViewPort(element: Promise<WebdriverIO.Element> | WebdriverIO.Element) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;

        return element.isDisplayedInViewport();
    }

    static async setText(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, textToSet: any, elementName?: string, errorMessage?: string, clearText: boolean = true) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        try {
            if (clearText) {
                await UIElement.clear(element);
            }
            if (typeof textToSet === "number") {
                return clearText ? element.setValue(textToSet, { translateToUnicode: true }) : element.addValue(textToSet, { translateToUnicode: true });
            } else {
                return clearText ?  element.setValue([...textToSet], { translateToUnicode: true }) : element.addValue(textToSet, { translateToUnicode: true });
            }
        } catch (e) {
            // console.log(e);
            throw e;
            // throw new Error(`Error occurred while setting text on element with name ${elementName}. ${errorMessage}`);
        }
    }

    static async click(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, elementName?: string) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;

        try {
            return element.click();
        } catch (e) {
            console.log(`Error occurred clicking on element`);
            console.log(e);
            return element.click();
        }
    }

    static async setSpecialCharacterText(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, textToSet: any, elementName?: string, errorMessage?: string, clearText: boolean = true) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        try {
            await UIElement.click(element)
            return browser.keys(textToSet);
        } catch (e) {
            // console.log(e);
            throw e;
            // throw new Error(`Error occurred while setting text on element with name ${elementName}. ${errorMessage}`);
        }
    }

    static async getAttribute(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, attributeName: string = "innerText", elementName?: string, errorMessage?: string) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        try {
            if (attributeName === null || attributeName.toLowerCase() === "innertext" || attributeName.toLowerCase() === "innerhtml") {
                return element.getText();
            }
            return attributeName === "value" ? element.getValue() : element.getAttribute(attributeName);
        } catch (e) {
            throw new Error(`Error occurred while getting attribute for element with name ${elementName}. ${errorMessage}`);
        }
    }

    static async getCssValue(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, cssAttribute: string, elementName?: string, errorMessage?: string) {
        try {
            if (element instanceof Promise<WebdriverIO.Element>) {
                return (await element).getCSSProperty(cssAttribute);
            } else {
                return element.getCSSProperty(cssAttribute);
            }
        } catch (e) {
            throw new Error(`Error occurred while getting attribute for element with name ${elementName}. ${errorMessage}`);
        }
    }

    static async mouseAction(
        element,
        actionName: string = MOUSE_ACTIONS.MOUSE_HOVER,
        elementName?: string,
        errorMessage?: string,
        XScreenCoordinate?: number,
        YScreenCoordinate?: number
    ) {
        try {
            switch (actionName) {
                case MOUSE_ACTIONS.MOUSE_HOVER:
                    await (await element).moveTo();
                    break;
                case MOUSE_ACTIONS.MOUSE_DOWN:
                    // await browser.actions().mouseDown(element).perform();
                    break;
                case MOUSE_ACTIONS.MOUSE_UP:
                    // await browser.actions().mouseUp(element).perform();
                    break;
                case MOUSE_ACTIONS.DOUBLE_CLICK:
                    await element.doubleClick();
                    break;
                case MOUSE_ACTIONS.MOUSE_OUT:
                    await UIElement.executeScript('arguments[0].dispatchEvent(new MouseEvent("mouseout"));', element);
                    break;
            }
        } catch (e) {
            console.error(errorMessage ? errorMessage : "Error occurred while performing " + actionName + ": \n" + e);
            throw e;
        }
    }

    static async isPresent(element) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        if (!element) return false;

        return (await element).isExisting();
    }

    static async isSelected(element: Promise<WebdriverIO.Element> | WebdriverIO.Element) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        return element.isSelected();
    }

    static async isDisplayed(element: Promise<WebdriverIO.Element> | WebdriverIO.Element) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        if (!element) return false;

        return element.isDisplayed();
    }

    static async isClickable(element) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        return (await element).isEnabled();
    }

    static async isEnabled(element) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        return (await element).isEnabled();
    }

    /**
     The below method is used heavily in upgrade. Please make sure to run at least one upgrade if you are changing this method
     */
    static async waitForElementTextValue(
        element: Promise<WebdriverIO.Element> | WebdriverIO.Element,
        expectedElementText: string,
        elementName?: string,
        timeout: number = TIMEOUTS.ELEMENT_PRESENT,
        errorMessage?: string
    ): Promise<string> {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;

        // const isVisible = await element.waitUntil(async function() {
        //   return (await this.getText()) === expectedElementText;
        // }, {timeoutMsg: errorMessage, timeout: timeout})
        //

        let ME = this;
        let elementText, timeLapsed, timeLapsedInMin;
        let startTimer = new Date().getTime();
        let counter = 0;
        let retryCount = timeout ? Math.round(timeout / TIMEOUTS.POLLING_INTERVAL) : TIMEOUTS.ELEMENT_PRESENT;

        do {
            counter++;
            await UIElement.sleep(TIMEOUTS.POLLING_INTERVAL);
            try {
                if (await ME.isDisplayed(element)) {
                    let elemText = await ME.getText(element);
                    elementText = elemText;
                    console.log("Element  Current text : '" + elementText + "'");
                    timeLapsed = new Date().getTime() - startTimer;
                    timeLapsedInMin = (timeLapsed / 1000 / 60).toFixed(2);

                    if (elementText === expectedElementText || (await elementText.indexOf(expectedElementText)) != -1 || expectedElementText.indexOf(elemText) != -1) {
                        console.log(elementText + " is shown after " + timeLapsedInMin + " minutes");
                        break;
                    } else {
                        console.log("Time lapsed :  " + timeLapsedInMin + " minutes . Waiting for expected element text ...");
                    }
                }
            } catch (e) {
                console.log("Expected element text is still not displayed");

                console.log(`************* RETRYING AGAIN. RETRY COUNT: ${counter}*************`);
            }
        } while (counter < retryCount);

        if (elementText === expectedElementText) {
            console.log("Time lapsed :" + timeLapsedInMin + " minutes. Expected Element text ''" + expectedElementText + "' is visible");
            return elementText;
        } else {
            if ((await elementText.indexOf(expectedElementText)) != -1) {
                console.log(
                    "Time lapsed : " +
                    timeLapsedInMin +
                    " minutes. Expected Element text ''" +
                    expectedElementText +
                    "' is visible , but it is substring of actual text ''" +
                    elementText +
                    "' "
                );
                return elementText;
            } else {
                console.log(
                    "Time lapsed : " +
                    timeLapsedInMin +
                    " minutes. Expected Element text ''" +
                    expectedElementText +
                    "' is not visible" +
                    (errorMessage ? ` errorMessage: ${errorMessage}` : "")
                );
                return elementText;
            }
        }
    }

    /**
     *
     * @returns {Promise<void>}
     *
     * @param element
     * @param forceScroll
     */
    static async scrollToElement(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, forceScroll = false) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;

        try {
            if (forceScroll) {
                // @ts-ignore
                return browser.execute(async function(element) {
                    return element.scrollIntoView({ block: "center", inline: "center", behavior: "auto" });
                }, element);
            }
            const isDisplayedInViewPort = await UIElement.isDisplayedInViewPort(element);

            // @ts-ignore
            return (
                !isDisplayedInViewPort &&
                (await browser.execute(async function(element) {
                    element.scrollIntoView({ block: "center", inline: "center", behavior: "auto" });
                }, element))
            );
        } catch (e) {
            console.log("Error scrolling to element...");
        }
    }

    static async scrollToTop() {
        return browser.execute(function () {
            return window.scrollTo(0, 0);
        });
        // await UIElement.sleep(TIMEOUTS.ONE_SECOND * 10);
    }

    static async clear(element) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        await element.click();
        let elementText = await element.getText();
        if (!elementText && elementText.trim().length === 0) {
            elementText = await element.getValue();
        }

        if (elementText.length) {
            const txtLength = elementText.length;
            for (let i = 0; i < txtLength; i++) {
                await element.setValue(["Backspace"]);
                await UIElement.sleep(10);
            }
        }
    }

    /**
     * Returns Control Key based on Platform
     * For Linux based returns CTRL for MAC - CMD
     */
    static async getControlKey() {
        const capabilities = browser.capabilities;
        const platform = capabilities?.["platform"];
        let key = ["Control"];
        // let key = Key.CONTROL;
        if (/^MAC/i.test(platform)) {
            key = ["Command"];
        }
        return key;
    }

    static async waitUntil(element: WebdriverIO.Element, condition, args?: WaitForOptions) {
        return element.waitUntil(condition, { timeout: 1000 * 5, ...(args && { ...args }) });
    }

    static async waitToExist(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, args?: WaitForOptions) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        return args && Object.keys(args).length > 0 ? element.waitForExist(args) : element.waitForExist();
    }

    /**
     * Wait for an element for the provided amount of milliseconds to be displayed.
     * NOTE: As opposed to other element commands WebdriverIO will not wait for the element to exist to execute this command.
     * @param element: WebdriverIO.Element
     * @param args
     * @return {Promise<void>}
     */
    static async waitToDisplay(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, args?: WaitForOptions) {
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        return args && Object.keys(args).length > 0 ? element.waitForDisplayed(args) : element.waitForDisplayed();
    }

    /**
     * Wait for an element for the provided amount of milliseconds to be not displayed.
     * NOTE: As opposed to other element commands WebdriverIO will not wait for the element to exist to execute this command.
     * @param element: WebdriverIO.Element
     * @param args
     * @return {Promise<void>}
     */
    static async waitToDisappear(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, args?: WaitForOptions) {
        const finalArgs = { reverse: true, ...(args && { ...args }) };
        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        return element.waitForDisplayed(finalArgs);
    }

    /**
     * Wait for an element for the provided amount of milliseconds to be clickable.
     * NOTE: As opposed to other element commands WebdriverIO will not wait for the element to exist to execute this command.
     * @param element: WebdriverIO.Element
     * @param args
     * @return {Promise<void>}
     */
    static async waitToBeClickable(element: Promise<WebdriverIO.Element> | WebdriverIO.Element, args?: WaitForOptions) {
        const finalArgs = { ...(args && { ...args }) };

        if (element instanceof Promise<WebdriverIO.Element>) {
            return (await element).waitForClickable(finalArgs);
        } else {
            return element.waitForClickable(finalArgs);
        }
    }

    static async fluentWaitFor(
        element: Promise<WebdriverIO.Element> | WebdriverIO.Element,
        waitCondition: string = WAIT_FOR.ELEMENT_PRESENT,
        elementName?: string,
        timeout: number = TIMEOUTS.ELEMENT_PRESENT,
        errorMessage?: string,
        pollingInterval?: number
    ) {
        let elementState;
        let startTimer = new Date().getTime();
        pollingInterval = pollingInterval ? pollingInterval : TIMEOUTS.POLLING_INTERVAL;

        element = element instanceof Promise<WebdriverIO.Element> ? await element : element;
        let finalArgs = { timeout, interval: pollingInterval, timeoutMsg: errorMessage || "" };

        try {
            switch (waitCondition) {
                case WAIT_FOR.ELEMENT_ENABLED:
                    elementState = await UIElement.waitToExist(element, finalArgs);
                    break;
                case WAIT_FOR.ELEMENT_DISPLAYED:
                    elementState = await UIElement.waitToDisplay(element, finalArgs);
                    break;
                case WAIT_FOR.ELEMENT_CLICKABLE:
                    elementState = await UIElement.waitToBeClickable(element, finalArgs);
                    break;
                case WAIT_FOR.ELEMENT_STALE:
                case WAIT_FOR.ELEMENT_INVISIBILITY:
                    elementState = await UIElement.waitToDisappear(element, { ...finalArgs, reverse: true });
                    break;
                case WAIT_FOR.ELEMENT_NOT_PRESENT:
                    elementState = await UIElement.waitToDisappear(element, { ...finalArgs });
                    break;

                default:
                    elementState = await element.waitForExist({ timeout: TIMEOUTS.ONE_MINUTE * 0.5 });
                    break;
            }
        } catch (e) {
            elementState = null;
        }

        if (elementState == null) {
            console.log(`After Waiting for ${(new Date().getTime() - startTimer) / 1000} seconds, ${elementName || "Element "} still not ${waitCondition}. ${errorMessage || ""}`);
        } else {
            console.log(`After waiting for ${(new Date().getTime() - startTimer) / 1000} seconds, ${elementName || ""} ${waitCondition}`);
        }
        return !!elementState;
    }
}
