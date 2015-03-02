var app = angular.module('materializeApp', ['ui.materialize'])
    .controller('BodyController', ["$scope", function ($scope) {
        $scope.select = {
            value: "message",
            choices: ["message", "another message", "I'm am speaking over here!", "Hi there!"]
        };

        $scope.dummyInputs = {};
    }]);