var fs = require('fs');

var FileStorage = function(fileName, saveTime){

    this.FILE_NAME = typeof(fileName) === 'string' ? fileName : 'file_storage_db.json';
    this.SAVE_TIME = typeof(saveTime) === 'number' ? saveTime : 5000;

    /**
     * Actually object
     * @type {Array}
     * @private
     */
    this._objects = loadJson(this.FILE_NAME);
    this._taskToUpdate = null;

    this.initialize();
};
FileStorage.prototype = {

    constructor: FileStorage,
    /**
     * Init function
     */
    initialize: function(){

        var fileName = this.FILE_NAME;
        var objects = this._objects;

        process.on('SIGINT', function(){

            saveJson(fileName, objects);
            process.exit();
        });
    },
    /**
     * Gets list of objects
     * @returns {Array}
     */
    getObjects: function(){

        return this._objects;
    },
    /**
     * Adds object to storage
     * @param obj Object for adding
     */
    add: function (obj) {

        this._objects.push(obj);
        this._trySaveJson();
    },
    /**
     * Removes object from storage
     * @param obj Object for removing
     */
    remove: function(obj){

        var index = this._objects.indexOf(obj);
        if(index !== -1) {

            this._objects.splice(index, 1);
            this._trySaveJson();
        }
    },
    /**
     * Updates object
     * @param obj Old object
     * @param newObj New object
     */
    update: function(obj, newObj) {

        var index = this._objects.indexOf(obj);
        if(index !== -1) {

            this._objects[index] = newObj;
            this._trySaveJson();
        }
    },
    /**
     * Clears all objects from storage
     */
    clear: function() {

        this._objects.length = 0; //clear array
        this._trySaveJson();
    },
    /**
     * Saves json to file if necessary
     * @private
     */
    _trySaveJson: function(){


        if(this._taskToUpdate === null) {

            this._taskToUpdate = setTimeout(function(){

                saveJson(this.FILE_NAME, this._objects, function(){

                    this._taskToUpdate = null;
                }.bind(this))
            }.bind(this), this.SAVE_TIME);
        }
    }
};

/**
 * Loads json from file
 * @param fileName File name for loading json
 * @returns {Array} Result or empty array
 */
function loadJson(fileName) {

    var path = './' + fileName,
        result = [];

    if(fs.existsSync(path)) {

        result = require('./' + fileName);
    }
    return result;
}

/**
 * Saves objects to file
 * @param fileName File name for save
 * @param objects Objects for save
 * @param callback Whether async operation
 */
function saveJson(fileName, objects, callback) {

    var path = './' + fileName,
        method = !callback ? 'writeFileSync' : 'writeFile';

    fs[method](path, JSON.stringify(objects), callback);
}


module.exports = FileStorage;