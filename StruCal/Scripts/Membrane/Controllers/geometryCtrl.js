angular.module('membraneFEM').controller('geometryCtrl', ['$scope', '$rootScope','drawingService','inputDataFactory','inputDataCalculator', function ($scope, $rootScope, drawingService,inputDataFactory,inputDataCalculator) {
    var inputData;

    $scope.currentEdited = -1;
    $scope.vertices = inputDataFactory.getVertices();
    $scope.verticesInput = angular.copy($scope.vertices);

    $scope.save = function (index) {

        $scope.vertices[index].X = $scope.verticesInput[index].X;
        $scope.vertices[index].Y = $scope.verticesInput[index].Y;
        $scope.vertices[index].LoadX = $scope.verticesInput[index].LoadX;
        $scope.vertices[index].LoadY = $scope.verticesInput[index].LoadY;
        $scope.vertices[index].SupportX = $scope.verticesInput[index].SupportX;
        $scope.vertices[index].SupportY = $scope.verticesInput[index].SupportY;

        
        updateDrawing();
        

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
        updateDrawing();
    }

    $scope.remove = function (index) {
        $scope.vertices.splice(index, 1);
        $scope.verticesInput.splice(index, 1);
        updateDrawing();
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
    
    function sendInput() {
        $rootScope.$broadcast('verticesMsg', inputData.Vertices);
        $rootScope.$broadcast('edgesMsg', inputData.Edges);
    }
    function updateDrawing() {
        inputData = inputDataCalculator.getInputData($scope.vertices);
        drawingService.setInput(inputData);
        sendInput();
    }

    (function init() {
        inputData = inputDataCalculator.getInputData($scope.vertices);
        updateDrawing();
        sendInput();
    })();
}]);