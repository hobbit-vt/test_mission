var fs = require('fs');

var FileStorage = function(saveTime, isTest){

    this.FILE_NAME = !isTest ? 'file_storage_db.json' : 'file_storage_db_test.json';
    this.SAVE_TIME = saveTime !== undefined && saveTime !== null ? saveTime : 5000;

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

        var i;
        for(i = 0; i < this._objects.length; i++) {

            if(obj === this._objects[i]) {

                break;
            }
        }

        this._objects.splice(i, 1);
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