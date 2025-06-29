import { Actor, Task, Wait, Duration } from '@serenity-js/core';
import { Click, isVisible, isClickable } from '@serenity-js/web';
import { ProfileSelectionPage } from '../user_interfaces/ProfileSelectionPage';

export class SelectProfileTask extends Task {
  private profileName: string;

  static selectProfile(profileName: string): Task {
    return new SelectProfileTask(profileName);
  }

  constructor(profileName: string) {
    super(`selects profile '${profileName}'`);
    this.profileName = profileName;
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Wait.upTo(Duration.ofSeconds(10)).until(ProfileSelectionPage.PROFILE_LINK_FOR(this.profileName), isVisible()),
      Wait.upTo(Duration.ofSeconds(10)).until(ProfileSelectionPage.PROFILE_LINK_FOR(this.profileName), isClickable()),
      Click.on(ProfileSelectionPage.PROFILE_LINK_FOR(this.profileName))
    );
    
  }
}