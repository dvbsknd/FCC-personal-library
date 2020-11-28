1. Return a comment count for each book using a MongoDB calculated field
1. Show a comment count on the books in the home list
1. Get the App compontent to be wholly responsible for synch to DB by using a [Context](https://www.robinwieruch.de/react-context)
1. Write a [custom hook or reducer](https://www.robinwieruch.de/react-hooks-fetch-data) for the API stuff
1. Use [Babel resolvers](https://www.robinwieruch.de/babel-module-resolver/) for components/modules
1. Split ESLint files in to a `root` and `client` ones, like [this](https://stackoverflow.com/questions/36762468/how-do-i-setup-a-folder-with-a-different-rule-and-another-folder-with-a-differen) or [this](https://headway.io/blog/customizing-eslint-for-a-specific-directory)
1. Refactor `_id` to `id` for usability (it's MongoDB specific)
1. Flatten components into single files, not folders (for now)
1. Restructure the Controllers so that DB connections close and tests finish
1. Try to build a mockable function class for tests by using [Object.setPrototypeOf](https://stackoverflow.com/questions/10341127/can-javascript-constructor-return-function-and-keep-inheritance)
1. Use `concurrently` to make an `npm run dev` command
