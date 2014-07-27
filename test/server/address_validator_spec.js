var addressValidator = require('../../address_validator');

describe('validator', function(){

    it('should be valid', function(){

        var addressess = [
            {
                id: '56d', name: 'Some', phone: '9-61-40'
            },
            {
                id: '56d', name: 'Some'
            },
            {
                id: '56d', name: 'Some', phone: 3548
            }
        ];

        addressess.forEach(function(val){

            expect(addressValidator.validate(val)).toBe(true);
        });
    });

    it('should be invalid', function() {

        var addressess = [
            {
                name: 'Some', phone: '9-61-40'
            },
            {
                id: '56d'
            },
            {
                id: 3, name: 'Some', phone: 3548
            },
            {
                id: '3', phone: 3548
            }
        ];

        addressess.forEach(function(val){

            expect(addressValidator.validate(val)).toBe(false);
        });
    })
});