import {Locators} from "../../../utils/locator";
import {UIElement} from "../../../utils/WebControl";
import {WAIT_FOR} from "../../../utils/constants";

const UILocators = {
    email: "[id*='text-input-email']",
    password: "[id*='text-input-password']",
    signUpLink: "[class*='sc-HjLFp kEuWZR']",
    signUpBtn: "[class*='ant-btn-primary ant-btn-lg']",
    LoginInBtn: "//span[text()='Log in']",
    laterefa: "a[href='/addmfalater']",
    goToDashboardBtn: "//span[text()='Go to dashboard']",
}

export class LoginPage {

    async setEmail(emailsName: string){
        let emailText = await Locators.findElementByCssSelector(UILocators.email);
        await UIElement.setSpecialCharacterText(emailText, emailsName)
    }

    async setPassword(password: string){
        let passwordText = await Locators.findElementByCssSelector(UILocators.password);
        await UIElement.setSpecialCharacterText(passwordText, password)
    }

    async clickSignUpLink(){
        let signupLink = (await Locators.findAllElementByCssSelector(UILocators.signUpLink))[1];
        await UIElement.click(signupLink)
    }

    async clickSignUpBtn(){
        let signupBtn = await Locators.findElementByCssSelector(UILocators.signUpBtn);
        await UIElement.click(signupBtn)
    }

    async clickLoginBtn(){
        let LoginInBtn = await Locators.findElementByCssSelector(UILocators.LoginInBtn);
        await UIElement.click(LoginInBtn)
    }

    async loginUsingSignUp(emailId: string, password: string) {
        await browser.maximizeWindow()
        await UIElement.get("https://app.rudderstack.com")
        // await UIElement.fluentWaitFor(Locators.findElementByCssSelector(UILocators.signUpLink), WAIT_FOR.ELEMENT_DISPLAYED)
        await this.clickSignUpLink();
        await UIElement.fluentWaitFor(await Locators.findElementByIDs(UILocators.email), WAIT_FOR.ELEMENT_DISPLAYED)
        await this.setEmail(emailId)
        await this.clickSignUpBtn()
        await this.setPassword(password)
    }

    async login(emailId: string, password: string) {
        await browser.maximizeWindow()
        await UIElement.get("https://app.rudderstack.com")
        await UIElement.fluentWaitFor(await Locators.findElementByCssSelector(UILocators.email), WAIT_FOR.ELEMENT_DISPLAYED)
        await this.setEmail(emailId)
        await this.setPassword(password)
        await this.clickLoginBtn()
        await this.doLater2FA()
    }

    async doLater2FA(){
        await UIElement.fluentWaitFor(await Locators.findElementByXpathSelector(UILocators.laterefa), WAIT_FOR.ELEMENT_DISPLAYED)
        let loc = await Locators.findElementByXpathSelector(UILocators.laterefa)
        let goToDashboardBtn = await Locators.findElementByCssSelector(UILocators.goToDashboardBtn)
        if(await UIElement.isDisplayed(loc)){
            await UIElement.click(loc)
        }
        await UIElement.fluentWaitFor(await Locators.findElementByCssSelector(UILocators.goToDashboardBtn), WAIT_FOR.ELEMENT_DISPLAYED)
        if(await UIElement.isDisplayed(goToDashboardBtn)){
            await UIElement.click(goToDashboardBtn)
        }

    }
}