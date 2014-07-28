var Storage = require('../../file_storage'),
    fs      = require('fs');

var fileStorage = new Storage('file_storage_db_test.json', 0);
var objectsForAdding = [
    { a: 3 },
    { b: 3 }
];

describe('File storage', function () {

    it('should be clear', function () {

        fileStorage.clear();
        var objects = fileStorage.getObjects();
        expect(objects).toEqual([]);
    });

    it('should have a correct value after adding', function(){

        fileStorage.add(objectsForAdding[0]);
        fileStorage.add(objectsForAdding[1]);

        var objects = fileStorage.getObjects();

        expect(objects).toEqual([objectsForAdding[0], objectsForAdding[1]]);
    });

    it('should have one object after removing', function(){

        var objects = fileStorage.getObjects();
        var obj;

        for(var i = 0; i < objects.length; i++) {

            if(objects[i].b === objectsForAdding[1].b) {

                obj = objects[i];
            }
        }
        fileStorage.remove(obj);

        objects = fileStorage.getObjects();

        expect(objects).toEqual([objectsForAdding[0]]);
    });
});

describe('File Storage file', function(){

    it('should exist', function(done){

        setTimeout(function(){

            fs.exists('file_storage_db_test.json', function(exist){

                expect(exist).toBeTruthy();
                done();
            });
        }, 200); //time to create file
    });

    it('should have one object', function(done){

        fs.readFile('file_storage_db_test.json', function(err, data){

            var objects = JSON.parse(data);
            expect(objects).toEqual([objectsForAdding[0]]);

            done();
        });
    });

    it('should have empty array', function(done){

        fileStorage.clear();

        setTimeout(function(){

            fs.readFile('file_storage_db_test.json', function(err, data){

                var objects = JSON.parse(data);
                expect(objects).toEqual([]);

                done();
            });
        }, 200); //time to clear file
    })
});