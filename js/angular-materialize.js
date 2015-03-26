(function (angular) {
    angular.module("ui.materialize", ["ui.materialize.toast", "ui.materialize.sidenav", "ui.materialize.material_select", "ui.materialize.dropdown", "ui.materialize.inputfield", "ui.materialize.tabs", "ui.materialize.pagination"]);

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

    angular.module("ui.materialize.tabs", [])
        .directive("tabs", [function(){
            return {
                link: function (scope, element, attrs) {
                    element.tabs();
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

    /**
     * Example:
     <pagination
        page="1"
        page-size="10"
        total="100"
        pagination-action="changePage(page)">
     */
    angular.module("ui.materialize.pagination", [])
        .directive('pagination', function () {

            // Assign null-able scope values from settings
            function setScopeValues(scope, attrs) {
                scope.List = [];
                scope.Hide = false;
                scope.page = parseInt(scope.page) || 1;
                scope.total = parseInt(scope.total) || 0;
                scope.dots = scope.dots || '...';
                scope.ulClass = 'pagination';
                scope.adjacent = parseInt(scope.adjacent) || 2;
                scope.activeClass = 'active';
                scope.disabledClass = 'disabled';

                scope.scrollTop = scope.$eval(attrs.scrollTop);
                scope.hideIfEmpty = scope.$eval(attrs.hideIfEmpty);
            }

            // Validate and clean up any scope values
            // This happens after we have set the
            // scope values
            function validateScopeValues(scope, pageCount) {
                // Block where the page is larger than the pageCount
                if (scope.page > pageCount) {
                    scope.page = pageCount;
                }

                // Block where the page is less than 0
                if (scope.page <= 0) {
                    scope.page = 1;
                }

                // Block where adjacent value is 0 or below
                if (scope.adjacent <= 0) {
                    scope.adjacent = 2;
                }

                // Hide from page if we have 1 or less pages
                // if directed to hide empty
                if (pageCount <= 1) {
                    scope.Hide = scope.hideIfEmpty;
                }
            }

            // Internal Pagination Click Action
            function internalAction(scope, page) {
                // Block clicks we try to load the active page
                if (scope.page == page) {
                    return;
                }

                // Update the page in scope and fire any paging actions
                scope.page = page;
                scope.paginationAction({
                    page: page
                });

                // If allowed scroll up to the top of the page
                if (scope.scrollTop) {
                    scrollTo(0, 0);
                }
            }

            // Previous text
            function prev(scope, pageCount) {
                
                // Ignore if no page prev to display
                if(pageCount < 1) {
                    return;
                }

                // Calculate the previous page and if the click actions are allowed
                // blocking and disabling where page <= 0
                var disabled = scope.page - 1 <= 0
                var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

                var prev = {
                    value: '<',
                    liClass: disabled ? scope.disabledClass : '',
                    action: function () {
                        if(!disabled) {
                            internalAction(scope, prevPage);
                        }
                    }
                };

                scope.List.push(prev);
            }

            // Next text
            function next(scope, pageCount) {
                
                // Ignore if no page next to display
                if(pageCount < 1) {
                    return;
                }

                // Calculate the next page number and if the click actions are allowed
                // blocking where page is >= pageCount
                var disabled = scope.page + 1 > pageCount;
                var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

                var next = {
                    value: '>',
                    liClass: disabled ? scope.disabledClass : '',
                    action: function () {
                        if(!disabled) {
                            internalAction(scope, nextPage);
                        }
                    }
                };

                scope.List.push(next);
            }

            // Add Range of Numbers
            function addRange(start, finish, scope) {
                var i = 0;
                for (i = start; i <= finish; i++) {
                    var item = {
                        value: i.toString(),
                        liClass: scope.page == i ? scope.activeClass : 'waves-effect',
                        action: function() {
                            internalAction(scope, this.value);
                        }
                    };

                    scope.List.push(item);
                }
            }

            // Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
            function addDots(scope) {
                scope.List.push({
                    value: scope.dots
                });
            }

            // Add First Pages
            function addFirst(scope, next) {
                addRange(1, 2, scope);

                // We ignore dots if the next value is 3
                // ie: 1 2 [...] 3 4 5 becomes just 1 2 3 4 5 
                if (next != 3) {
                    addDots(scope);
                }
            }

            function addLast(pageCount, scope, prev) {
                // We ignore dots if the previous value is one less that our start range
                // ie: 1 2 3 4 [...] 5 6  becomes just 1 2 3 4 5 6 
                if (prev != pageCount -2) {
                    addDots(scope);
                }

                addRange(pageCount -1, pageCount, scope);
            }

            // Main build function
            function build(scope, attrs) {
                
                // Block divide by 0 and empty page size
                if (!scope.pageSize || scope.pageSize < 0)
                {
                    return;
                }

                // Assign scope values
                setScopeValues(scope, attrs);

                // local variables
                var start,
                    size = scope.adjacent * 2,
                    pageCount = Math.ceil(scope.total / scope.pageSize);

                // Validation Scope
                validateScopeValues(scope, pageCount);

                prev(scope, pageCount);
                if (pageCount < (5 + size)) {

                    start = 1;
                    addRange(start, pageCount, scope);

                } else {

                    var finish;

                    if (scope.page <= (1 + size)) {

                        start = 1;
                        finish = 2 + size + (scope.adjacent - 1);

                        addRange(start, finish, scope);
                        addLast(pageCount, scope, finish);

                    } else if (pageCount - size > scope.page && scope.page > size) {

                        start = scope.page - scope.adjacent;
                        finish = scope.page + scope.adjacent;

                        addFirst(scope, start);
                        addRange(start, finish, scope);
                        addLast(pageCount, scope, finish);

                    } else {

                        start = pageCount - (1 + size + (scope.adjacent - 1));
                        finish = pageCount;

                        addFirst(scope, start);
                        addRange(start, finish, scope);

                    }
                }
                next(scope, pageCount);
            }

            return {
                restrict: 'EA',
                scope: {
                    page: '@',
                    pageSize: '@',
                    total: '@',
                    dots: '@',
                    hideIfEmpty: '@',
                    adjacent: '@',
                    scrollTop: '@',
                    paginationAction: '&'
                },
                template:
                    '<ul ng-hide="Hide" ng-class="ulClass"> ' +
                        '<li ' +
                        'ng-class="Item.liClass" ' +
                        'ng-click="Item.action()" ' +
                        'ng-repeat="Item in List"> ' +
                        '<a href> ' +
                        '<span ng-bind="Item.value"></span> ' +
                        '</a>' +   
                    '</ul>',
                link: function (scope, element, attrs) {
                    
                    // Hook in our watched items
                    scope.$watchCollection('[page, total]', function () {
                        build(scope, attrs);
                    });
                }
            };
        });
}(angular));