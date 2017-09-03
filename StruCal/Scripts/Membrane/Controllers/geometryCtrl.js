angular.module('membraneFEM').controller('geometryCtrl', ['$scope', '$rootScope','drawingService', function ($scope, $rootScope, drawingService) {
    var edges;
    var inputData;
    $scope.vertices = new Array();


    $scope.vertices = [{
        X: 0,
        Y: 2000,
        SupportX: false,
        SupportY: false,
        LoadX: 500,
        LoadY: 1000,
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
        LoadX: -500,
        LoadY: 1000,
    },
    {
        X: 1000,
        Y: 2000,
        SupportX: false,
        SupportY: false,
        LoadX: 0,
        LoadY: -2000,
    }
    ];

    $scope.add = function () {
        $scope.vertices.push({
            x: 2000,
            y: 3000,
            supportX: true,
            supportY: false,
            loadX: 1000,
            loadY: -500,
        });
    }

    $scope.remove = function (index) {
        $scope.vertices.splice(index, 1);
    }

    $scope.setSupportX=function(showForms,vertex){
        if (showForms){
            vertex.SupportX = !vertex.SupportX;
        }
    }
    $scope.setSupportY = function (showForms, vertex) {
        if (showForms) {
            vertex.SupportY = !vertex.SupportY;
        }
    }

    $scope.$watch('vertices', function () {
        createEdges();
        numerateVertices();
        createInput();
        updateDrawing();
        sendInput();
    },true);

    function createEdges() {
        edges = new Array();

        for (var i = 0; i < $scope.vertices.length-1; i++) {
            var vertexStart = $scope.vertices[i];
            var vertexEnd = $scope.vertices[i+1];
            edges.push({
                Number: i + 1,
                Start: vertexStart,
                End: vertexEnd,
            });
        }
        edges.push({
            Number: $scope.vertices.length,
            Start: $scope.vertices[0],
            End: $scope.vertices[$scope.vertices.length - 1],
        });
    }
    function numerateVertices() {
        for (var i = 0; i < $scope.vertices.length; i++) {
            $scope.vertices[i].Number = i + 1;
        }
    }
    function createInput() {
        inputData = {
            Vertices: $scope.vertices,
            Edges: edges,
        };
    }
    function sendInput() {
        $rootScope.$broadcast('inputData', inputData);
    }
    function updateDrawing() {
        drawingService.setInput(inputData);
    }
}]);