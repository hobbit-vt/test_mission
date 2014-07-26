(function(){

    var addressBook = angular.module('addressBook');
    var REQUEST_PATHS = {
        list: '/list',
        add: '/add',
        remove: '/remove'
    };

    addressBook.service('addressService', ['$q', '$http', function($q, $http) {

        var initialized = false;

        this._addresses = [];

        /**
         * Gets all addresses or by id
         * @param id {undefined|Number} Requested id
         * @returns {promise} Promise for request
         */
        this.get = function(id) {

            var defer = $q.defer();


            if(!initialized) {

                $http.get(REQUEST_PATHS.list)
                    .then(
                        function(result) {

                            _processInitializedGet(defer, result.data, id);

                            this._addresses = result.data;
                            initialized = true;

                        }.bind(this),
                        function() {

                            defer.reject('service unavailable');
                        }
                    );
            } else {

                _processInitializedGet(defer, this._addresses, id);
            }

            return defer.promise;
        };
    }]);

    /**
     * Processes get request
     * @param defer Deffer for resolve
     * @param addresses Array of known addresses
     * @param id {undefined|Number} Id for search
     * @private
     */
    function _processInitializedGet(defer, addresses, id){

        if(!id) {

            defer.resolve(addresses);

        } else {

            var isFound = false;

            for(var i = 0; i < addresses.length; i++) {

                if(addresses[i].id === id) {

                    defer.resolve(addresses[i]);
                    isFound = true;
                }
            }
            if(!isFound) {

                defer.reject('id does not exist');
            }
        }
    }
})();