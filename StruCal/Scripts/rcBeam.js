$(document).ready(function () {

    ko.options.deferUpdates = true;
    var inputVM = new inputDataViewModel();
    ko.applyBindings(inputVM);

});

var inputDataViewModel = function () {
    var self = this;

    //input parameters
    self.RebarDiameterList = ko.observableArray(['4 mm', '5 mm', '6 mm', '8 mm', '10 mm', '12 mm', '14 mm', '16 mm', '18 mm', '20 mm', '22 mm', '25 mm', '28 mm', '32 mm', '40 mm']);
    self.RebarDiameter = ko.observable('16 mm');
    self.RebarDiameterValidation = ko.pureComputed(function () {
        return self.RebarDiameter();
    });

    self.ArrangementOfBarsList = ko.observableArray(['Separated']);
    self.ArrangementOfBars = ko.observable(0);
    self.ArrangementOfBarsValidation = ko.pureComputed(function () {
        return self.ArrangementOfBars();
    });

    self.ConcreteClassList = ko.observableArray(['C12/15', 'C16/20', 'C20/25', 'C25/30', 'C30/37', 'C35/45', 'C40/50', 'C45/55', 'C50/60', 'C55/67', 'C60/75', 'C70/80', 'C80/95', 'C90/105']);
    self.ConcreteClass = ko.observable('C30/37');
    self.ConcreteClassValidation = ko.pureComputed(function () {
        return self.ConcreteClass();
    });

    self.AlphaCC = ko.observable('1');
    self.AlphaCCValidation = ko.pureComputed(function () {
        return self.AlphaCC();
    });
}