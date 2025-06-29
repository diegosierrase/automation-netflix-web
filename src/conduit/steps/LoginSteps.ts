import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Navigate } from '@serenity-js/web';
import { LoginTask } from '../tasks/LoginTask';
import { LoginPage } from '../user_interfaces/LoginPage';
import { WelcomeMessage } from '../questions/WelcomeMessage';
import { MyWorld } from '../../support/World'; 
import { CsvUtils } from '../../utils/CsvUtils';
import { Constants } from '../../utils/Constants';
import { config } from '../../../serenity.conf';


Given('user open conduit login page', async function (this: MyWorld) {
  const conduitLoginUrl = config.urls.conduit;
  await this.actor.attemptsTo(Navigate.to(conduitLoginUrl));
});

When('user enters valid credentials from id {string}', async function (this: MyWorld, idLogin: string) {
  const environment = process.env.TARGET_ENV; 

  if (!environment) {
      throw new Error('TARGET_ENV environment variable is not set. Cannot determine data source.');
  }

  const userData = CsvUtils.getMapTestData(Constants.LOGIN, idLogin, environment);

  if (!userData) {
      throw new Error(`No user data found for ID: ${idLogin} in data_login.csv`);
  }

  await this.actor.attemptsTo(LoginTask.login(userData.email, userData.password));
});

Then('user should see a welcome message {string}', async function (this: MyWorld, expectedMessage: string) {
  const actualText = await this.actor.answer(WelcomeMessage.message());
  expect(actualText).toContain(expectedMessage);
});