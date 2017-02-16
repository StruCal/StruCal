angular.module('rcBeam').directive("drawing", function () {
    return {
        restrict: "E",
        scope: {
            shape: "@",
            bars: "@",
            canvasName:"@"
        },
        template:
            '<div id="{{canvasName}}>"' +
            '<p>text</p>'+
            '</div>',
        replace: true,
        controller: function($scope)
        {
            var canvasObject = $("[canvasName='" + $scope.canvasName + "']").parent();
            alert(canvasObject.width());
            alert($scope.canvasName);

        }
    }
})