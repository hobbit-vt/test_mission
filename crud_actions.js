module.exports = {
	list: list,
	get: get,
	add: add,
	remove: remove
};

/**
 * Lists all persons
 * @param req Request
 * @param res Response
 */
function list(req, res){

    res.json([]);
}

/**
 * Gets a person
 * @param req Request
 * @param res Response
 */
function get(req, res) {

    res.json({});
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
