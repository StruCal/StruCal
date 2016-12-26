$(document).ready(function () {

    ko.options.deferUpdates = true;
    var inputVM = new inputDataViewModel();
    ko.applyBindings(inputVM);

    function drawRectCrossSection() {
        var canvasObject = $('#rectCrossSection');

        var width = Number(inputVM.RectWidth());
        var height = Number(inputVM.RectHeight());

        var xString = "0;" + width + ";" + width + ";0;";
        var yString = "0;0;" + height + ";" + height + ";";

        var x = splitCoordinates(xString);
        var y = splitCoordinates(yString);

        if (x.length != y.length) {
            return;
        }

        fillCanvas(x, y, canvasObject);
    }

    //Delay is necessary due to initialisation of div dimensions?
    setTimeout(drawRectCrossSection, 1000)
    $("#rectWidth").change(drawRectCrossSection);
    $("#rectHeight").change(drawRectCrossSection);
    $(window).resize(drawRectCrossSection);
});

var inputDataViewModel = function () {
    var self = this;

    //input parameters
    self.GammaC = ko.observable(1.4);
    self.GammaCValidation = ko.pureComputed(function () {
        return self.GammaC();
    });

    self.GammaS = ko.observable(1.15);
    self.GammaSValidation = ko.pureComputed(function () {
        return self.GammaS();
    });

    self.ConcreteClassList = ko.observableArray(['C12/15', 'C16/20', 'C20/25', 'C25/30', 'C30/37', 'C35/45', 'C40/50', 'C45/55', 'C50/60', 'C55/67', 'C60/75', 'C70/80', 'C80/95', 'C90/105']);
    self.ConcreteClass = ko.observable('C30/37');
    self.ConcreteClassValidation = ko.pureComputed(function () {
        return self.ConcreteClass();
    });

    self.Fck = ko.observable(37);
    self.Fcd = ko.computed(function () { return Number(self.Fck()) / Number(self.GammaC()) }, this);
    self.EpsilonC2 = ko.observable(0.0025);
    self.EpsilonCU2 = ko.observable(0.0035);

    self.AlphaCC = ko.observable(1);
    self.AlphaCCValidation = ko.pureComputed(function () {
        return self.AlphaCC();
    });

    self.N = ko.observable(2);
    self.NValidation = ko.pureComputed(function () {
        return self.N();
    });

    self.StressStrainConcrete = {
        labels: ["0", self.EpsilonC2, self.EpsilonCU2],
        datasets: [
            {
                label: 'Characteristic',
                lineTension: 0,
                backgroundColor: "rgba(220,220,220,0.2)",
                borderColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [{ x: 0, y: 0 }, { x: self.EpsilonC2, y: self.Fck }, {x: self.EpsilonCU2, y: self.Fck }],
            },
            {
                label: 'Design',
                lineTension: 0,
                backgroundColor: "rgba(151,187,205,0.2)",
                borderColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [{ x: 0, y: 0 }, { x: self.EpsilonC2, y: self.Fcd }, {x: self.EpsilonCU2, y: self.Fcd }],
            }
        ]
    };

    self.SteelClassList = ko.observableArray(['400', '500', '600']);
    self.SteelClass = ko.observable('500 MPa');
    self.SteelClassValidation = ko.pureComputed(function () {
        return self.SteelClass();
    });

    self.Fyk = ko.observable(400);
    self.Fyd = ko.computed(function () { return Number(self.Fyk()) / Number(self.GammaS()) }, this);
    self.EpsilonY = ko.observable(0.0025);
    self.EpsilonU = ko.observable(0.0035);

    self.StressStrainSteel = {
        labels: ["0", self.EpsilonY, self.EpsilonU],
        datasets: [
            {
                label: 'Characteristic',
                lineTension: 0,
                backgroundColor: "rgba(220,220,220,0.2)",
                borderColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [{ x: 0, y: 0 }, { x: self.EpsilonY, y: self.Fyk }, { x: self.EpsilonU, y: self.Fyk }],
            },
            {
                label: 'Design',
                lineTension: 0,
                backgroundColor: "rgba(151,187,205,0.2)",
                borderColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [{ x: 0, y: 0 }, { x: self.EpsilonY, y: self.Fyd }, { x: self.EpsilonU, y: self.Fyd }],
            }
        ]
    };

    self.RectWidth = ko.observable(25);
    self.RectHeight = ko.observable(50);

    self.Moment = ko.observable(200);
}

/**
 * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
 */
$(function () {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');

        // Dividing by two centers the modal exactly, but dividing by three
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function () {
        $('.modal:visible').each(reposition);
    });
});