(function (angular) {
    angular.module("ui.materialize", ["ui.materialize.toast", "ui.materialize.sidenav", "ui.materialize.material_select", "ui.materialize.dropdown", "ui.materialize.inputfield"]);

    angular.module("ui.materialize.toast", [])
        .constant("toastConfig", {
            duration: 3000,
            rounded: "rounded"
        })
        .directive("toast", ["toastConfig", function (toastConfig) {
            return {
                scope: {
                    message: "@"
                },
                link: function (scope, element, attrs) {

                    element.bind(attrs.toast, function () {
                        var message = (angular.isDefined(scope.message)) ? scope.message : "";
                        var rounded = (angular.isDefined(attrs.rounded)) ? toastConfig.rounded : null;
                        toast(message, toastConfig.duration, rounded);
                    });
                }
            };
        }]);

    // Example: <a href="#" data-activates="nav-mobile" class="button-collapse top-nav" data-sidenav="left" data-menuwidth="500"  data-closeonclick="true">
    // data-activates is handled by the jQuery plugin.
    angular.module("ui.materialize.sidenav", [])
        .directive("sidenav", [function () {
            return {
                scope: {
                    menuwidth: "@",
                    closeonclick: "@"
                },
                link: function (scope, element, attrs) {
                    element.sideNav({
                        menuWidth: (angular.isDefined(scope.menuwidth)) ? scope.menuwidth : undefined,
                        edge: attrs.sidenav ? attrs.sidenav : "left",
                        closeOnClick: (angular.isDefined(scope.closeonclick)) ? scope.closeonclick == "true" : undefined
                    })
                }
            };
        }]);

    // This works, unless the content inside the select changes.
    angular.module("ui.materialize.material_select", [])
        .directive("materialSelect", ["$compile", "$timeout", function ($compile, $timeout) {
            return {
                link: function (scope, element, attrs) {
                    if (element.is("select")) {
                        $compile(element.contents())(scope);
                        $timeout(function () {
                            element.material_select();
                        });
                    }
                }
            };
        }]);

    /*
     Example usage, notice the empty dropdown tag in the dropdown trigger.

     <!-- Dropdown Trigger -->
     <a class='dropdown-button btn' href='javascript:void(0);' data-activates='demoDropdown' dropdown>Select a demo</a>

     <!-- Dropdown Structure -->
     <ul id='demoDropdown' class='dropdown-content'>
     <li ng-repeat="demo in demoDefiniftions">
     <a href="javascript:void(0);" ng-click="selectDemo(demo)">{{demo.name}}</a>
     </li>
     </ul>*/
    angular.module("ui.materialize.dropdown", [])
        .directive("dropdown", ["$compile", "$timeout", function ($compile, $timeout) {
            return {
                scope: {
                    inDuration: "@",
                    outDuration: "@",
                    constrain_width: "@",
                    hover: "@",
                    alignment: "@",
                    gutter: "@",
                    belowOrigin: "@"
                },
                link: function (scope, element, attrs) {
                    $compile(element.contents())(scope);
                    $timeout(function () {
                        element.dropdown({
                            inDuration: (angular.isDefined(scope.inDuration)) ? scope.inDuration : undefined,
                            outDuration: (angular.isDefined(scope.outDuration)) ? scope.outDuration : undefined,
                            constrain_width: (angular.isDefined(scope.constrainWidth)) ? scope.constrain_width : undefined,
                            hover: (angular.isDefined(scope.hover)) ? scope.hover : undefined,
                            alignment: (angular.isDefined(scope.alignment)) ? scope.alignment : undefined,
                            gutter: (angular.isDefined(scope.gutter)) ? scope.gutter : undefined,
                            belowOrigin: (angular.isDefined(scope.belowOrigin)) ? scope.belowOrigin : undefined
                        });
                    });
                }
            };
        }]);

    /**
     * Instead of adding the .input-field class to a div surrounding a label and input, add the attribute input-field.
     * That way it will also work when angular destroys/recreates the elements.
     *
     * Example:
     <inputfield style="margin-top:10px">
     <label>{{name}}:</label>
     <input type="text" name="{{name}}" ng-model="value">
     </inputfield>
     */
    angular.module("ui.materialize.inputfield", [])
        .directive('inputField', ["$compile", "$timeout", function ($compile, $timeout) {
            return {
                transclude: true,
                scope: {},
                link: function (scope, element) {
                    $timeout(function () {
                        angular.element(element).find("input").change();
                    });
                },
                template: '<div ng-transclude class="input-field"></div>'
            };
        }]);
}(angular));

