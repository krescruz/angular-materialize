angular-materialize
===================

**angular-materialize** in action http://krescruz.github.io/angular-materialize/

This library is a set of AngularJS directives which make it possible to use features from [Materialize](http://materializecss.com/) with AngularJS.
It is basically a set of directives, which calls the JavaScript functions defined by Materialize. This means that you still need to include Materialize for this to work. 

Remember to add the module ui.materialize to your dependencies like:

    angular.module('angular-app', [
      'ui.materialize'
    ])

and include all the JavaScript files, then you are good to go. 
For a good example of how to set it up, see the index.html file in the root of this project. 

This project is not to be confused with the [Angular Material](https://material.angularjs.org/) project, which is a standalone Material design implementation for AngularJS.

We are on Bower, look for [`angular-materialize`](http://bower.io/search/?q=angular-materialize).
or in NPM, look for [`angular-materialize`](https://www.npmjs.com/package/angular-materialize).

##### Use with Webpack
Angular looks for jQuery and if no exists, it uses jQlite. Some directives of `angular-materialize` uses some jQuery methods, so be sure that Angular uses it instead of jQlite. It can be done by adding the following lines in your config.
```javascript
//webpack.config.js
plugins: [
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    })
  ],
```
then simply add to your module:
```javascript
// yourModule.js
// ES6 style
import angularMaterialize from 'angular-materialize';
// OR commonjs style
var angularMaterialize = require('angular-materialize');
angular.module('yourModule', [angularMaterialize]);
```
