import { Actor, Task, Wait } from '@serenity-js/core';
import { MoviesPage } from '../user_interfaces/MoviesPage';
import { Click, isVisible } from '@serenity-js/web';

export class ToggleGridViewTask extends Task {

  static toggleGridView(): ToggleGridViewTask {
    return new ToggleGridViewTask();
  }

  private constructor() {
    super(`toggle the grid view`);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Wait.until(MoviesPage.GRID_VIEW_BUTTON, isVisible()),
      Click.on(MoviesPage.GRID_VIEW_BUTTON)
    );
  }
}