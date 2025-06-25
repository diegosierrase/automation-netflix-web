import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

export class CsvUtils {
    private static readonly RESOURCES_PATH = path.join(process.cwd(), 'tests', 'data');
    private static readonly PREFIX_NAME = 'data_';
    private static readonly EXTENSION = '.csv';
    private static readonly FILTER_ID = 'id';
    private static readonly SEPARATION_CHARACTER = ',';

    /**
     * Carga todos los datos de un archivo CSV dado su nombre (sin prefijo ni extensión).
     * @param csvName El nombre del archivo CSV (ej. 'login' para 'data_login.csv').
     * @returns Una lista de objetos Map (o Record<string, string> en TS) donde cada objeto es una fila.
     * @throws Error si el archivo no se puede leer.
     */
    public static getDataCsv(csvName: string): Record<string, string>[] {
        const filePath = path.join(CsvUtils.RESOURCES_PATH, `${CsvUtils.PREFIX_NAME}${csvName}${CsvUtils.EXTENSION}`);

        if (!fs.existsSync(filePath)) {
            throw new Error(`CSV file not found at: ${filePath}`);
        }

        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            delimiter: CsvUtils.SEPARATION_CHARACTER,
        }) as Record<string, string>[];

        return records;
    }

    /**
     * Obtiene datos de un CSV filtrados por una 'id' específica y remueve la columna 'id'.
     * @param csvName El nombre del archivo CSV (ej. 'login').
     * @param filter El valor del 'id' por el cual filtrar.
     * @returns Una lista de objetos Map filtrados y sin la columna 'id'.
     * @throws Error si el archivo no se puede leer.
     */
    public static getDataTest(csvName: string, filter: string): Record<string, string>[] {
        const dataTable = CsvUtils.getDataCsv(csvName);
        const filteredList: Record<string, string>[] = [];

        for (const row of dataTable) {

            if (row[CsvUtils.FILTER_ID] && row[CsvUtils.FILTER_ID].toLowerCase() === filter.toLowerCase()) {
                const newRow = { ...row };
                delete newRow[CsvUtils.FILTER_ID];
                filteredList.push(newRow);
            }
        }

        return filteredList;
    }

    /**
     * Obtiene el valor de una columna específica de todas las filas del CSV.
     * @param csvName El nombre del archivo CSV.
     * @param column El nombre de la columna cuyos valores se desean obtener.
     * @returns Una lista de strings con los valores de la columna especificada.
     * @throws Error si el archivo no se puede leer.
     */
    public static getArrayListColumn(csvName: string, column: string): string[] {
        const dataTable = CsvUtils.getDataCsv(csvName);
        const filteredList: string[] = [];

        for (const row of dataTable) {
            if (row[column] !== undefined) {
                filteredList.push(row[column]);
            } else {
                console.warn(`Column '${column}' not found in one or more rows of ${csvName}.csv`);
            }
        }

        return filteredList;
    }

    /**
     * Obtiene el primer objeto Map de datos de prueba filtrado por 'id'.
     * @param csvName El nombre del archivo CSV.
     * @param filter El valor del 'id' por el cual filtrar.
     * @returns El primer objeto Map que coincide con el filtro, o null si no se encuentra.
     * @throws Error si el archivo no se puede leer.
     */
    public static getMapTestData(csvName: string, filter: string): Record<string, string> | null {
        const filteredData = CsvUtils.getDataTest(csvName, filter);
        return filteredData.length > 0 ? filteredData[0] : null;
    }
}