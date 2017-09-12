angular.module('membraneFEM').factory('inputDataFactory', function () {
    var inputData = [{
        X: 0,
        Y: 2000,
        SupportX: false,
        SupportY: false,
        LoadX: -2000,
        LoadY: -1000,
    },
    {
        X: 500,
        Y: 0,
        SupportX: true,
        SupportY: true,
        LoadX: 0,
        LoadY: 0,
    },
    {
        X: 1500,
        Y: 0,
        SupportX: true,
        SupportY: true,
        LoadX: 0,
        LoadY: 0,
    },
    {
        X: 2000,
        Y: 2000,
        SupportX: false,
        SupportY: false,
        LoadX: 0,
        LoadY: 0,
    },
    {
        X: 1000,
        Y: 2000,
        SupportX: false,
        SupportY: false,
        LoadX: 0,
        LoadY: 0,
    }
    ];

    return {
        getVertices: function () {
            return inputData;
        }
    }
    
});