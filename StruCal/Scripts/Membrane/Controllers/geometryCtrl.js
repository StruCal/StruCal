angular.module('membraneFEM').controller('geometryCtrl', ['$scope', '$rootScope','drawingService','inputDataFactory', function ($scope, $rootScope, drawingService,inputDataFactory) {
    var edges;
    var inputData;


    $scope.vertices = inputDataFactory.getInputData();

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
        
        createInput();
        numerateVerticesAndMultiplyLoad();
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
            Start: $scope.vertices[$scope.vertices.length - 1],
            End: $scope.vertices[0],
        });
    }
    function numerateVerticesAndMultiplyLoad() {
        for (var i = 0; i < $scope.vertices.length; i++) {
            inputData.Vertices[i].Number = i + 1;
            inputData.Vertices[i].LoadX *= 1000;
            inputData.Vertices[i].LoadY *= 1000;
        }
    }
    function createInput() {
        inputData = {
            Vertices: angular.copy($scope.vertices),
            Edges: edges,
        };
    }
    function sendInput() {
        $rootScope.$broadcast('vertices', inputData.Vertices);
        $rootScope.$broadcast('edges', inputData.Edges);
    }
    function updateDrawing() {
        drawingService.setInput(inputData);
    }
}]);