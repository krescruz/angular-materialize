angular.module('ui.materialize.toast', [])

.constant('toastConfig', {
    duration: 3000,
    rounded : 'rounded'
})

.directive('toast', ['toastConfig', function(toastConfig) {
    return {
        scope: {
            message: '@',
        },
        link: function (scope, element, attrs) {
            
            element.bind(attrs.toast, function() {
                var message = (angular.isDefined(scope.message)) ? scope.message : '';
                var rounded = (angular.isDefined(attrs.rounded)) ? toastConfig.rounded : null;
                toast(message, toastConfig.duration, rounded);
            });
        }
  };
}]);

