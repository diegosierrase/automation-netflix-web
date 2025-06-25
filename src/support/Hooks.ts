import { Before, After } from '@cucumber/cucumber';
import { actorCalled } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { MyWorld } from '../support/World';

Before(async function (this: MyWorld) {
  await this.startBrowser();
  this.actor = actorCalled('Test User').whoCan(BrowseTheWebWithPlaywright.using(this.browser));
});

After(async function (this: MyWorld) {
  await this.stopBrowser();
});