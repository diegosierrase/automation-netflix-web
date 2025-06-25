import { PageElement, By } from '@serenity-js/web';

export class LoginPage {
    static URL = 'https://www.netflix.com/co/login';
    static USERNAME_FIELD = PageElement.located(By.xpath("//input[@name='userLoginId']")).describedAs('username input');
    static PASSWORD_FIELD = PageElement.located(By.xpath("//input[@name='password']")).describedAs('password input');
    static LOGIN_BUTTON = PageElement.located(By.xpath("//button[@data-uia='sign-in-button']")).describedAs('login button');
}