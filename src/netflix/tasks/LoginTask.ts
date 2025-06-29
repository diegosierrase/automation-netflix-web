import { Actor, Task, Wait, Duration, Question } from '@serenity-js/core';
import { LoginPage } from '../user_interfaces/LoginPage';
import { ProfileSelectionPage } from '../user_interfaces/ProfileSelectionPage';
import { Enter, Click, isVisible, isClickable } from '@serenity-js/web';

export class LoginTask extends Task {
  private username: string;
  private password: string;

  static login(username: string, password: string): Task {
    return new LoginTask(username, password);
  }

  constructor(username: string, password: string) {
    super(`log in with username '${username}' and password '${password}'`);
    this.username = username;
    this.password = password;
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Wait.until(LoginPage.USERNAME_FIELD, isVisible()),
      Enter.theValue(this.username).into(LoginPage.USERNAME_FIELD),
      Wait.until(LoginPage.PASSWORD_FIELD, isVisible()),
      Enter.theValue(this.password).into(LoginPage.PASSWORD_FIELD),
      Wait.until(LoginPage.LOGIN_BUTTON, isVisible()),
      Wait.until(LoginPage.LOGIN_BUTTON, isClickable()),
      Click.on(LoginPage.LOGIN_BUTTON)
    );

    await actor.attemptsTo(
      Wait.until(ProfileSelectionPage.MANAGE_PROFILE, isVisible())
    );

  }
}