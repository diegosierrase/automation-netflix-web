import { Actor, Stage } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/web';
import { Page, Browser } from '@playwright/test';

export class User extends Actor {
  constructor(name: string, stage: Stage) {
    super(name, stage);
  }

  getPlaywrightPage(): Page {
    const browseTheWebAbility = this.abilityTo(BrowseTheWeb);
    if (!browseTheWebAbility) {
        throw new Error(`Actor ${this.name} does not have the BrowseTheWeb ability.`);
    }
    return (browseTheWebAbility as any).page as Page;
  }
}