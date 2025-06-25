import { PageElement, By, PageElements } from '@serenity-js/web';

export class MoviesPage {
    static GENRES_DROPDOWN_BUTTON = PageElement.located(
        By.xpath("//div[@class='label' and @role='button' and text()='Géneros']")).describedAs('Genres dropdown button');
    static GENRE_MOVIE_LIST = (genreName: string) =>
        PageElement.located(By.xpath(`//a[contains(@class, 'sub-menu-link') and text()='${genreName}']`)
        ).describedAs(`${genreName} genre list`);
    static GRID_VIEW_BUTTON = PageElement.located(By.xpath("//button[@class='aro-grid-toggle']")).describedAs('Grid view button');
    static MOVIE_NAMES_FALLBACK_TEXTS = PageElements.located(By.xpath("//p[@class='fallback-text']")).describedAs('movie names fallback texts');
}