angular-materialize
===================

**angular-materialize** in action http://krescruz.github.io/angular-materialize/

This library is a set of AngularJS directives which make it possible to use features from [Materialize](http://materializecss.com/) with AngularJS.
It is basically a set of directives, which calls the JavaScript functions defined by Materialize. This means that you still need to include Materialize for this to work. 

This project is not to be confused with the [Angular Material](https://material.angularjs.org/) project, which is a standalone Material design implementation for AngularJS.

A minimal example of how to set up this project can be found here: http://krescruz.github.io/angular-materialize/#getting-started

You can download this project through our [`bower package`](http://bower.io/search/?q=angular-materialize), or [`npm package`](https://www.npmjs.com/package/angular-materialize).
Or just use the cdn:

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-materialize/0.2.2/angular-materialize.min.js"></script>
```


Angular looks for jQuery and if no exists, it uses jQlite. Some directives of `angular-materialize` uses some jQuery methods, so be sure that Angular uses it instead of jQlite. It can be done by including jquery before you include angular on your view
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
```
If you are using Webpack, it can also be done by adding the following lines in your config:
##### Use with Webpack
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
