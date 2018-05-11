var fea = angular.module('fea', []);

fea.directive("drawing", function () {
    return {
        restrict: "A",
        link: function ($scope, element) {
            var canvas = element[0];
            this.ctx = canvas.getContext('2d');
            ctx.font = "10px Arial";
        }
    };
});

fea.service('nodesService', function () {
    var nodes = [
        { number: 1, x: 100, y: 100 },
        { number: 2, x: 200, y: 100 },
        { number: 3, x: 100, y: 200 }
    ];

    this.get = function () {
        return nodes;
    }

    this.add = function (item) {
        nodes.push(item);
    }
});

fea.service('elementsService', function (nodesService) {
    var elements = [
        { number: 1, node1: nodesService.get()[0], node2: nodesService.get()[1] },
        { number: 2, node1: nodesService.get()[1], node2: nodesService.get()[2] },
        { number: 3, node1: nodesService.get()[0], node2: nodesService.get()[2] }
    ];

    this.get = function () {
        return elements;
    }

    this.add = function (item) {
        elements.push(item);
    }
});

fea.service('supportsService', function (nodesService) {
    var supports = [
        { number: 1, node: nodesService.get()[0], type: 'Pinned' },
        { number: 2, node: nodesService.get()[1], type: 'Fixed' }
    ];

    this.get = function () {
        return supports;
    }

    this.add = function (item) {
        supports.push(item);
    }
});

fea.service('loadsService', function (nodesService) {
    var loads = [
        { node: nodesService.get()[0], xMagnitude: 100, yMagnitude: 200 },
        { node: nodesService.get()[1], xMagnitude: 200, yMagnitude: 300 }
    ];

    this.get = function () {
        return loads;
    }

    this.add = function (item) {
        loads.push(item);
    }
});

