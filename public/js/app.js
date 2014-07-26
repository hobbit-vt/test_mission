(function(){

    var addressBook = angular.module('addressBook', ['ngRoute']);

    addressBook.config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/main', {
                templateUrl: '/templates/main.html',
                controller: 'MainController'
            })
            .when('/detail/:id', {
                templateUrl: '/templates/detail.html',
                controller: 'DetailController'
            })
            .otherwise({
                redirectTo: '/main'
            });
    }]);
})();