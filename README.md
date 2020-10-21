# Personal Library

This is a project/challenage from freeCodeCamp's [Quality Assurance Projects](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker) certification. 

## Services & Architecture

The project depends on a remotely-visible instance of the app to be served to submit the assessment, and something like [REPL.it](https://repl.it/) does a good job of that. You'll also need a publicly accessible Mongo database (hosted somewhere like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) to store data/state for the API. The front-end will be a React SPA and data will come from an Express/MongoDB api expecting and serving JSON at `/api`.

A key focus of the freeCodeCamp module is testing, so thorough unit and integration tests will be written along the way.

As with the challenge [preceding this one](https://github.com/dvbsknd/FCC-issue-tracker) I'll try and work towards an MVC-ish architecture, with controllers being Express- and MongoDB-agnostic. Unlike with that challenge, I'll be using `Promises` rather than callbacks wherever possible. In future challenges I'll move to `async/await`. I'll also build the front-end with React in order to get some exposure to that and it's build-chain using [Webpack](https://webpack.js.org/).

## Local Development

You'll need an `.env` file with:

1. `PORT`
1. `MONGO_URI`

The rest is pretty straightforward, with `npm` for package management and `nodemon` for development server. Use `npm run dev` for starting up the local server.

## Dependencies

Notable packages and concepts include:

1. [Webpack](https://webpack.js.org/) for bundling and building the client React app
1. [Babel](https://babeljs.io/) for transpiling from modern JavaScript
1. [Express](https://www.npmjs.com/package/express)
1. [Helmet](https://www.npmjs.com/package/helmet) and [CORS](https://www.npmjs.com/package/cors) for setting appropriate headers
1. [MongoDB](https://www.npmjs.com/package/mongodb)
1. [Mocha](https://www.npmjs.com/package/mocha) to run tests
1. [Chai](https://www.npmjs.com/package/chai) with [HTTP](https://www.npmjs.com/package/chai-http) to assert
1. [Nodemon](https://www.npmjs.com/package/nodemon) for running a local dev server with hot-reloading
1. [ESLint](https://www.npmjs.com/package/eslint) for code-checking
1. [React](https://reactjs.org/), of course

## Goals/Todo

Development steps are documented here for tracking and articulating progress:

### Done

1. Initialise the repo and add some basic framework
1. Getting set-up with and learning Webpack basics
1. Setting up a [Webpack dev server](https://github.com/webpack/webpack-dev-server)
1. Add a `dev:client` script to start the Webpack dev server
1. Get rid of PostCSS and other redundant Webpack configs
1. Serve an emoji favicon
1. Get rid of the EJS static page renders and Bootstrap
1. Set up a production build script for webpack
1. Solve various CSP/Helmet issues
1. Set-up the API development environment
1. Add some basic error handling for the API
1. Add a database and a Books model
1. Add a "create" endpoint
1. Add functional and unit tests for the API

### Todo

1. Make tests add/remove dummy data to the database
1. Document the local development environment and scripts
1. Document the deployment process
1. Find out how to test React components
1. Create an API `dev:api` script to run client and API in parallel
1. Stub out an API get endpoint to give data to the SPA
