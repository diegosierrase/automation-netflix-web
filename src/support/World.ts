import { setWorldConstructor, World, BeforeAll, Before, After } from '@cucumber/cucumber';
import { Browser, Page, chromium, BrowserContext } from 'playwright';
import { configure, actorCalled } from '@serenity-js/core'; 
import { Photographer, TakePhotosOfInteractions } from '@serenity-js/web';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { ArtifactArchiver } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright'; 
import { User } from '../common/actors/User';

export interface MyWorld extends World {
  browser: Browser;
  page: Page;
  actor: User;
  context: BrowserContext;
  startBrowser(): Promise<void>;
  stopBrowser(): Promise<void>;
}

class CustomWorld extends World implements MyWorld {
  public browser!: Browser;
  public page!: Page;
  public actor!: User;
  public context!: BrowserContext;

  constructor(options: any) {
    super(options);
  }

  async startBrowser(): Promise<void> {
    this.browser = await chromium.launch({
      headless: false,
      args: [ '--start-maximized' ],
    });

    this.context = await this.browser.newContext({
        recordVideo: {
            dir: './target/site/serenity/video',
            size: { width: 1280, height: 720 },
        },
        viewport: null,
    });

    this.page = await this.context.newPage();
  }

  async stopBrowser(): Promise<void> {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
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

Before(async function (this: MyWorld) {
    await this.startBrowser();
    
    this.actor = actorCalled('Test User').whoCan(
        BrowseTheWebWithPlaywright.usingPage(this.page)
    ) as User;

});

After(async function (this: MyWorld) {
    await this.stopBrowser();
});