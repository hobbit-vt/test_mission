(function(){

    var addressBook = angular.module('addressBook');

    addressBook.service('addressService', ['$q', function($q) {

        this._addresses = [
            {id: '0', name: 'some_name0', phone: '324 654 5'},
            {id: '1', name: 'some_name1', phone: ''},
            {id: '2', name: 'some_name2'},
            {id: '3', name: 'some_name3', phone: '654 564 2'},
        ];

        /**
         * Gets all addresses or by id
         * @param id {undefined|Number} Requested id
         * @returns {promise} Promise for request
         */
        this.get = function(id) {

            var deferred = $q.defer();

            if(!id) {

                deferred.resolve(this._addresses);

            } else {

                var isFound = false;

                for(var i = 0; i < this._addresses.length; i++) {

                    if(this._addresses[i].id === id) {

                        deferred.resolve(this._addresses[i]);
                        isFound = true;
                    }
                }
                if(!isFound) {

                    deferred.reject('Id does not exist');
                }
            }
            return deferred.promise;
        }
    }]);
})();