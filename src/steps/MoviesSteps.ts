import { When } from '@cucumber/cucumber';
import { MyWorld } from '../support/World';
import { CsvUtils } from '../utils/CsvUtils';
import { Constants } from '../utils/Constants';
import { SelectGenreTask } from '../tasks/SelectGenreTask';
import { PrintMovieNamesTask } from '../tasks/PrintMovieNamesTask'; // Asegúrate de importar tu Task de impresión
import { ToggleGridViewTask } from '../tasks/ToggleGridViewTask'; 

When('user select genre with id {string}', async function (this: MyWorld, idGenre: string) {
    const genreData = CsvUtils.getMapTestData(Constants.GENRES_MOVIES, idGenre);
    
    if (!genreData) {
        throw new Error(`No genre data found for ID: ${idGenre} in data_genres.csv`);
    }

    await this.actor.attemptsTo(SelectGenreTask.selectGenre(genreData.genreName));
});

When('user print names of the movies with id {string}', async function (this: MyWorld, idGenre: string) {
    const genreData = CsvUtils.getMapTestData(Constants.GENRES_MOVIES, idGenre);
    
    if (!genreData) {
        throw new Error(`No genre data found for ID: ${idGenre} in data_genres.csv`);
    }

    await this.actor.attemptsTo(
    ToggleGridViewTask.toggleGridView(),
    PrintMovieNamesTask.printMovieNames(Number(genreData.numberMovieNames))
  );

});