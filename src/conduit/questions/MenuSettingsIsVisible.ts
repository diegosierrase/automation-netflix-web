import { Actor, Question, Task } from '@serenity-js/core';
import { Text, isVisible } from '@serenity-js/web';
import { Wait } from '@serenity-js/core';

import { HomePage } from '../user_interfaces/HomePage';

export class MenuSettingsIsVisible extends Question<Promise<string>> {
  static message(): Question<Promise<string>> {
    return new MenuSettingsIsVisible();
  }

  constructor() {
    super('welcome message');
  }

  async answeredBy(actor: Actor): Promise<string> {

    await actor.attemptsTo(
      Wait.until(HomePage.MENU_SETTINGS_LINK, isVisible())
    );

    return await actor.answer(Text.of(HomePage.MENU_SETTINGS_LINK));
  }
}