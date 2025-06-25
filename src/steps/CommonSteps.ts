import { Given } from '@cucumber/cucumber';
import { Navigate, isVisible } from '@serenity-js/web';
import { LoginPage } from '../user_interfaces/LoginPage';
import { LoginTask } from '../tasks/LoginTask';
import { SelectProfileTask } from '../tasks/SelectProfileTask';
import { CsvUtils } from '../utils/CsvUtils';
import { Constants } from '../utils/Constants';
import { MyWorld } from '../support/World';
import { ProfileSelectionPage } from '../user_interfaces/ProfileSelectionPage';

Given('user login with valid credentials and select profile from id {string}', async function (this: MyWorld, idLogin: string) {
    const userData = CsvUtils.getMapTestData(Constants.LOGIN, idLogin);

    if (!userData) {
        throw new Error(`No user data found for ID: ${idLogin} in data_login.csv`);
    }

    await this.actor.attemptsTo(
        Navigate.to(LoginPage.URL),
        LoginTask.login(userData.email, userData.password),
        SelectProfileTask.selectProfile(userData.profileName)
    )
    
});