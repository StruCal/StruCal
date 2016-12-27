﻿var numberPattern = /^((0|[1-9][0-9]*)(\.[0-9]+)?)$/;
function validateNumber(value) {
    var regex = new RegExp(numberPattern);
    return regex.test(value);
}
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

    self.ExposureClassList = ko.observableArray(['X0', 'XC1', 'XC2', 'XC3', 'XC4', 'XD1', 'XD2', 'XD3', 'XS1', 'XS2', 'XS3', 'XF1', 'XF2', 'XF3', 'XF4', 'XA1', 'XA2', 'XA3']);
    self.ExposureClass = ko.observable('X0');
    self.ExposureClassValidation = ko.pureComputed(function () {
        return self.ExposureClass();
        });

    self.BaseStructuralClassList = ko.observableArray(['S1', 'S2', 'S3', 'S4', 'S5', 'S6']);
    self.BaseStructuralClass = ko.observable('S4');
    self.BaseStructuralClassValidation = ko.pureComputed(function () {
        return self.BaseStructuralClass();
        });

    self.NominalMaximumAggregateSizeIsGreaterThan32mm = ko.observable(false);
    self.NominalMaximumAggregateSizeIsGreaterThan32mmValidation = ko.pureComputed(function () {
        return self.NominalMaximumAggregateSizeIsGreaterThan32mm();
    });

    self.DesignWorkingLifeOf100Years = ko.observable(false);
    self.DesignWorkingLifeOf100YearsValidation = ko.pureComputed(function () {
        return self.DesignWorkingLifeOf100Years();
        });

    self.MemberWithSlabGeometry = ko.observable(false);
    self.MemberWithSlabGeometryValidation = ko.pureComputed(function () {
        return self.MemberWithSlabGeometry();
    });

    self.SpecialQualityControlOfTheConcreteProductionEnsured = ko.observable(false);
    self.SpecialQualityControlOfTheConcreteProductionEnsuredValidation = ko.pureComputed(function () {
        return self.SpecialQualityControlOfTheConcreteProductionEnsured();
    });

    self.AdditiveSafetyElement = ko.observable(0);
    self.AdditiveSafetyElementValidation = ko.pureComputed(function () {
        return self.AdditiveSafetyElement();
    });

    self.ReductionOfMinimumCoverForUseOfStainlessSteel = ko.observable(0);
    self.ReductionOfMinimumCoverForUseOfStainlessSteelValidation = ko.pureComputed(function () {
        return self.ReductionOfMinimumCoverForUseOfStainlessSteel();
    });

    self.ReductionOfMinimumCoverForUseOfAdditionalProtection = ko.observable(0);
    self.ReductionOfMinimumCoverForUseOfAdditionalProtectionValidation = ko.pureComputed(function () {
        return self.ReductionOfMinimumCoverForUseOfAdditionalProtection();
    });

    self.AllowanceInDesignForDeviation = ko.observable(5);
    self.AllowanceInDesignForDeviationValidation = ko.pureComputed(function () {
        return self.AllowanceInDesignForDeviation();
    });

    self.RebarDiameter.subscribe(getData);
    self.ArrangementOfBars.subscribe(getData);
    self.ConcreteClass.subscribe(getData);
    self.ExposureClass.subscribe(getData);
    self.BaseStructuralClass.subscribe(getData);
    self.NominalMaximumAggregateSizeIsGreaterThan32mm.subscribe(getData);
    self.DesignWorkingLifeOf100Years.subscribe(getData);
    self.MemberWithSlabGeometry.subscribe(getData);
    self.SpecialQualityControlOfTheConcreteProductionEnsured.subscribe(getData);
    self.AdditiveSafetyElement.subscribe(getData);
    self.ReductionOfMinimumCoverForUseOfStainlessSteel.subscribe(getData);
    self.ReductionOfMinimumCoverForUseOfAdditionalProtection.subscribe(getData);
    self.AllowanceInDesignForDeviation.subscribe(getData);

    // output
    self.StructuralClass = ko.observable(1);
    self.StructuralClassResult = ko.pureComputed(function () {
        return self.StructuralClass;
    });

    self.MinimumCoverDueToBondRequirement = ko.observable(1);
    self.MinimumCoverDueToBondRequirementResult = ko.pureComputed(function () {
        return self.MinimumCoverDueToBondRequirement;
    });

    self.MinimumCoverDueToEnvironmentalConditions = ko.observable(1);
    self.MinimumCoverDueToEnvironmentalConditionsResult = ko.pureComputed(function () {
        return self.MinimumCoverDueToEnvironmentalConditions;
    });

    self.MinimumCover = ko.observable(1);
    self.MinimumCoverResult = ko.pureComputed(function () {
        return self.MinimumCover;
    });

    self.NominalCover = ko.observable(1);
    self.NominalCoverResult = ko.pureComputed(function () {
        return self.NominalCover;
    });

    self.StructuralClassResult.subscribe(refreshFormulas);
    self.MinimumCoverDueToBondRequirementResult.subscribe(refreshFormulas);
    self.MinimumCoverDueToEnvironmentalConditionsResult.subscribe(refreshFormulas);
    self.MinimumCoverResult.subscribe(refreshFormulas);
    self.NominalCoverResult.subscribe(refreshFormulas);

    function getData(newValue) {

        var inputData = {
            RebarDiameter: self.RebarDiameter(),
            ArrangementOfBars: self.ArrangementOfBars(),
            ConcreteClass: self.ConcreteClass(),
            ExposureClass: self.ExposureClass(),
            BaseStructuralClass: self.BaseStructuralClass(),
            NominalMaximumAggregateSizeIsGreaterThan32mm: self.NominalMaximumAggregateSizeIsGreaterThan32mm(),
            DesignWorkingLifeOf100Years: self.DesignWorkingLifeOf100Years(),
            MemberWithSlabGeometry: self.MemberWithSlabGeometry(),
            SpecialQualityControlOfTheConcreteProductionEnsured: self.SpecialQualityControlOfTheConcreteProductionEnsured(),
            AdditiveSafetyElement: self.AdditiveSafetyElement() / 1000,
            ReductionOfMinimumCoverForUseOfStainlessSteel: self.ReductionOfMinimumCoverForUseOfStainlessSteel() / 1000,
            ReductionOfMinimumCoverForUseOfAdditionalProtection: self.ReductionOfMinimumCoverForUseOfAdditionalProtection() / 1000,
            AllowanceInDesignForDeviation: self.AllowanceInDesignForDeviation() / 1000,
        };

        $.post("/api/CoverApi", inputData, function (returnedData) {
            self.StructuralClass(returnedData.StructuralClass);
            self.MinimumCoverDueToBondRequirement(returnedData.MinimumCoverDueToBondRequirement);
            self.MinimumCoverDueToEnvironmentalConditions(returnedData.MinimumCoverDueToEnvironmentalConditions);
            self.MinimumCover(returnedData.MinimumCover);
            self.NominalCover(returnedData.NominalCover);
            //console.log(returnedData);
            //alert("Ok");
            //$('#test').text(returnedData.k1);
        });
        refreshFormulas(newValue);
        //}

    };

    function refreshFormulas(newValue) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    };
}

function formatNumber(inputNumber) {
    var number = inputNumber.toString();
    var separator = "\\;"//space from latex

    var decimalPart;
    var naturalPart;
    var dotPosition = number.indexOf('.');
    if (dotPosition != -1) {
        decimalPart = number.substr(dotPosition);
        naturalPart = number.substr(0, dotPosition);
    }
    else {
        decimalPart = "";
        naturalPart = number;
    }
    var startNumber = naturalPart.length % 3;

    var result = "";

    for (var i = 0; i < startNumber; i++) {
        result = result + naturalPart[i];
    }
    if (startNumber != 0) {
        result = result + separator;
    }

    var currentIndex = 0;
    for (var i = startNumber; i < naturalPart.length; i++) {
        var currentChar = naturalPart[i];
        result = result + currentChar;
        currentIndex++;
        if (currentIndex == 3 && i != naturalPart.length - 1) {
            result = result + separator;
            currentIndex = 0;
        }
    }
    return result.trim() + decimalPart;
}