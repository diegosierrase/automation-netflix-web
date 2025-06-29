import { Actor, Question, Task } from '@serenity-js/core';
import { Text, isVisible } from '@serenity-js/web';
import { Wait } from '@serenity-js/core';

import { HomePage } from '../user_interfaces/HomePage';

export class WelcomeMessage extends Question<Promise<string>> {
  static message(): Question<Promise<string>> {
    return new WelcomeMessage();
  }

  constructor() {
    super('welcome message');
  }

  async answeredBy(actor: Actor): Promise<string> {

    await actor.attemptsTo(
      Wait.until(HomePage.HOME_LINK, isVisible())
    );

    return await actor.answer(Text.of(HomePage.HOME_LINK));
  }
}