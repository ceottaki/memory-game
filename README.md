# Next Typescript Static

This is a boilerplate for a [React](https://reactjs.org/) application written in [TypeScript](https://www.typescriptlang.org/) that uses [Next.js](https://nextjs.org/) to generate a static HTML website.

While the boilerplate currently presents a site using [Bootstrap](https://getbootstrap.com/) and [React Bootstrap](https://react-bootstrap.github.io/), that is completely optional and can be removed if another styling framework is desired.

## Getting started

To use this repository as a base for a new repository, and to get it up and running, you will need to:

1. Clone this repository
2. Delete the local git history for this repository
3. Change the application details in package.json
4. Initiate git with your new repository in mind
5. Add your first commit
6. Install npm packages
7. Run the project and/or build the site

### Cloning this repository and removing history

To clone this repository and remove its history locally in order to start a new repository from scratch, use the following commands, substituting `my-application` for the name of your application:

```bash
mkdir my-application
git clone git@github.com:ceottaki/next-typescript-static.git ./my-application
cd my-application
rm -r -f ./.git/
```

### Changing the application details in package.json

Now that you have the files locally, open the application with your favourite code editor (we recommend [VS Code](https://code.visualstudio.com/)) and edit the file `app/package.json`.

You should edit at least the following fields:

- name: you should change this to the name of your application, i.e. `my-application`
- version: you should probably change this to `0.0.1` if your application is brand new
- description: enter a suitable description for your application here
- repository: change the URL to the one of your application's repository
- author: change this to your own details

### Initiating git with a new repository and adding your first commit

Removing the `.git/` folder removed any trace of a repository, so we now want to add git to the application again. To do so, and to add the first commit, run the following commands:

```bash
git init
git add .
git commit -m "First commit - boilerplate set up."
```

If you already have a remote repository set up, you may wish to add it here and push your code (please substitute the example URL below with your own):

```bash
git remote add origin git@github.com:example/my-application.git
git push -u origin master
```

### Installing npm packages

To run your project for the first time, you will need to download the relevant npm packages. To do so, from the root folder of your application, run the following commands:

```bash
cd app
npm install
```

### Running the project and building the site

To run the project, from the app folder inside of the root folder of your application, you can one of the following commands:

```bash
cd app
npm run dev # runs the application in development mode
npm run build ; npm start # runs the application in production mode
```

Running the application in development mode allows you to see the website by default on http://localhost:3000 and includes hot-reloading so any changes made are reflected within a few seconds.

Running the application in production mode is still done using Next.js and there is no hot-reloading available, but the application runs faster. During the build process, a static website is also generated in the `./app/out/` folder of the application. This website expects to be hosted in the root folder of a server, therefore opening the `index.html` file directly will not allow it to load the relevant Javascript and CSS.

To generate a new static website after making changes, simply run `npm run build`.

Linting is also set up to indicate any coding or code styling bad practices. To check for lint errors, run `npm run lint`.

## The structure of the app

The app has its configuration files in its root folder, but the actual application is inside the `app` folder, and the source code you will spend most of your time on is inside the `src` folder within the `app` folder.

Looking inside the `src` folder, you will see:

- `public`: files placed in here will be served statically and can be referenced by your code starting from the base URL `/`. The [Next.js documentation for static file serving](https://nextjs.org/docs/basic-features/static-file-serving) includes more details
- `pages`: each file here is a page associated with a route. This boilerplate already includes an `index.tsx` which corresponds to the `/` route. If you add, for example, a file called `about.tsx` that will correspond to the route `/about` on the website. The [Next.js documentation for pages](https://nextjs.org/docs/basic-features/pages) includes more details
- `global-styles`: contains the "master" [Sass](https://sass-lang.com/) file called `global-styles.scss` that imports styles that will be applied to the entire site, and should also contain any sub-files (which in Sass usually start with the underscore character) that will be imported within `global-styles.scss`. This boilerplate imports Bootstrap and another local file, `_custom-bootstrap-variables.scss`, containing definitions to customise Bootstrap through variables. Please note that unless a style is _truly required_ to be global, the use of [CSS Modules](https://github.com/css-modules/css-modules) is recommended, and already set up, as can be seen in the Main Layout component in `app\src\components\MainLayout\MainLayout.tsx` and `app\src\components\MainLayout\MainLayout.module.scss`
- `components`: a folder to place non-page React components. Ideally, these should be separated into sub-folders representing a group of components in the same context. Some simple example components are provided
- `common-types`: this is where TypeScript interfaces that represent types that can be used by the entire application should sit.

## License

MIT https://ceottaki.mit-license.org/
