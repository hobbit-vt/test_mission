module.exports = function(config){
    config.set({

        basePath : '../../',

        files : [
            'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular.js',
            'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular-route.js',
            'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular-mocks.js',
            'public/js/*.js',
            'test/client/unit/*.js'
        ],
        singleRun: true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    });
};