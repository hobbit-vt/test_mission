var Storage             = require('./file_storage'),
    addressValidator    = require('./address_validator');

var fileStorage = new Storage();


module.exports = {
	list: list,
	add: add,
	remove: remove
};

/**
 * Lists all persons
 * @param req Request
 * @param res Response
 */
function list(req, res){

    res.json(fileStorage.getObjects());
}

/**
 * Adds a person
 * @param req Request
 * @param res Response
 */
function add(req, res){

    var result = false;

    if(addressValidator.validate(req.body)) {

        fileStorage.add(req.body);
        result = true;
    }
    res.json(result);
}

/**
 * Removes a person
 * @param req Request
 * @param res Response
 */
function remove(req, res){

    var result = false;

    if(addressValidator.validate(req.body)) {

        var objects = fileStorage.getObjects();

        for(var i = 0; i < objects.length; i++) {

            if(objects[i].id === req.body.id){

                fileStorage.remove(objects[i]);
                result = true;

                break;
            }
        }
    }
    res.json(result);
}
