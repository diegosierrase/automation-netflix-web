import { Actor, Task, Wait, Duration } from '@serenity-js/core';
import { Text, isVisible} from '@serenity-js/web';
import { MoviesPage } from '../user_interfaces/MoviesPage';

export class PrintMovieNamesTask extends Task {
  private constructor(private readonly count: number) {
    super(`print the first ${count} movie names`);
  }

  static printMovieNames(count: number): PrintMovieNamesTask {
    return new PrintMovieNamesTask(count);
  }

  async performAs(actor: Actor): Promise<void> {
    console.log(`\n--- Printing First ${this.count} Movie Names ---`);

    await actor.attemptsTo(
        Wait.for(Duration.ofMilliseconds(2000))
    );
    
    const movieElements = await MoviesPage.MOVIE_NAMES_FALLBACK_TEXTS.answeredBy(actor);

    for (let i = 0; i < Math.min(this.count, movieElements.length); i++) {
        const movieName = await actor.answer(Text.of(movieElements[i]));
        console.log(`${i + 1}. ${movieName}`);
    }

    console.log(`------------------------------\n`);

    if (movieElements.length < this.count) {
      console.log(`(Note: Only ${movieElements.length} names were found on the page, but ${this.count} were requested.)`);
    }
  }
}