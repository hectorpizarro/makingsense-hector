MAKINGSENSE.COM CHALLENGE

Hello, this is the project I created as response to the challenge provided on 2020-03-10.
This code is running on production at this site:

https://makingsense-challenge.herokuapp.com

The app is an Express server instance and a React web app created using create-react-app. On deploy Express serves the web app from the build/ folder.

On development I execute 'npm start' to work in the React app, it automatically sends API requests to Express using the 'proxy' option in package.json.

The Marvel API public key is stored locally in an .env file, not included in the repository. On production the .env contents are defined as environment variables in the Heroku dashboard.

The marvel attribution text received from the API on all requests is shown on both pages, this is a requirement for Marvel API fair use.

INSTALL

You will need to create a .env file at the root of the codebase, I will send mine as an example through mail. Once the file is in place execute:

  npm run start

You will see Marvel data from localhost.

DEPLOYMENT

The Marvel API requires two pieces of information to allow API requests:

- A public key, created after the developer registers to marvel.com.
- A registered referer. Marvel only allow requests from domains registered in the Developer dashboard. When I deployed and tested from makingsense-challenge.herokuapp.com my requests failed, it looks like the referer header is replaced to "gateway.marvel.com" in the middle. There is no way to manually replace the referer as this is a browser restriction.
The solution I provided adds an Express server to use as a proxy: all requests from the web app are sent to Express, which forwards them to Marvel and returns the response. An improvement should be to restrict Express to allow requests only from the local web app, but it was out of scope (and time) to add it.

For production I created a Heroku instance linked to the github repository. Any time I deploy to the master branch it automatically builds and deploys to makingsense-challenge.herokuapp.com.

TESTS

I created two different sets of tests:

1.- Storybook: allows to verify the UI for components isolated from the app. You can run it locally on a random port executing:

npm run storybook

I provided tests for the following components:

- Main character card for desktop and mobile (responsive).
- Main pagination for desktop and mobile, showing different button combos.
- Loader for desktop and mobile.

2.- Unit tests: using jest and enzyme I mocked globally Axios to avoid network requests and BrowserRouter in order to test routing (see myapp.test.js). Mocks are defined in the __mocks__ folder. card.test.js shows an example to test if the rendered component contains elements we expect to show, like Yes or No icon flags for comics counter. src/pages/main/ducks/index.test.js tests the Redux slice used for the Main page: actions, reducers and the async function created to load a page characters list from the API.

STYLES

Although the challenge suggested to skip design, adding CSS allowed me to show how to build responsive solutions for components using CSS Grid and the styled-components library.

Css in JS includes styles with each component, the styled-components library takes care of naming the CSS classes to avoid name clashes, adds browser prefixes to provide browsers support, allows to declare a theme object with colors, font sizes, dimensions, etc. to be used all around the app, etc.
A good example of theme usage is how we define a colors palette to apply around the app, I use 'red', 'blue' and several variants of gray as the app color palette.

There is always the need to declare CSS rules for the whole app. I added index.css for this purpose, most of these rules are based on TailwindCSS and fix UI differences between browsers for common HTML elements like buttons, inputs, etc. Another alternative could be to use Normalize.css.

FONTS AND ICONS

I use the Lato Google web font for the web app, loaded dynamically in a link on index.html.
The icons are free versions provided by Font Awesome. For this challenge I use the other alternative, compiling them and including the SVG images in the app instead of loading dynamically.
It is possible to reduce the size of the icon library as described here: https://fontawesome.com/how-to-use/with-the-api/setup/library

REDUX

Used to manage the state of the app and as the single source of truth, it allows to store in memory pages and character details that were already requested to the API. This way we can avoid making API calls every time a customer navigates the same page again.
The improvement can be tested loading multiple pages one after another, each page will show a loader on screen. Then click on the 'previous' button, the pages already loaded will not show the loader again.
Redux stores the state in memory, if you reload the browser no pages will be stored anymore. A possible improvement would be to use localStorage to store the information from the slices, this could allow to rebuild the slice from data stored in the browser after the customer reloads the window.

An improvement could be applied to add expiration time for the stored data.

For the challenge I'm using @reduxjs/toolkit, which allows to define the init state, actions and reducers in an easier way than defining all in multiple files and folders, as was previously recommended.

IMPROVEMENTS

These are improvements that could be applied to the app but were outside the scope of the challenge:

- Add a placeholder that would be visible for all images until they are fully loaded. It would be required to add a 'load' event listener for each image and handle switching from the placeholder to the real image.

- Store all the images on a cache server temporarily. That would improve load times.

ADDITIONAL PACKAGES

- react-toastify: Allows to show floating messages that dissapear after a few seconds.
- react-router-ga: Adds Google analytics to the site.
