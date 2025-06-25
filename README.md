# automation-netflix-web
---

Este proyecto es un framework de automatización de pruebas web robusto y escalable, diseñado para simular interacciones de usuario en la aplicación web de Netflix. Utiliza una combinación de Cucumber para la definición de escenarios de comportamiento, Serenity/JS para patrones de diseño de pruebas limpias (Screenplay Pattern) y reportes narrativos, Playwright para la interacción con el navegador y TypeScript para la implementación del código.

---
## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologias-utilizadas)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Configuración y Ejecución](#configuracion-y-ejecucion)
- [Patrón de Diseño de Automatización](#patron-de-diseno-de-automatizacion)
- [Reporte de Pruebas](#reporte-de-pruebas)
- [Datos de pruebas](#reporte-de-pruebas)
- [Creado Por](#creado-por)

---
## Tecnologías Utilizadas

-   **Serenity/JS**: Un framework de automatización de pruebas full-stack para equipos ágiles. Proporciona el [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/) para escribir pruebas de aceptación y regresión limpias, mantenibles y orientadas al negocio. También genera reportes ilustrados y narrativos que documentan lo que la aplicación hace.
-   **Cucumber.js**: Una herramienta de BDD (Behavior-Driven Development) que permite escribir pruebas de aceptación en un formato legible para humanos (Gherkin). Fomenta la colaboración entre miembros técnicos y no técnicos del equipo.
-   **Playwright**: Una librería Node.js para automatizar Chromium, Firefox y WebKit con una única API. Ofrece capacidades de automatización web de última generación, incluyendo autowaiting, aislamiento de contexto y grabación de video/capturas de pantalla.
-   **TypeScript**: Un superconjunto tipado de JavaScript que añade tipado estático, mejorando la robustez del código, la legibilidad y la capacidad de mantenimiento. Ideal para proyectos de automatización a gran escala.
-   **Node.js**: Entorno de ejecución de JavaScript.
-   **npm**: Gestor de paquetes de Node.js, utilizado para instalar y gestionar las dependencias del proyecto.
-   **npm-failsafe**: Utilidad para ejecutar scripts de npm de forma segura, permitiendo que un flujo de comandos continúe incluso si uno falla, lo cual es útil en pipelines de CI/CD.
-   **rimraf**: Utilidad para la eliminación de archivos y directorios de forma segura, utilizada para limpiar artefactos de compilación y reportes.

---
## Estructura de Carpetas

El proyecto está organizado siguiendo los principios de modularidad y el Screenplay Pattern de Serenity/JS:

```bash
.
├── reports                       # Carpeta para reportes generados (e.g., Cucumber JSON, Playwright traces), solo se visualiza después de ejecutar.
├── src
│   ├── actors                    # Define los "Actors" que interactúan con la aplicación.
│   │   ├── User.ts
│   ├── questions                 # Define preguntas que los actores pueden hacer sobre el estado de la aplicación.
│   │   └── WelcomeMessage.ts
│   ├── steps                     # Implementaciones de los pasos de Cucumber.
│   │   ├── CommonSteps.ts
│   │   ├── LoginSteps.ts
│   │   ├── MoviesSteps.ts
│   │   └── ProfileSteps.ts
│   ├── support                   # Archivos de soporte para Cucumber y Serenity/JS.
│   │   ├── Hooks.ts              # Hooks de Cucumber (Before, After, etc.).
│   │   └── World.ts              # Configuración del "World" de Cucumber y Serenity/JS.
│   ├── tasks                     # Define tareas complejas que los actores pueden realizar.
│   │   ├── LoginTask.ts
│   │   ├── PrintMovieNamesTask.ts
│   │   ├── SelectGenreTask.ts
│   │   ├── SelectProfileTask.ts
│   │   └── ToggleGridViewTask.ts
│   ├── user_interfaces           # Define los PageElements (locators) de las páginas web.
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── MoviesPage.ts
│   │   └── ProfileSelectionPage.ts
│   └── utils                     # Utilidades o helpers comunes.
│       ├── Constants.ts
│       └── CsvUtils.ts
├── tests
│   ├── data                      # Archivos de datos para las pruebas (e.g., CSV).
│   │   ├── data_genre_movies.csv
│   │   └── data_login.csv
│   └── features                  # Archivos .feature de Cucumber que describen los escenarios.
│       ├── login.feature
│       └── movies.feature
├── .gitignore                    # Archivo de configuración para Git para ignorar archivos/carpetas.
├── cucumber.js                   # Configuración de Cucumber.js.
├── package-lock.json             # Bloquea las versiones de las dependencias.
├── package.json                  # Define el proyecto, scripts y dependencias.
└── tsconfig.json                 # Configuración de TypeScript.
```

---
## Configuración y Ejecución

Sigue estos pasos para configurar y ejecutar el proyecto:

1.  **Clonar el Repositorio**:
    ```bash
    git clone https://github.com/diegosierrase/automation-netflix-web.git
    cd automation-netflix-web
    ```

2.  **Instalar Dependencias**:
    Asegúrate de tener [Node.js](https://nodejs.org/en/download/) instalado. Luego, instala todas las dependencias del proyecto usando npm:
    ```bash
    npm install
    ```
    *Nota: `playwright` se instalará automáticamente con `npm install` y descargará los navegadores necesarios.*

3.  **Ejecutar Pruebas**:

    El proyecto incluye varios scripts definidos en `package.json` para ejecutar las pruebas:

    * **Limpiar Artefactos de Reportes**:
        ```bash
        npm run clean
        ```

    * **Ejecutar todas las Features (sin limpieza ni reporte de Serenity)**:
        ```bash
        npm run test:execute
        ```

    * **Ejecutar la Feature de Login**:
        Limpiará reportes antiguos, ejecutará `login.feature` y generará el reporte de Serenity.
        ```bash
        npm run test:login-feature
        ```

    * **Ejecutar la Feature de Películas**:
        Limpiará reportes antiguos, ejecutará `movies.feature` y generará el reporte de Serenity.
        ```bash
        npm run test:movies-feature
        ```

    * **Ejecutar TODAS las Features**:
        Este comando maestro limpiará reportes antiguos, ejecutará *todas* las features (`.feature` files) encontradas en `tests/features/` y sus subcarpetas, y finalmente generará el reporte de Serenity consolidado.
        ```bash
        npm run test:all
        ```

    * **Ejecutar solo el generador de reportes (después de una ejecución de `test:execute` o similar)**:
        ```bash
        npm run test:report
        ```

    * **Comando `test` por defecto**:
        Este es el comando `npm test` estándar, que en este proyecto equivale a `npm run test:all`.
        ```bash
        npm test
        ```

---
## Patrón de Diseño de Automatización

Este framework implementa el **[Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/)** de Serenity/JS.

El Screenplay Pattern fomenta la escritura de pruebas altamente expresivas, mantenibles y extensibles al organizar el código de automatización en torno a los siguientes conceptos:

-   **Actors**: Representan usuarios que interactúan con el sistema bajo prueba, poseyendo `Abilities` para interactuar con la interfaz de usuario (ej. `BrowseTheWebWithPlaywright`) y pudiendo realizar `Tasks` y hacer `Questions`.
-   **Abilities**: Describen cómo un actor puede interactuar con el sistema (ej. `BrowseTheWebWithPlaywright` para interactuar con el navegador, `CallAnApi` para interactuar con APIs, etc.).
-   **Tasks**: Agrupan una serie de `Interactions` (o `Questions` y otras `Tasks`) para lograr un objetivo de negocio. Son verbos de alto nivel.
-   **Interactions**: Describen cómo el actor interactúa con la interfaz de usuario (ej. `Click.on`, `Enter.theValue`, `Wait.until`).
-   **Questions**: Permiten a los actores obtener información sobre el estado de la aplicación para realizar aserciones.
-   **Page Objects / Page Elements**: Aunque no es un patrón exclusivo de Screenplay, se utilizan para encapsular los selectores de elementos de la interfaz de usuario, haciéndolos más robustos y reusables. En Serenity/JS, se representan como `PageElement` y `PageElements`.

Este patrón promueve la separación de intereses, la reutilización del código y una mayor legibilidad de las pruebas, haciéndolas parecer historias de usuarios.        

---
## Reporte de Pruebas

Después de ejecutar las pruebas (especialmente con `npm run test:all`, `npm run test:login-feature`, `npm run test:movies-feature` o `npm test`), se generará un reporte de Serenity BDD en la carpeta `target/site/serenity`.

Para ver el reporte, abre el archivo `index.html` ubicado en `target/site/serenity/index.html` en tu navegador web.

Este reporte es una de las características más potentes de Serenity BDD:
-   Proporciona una **narrativa detallada** de la ejecución de las pruebas.
-   Incluye **capturas de pantalla** automáticas en cada paso clave.
-   Muestra el **flujo de la prueba** paso a paso, documentando lo que la aplicación hace.
-   Relaciona los resultados de la prueba con los **requisitos** que están siendo cubiertos (aunque en este template no hay tags de requisitos explícitos, Serenity tiene la capacidad).
-   Ofrece métricas clave sobre la ejecución de la prueba y la cobertura.

---
## Datos de Pruebas

Los datos utilizados para las pruebas se encuentran en la carpeta `tests/data/`.

Se proporcionan datos de ejemplo en cada archivo CSV. Sin embargo, para poder ejecutar las pruebas exitosamente en el entorno real de Netflix, **es indispensable reemplazar estos datos de ejemplo con información real y válida de una cuenta de Netflix activa**.

---
### `data_login.csv`

Este archivo contiene las credenciales de inicio de sesión y los perfiles de usuario.

```csv
id,email,password,profileName
1,user2@example.com,Password123,Profile1
2,user2@example.com,Password123,Profile2
```
**Consideraciones importantes:**

* `email`: El correo electrónico real de la cuenta de Netflix.
* `password`: La contraseña real de la cuenta de Netflix.
* `profileName`: El nombre del perfil que deseas seleccionar, tal como aparece exactamente en tu cuenta de Netflix (sensible a mayúsculas y minúsculas, espacios, etc.).

---
### `data_genre_movies.csv`

Este archivo contiene la información para la búsqueda y listado de películas por género.

```csv
id,genreName,numberMovieNames
1,Cine de intriga,3
```

**Consideraciones importantes:**

* `genreName`: El nombre del género de películas, debe coincidir **exactamente** con el nombre que aparece en la interfaz de Netflix Colombia (o la región de tu cuenta). Por ejemplo: "Cine de intriga", "Películas de acción", "Series de TV", etc.
* `numberMovieNames`: El número de nombres de películas que se desean imprimir de ese género.

---
## Creado Por

-   Diego Alexander Sierra Sepúlveda
