describe('MainController', function(){

    var scope,
        $q,
        mainController,
        addressService,
        $provide,
        $timeout,
        addresses = [
            { id: 'asd1', name: 'some1', phone: 'phone1' },
            { id: 'asd2', name: 'some2', phone: 'phone2' },
            { id: 'asd3', name: 'some3', phone: 'phone3' }
        ];

    beforeEach(module('addressBook', function(_$provide_){

        $provide = _$provide_;
    }));

    beforeEach(inject(function(_$q_, $controller, _$timeout_) {

        $q = _$q_;
        scope = {};

        addressService = jasmine.createSpyObj('addressService', ['get', 'add', 'remove', 'update']);
        addressService.get.andCallFake(function(){

            var defer = $q.defer();
            defer.resolve(addresses);
            return defer.promise;
        });

        var addressServiceCtor = function(){
            this.get = addressService.get;
            this.add = addressService.add;
            this.remove = addressService.remove;
            this.update = addressService.update;
        };
        $provide.service('addressService', addressServiceCtor);

        mainController = $controller('MainController', { $scope: scope });
        $timeout = _$timeout_;
    }));

    it('should be defined', function(){

        expect(mainController).toBeDefined();
    });

    it('should get data', function(){

        $timeout.flush();
        expect(scope.addresses).toEqual(addresses);
    });

    it('should have working add method', function(){

        var newAddress = { id: 'asd4', name: 'some4', phone: 'phone4' };
        scope.newAddress = newAddress;

        scope.add();

        expect(addressService.add).toHaveBeenCalledWith(newAddress);
        expect(scope.newAddress).toEqual({});
    });

    it('should have working remove method', function(){

        $timeout.flush();

        scope.remove(1);
        expect(addressService.remove).toHaveBeenCalledWith(addresses[1]);
    });

    it('should have working showUpdateForm and update method', function(){

        $timeout.flush();

        scope.showUpdateForm(1);
        expect(addresses[1].formShowed).toBeTruthy();

        scope.update(1);
        expect(addresses[1].formShowed).toBeUndefined();
        expect(addressService.update).toHaveBeenCalledWith(addresses[1]);
    });
});