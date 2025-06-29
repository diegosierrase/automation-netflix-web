import { PageElement, By } from '@serenity-js/web';

export class ProfileSelectionPage {
    static PROFILE_LINK_FOR = (profileName: string) =>
        PageElement.located(By.xpath(`//a[contains(@class, 'profile-link') and ./span[@class='profile-name' and text()='${profileName}']]`))
            .describedAs(`profile link for ${profileName}`);
    static MANAGE_PROFILE = PageElement.located(By.xpath("//a[@data-uia='profile-choices-manage-button']")).describedAs('manage profile button');
}