import { PageElement, By } from '@serenity-js/web';

export class HomePage {
    static HOME_LINK = PageElement.located(By.xpath("//a[@data-navigation-tab-name='home' and text()='Inicio']")).describedAs('home navigation link');
    static MOVIES_LINK = PageElement.located(By.xpath("//a[@data-navigation-tab-name='genreCategory' and text()='Películas']")).describedAs('Movies navigation link');
}