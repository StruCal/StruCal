angular.module('membraneFEM').controller('geometryCtrl', ['$scope', '$rootScope','drawingService','inputDataFactory', function ($scope, $rootScope, drawingService,inputDataFactory) {
    var edges;
    var inputData;
    //ADD NG-INVALID
    $scope.currentEdited = -1;
    $scope.vertices = inputDataFactory.getInputData();
    $scope.verticesInput = angular.copy($scope.vertices);

    $scope.save = function (index) {

        $scope.vertices[index].X = $scope.verticesInput[index].X;
        $scope.vertices[index].Y = $scope.verticesInput[index].Y;
        $scope.vertices[index].LoadX = $scope.verticesInput[index].LoadX;
        $scope.vertices[index].LoadY = $scope.verticesInput[index].LoadY;
        $scope.vertices[index].SupportX = $scope.verticesInput[index].SupportX;
        $scope.vertices[index].SupportY = $scope.verticesInput[index].SupportY;

        createEdges();
        createInput();
        numerateVerticesAndMultiplyLoad();
        updateDrawing();
        sendInput();

    };
    $scope.cancel = function (index) {
        $scope.verticesInput[index].X = $scope.vertices[index].X;
        $scope.verticesInput[index].Y = $scope.vertices[index].Y;
        $scope.verticesInput[index].LoadX = $scope.vertices[index].LoadX;
        $scope.verticesInput[index].LoadY = $scope.vertices[index].LoadY;
        $scope.verticesInput[index].SupportX = $scope.vertices[index].SupportX;
        $scope.verticesInput[index].SupportY = $scope.vertices[index].SupportY;
    };

    $scope.add = function () {
        var newVertex = {
            X: 2000,
            Y: 3000,
            SupportX: true,
            SupportY: false,
            LoadX: 1000,
            LoadY: -500,
        }
        $scope.vertices.push(newVertex);
        $scope.verticesInput.push(angular.copy(newVertex));
    }

    $scope.remove = function (index) {
        $scope.vertices.splice(index, 1);
        $scope.verticesInput.splice(index, 1);
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
    
    //$scope.$watch('vertices', function () {
    //    createEdges();
    //    
    //    createInput();
    //    numerateVerticesAndMultiplyLoad();
    //    updateDrawing();
    //    sendInput();
    //},true);

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

    (function init() {
        createEdges();
        
        createInput();
        numerateVerticesAndMultiplyLoad();
        updateDrawing();
        sendInput();
    })();
}]);