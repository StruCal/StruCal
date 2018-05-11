angular.module('rcBeam').controller('drawingPanelCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    var coordinates;
    var bars;

    $scope.$on('coordinates', function (event, arg) {
        coordinates = arg;
        updateDrawing();
    });
    $scope.$on('bars', function (event, arg) {
        bars = arg;
        updateDrawing();
    });

    function updateDrawing() {
        var canvasObject = $('#customPanelDrawing');
        var drawing = new drawingPanel(canvasObject);
        drawing.fillCanvas(coordinates, bars);
    }

    (function init() {
        coordinates = [
            { x: 0, y: 0 },
            { x: 0.5 * 500, y: 0 },
            { x: 0.5 * 500, y: -200 },
            { x: -0.5 * 500, y: -200 },
            { x: -0.5 * 500, y: 0 },
            { x: 0, y: 0 },
        ];
        bars = [
            { d: 20, x: -146.66666, y: -170 },
            { d: 20, x: -73.3333, y: -170 },
            { d: 20, x: 0, y: -170 },
            { d: 20, x: 73.3333, y: -170 },
            { d: 20, x: 146.666, y: -170 },
            { d: 10, x: -75, y: -25 },
            { d: 10, x: 75, y: -25 },
        ]
        $rootScope.$broadcast('coordinates', coordinates);
        $rootScope.$broadcast('bars', bars);
        updateDrawing();
    })();
}]);

class drawingPanel {
    constructor(canvasObject) {
        this.canvasObject = canvasObject;
    }

    fillCanvas(coordinates, bars) {
        this.canvasObject.empty();
        var canvasWidth = this.canvasObject.width();
        var canvasHeight = canvasWidth * 0.5;
        this.canvasObject.height(canvasHeight);

        var drawing = SVG(this.canvasObject.attr('id')).size(canvasWidth, canvasHeight);

        var drawingCreator = new rcDrawing(drawing);
        drawingCreator.drawBackgroundPattern(canvasWidth, canvasHeight)
        drawingCreator.drawSection(coordinates, this.canvasObject);
        drawingCreator.drawBars(bars)
    }
}