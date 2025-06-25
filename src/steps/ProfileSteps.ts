import { When } from '@cucumber/cucumber';
import { SelectProfileTask } from '../tasks/SelectProfileTask';
import { MyWorld } from '../support/World';
import { CsvUtils } from '../utils/CsvUtils';
import { Constants } from '../utils/Constants';


When('user selects profile from id {string}', async function (this: MyWorld, idLogin: string) {
    const userData = CsvUtils.getMapTestData(Constants.LOGIN, idLogin);
    
    if (!userData) {
        throw new Error(`No user data found for ID: ${idLogin} in data_login.csv`);
    }

  await this.actor.attemptsTo(SelectProfileTask.selectProfile(userData.profileName));
});