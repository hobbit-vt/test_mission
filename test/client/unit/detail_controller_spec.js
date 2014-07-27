describe('MainController', function(){

    var scope,
        $q,
        $controller,
        addressService,
        address = { id: 'asd3', name: 'some3', phone: 'phone3' },
        $timeout,
        $provide;

    beforeEach(module('addressBook', function(_$provide_){

        $provide = _$provide_;
    }));

    beforeEach(inject(function(_$q_, _$controller_, _$timeout_) {

        $q = _$q_;
        scope = {};

        addressService = jasmine.createSpyObj('addressService', ['get']);
        addressService.get.andCallFake(function(id){

            var defer = $q.defer();

            if(id === 1) {
                defer.resolve(address);
            } else {
                defer.reject('so sad =(');
            }
            return defer.promise;
        });

        var addressServiceCtor = function(){
            this.get = addressService.get;
        };
        $provide.service('addressService', addressServiceCtor);

        $controller = _$controller_;
        $timeout = _$timeout_;
    }));

    it('should be defined', function(){

        var detailController = $controller('DetailController', { $scope: scope, $routeParams: { id: 1 }});
        expect(detailController).toBeDefined();
    });

    it('should get data', function(){

        $controller('DetailController', { $scope: scope, $routeParams: { id: 1 }});
        $timeout.flush();

        expect(scope.success).toBeTruthy();
        expect(scope.address).toEqual(address);

        $controller('DetailController', { $scope: scope, $routeParams: { id: 2 }});
        $timeout.flush();

        expect(scope.success).toBeFalsy();
        expect(scope.reason).toEqual('so sad =(');
    });
});