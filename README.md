<a href='https://github.com/diMosella'>
  <img alt='Donkey Starter Kit' src='https://vanmoosel.nl/github/donkey.svg' width='100%' height='144'>
</a>

# Donkey starter kit
Starter kit for setting up front end projects more quickly.
Why the 'Donkey'-name? Donkeys are known to serve people by lifting burdens.

# Getting started

## For Sublime Text:

1. Make sure you have installed at least the following packages:
  1. PackageControl
  1. Babel
  1. EditorConfig
  1. SublimeLinter
  1. SublimeLinter-contrib-eslint
  1. SublimeLinter-contrib-stylelint
1. Set syntax correctly, since linting is coupled with syntax selection
  1. For JavaScript:
    1. Open a file with `.js` extension
    1. Choose View > Syntax > Open all with current extension as... > Babel > Javascript (Babel)
  1. For JSX
    1. Open a file with `.jsx` extension
    1. Choose View > Syntax > Open all with current extension as... > Babel > Javascript (Babel)
  1. For JSON:
    1. Open a file with `.json` extension
    1. Choose View > Syntax > Open all with current extension as... > Babel > JSON
    1. Map JSON syntax viewing to the right linting mechanism
      1. Choose Preferences > Package Settings > SublimeLinter > Settings - User
      1. Find the property `"syntax_map"`
      1. Check if `"javascript (babel)": "javascript"` is present
      1. Add `"json": "javascript"`

## Clone the project:

```bash
$ git clone https://github.com/diMosella/donkey-starter-kit.git <my-project-name>
$ cd <my-project-name>
```

### Install dependencies:

```bash
$ npm install
```

# Components

## Development Environment

### Babel

Babel is used to transpile EcmaScript into JavaScript. This enables developers to use more Object Oriented Programming constructs, and provides syntactic sugar in several ways. To use Babel 6, we include `babel-core` (for CLI and basics) and `babel-runtime` + `babel-plugin-transform-runtime` (for libraries, but without polluting global namespace (which `babel-polyfill` does.)). The Babel configuration is stored in the file `/.babelrc`. We use `es2015` with `react` and `stage-0` for future EcmaScript options.

### Webpack

The reason to use Webpack is bundling of the spread javascript sources. But it also contains a development server with hot module reloading. It's configuration are the files `/webpack.config.js`. Also, the `html-webpack-plugin` is used for dynamically creating an `index.html` file inside the `/dist` folder.

#### Html plugin

The html-webpack-plugin inserts references to javascript and css bundle files into a template. It's configured in `/webpack.config.js`.

#### Extract-text plugin

The extract-text-webpack-plugin is used to generate `.css` style bundles. It's configured (inside `/webpack.config.js`) to use the following postcss-loader.

#### Postcss-loader

Handles loading and processing `.scss`, `.sass` files. Is configured with `autoprefixer`, so css lines are prefixed by vendor names. Configuration is found in `/postcss.config.js`.

#### SVG-URL-loader

Handles loading and processing of `.svg` files.

#### URL-loader

Handles loading and processing of many files, like images and fonts via URL.

#### File-loader

Handles loading and processing of files.

#### React hot loader

Provides reloading code without losing the state of the app, thus making for a shorter feedback loop.

### EsLint

EsLint is a linter. Linters check your code syntactically, but also with respect to code conventions (style). We include the `eslint-config-standard` which is rich enough compared to, for example `eslint-config-google`. Also `eslint-config-react` (for `.jsx` files) and `eslint-plugin-json` ( for`.json` files) are included. EsLint configuration can be found in the files `/.eslintignore` and `/.eslintrc.json`.

### Stylelint

StyleLint is a linter as well. It's specifically designed to handle css like syntaxes (`.css`, `.scss`, `.sass`)

## Test Environment

### Mocha

Mocha is a test runner and test framework. We don't use Karma, combined with Webpack for testing, since that will slow down the feedback loop significantly. In conjuction with Mocha, we use `isparta` and `istanbul` for code coverage and `jsdom` for lightweight DOM emulation. `ignore-styles` is used, so that tests won't breach because of dependencies to style containing files or assets like images. The mocha configuration is stored in `/test/mocha.opts`.
See https://ole.michelsen.dk/blog/testing-reactjs-with-coverage-using-mocha-babel-istanbul.html for reference.

### Chai

Chai is a test assertion library providing `should`,  `expect` and `assert`. Also, plugin `chai-immutable` is used to test redux app.

### Isparta

Code coverage is determined by `isparta` / `istanbul`. Configuration is found in `/package.json`.

## Distribution Environment

### Immutable

Inpired by https://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html and https://github.com/davezuko/react-redux-starter-kit/.

## Folder structure

```
donkey-starter-kit
│    README.md
│
└─── src
│    │
│    └─── actions
│    │
│    └─── components
│    │
│    └─── containers
│    │
│    └─── layouts
│    │
│    └─── reducers
│    │
│    └─── routes
│    │
│    └─── store
│
└─── test
```
