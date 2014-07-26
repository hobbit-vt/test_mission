(function(){

    var addressBook = angular.module('addressBook');

    addressBook.controller('MainController', ['$scope', 'addressService', function($scope, addressService){

        addressService.get().then(function(result){

            $scope.addresses = result;
        });
    }]);

    addressBook.controller('DetailController', ['$scope', '$routeParams', 'addressService',
        function($scope, $routeParams, addressService){

            addressService.get($routeParams.id).then(
                function(result) {

                    $scope.success = true;
                    $scope.address = result;
                },
                function(reason) {

                    $scope.success = false;
                    $scope.reason = reason;
                }
            );
        }
    ]);
})();