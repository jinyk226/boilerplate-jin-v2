BELOW ARE GENERAL TEMPLATES TO BUILD DIFFERENT PORTIONS OF A WEBPAGE.

AT THE BOTTOM OF THE README, YOU WILL FIND A BASIC FORMAT WHICH WILL BE A GENERAL OVERVIEW
OF THE BOILERPLATE'S FILE STRUCTURE.


======================================================

FIRST STEP

Don't expect to have step 1, 2, 3. However, first thing is first:
- Connect your new project file to github; follow github instructions to create a new repo!
- Create a .gitignore file before beginning to install multiple npm packages:
  .gitignore:
    ```
    # Ignore all node_modules
    node_modules/*

    # Compiled JS
    public/bundle.js
    public/bundle.js.map

    # NPM errors
    npm-debug.log

    # OSX
    .DS_Store

    # env
    .env
    ```
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

INSTALL IN THE TERMINAL: BABEL/WEBPACK/NODEMON
```
npm install --save-dev webpack webpack-dev-server nodemon @babel/core babel-loader @babel/preset-env @babel/polyfill @babel/preset-react
```

YOUR CURRENT FILES:
```
boilerplate-jin-v2
| .gitignore
| package.json
| package-lock.json
| node_modules (FOLDER)
```

CREATE/EDIT FILES:
```
~/package.json
  UPDATE "main" FROM `"main": "index.js"` TO `"main": "server.js"`
  UPDATE "scripts"; COPY/PASTE THE BELOW CODE

~/webpack.config.js
  CREATE THE FILE
  UPDATE; COPY/PASTE THE BELOW CODE

~/.babelrc
  CREATE THE FILE
  UPDATE; COPY/PASTE THE BELOW CODE
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

Now that you've done that, if you review ~/webpack.config.js, it will explain the overall
flow of our application:

1. entry: get the data from '~/app/app.js'
2. output: output the data to '~/public/' and create a file with filename: 'bundle.js'
3. fancy things to allow our fancy features to work and simplify our workspace

Now that we know that, there's an obvious problem: Our file structure doesn't support this.

Yet!

CREATE FOLDERS/FILES:
```
~/server.js (SERVER)
  CREATE

~/app (FOLDER)
  CREATE

~/app/app.js (COMPILER)
  CREATE

~/public (FOLDER)
  CREATE
```

Remember, we need the '~/app/app.js' to read it. However, for the 'bundle.js', we just need
the folder so it can be bundled by our webpack api!

WE CAN'T RUN 'npm start' YET! We need a front end and back end!



'npm start' runs two commands: 'build-watch' and 'start-server'. Put simply:

- 'build-watch': runs webpack, which will run our front-end
- 'start-server': runs nodemon, which will run our back-end



~/public/ is a folder that will hold our front end. Inside is our 'bundle.js'
file, and our basic html structure, with an 'index.html' and 'style.css' in our
application. Go to the FRONT END section to learn how to build this! And
remember: THIS BOILERPLATE ASSUMES WE ARE RUNNING A REACT-REDUX APPLICATION!

~/server.js is where the back end of our application is connected to an online
server. In this case, we will locally host this ourselves. Go to the BACK
END/SERVER section to learn how to build this!

YOUR CURRENT FILES:
```
boilerplate-jin-v2
| .babelrc
| .gitignore
| package.json
| pacage-lock.json
| server.js
| app (FOLDER)
|-- app.js
| public (FOLDER)
| node_modules (FOLDER)
```

======================================================

BACK END/SERVER (with PSQL)

INSTALL IN THE TERMINAL: EXPRESS/PG/SEQUELIZE
```
npm install express pg sequelize
```

CREATE FOLDERS/FILES:
```
~/server (FOLDER)
  CREATE

~/server/api (FOLDER)
  CREATE

~/server/index.js (FOLDER)
  CREATE
  UPDATE; COPY/PASTE THE BELOW CODE
```

~/server/index.js:
```
const express = require('express')
const path = require('path')

const app = express()

// Parse incoming requests with JSON payloads (Plain english: Formats incoming requests to JSON format for our code to read)
app.use(express.json())

// Allow files in public folder to be accessible by our express app
app.use(express.static(path.join(__dirname, '../public')))

