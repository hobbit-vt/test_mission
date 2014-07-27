describe('addressService', function(){

    var addressService,
        $httpBackend,
        $timeout,
        REQUEST_PATHS = {
            list: '/list',
            add: '/add',
            remove: '/remove',
            update: '/update'
        },
        addresses = [
            { id: 'asd1', name: 'some1', phone: 'phone1' },
            { id: 'asd2', name: 'some2', phone: 'phone2' },
            { id: 'asd3', name: 'some3', phone: 'phone3' }
        ],
        newAddress = { name: 'some4', phone: 'phone4' };

    beforeEach(module('addressBook'));

    beforeEach(inject(function($injector, _addressService_, _$timeout_){

        addressService = _addressService_;
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('POST', REQUEST_PATHS.add).respond(true);
        $httpBackend.when('POST', REQUEST_PATHS.remove).respond(true);
        $httpBackend.when('POST', REQUEST_PATHS.update).respond(true);
        $httpBackend.when('GET', REQUEST_PATHS.list).respond(addresses);

        $timeout = _$timeout_;
    }));

    it('should be define', function(){

        expect(addressService).toBeDefined();
    });

    it('should have working get method', function(done){

        //getting not valid request
        $httpBackend.expect('GET', REQUEST_PATHS.list).respond(404, '');
        addressService.get().then(undefined, function(reason){

            expect(reason).toEqual('service unavailable');
        });
        $httpBackend.flush();
        //getting valid request
        $httpBackend.expect('GET', REQUEST_PATHS.list).respond(addresses);
        addressService.get().then(function(result){

            expect(result).toEqual(addresses);
        });
        $httpBackend.flush();
        //getting valid request for specific id
        addressService.get(addresses[1].id).then(function(result){

            expect(result).toEqual(addresses[1]);
        });
        //getting not valid request for specific id
        addressService.get('123132').then(undefined, function(reason){

            expect(reason).toEqual('id does not exist');
        });
        $timeout.flush();
    });

    it('should have working add method', function(){

        addressService.get().then(function(){

            addressService.add(newAddress);
            expect(newAddress.id).toBeDefined();

            expect(addressService._addresses).toEqual(addresses.concat(newAddress));
        });
        $httpBackend.flush();
    });

    it('should have working remove method', function(){

        addressService.get().then(function(){

            addressService.remove(addresses[2]); //not remove
            expect(addressService._addresses).toEqual(addresses);

            addressService.remove(addressService._addresses[2]); //remove
            expect(addressService._addresses).toEqual(addresses.slice(0, 2));
        });
        $httpBackend.flush();
    });

    it('should have working remove method', function(){

        addressService.get().then(function(){

            addressService.remove(addresses[2]);
            expect(addressService._addresses).toEqual(addresses);

            addressService.remove(addressService._addresses[2]);
            expect(addressService._addresses).toEqual(addresses.slice(0, 2));
        });
        $httpBackend.flush();
    });
});