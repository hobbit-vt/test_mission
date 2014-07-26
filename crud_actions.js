var Storage = require('./file_storage');
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

    res.json(false);
}

/**
 * Removes a person
 * @param req Request
 * @param res Response
 */
function remove(req, res){

    res.json(false);
}
