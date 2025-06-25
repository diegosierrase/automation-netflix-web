import { setWorldConstructor, World, BeforeAll } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { configure, Actor } from '@serenity-js/core';
import { Photographer, TakePhotosOfFailures, TakePhotosOfInteractions } from '@serenity-js/web';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { ArtifactArchiver } from '@serenity-js/core';

export interface MyWorld extends World {
  browser: Browser;
  page: Page;
  actor: Actor;
  startBrowser(): Promise<void>;
  stopBrowser(): Promise<void>;
}

class CustomWorld extends World implements MyWorld {
  public browser!: Browser;
  public page!: Page;
  public actor!: Actor;

  constructor(options: any) {
    super(options);
  }

  async startBrowser(): Promise<void> {
    this.browser = await chromium.launch({
      headless: false,
      args: [ '--start-maximized' ],
    });
  }

  async stopBrowser(): Promise<void> {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
    configure({
        crew: [
            ConsoleReporter.withDefaultColourSupport(),

            SerenityBDDReporter.fromJSON({
                specDirectory: './tests/features',
            }),

            ArtifactArchiver.fromJSON({
                outputDirectory: './target/site/serenity'
            }),

            Photographer.whoWill(TakePhotosOfInteractions),
        ],
    });
});