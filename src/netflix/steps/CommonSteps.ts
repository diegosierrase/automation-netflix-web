import { Given } from '@cucumber/cucumber';
import { Navigate, isVisible } from '@serenity-js/web';
import { LoginPage } from '../user_interfaces/LoginPage';
import { LoginTask } from '../tasks/LoginTask';
import { SelectProfileTask } from '../tasks/SelectProfileTask';
import { CsvUtils } from '../../utils/CsvUtils';
import { Constants } from '../../utils/Constants';
import { MyWorld } from '../../support/World';
import { config } from '../../../serenity.conf';

Given('user login with valid credentials and select profile from id {string}', async function (this: MyWorld, idLogin: string) {
    const environment = process.env.TARGET_ENV; 
    const netflixLoginUrl = config.urls.netflix;

    if (!environment) {
        throw new Error('TARGET_ENV environment variable is not set. Cannot determine data source.');
    }
    
    const userData = CsvUtils.getMapTestData(Constants.LOGIN, idLogin, environment);

    if (!userData) {
        throw new Error(`No user data found for ID: ${idLogin} in data_login.csv`);
    }

    await this.actor.attemptsTo(
        
        Navigate.to(netflixLoginUrl),
        LoginTask.login(userData.email, userData.password),
        SelectProfileTask.selectProfile(userData.profileName)
    )
    
});