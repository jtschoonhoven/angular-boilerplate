# Angular Boilerplate

Template for a new angular app.

## Setup

Use gulp to build the app as a single, bundled HTML file.

```sh
# With Node and NPM installed...
npm install -g gulp
cd /path/to/angular-boilerplate
gulp inject
```

This will generate `index.html` in the root of the angular-boilerplate repo. This file bundles the entire app, including CSS and Javascript.

## Conventions

**Structure**

[Google's recommended structure for Angular app](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).

**Bundling**

Angular Boilerplate uses Browserify to bundle assets. When you `gulp inject`, Gulp first bundles all Javascript into a single file, then injects that file into a script tag in `index.html`. The entire app is contained in this file, Javascript and CSS included. You will, of course, get faster page loads if you serve `app/index.html` and `app/bundle.js` separately (which you are encouraged to do), but lazy.
