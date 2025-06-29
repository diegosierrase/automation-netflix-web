import { PageElement, By } from '@serenity-js/web';

export class LoginPage {
    static EMAIL_FIELD = PageElement.located(By.id("email-input")).describedAs('email input');
    static PASSWORD_FIELD = PageElement.located(By.id("password-input")).describedAs('password input');
    static LOGIN_BUTTON = PageElement.located(By.id("login-button")).describedAs('login button');
}