fea.controller('ModelController', function ($scope, $timeout, nodesService, elementsService, supportsService, loadsService) {
    $scope.nodeNumber = nodesService.get().length;
    $scope.xNodeCoord = 0;
    $scope.yNodeCoord = 0;

    $scope.elementNumber = elementsService.get().length;
    $scope.firstNodeNumber = 0;
    $scope.secondNodeNumber = 0;

    $scope.supportNumber = supportsService.get().length;
    $scope.supportNodeNumber = 0;
    $scope.selectedSupportType = "Pinned";
    $scope.supportTypes = ["Pinned", "Fixed", "Roller (vertical)", "Roller (horizontal)"];

    $scope.loadNodeNumber = 0;
    $scope.loadXMagnitude = 0;
    $scope.loadYMagnitude = 0;

    $scope.addNodeButtonClick = function () {
        $scope.nodeNumber++;
        nodesService.add({ number: $scope.nodeNumber, x: $scope.xNodeCoord, y: $scope.yNodeCoord });
        updateView();
    };

    $scope.addElementButtonClick = function () {
        $scope.elementNumber++;
        elementsService.add({ number: $scope.elementNumber, node1: findNodeByNumber($scope.firstNodeNumber, nodesService.get()), node2: findNodeByNumber($scope.secondNodeNumber, nodesService.get()) });
        updateView();
    };

    $scope.addSupportButtonClick = function () {
        $scope.supportNumber++;
        supportsService.add({ number: $scope.supportNumber, node: findNodeByNumber($scope.supportNodeNumber, nodesService.get()), type: $scope.selectedSupportType });
        updateView();
    };

    $scope.addLoadButtonClick = function () {
        loadsService.add({ node: findNodeByNumber($scope.loadNodeNumber, nodesService.get()), xMagnitude: $scope.loadXMagnitude, yMagnitude: $scope.loadYMagnitude });
        updateView();
    };

    function findNodeByNumber(number, nodes) {
        for (i = 0; i < nodes.length; i++) {
            if (nodes[i].number == number) {
                return nodes[i];
            }
        };
        return null;
    }

    function drawNode(number, x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        drawNodeNumber(number, x, y);
    };

    function drawNodeNumber(number, x, y) {
        var offset = 5;
        ctx.strokeText(number, x + offset, y - offset);
    }

    function drawElement(number, node1, node2) {
        ctx.beginPath();
        ctx.moveTo(node1.x, node1.y);
        ctx.lineTo(node2.x, node2.y);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
        drawElementNumber(number, node1, node2);
    };

    function drawElementNumber(number, node1, node2) {
        var centerX = (node1.x + node2.x) / 2;
        var centerY = (node1.y + node2.y) / 2;
        ctx.strokeText('[' + number + ']', centerX, centerY);
    }

    function drawSupport(number, node, type) {
        ctx.beginPath();

        switch (type) {
            case 'Pinned':
                var point1 = { x: node.x, y: node.y };
                var point2 = { x: node.x - 10, y: node.y - 10 };
                var point3 = { x: node.x + 10, y: node.y - 10 };
                ctx.moveTo(point1.x, point1.y);
                ctx.lineTo(point2.x, point2.y);
                ctx.lineTo(point3.x, point3.y);
                ctx.lineTo(point1.x, point1.y);
                break;
            case 'Fixed':
                var point1 = { x: node.x - 10, y: node.y - 10 };
                var point2 = { x: node.x + 10, y: node.y - 10 };
                var point3 = { x: node.x + 10, y: node.y };
                var point4 = { x: node.x - 10, y: node.y };
                ctx.moveTo(point1.x, point1.y);
                ctx.lineTo(point2.x, point2.y);
                ctx.lineTo(point3.x, point3.y);
                ctx.lineTo(point4.x, point4.y);
                ctx.lineTo(point1.x, point1.y);
                break;
            case 'Roller (vertical)':
                var point1 = { x: node.x, y: node.y };
                var point2 = { x: node.x + 7, y: node.y - 10 };
                var point3 = { x: node.x + 7, y: node.y + 10 };
                var point4 = { x: node.x + 10, y: node.y - 10 };
                var point5 = { x: node.x + 10, y: node.y + 10 };
                ctx.moveTo(point1.x, point1.y);
                ctx.lineTo(point2.x, point2.y);
                ctx.lineTo(point3.x, point3.y);
                ctx.lineTo(point1.x, point1.y);
                ctx.moveTo(point4.x, point4.y);
                ctx.lineTo(point5.x, point5.y);
                break;
            case 'Roller (horizontal)':
                var point1 = { x: node.x, y: node.y };
                var point2 = { x: node.x - 10, y: node.y - 7 };
                var point3 = { x: node.x + 10, y: node.y - 7 };
                var point4 = { x: node.x - 10, y: node.y - 10 };
                var point5 = { x: node.x + 10, y: node.y - 10 };
                ctx.moveTo(point1.x, point1.y);
                ctx.lineTo(point2.x, point2.y);
                ctx.lineTo(point3.x, point3.y);
                ctx.lineTo(point1.x, point1.y);
                ctx.moveTo(point4.x, point4.y);
                ctx.lineTo(point5.x, point5.y);
                break;
        }
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.stroke();
    };

    function drawLoad(node, xMagnitude, yMagnitude) {
        ctx.beginPath();

        var scale = 10;

        // draw Y arrow
        var point1 = { x: node.x, y: node.y };
        var point2 = { x: node.x, y: node.y + yMagnitude / scale };
        var point3 = { x: node.x - 5, y: node.y + 5 };
        var point4 = { x: node.x + 5, y: node.y + 5 };
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point3.x, point3.y);
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point4.x, point4.y);

        // draw Y arrow

        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    function resetView() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawGrid() {
        //grid width and height
        var bw = canvas.width;
        var bh = canvas.height;

        // draw Grid
        for (var y = 0; y <= bh; y += 10) {
            ctx.moveTo(0, y);
            ctx.lineTo(bw, y);
        }
        for (var x = 0; x <= bw; x += 10) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, bh);
        }

        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    function updateView() {
        resetView();
        drawGrid();
        // draw Nodes
        for (i = 0; i < nodesService.get().length; i++) {
            drawNode(nodesService.get()[i].number, nodesService.get()[i].x, nodesService.get()[i].y);
        };

        // draw Elements
        for (i = 0; i < elementsService.get().length; i++) {
            drawElement(elementsService.get()[i].number, elementsService.get()[i].node1, elementsService.get()[i].node2);
        };

        // draw Supports
        for (i = 0; i < supportsService.get().length; i++) {
            drawSupport(supportsService.get()[i].number, supportsService.get()[i].node, supportsService.get()[i].type);
        };

        // draw Loads
        for (i = 0; i < loadsService.get().length; i++) {
            drawLoad(loadsService.get()[i].node, loadsService.get()[i].xMagnitude, loadsService.get()[i].yMagnitude);
        };
    };

    $scope.init = function () {
        updateView();
    }

    $timeout($scope.init, 500);
});

fea.controller('ListController', function ($scope, nodesService, elementsService, supportsService, loadsService) {
    $scope.nodesList = nodesService.get();
    $scope.elementsList = elementsService.get();
    $scope.supportsList = supportsService.get();
    $scope.loadsList = loadsService.get();
});