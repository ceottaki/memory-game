# Memory Game

This is a very simple memory game where you can match pairs of cards and when all have been matched, you win! Play against the timer to beat your previous time or against the number of flipped pairs.

[Play the game!](https://ceottaki.github.io/memory-game/)

The application was built with [React](https://reactjs.org/) written in [TypeScript](https://www.typescriptlang.org/) using [Next.js](https://nextjs.org/) to generate a static HTML website.

[Bootstrap](https://getbootstrap.com/) and [React Bootstrap](https://react-bootstrap.github.io/) are being used for styling.

## Development

To contribute to this repository, and to get it up and running, you will need to:

1. Clone this repository
2. Install packages
3. Run the project in development mode
4. Test a production build

### Continuing development

These are currently on our roadmap:

- Keep the past best score for comparison
- Build better visuals for winning the game
- Add sounds
- Allow the game to be paused, hiding the cards and pausing the timer
- Internationalisation

If you have any suggestions you would like implemented, please get in touch using the [Issues tab](https://github.com/ceottaki/memory-game/issues).

### Cloning this repository

To clone this repository, use the following commands:

```bash
git clone git@github.com:ceottaki/memory-game.git
cd memory-game
```

### Installing packages

To run your project for the first time, you will need to download the relevant npm packages. To do so, from the root folder of your application, run the following commands:

```bash
cd memory-game/app
npm install
```

### Running the project in development mode

To run the project, from the app folder inside of the root folder of your application, run the following commands:

```bash
cd memory-game/app
npm run dev # runs the application in development mode
```

Running the application in development mode allows you to see the website by default on http://localhost:3000 and includes hot-reloading so any changes made are reflected within a few seconds.

Linting is also set up to indicate any coding or code styling bad practices. To check for lint errors, run `npm run lint`.

### Testing a production build

To build the project for production and run it locally, you can run the following commands:

```bash
cd memory-game/app
npm run build ; npm start # runs the application in production mode
```

Running the application in production mode is still done using Next.js and there is no hot-reloading available, but the application runs faster. During the build process, a static website is also generated in the `./app/out/` folder of the application. This website expects to be hosted in the root folder of a server, therefore opening the `index.html` file directly will not allow it to load the relevant Javascript and CSS. If you are using Visual Studio Code you can use the excellent [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension to run a temporary small server to test the static application build.

To generate a new static website after making changes, simply run `npm run build`.

## The structure of the app

The app has its configuration files in its root folder, but the actual application is inside the `app` folder, and the source code you will spend most of your time on is inside the `src` folder within the `app` folder. There is also a `public` folder and files placed in here will be served statically and can be referenced by your code starting from the base URL `/`. The [Next.js documentation for static file serving](https://nextjs.org/docs/basic-features/static-file-serving) includes more details.

Looking inside the `src` folder, you will see:

- `pages`: each file here is a page associated with a route. This app already includes an `index.tsx` which corresponds to the `/` route. If you add, for example, a file called `about.tsx` that will correspond to the route `/about` on the website. The [Next.js documentation for pages](https://nextjs.org/docs/basic-features/pages) includes more details
- `global-styles`: contains the "master" [Sass](https://sass-lang.com/) file called `global-styles.scss` that imports styles that will be applied to the entire site, and should also contain any sub-files (which in Sass usually start with the underscore character) that will be imported within `global-styles.scss`. This app imports Bootstrap and another local file, `_custom-bootstrap-variables.scss`, containing definitions to customise Bootstrap through variables. Please note that unless a style is _truly required_ to be global, the use of [CSS Modules](https://github.com/css-modules/css-modules) is recommended, as can be seen in the Main Layout component in `app\src\components\MainLayout\MainLayout.tsx` and `app\src\components\MainLayout\MainLayout.module.scss`
- `components`: a folder to place non-page React components. Ideally, these should be separated into sub-folders representing a group of components in the same context.
- `common-types`: this is where TypeScript interfaces that represent types that can be used by the entire application should sit.

## License

MIT https://ceottaki.mit-license.org/
