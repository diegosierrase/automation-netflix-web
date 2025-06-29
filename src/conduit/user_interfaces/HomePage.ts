import { PageElement, By } from '@serenity-js/web';

export class HomePage {
    static MENU_SETTINGS_LINK = PageElement.located(By.id("settings-link")).describedAs('settings navigation link');
}