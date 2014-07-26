module.exports = {
    /**
     * Validates address
     * @param address Address for validation
     * @returns {boolean}
     */
    validate: function(address){

        var result = false;

        if(address && typeof(address.id) === 'string' && typeof(address.name) === 'string') {

            result = true;
        }
        return result;
    }
};