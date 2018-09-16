<a href='https://gitlab.com/diMosella'>
  <img alt='Donkey Front-end Base module' src='https://vanmoosel.nl/github/donkey.svg' width='100%' height='144'>
</a>

[![Build Status](https://travis-ci.org/diMosella/donkey-frontend-base.svg?branch=master)](https://travis-ci.org/diMosella/donkey-frontend-base) [![dependencies status](https://david-dm.org/diMosella/donkey-frontend-base.svg)](https://david-dm.org/diMosella/donkey-frontend-base) [![devDependencies status](https://david-dm.org/diMosella/donkey-frontend-base/dev-status.svg)](https://david-dm.org/diMosella/donkey-frontend-base/?type=dev)

# Donkey Front-end Base

A base setup to facilitate easier start of frontend (web-)development.

Why the 'Donkey'-name? Donkeys are known to serve people by lifting burdens. And that's exactly what is the purpose of this repository.

## TODO

todos are moved to Project Setup base platform

## Getting started

### For Visual Studio Code:

  1. Preferred packages:
    1. Debugger for Chrome
    1. EditorConfig for VS Code
    1. ESLint
    1. stylelint
    1. (Sublime Text Keymap)
    1. (Theme - Oceanic Next)

### Clone the project:

```bash
$ git clone https://gitlab.com/diMosella/donkey-frontend-base.git <my-folder-name>
$ cd <my-folder-name>
```

#### Install dependencies:

```bash
$ npm install
```

## Components

### Development Environment

#### Babel

Babel is used to transpile EcmaScript into JavaScript. This enables developers to use more Object Oriented Programming constructs, and provides syntactic sugar in several ways. To use Babel 6, we include `babel-core` (for CLI and basics) and `babel-runtime` + `babel-plugin-transform-runtime` (for libraries, but without polluting global namespace (which `babel-polyfill` does.)). The Babel configuration is stored in the file `/.babelrc`. We use `es2015` with `react` and `stage-0` for future EcmaScript options.

#### Webpack

The reason to use Webpack is bundling of the spread javascript sources. But it also contains a development server with hot module reloading. It's configuration are the files `/webpack.config.js`. Also, the `html-webpack-plugin` is used for dynamically creating an `index.html` file inside the `/dist` folder.

##### Html plugin

The html-webpack-plugin inserts references to javascript and css bundle files into a template. It's configured in `/webpack.config.js`.

##### Extract-text plugin

The extract-text-webpack-plugin is used to generate `.css` style bundles when in development mode. It's configured (inside `/webpack.config.js`) to use the postcss-loader, described below.

##### Uglifyjs plugin

The uglifyjs-webpack-plugin is used to minify sources for production builds.

##### Optimize-css-assets plugin

The optimize-css-assets-webpack-plugin optimizes and minimizes CSS assets.

##### Mini-css-extract-plugin

The mini-css-extract-plugin extracts CSS into separate files when in production mode. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.

##### Style-loader

The style-loader creates CSS from JS strings and adds it to the DOM by injecting a `<style>` tag

##### Css-loader

The css-loader translates CSS into CommonJS (interprets @import and url() like 'import ... from' and will resolve them).

##### Sass-loader (and node-sass)

The sass-loader compiles SASS `.scss` to CSS `.css`.

##### Postcss-loader

Handles preprocessing `.scss`, `.css` files to enable future CSS compatability (lot's of syntactic sugar) Is configured with `autoprefixer`, so css lines are prefixed by vendor names. Configuration is found in `/postcss.config.js`.

##### SVG-URL-loader

Handles loading and processing of `.svg` files.

##### URL-loader

Handles loading and processing of many files, like images and fonts via URL.

##### File-loader

Handles loading and processing of files.

##### React hot loader

Provides reloading code without losing the state of the app, thus making for a shorter feedback loop.

#### Webpack-serve

As development webserver, webpack-serve is used.

##### connect-history-api-fallback

This addon to the webpack-serve provides history api fallback. This results in frontend generated routes are directly accessible when requested from the backend. It saves clicking to the specific page.

##### koa-connect

This utility handles connecting additional stuff to the koa webserver used by webpack-serve.

#### EsLint

EsLint is a linter. Linters check your code syntactically, but also with respect to code conventions (style). We include the `eslint-config-standard` which is rich enough compared to, for example `eslint-config-google`. Also `eslint-config-react` (for `.jsx` files) and `eslint-plugin-json` ( for`.json` files) are included. EsLint configuration can be found in the files `/.eslintignore` and `/.eslintrc.json`.

#### Stylelint

StyleLint is a linter as well. It's specifically designed to handle css like syntaxes (`.css`, `.scss`, `.sass`)

### Test Environment

#### Mocha

Mocha is a test runner and test framework. We don't use Karma, combined with Webpack for testing, since that will slow down the feedback loop significantly. In conjuction with Mocha, we use `isparta` and `istanbul` for code coverage and `jsdom` for lightweight DOM emulation. `ignore-styles` is used, so that tests won't breach because of dependencies to style containing files or assets like images. The mocha configuration is stored in `/test/mocha.opts`.
See https://ole.michelsen.dk/blog/testing-reactjs-with-coverage-using-mocha-babel-istanbul.html for reference.

#### Chai

Chai is a test assertion library providing `should`,  `expect` and `assert`.

##### Dirty-chai

The plugin dirty-chai facilitates in correctly linted syntax.

##### Chai-dom

The plugin chai-dom provide utilities to make assertions on the dom-elements.

#### Enzyme

Enzyme is a testing utility for React, which makes it easier to traverse through react components.

##### Enzyme-adapter-react-16

To use with the specific version of react, an adapter for enzyme is necessary.

#### Nyc

Code coverage is determined by `nyc`, the command-line interface for `istanbul`. Configuration is found in `/.nycrc`.

### Distribution Environment

#### React

#### Redux

#### React-localize-redux

To simplify the localization, this package is used.

#### Immer

To guarantee the immutability of the Redux state, the package `immer` has been used. An alternative might be `immutable.js`. Apart from the facts that it requires significant adjustment of the code and its relatively big size, it also involves additional packages for type checking (`react-immutable-proptypes`) and unit testing (`chai-immutable`).

### Inpiration from

Inpired by https://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html and https://github.com/davezuko/react-redux-starter-kit/. Further, the tutorial on http://redux.js.org/docs/basics/ExampleTodoList.html is used for Redux.

### Folder structure

```
donkey-frontend-base
│    README.md
│
└─── src
│    │
│    └─── components
│    │
│    └─── containers
│    │
│    └─── layouts
│    │    │
│    │    └─── base
│    │
│    └─── state
│    │    │
│    │    └─── actions
│    │    │
│    │    └─── reducers
│    │
│    └─── styles
│
└─── test
```
