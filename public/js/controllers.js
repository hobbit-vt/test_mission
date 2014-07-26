(function(){

    var addressBook = angular.module('addressBook');

    addressBook.controller('MainController', ['$scope', 'addressService', function($scope, addressService){

        $scope.newAddress = {};

        addressService.get().then(function(result){

            $scope.addresses = result;
        });

        $scope.add = function() {

            addressService.add($scope.newAddress);
            $scope.newAddress = {};
        };

        $scope.remove = function(idx) {

            addressService.remove($scope.addresses[idx]);
        };

        $scope.showUpdateForm = function(idx){

            $scope.addresses[idx].formShowed = true;
        };

        $scope.update = function(idx) {

            delete $scope.addresses[idx].formShowed;
            addressService.update($scope.addresses[idx]);
        }
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