// 400 Error Handler: Send index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// 500 Error handler
app.use((req, res, next, err) => {
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
```

This ~/server/index.js file will have all our backend routes gathered up and 
exported. At this time, we have a 400 error handler which will handle all routes, 
especially because we can see no express routes have been defined yet. If there 
is an error in the code itself, we will display a custom 500 error handler.

Now, let's add a few lines of code to server.js to import our app and connect it to a server for us to listen in!

~/server.js:
```
const app = require('./server/index')
const PORT = 8000


app.listen(PORT, () => console.log(`Serving on port ${PORT}`))

```

Now, for testing purposes, ensure you have a ~/public/index.html file. IF YOU 
DO NOT, CREATE ~/public/index.html AND USE THIS AS A PLACEHOLDER FOR TESTING:
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello title</title>
</head>
<body>
    <h3>Hello body</h3>
</body>
</html>
```

At this time, you should be able to run the following command:
```
npm run start-server
```

If your localhost:8000 (or otherwise defined server number) displays your HTML, congratulations! 
Your backend route is being served! Now, let's add in some routes next...



~/server/index.js (add this line ABOVE the 400 error route):
```
// api routes
app.use('/api', require('./api'))
```

Now that we are requesting './api', we require two files:


CREATE/EDIT FILES:
```
~/server/api (FOLDER)
  CREATE

~/server/api/index.js
  CREATE
  UPDATE; COPY/PASTE THE BELOW CODE
```

~/server/api/index.js:
```
const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.send('test')
})

module.exports = router
```

Add in your routes as needed from here. You are now complete with setting up your basic backend!

YOUR CURRENT FILES:
```
boilerplate-jin-v2
| .babelrc
| .gitignore
| package.json
| pacage-lock.json
| server.js
| webpack.config.js
| app (FOLDER)
|-- app.js
| node_modules (FOLDER)
| public (FOLDER)
|-- index.html
| server (FOLDER)
|-- index.js
|-- api (FOLDER)
|--|-- index.js
```

======================================================

FRONT END (with React)

INSTALL IN THE TERMINAL: REACT/AXIOS
`npm install react react-dom react-router react-router-dom axios`

I WILL NOT COVER REDUX IN THIS, BUT HERE ARE THE BASIC REDUX INSTALLS NEEDED IN CASE IT'S NEEDED

INSTALL REDUX IF NEEDED:
`npm install react-redux redux redux-thunk`

Let's add in React to create a Single Page Application (SPA)!

The first step is to add a div in our ~/public/index.html where all of our content will be rendered. Add this line to the body:

~/public/index.html
`<div id='app'></div>`

Now we know where all of our React will be rendered. Our React code will be rendered from ~/public/bundle.js. As such, we will add a script tag to the head and defer as such:

~/public/index.html
`<script async defer src='./bundle.js'></script>`

If we review our webpack config file, we will see the entry point for the app is ~/app/app.js. This is where React's magic will aggregate.

~/app/app.js:
```
import React from 'react'
import {render} from 'react-dom'
import Routes from './components/routes.js'

render(
    <Routes />, document.getElementById('app')
)
```

As you can see, we will need to import a React component!

CREATE/EDIT FILES:
```
~/app/components (FOLDER)
  CREATE

~/app/components/routes.js
  CREATE
  UPDATE; COPY/PASTE THE BELOW CODE
```

~/app/components/routes.js:
```
import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

const app = () => {
    return (
    <div>
        <Router>
            <Routes>
            <Route path='/' element={<Filler />} />
            <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    </div>
  )
}

const Filler = () => {
    return (
        <div>
            This is a filler div
        </div>
    )
}


export default app
```

Generally, this 'Filler' div would be imported from a different file. In this case, we will add the filler into the same file to simplify the amount of files for testing.

Now, assuming your back-end is set up as well, you should be able to run `npm run start` and see that the default path of `localhost:8000/` shows the filler div text, and any other URLs at this time will redirect to that path as well.

Now, the next step is to create this Filler component in a separate file and import it!

CREATE/EDIT FILES:
```
~/app/components/filler.js
  CREATE
  UPDATE; COPY/PASTE THE BELOW CODE
```

~/app/components/filler.js
```
export default () => {
    return (
        <div>
            This is a filler div
        </div>
    )
}
```

Now from `~/app/components/routes.js` we can remove the Filler function that was defined in the same file and instead import at the top of the file as such:

~/app/components/routes.js:
```
import Filler from './filler.js'
```

With this, our basic React file structure is complete! Redux can now be added as needed, along with any other tools such as CSS.

YOUR CURRENT FILES:
```
boilerplate-jin-v2
| .babelrc
| .gitignore
| package.json
| pacage-lock.json
| server.js
| webpack.config.js
| app (FOLDER)
|-- app.js
|-- components (FOLDER)
|--|-- filler.js
|--|-- routes.js
| node_modules (FOLDER)
| public (FOLDER)
|-- index.html
|-- bundle.js
|-- bundle.js.map
| server (FOLDER)
|-- index.js
|-- api (FOLDER)
|--|-- index.js
```

======================================================

AUTHENTICATION (jsonwebtoken bcrypt)

`npm install jsonwebtoken bcrypt history`

======================================================

BASIC FORMAT
```
__________________________________
boilerplate-jin-v2
| .babelrc
| .env
| .gitignore
| package.json
| README.md
| server.js* (SERVER)
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
SERVER      This is the SERVER for your
utility     This is a utility file that's used in another code
compiler    This gathers other files (likely to send to another file)

*
~/server.js
  THIS WILL SET UP YOUR CONNECTION BETWEEN A PORT AND YOUR FRONTEND ROUTES IN ~/server/index.js.

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
