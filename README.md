BELOW ARE GENERAL TEMPLATES TO BUILD DIFFERENT PORTIONS OF A WEBPAGE.

BASIC FORMAT
```
__________________________________
boilerplate-jin-v2
| .babelrc
| .env
| .gitignore
| package.json
| README.md
| server.js*
| weback.config.js*
|-- app (FOLDER)
|--|-- app.js (COMPILER)
|--|
|--|-- components (FOLDER)
|--|--|-- routes.js* (compiler)
|--|--|-- form.js (example1)
|--|--|-- navBar.js (example2)
|--|--|-- puppiesPage.js (example3)
|--|
|--|-- redux (FOLDER)
|--|--|-- index.js (compiler)
|--|--|-- authenticate.js (example1)
|--|--|-- puppies.js (example2)
|--|--|-- singlePuppy.js (example3)
|
|-- public (FOLDER)
|--|-- bundle.js (BUNDLE)
|--|-- index.html*
|--|-- style.css
|
|-- server (FOLDER)
|--|-- index.js*
|--|
|--|-- api (FOLDER)
|--|--|-- index.js (compiler)
|--|--|-- puppies.js (example1)
|--|--|-- kittens.js (example2)
|--|
|--|-- auth (FOLDER)
|--|--|-- index.js
|--|
|--|-- db (FOLDER)
|--|--|-- index.js* (compiler)
|--|--|-- db.js*
|--|--|-- puppy.js (example1)
|--|--|-- kitten.js (example2)
|--|--|-- user.js (example3)
__________________________________

FOLDER      This is a folder
COMPILER    This is the FINAL compiler
BUNDLE      This is the FINAL bundle created by the COMPILER
utility     This is a utility file that's used in another code
compiler    This gathers other files (likely to send to another file)

*
~/server.js
  THIS WILL SET UP YOUR CONNECTION BETWEEN A PORT AND YOUR BACKEND ROUTES IN ~/server/index.js.

~/webpack.config.js
  THIS CONFIGURATION FILE WILL ALLOW OUR PROGRAM TO PROPERLY COMPILE EVERYTHING WE'VE WRITTEN
  INTO A FORMAT THAT ALL/MOST BROWSERS ARE ABLE TO SEE/INTERACT WITH.

~/app/components/routes.js
  ALL ROUTES ARE GATHERED HERE BEFORE IT IS SENT TO ~/app/app.js TO SEND FOR FINAL COMPILE.

~/public/index.html
  AFTER ~/app/app.js IS COMPILED, IT IS BUNDLED INTO AN HTML-READABLE FORMAT IN ~/public/bundle.js.
  ~/public/index.html WILL INCLUDE <script async defer src='./bundle.js'></script> WHICH WILL
  ADD ALL OF OUR JAVASCRIPT WORK TO OUR BROWSER'S HTML PAGE, WHICH IS WHAT WE ULTIMATELY SEE!

~/server/index.js
  COMPILES ALL ROUTES. IN THIS CASE, IT WILL COMPILE ALL '/api/' & '/auth/' BACKEND ROUTES

~/server/db/index.js
  THIS WILL NOT ONLY COMPILE ALL FILES IN ~/server/db (FOLDER), IT WILL ALSO:
  - SET UP SEQUELIZE RELATIONSHIPS
  - EXPORT OBJECTS TO ALLOW THE REST OF YOUR CODE A PROPER ACCESSPOINT/ROUTE TO
    INTERACT WITH THE DATABASE

~/server/db/db.js
  THIS IS WHERE YOUR DATABASE REFERENCE IS ACTUALLY CREATED AND BE REFERENCED
  FOR EVERY FILE IN ~/server/db (FOLDER)
```

======================================================

FIRST STEP

Don't expect to have step 1, 2, 3. However, first thing is first:
- Connect your new project file to github; follow github instructions to create a new repo!
- Create your package.json file with `npm init -y` (the '-y' is shorthand for
  '--yes' which skips the questionnaire altogether)

======================================================

SET UP YOUR COMPILER

This boilerplate/template is being created with the intention of making a web page/application.
If all the fancy javascript/react/redux/express/Sequelize code you write doesn't get put onto a
web page, then what is all of this work for? Experience at best, but let's keep in mind the end
user. This is a webpage for others to interact with. For them to do so, we will put this on the
internet, through the browser. For this to happen, everything will be through html and the
browser's javascript runtime environment.

There's a lot of copy/paste here, but the big takeaway is that webpack is used to BUNDLE
everything we need into a readable format. Furthermore, we will be using babel and its
extensive list of packages to make sure even an outdated browser is able to execute this
code on older devices. Just because someone can't afford the newest technologies does
not mean they should be deprived of the good we want to share with the public!

The package.json scripts should look familiar to most npm/node users. Once everything
is set up, you should be able to run `npm start` to have your code run.

INSTALL IN THE TERMINAL: BABEL/WEBPACK
```
npm install --save-dev webpack webpack-dev-server nodemon @babel/core babel-loader @babel/preset-env @babel/polyfill style-loader css-loader
```

package.json:
```
  "scripts": {
    "start-server": "nodemon main.js -e html,js,css --ignore public",
    "build": "webpack",
    "build-watch": "webpack -w",
    "start": "npm run build-watch & npm run start-server"
  }
```

webpack.config.js:
```
const path = require('path');

module.exports = {
  entry: {
    app: ['@babel/polyfill','./app/app.js']
  },
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: path.resolve(__dirname, './app'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    stats: {
      chunks: false
    }
  }
}
```

.babelrc:
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}

```


======================================================

SERVER (express/psql/sequelize):

`npm install express pg sequelize`

======================================================

FRONT END (react/redux):

`npm install react react-dom react-redux react-router react-router-dom redux redux-thunk styled-components axios`

======================================================

AUTHENTICATION (jsonwebtoken bcrypt):

`npm install jsonwebtoken bcrypt history`
