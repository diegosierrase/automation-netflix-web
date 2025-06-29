---
# automation-netflix-web

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

El proyecto está organizado siguiendo los principios de modularidad y el Screenplay Pattern de Serenity/JS, soportando múltiples entornos o aplicaciones (Netflix y Conduit):

```
.
├── src
│   ├── common
│   │   └── actors                # Define los "Actors" genéricos que pueden ser usados en múltiples dominios.
│   │       └── User.ts
│   ├── conduit                   # Módulos específicos para la aplicación 'Conduit'.
│   │   ├── questions             # Preguntas para la aplicación Conduit.
│   │   ├── steps                 # Implementaciones de pasos de Cucumber para Conduit.
│   │   ├── tasks                 # Tareas específicas para la aplicación Conduit.
│   │   └── user_interfaces       # PageElements (locators) para la aplicación Conduit.
│   ├── netflix                   # Módulos específicos para la aplicación 'Netflix'.
│   │   ├── questions             # Preguntas para la aplicación Netflix.
│   │   ├── steps                 # Implementaciones de pasos de Cucumber para Netflix.
│   │   ├── tasks                 # Tareas específicas para la aplicación Netflix.
│   │   └── user_interfaces       # PageElements (locators) para la aplicación Netflix.
│   ├── support                   # Archivos de soporte para Cucumber y Serenity/JS.
│   │   ├── World.ts              # Configuración del "World" de Cucumber y Serenity/JS, incluyendo hooks de inicialización.
│   │   └── Constants.ts          # (Si es global) Constantes generales.
│   └── utils                     # Utilidades o helpers comunes para todo el proyecto.
│       ├── Constants.ts
│       └── CsvUtils.ts
├── tests
│   ├── data                      # Archivos de datos para las pruebas (e.g., CSV).
│   │   ├── conduit               # Datos específicos para pruebas de Conduit.
│   │   │   └── data_login.csv
│   │   └── netflix               # Datos específicos para pruebas de Netflix.
│   │       ├── data_genre_movies.csv
│   │       └── data_login.csv
│   └── features                  # Archivos .feature de Cucumber que describen los escenarios.
│       ├── conduit               # Features para la aplicación Conduit.
│       │   └── login.feature
│       └── netflix               # Features para la aplicación Netflix.
│           ├── login.feature
│           └── movies.feature
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

---

3.  **Ejecutar Pruebas**:

    El proyecto incluye varios scripts definidos en `package.json` para ejecutar las pruebas, permitiendo una ejecución específica por aplicación (Netflix o Conduit) o de forma global:

    * **Limpiar Artefactos de Reportes**:
        Elimina la carpeta `target/` que contiene los reportes y artefactos generados.
        ```bash
        npm run clean
        ```

    * **Generar Reporte de Serenity BDD**:
        Este comando se encarga de procesar los resultados de las pruebas (generados previamente por `cucumber-js`) y crear el reporte HTML navegable de Serenity BDD. Normalmente se ejecuta después de una ejecución de pruebas.
        ```bash
        npm run serenity-report
        ```

    * **Ejecutar Pruebas Específicas de Netflix**:
        Estos comandos utilizan `npm-failsafe` para asegurar que se limpie el entorno antes de la ejecución y que el reporte de Serenity se genere incluso si las pruebas fallan.

        * **Ejecutar Feature de Login de Netflix**:
            Limpia reportes, ejecuta la feature `tests/features/netflix/login.feature` y genera el reporte.
            ```bash
            npm run test:netflix:login
            ```

        * **Ejecutar Feature de Películas de Netflix**:
            Limpia reportes, ejecuta la feature `tests/features/netflix/movies.feature` y genera el reporte.
            ```bash
            npm run test:netflix:movies
            ```

        * **Ejecutar TODAS las Features de Netflix**:
            Limpia reportes, ejecuta todas las features bajo `tests/features/netflix/**/*.feature` y genera el reporte.
            ```bash
            npm run test:netflix:all
            ```
    ### **Prerrequisitos para Pruebas de Conduit**

    **Importante**: Para poder ejecutar las pruebas de automatización para la aplicación **Conduit**, es *indispensable* que el proyecto `angular-realworld-example-app` (que contiene la aplicación web de Conduit) esté **corriendo localmente** y sea accesible.

    Asegúrate de haber clonado, configurado e iniciado el proyecto `angular-realworld-example-app` siguiendo sus propias instrucciones (normalmente `npm install` y `npm start`) antes de ejecutar cualquier prueba de Conduit desde este repositorio.

    El proyecto `angular-realworld-example-app` debe estar accesible en `http://localhost:4200/` para que las pruebas de Conduit puedan interactuar con él.

    * **Ejecutar Pruebas Específicas de Conduit**:
        Similar a los scripts de Netflix, pero enfocados en la aplicación Conduit.

        * **Ejecutar Feature de Login de Conduit**:
            Limpia reportes, ejecuta la feature `tests/features/conduit/login.feature` y genera el reporte.
            ```bash
            npm run test:conduit:login
            ```

        * **Ejecutar TODAS las Features de Conduit**:
            Limpia reportes, ejecuta todas las features bajo `tests/features/conduit/**/*.feature` y genera el reporte.
            ```bash
            npm run test:conduit:all
            ```

    * **Ejecutar TODAS las Features del Proyecto (Netflix y Conduit)**:
        Este es el comando maestro que limpia reportes, ejecuta *todas* las features (`.feature` files) encontradas en `tests/features/` y sus subcarpetas (tanto Netflix como Conduit), y finalmente genera el reporte de Serenity consolidado.
        ```bash
        npm run test:all
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

Después de ejecutar las pruebas (especialmente con `npm run test:netflix:all`, `npm run test:conduit:all`, `npm run test:all`, o cualquiera de los scripts específicos como `npm run test:netflix:login`), se generará un reporte de Serenity BDD en la carpeta `target/site/serenity`.

Para ver el reporte, abre el archivo `index.html` ubicado en `target/site/serenity/index.html` en tu navegador web.

Este reporte es una de las características más potentes de Serenity BDD:
-   Proporciona una **narrativa detallada** de la ejecución de las pruebas.
-   Incluye **capturas de pantalla** automáticas en cada paso clave.
-   Muestra el **flujo de la prueba** paso a paso, documentando lo que la aplicación hace.
-   Relaciona los resultados de la prueba con los **requisitos** que están siendo cubiertos (aunque en este template no hay tags de requisitos explícitos, Serenity tiene la capacidad).
-   Ofrece métricas clave sobre la ejecución de la prueba y la cobertura.

Además de los reportes HTML, se generarán **videos de las ejecuciones de las pruebas** en la subcarpeta `target/site/serenity/video/`. Estos videos proporcionan una representación visual completa de las interacciones del navegador durante la ejecución de cada escenario.

**Limpieza Automática del Directorio `target`**

Cada vez que ejecutas uno de los scripts de prueba principales (como `npm run test:netflix:login`, `npm run test:all`, etc.), se inicia un proceso de limpieza automática del directorio `target/`. Este proceso es manejado por el script `clean` en el archivo `package.json` y la utilidad `rimraf`.

**¿Por qué es importante esta limpieza?**

1.  **Asegurar Resultados Frescos**: El directorio `target/` es donde se almacenan todos los artefactos de la ejecución de pruebas anteriores, incluyendo:
    * Archivos JSON de resultados de Cucumber.
    * Reportes HTML de Serenity BDD.
    * Videos de la ejecución de Playwright.
    * Capturas de pantalla.
    Al eliminar estos archivos antes de cada nueva ejecución, garantizamos que los reportes y videos generados corresponden **únicamente a la ejecución actual**, evitando confusiones con resultados de pruebas pasadas o residuales.
2.  **Evitar Contaminación de Datos**: Si no se limpiara, los resultados de una ejecución anterior podrían mezclarse con los de una nueva, falseando las métricas del reporte o incluyendo información irrelevante.
3.  **Mantener la Consistencia**: Promueve un ambiente de pruebas predecible y consistente, lo cual es crucial para la integración continua (CI/CD) y para el diagnóstico preciso de fallos.

**¿Cómo funciona?**

La magia reside en el script `npm-failsafe` que se está utilizando. Por ejemplo, en el script:
`"test:netflix:login": "npx npm-failsafe clean test:netflix:login:execute serenity-report"`

* **`clean`**: Es el primer comando que `npm-failsafe` intenta ejecutar. Este script, definido como `"clean": "rimraf target"`, utiliza la utilidad `rimraf` para eliminar de forma recursiva (es decir, la carpeta y todo su contenido) del directorio `target/`.
* **`npm-failsafe`**: Asegura que, incluso si el comando `clean` falla (por ejemplo, si la carpeta `target` no existe, aunque `rimraf` maneja esto elegantemente), el flujo de ejecución no se detenga y continúe con los siguientes scripts (`test:netflix:login:execute` y `serenity-report`).

De esta manera, se garantiza que cada ejecución de las pruebas comienza con un directorio `target/` limpio, listo para albergar los nuevos resultados y artefactos.

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
