import { Actor, Task, Wait, Duration } from '@serenity-js/core';
import { MoviesPage } from '../user_interfaces/MoviesPage';
import { HomePage } from '../user_interfaces/HomePage';
import { Click, isVisible } from '@serenity-js/web';

export class SelectGenreTask extends Task {
  private genreName: string;

  static selectGenre(genreName: string): Task {
    return new SelectGenreTask(genreName);
  }

  constructor(genreName: string) {
    super(`select genre '${genreName}'`);
    this.genreName = genreName;
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
        Wait.until(HomePage.MOVIES_LINK, isVisible()),
        Click.on(HomePage.MOVIES_LINK),
        Wait.until(MoviesPage.GENRES_DROPDOWN_BUTTON, isVisible()),
        Click.on(MoviesPage.GENRES_DROPDOWN_BUTTON),
        Wait.until(MoviesPage.GENRE_MOVIE_LIST(this.genreName), isVisible()),
        Wait.for(Duration.ofMilliseconds(1000)),
        Click.on(MoviesPage.GENRE_MOVIE_LIST(this.genreName))
    );
  }
}