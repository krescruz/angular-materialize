var fs = require('fs');
var vm = require('vm');

module.exports.bind = function (angular, jquery) {
  var context = {'angular': angular, '$': jquery};
  var src = fs.readFileSync(__dirname + '/angular-materialize.js', 'utf8');
  vm.runInNewContext(src, context);
  return context;
};
