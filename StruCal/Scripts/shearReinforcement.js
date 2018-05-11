var numberPattern = /^((0|[1-9][0-9]*)(\.[0-9]+)?)$/;
function validateNumber(value) {
    var regex = new RegExp(numberPattern);
    return regex.test(value);
}
$(document).ready(function () {
    ko.options.deferUpdates = true;
    var inputVM = new inputDataViewModel();
    ko.applyBindings(inputVM);
    inputVM.fck(40);

    $('#inputData').draggable({ axis: "y", containment: "#row" });

    //main settings for popover
    $('[data-toggle="popover"]').popover({
        html: true,
        container: 'body',
        placement: 'right',
        content: function () {
            return $("#reinforcement-popover-content").html();
        },
        title: function () {
            return $("#reinforcement-popover-title").html();
        }
    });

    //click function to open popover
    $('[data-toggle="popover"]').on('click', function (e) {
        //var ma = $(this).parents('.input-group');
        $('[data-toggle="popover"]').not($(this)).popover('hide');
        //alert(ma.html());
        $(this).popover('show');
        var $this = $(this);
        $(this).off('shown.bs.popover').on('shown.bs.popover', function () {
            $('.popover button').data('context', $this);
        });

        //getValues from local storage
        var inputName = $(this).parent('span').siblings('input').attr('id');

        var diameter = localStorage.getItem(inputName + "diameter");

        diameter = diameter == null ? 1 : diameter;
        var count = localStorage.getItem(inputName + "count");
        count = count == null ? 1 : count;

        var area = Math.round(count * Math.PI * diameter * diameter / 4 * 100) / 100;

        $('.popover #areaValue').text(area);
        $('.popover #diameterInput').val(diameter);
        $('.popover #countInput').val(count);

        e.stopPropagation();
    });

    //chnages the area based on number of bars and diameter in popup
    $('body').on('input', '#diameterInput, #countInput', function (event) {
        if ($(this).val().match(numberPattern)) {
            $(this).parent().removeClass('has-error');
            $('.popover #applyReinforcement').prop('disabled', false);

            var count = Number($('.popover #countInput').val());
            var diameter = Number($('.popover #diameterInput').val());
            var area = Math.round(count * Math.PI * diameter * diameter / 4 * 100) / 100;
            //alert("ccc" + count +" "+diameter+" "+ area);
            $('.popover #areaValue').html(area);
        }
        else {
            $(this).parent().addClass('has-error');
            $('.popover #applyReinforcement').prop('disabled', true);
        }
    })
        .on('click', '#applyReinforcement', function () { //apply button on popover
            var $context = $(this).data('context'); //button which triggered the popover
            var area = $('.popover #areaValue').text();
            var diameter = $('.popover #diameterInput').val();
            var count = $('.popover #countInput').val();

            var inputName = $context.parent('span').siblings('input').attr('id');
            if (inputName == 'Asw') {
                inputVM.Asw(area);
            }
            else if (inputName == 'Asl') {
                inputVM.Asl(area);
            }

            //save values to local storage
            localStorage.setItem(inputName + "area", area);
            localStorage.setItem(inputName + "diameter", diameter);
            localStorage.setItem(inputName + "count", count);

            $context.popover('hide');
        })
        .on('click', '#cancelReinforcement', function () {//cancel button on poover
            var $context = $(this).data('context'); //button which triggered the popover
            $context.popover('hide');
        });
});

var inputDataViewModel = function () {
    var self = this;

    //input parameters
    self.Ved = ko.observable(200000);
    self.VedValidation = ko.pureComputed(function () {
        return validateNumber(self.Ved());
    });
    self.s = ko.observable(100);
    self.sValidation = ko.pureComputed(function () {
        return validateNumber(self.s());
    });
    self.Asw = ko.observable(200);
    self.AswValidation = ko.pureComputed(function () {
        return validateNumber(self.Asw());
    });
    self.bw = ko.observable(300);
    self.bwValidation = ko.pureComputed(function () {
        return validateNumber(self.bw());
    });
    self.d = ko.observable(200);
    self.dValidation = ko.pureComputed(function () {
        return validateNumber(self.d());
    });
    self.h = ko.observable(300);
    self.hValidation = ko.pureComputed(function () {
        return validateNumber(self.h());
    });
    self.fywk = ko.observable(500);
    self.fywkValidation = ko.pureComputed(function () {
        return validateNumber(self.fywk());
    });
    self.gammaS = ko.observable(1.15);
    self.gammaSValidation = ko.pureComputed(function () {
        return validateNumber(self.gammaS());
    });
    self.fck = ko.observable(30);
    self.fckValidation = ko.pureComputed(function () {
        return validateNumber(self.fck());
    });
    self.gammaC = ko.observable(1.5);
    self.gammaCValidation = ko.pureComputed(function () {
        return validateNumber(self.gammaC());
    });
    self.Ned = ko.observable(5000);
    self.NedValidation = ko.pureComputed(function () {
        return validateNumber(self.Ned());
    });
    self.k1 = ko.observable(0.15);
    self.k1Validation = ko.pureComputed(function () {
        return validateNumber(self.k1());
    });
    self.Asl = ko.observable(200);
    self.AslValidation = ko.pureComputed(function () {
        return validateNumber(self.Asl());
    });
    self.cotThetaMax = ko.observable(2.5);
    self.cotThetaMin = ko.observable(1);

    self.inputValidated = ko.pureComputed(function () {
        var result = true
            & self.VedValidation()
            & self.sValidation()
            & self.AswValidation()
            & self.bwValidation()
            & self.dValidation()
            & self.hValidation()
            & self.fywkValidation()
            & self.gammaSValidation()
            & self.fckValidation()
            & self.gammaCValidation()
            & self.NedValidation()
            & self.k1Validation()
            & self.AslValidation();
        return result;
    });

    self.Ved.subscribe(getData);
    self.bw.subscribe(getData);
    self.s.subscribe(getData);
    self.Asw.subscribe(getData);
    self.d.subscribe(getData);
    self.h.subscribe(getData);
    self.fywk.subscribe(getData);
    self.gammaS.subscribe(getData);
    self.fck.subscribe(getData);
    self.gammaC.subscribe(getData);
    self.Ned.subscribe(getData);
    self.k1.subscribe(getData);
    self.Asl.subscribe(getData);
    self.cotThetaMax.subscribe(getData);
    self.cotThetaMin.subscribe(getData);

    //output for members NOT requiring shear reinforcement
    self.Crdc = ko.observable(1);
    self.CrdcResult = ko.pureComputed(function () {
        var part1 = "C_{Rd,c}=";
        var part2 = "\\frac {0.18}{\\gamma_C}=";
        var part3 = "\\frac {0.18}{" + self.gammaC() + "}=" + self.Crdc();
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    self.fcd = ko.observable(1);
    self.fcdResult = ko.pureComputed(function () {
        var part1 = "f_{cd}=";
        var part2 = "\\frac {f_{ck}}{\\gamma_S}=";
        var part3 = "\\frac {" + self.fck() + " }{" + self.gammaC() + "}=" + self.fcd() + "{N \\over mm^2}";
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    self.k = ko.observable(1);
    self.kResult = ko.pureComputed(function () {
        var part1 = "k=";
        var part2 = "1+ \\sqrt{\\frac{200}{d}}=";
        var part3 = "1+ \\sqrt{\\frac{200}{" + self.d() + "}}=" + self.k() + "\\leq 2.0";
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    self.ro1 = ko.observable(1);
    self.ro1Result = ko.pureComputed(function () {
        var part1 = "\\rho_I=";
        var part2 = "\\frac{A_{sl}}{b_w \\cdot d}=";
        var part3 = "\\frac{" + self.Asl() + "}{" + self.bw() + "\\cdot " + self.d() + "}=" + self.ro1() + "\\leq 0.02";
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    self.vmin = ko.observable(1);
    self.vminResult = ko.pureComputed(function () {
        var part1 = "v_{min}=";
        var part2 = "0.035 \\cdot k^{3/2} \\cdot f_{ck}^{1/2}=";
        var part3 = "0.035 \\cdot" + self.k() + "^{3/2} \\cdot " + self.fck() + "^{1/2}=" + self.vmin();
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    self.sigmacp = ko.observable(1);
    self.sigmacpResult = ko.pureComputed(function () {
        var part1 = "\\sigma_{cp}=";
        var part2 = "\\frac{N_{Ed}}{b_w \\cdot h}=";
        var part3 = "\\frac{" + formatNumber(self.Ned()) + "}{" + self.bw() + "\\cdot" + self.h() + "}=" + self.sigmacp() + "{N \\over mm^2}";
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    self.Vrdc1 = ko.observable(1);
    self.Vrdc1Result = ko.pureComputed(function () {
        var part1 = "V_{Rd,c1}=";
        var part2 = "[C_{Rd,c} \\cdot k \\cdot (100 \\cdot \\rho_I \\cdot f_{ck})^{1/3}+k_1 \\cdot \\sigma_{cp}] \\cdot b_w \\cdot d=...";
        var part3 = "";
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    self.Vrdc1SecondLineResult = ko.pureComputed(function () {
        var part1 = "";
        var part2 = "\\qquad \\quad \\!...=[" + self.Crdc() + " \\cdot" + self.k() + " \\cdot (100 \\cdot " + self.ro1() + " \\cdot" + self.fck() + "^{1/3}+" + self.k1() + " \\cdot " + self.sigmacp() + "] \\cdot" + self.bw() + "\\cdot" + self.d() + "=" + formatNumber(self.Vrdc1()) + "N";
        var part3 = "";
        return convertToFormula(part1, part2, part3);
        //return " \\(" + part1 + part2 + part3 + "\\)";
    });
    self.Vrdc2 = ko.observable(1);
    self.Vrdc2Result = ko.pureComputed(function () {
        var part1 = "V_{Rd,c2}=";
        var part2 = "(v_{min}+k_1 \\cdot \\sigma_{cp}) \\cdot b_w \\cdot d=";
        var part3 = "(" + self.vmin() + "+" + self.k1() + " \\cdot" + self.sigmacp() + ") \\cdot" + self.bw() + "\\cdot" + self.d() + " =" + formatNumber(self.Vrdc2()) + "N";
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    self.Vrdc = ko.observable(1);
    self.VrdcResult = ko.pureComputed(function () {
        var part1 = "V_{Rd,c}=";
        var part2 = "max(V_{Rd,c1};V_{Rd,c2})=";
        var part3 = "max(" + formatNumber(self.Vrdc1()) + ";" + formatNumber(self.Vrdc2()) + ")=" + formatNumber(self.Vrdc()) + "N";
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    self.VrdcSummary = ko.pureComputed(function () {
        //alert(formatNumber(self.Ved()));
        var ved = formatNumber(self.Ved());//;
        var part1 = "V_{Ed}=" + ved + "N";
        var part2 = self.Ved() > self.Vrdc() ? ">" : "\\leq ";
        var part3 = "V_{Rd,c}=" + formatNumber(self.Vrdc()) + "N";
        return convertToFormula(part1, part2, part3);
        //return "\\(" + part1 + part2 + part3 + "\\)";
    });
    //this.vminResult.subscribe(getData);

    self.CrdcResult.subscribe(refreshFormulas);
    self.fcd.subscribe(refreshFormulas);
    self.kResult.subscribe(refreshFormulas);
    self.ro1Result.subscribe(refreshFormulas);
    self.vminResult.subscribe(refreshFormulas);
    self.sigmacpResult.subscribe(refreshFormulas);
    self.Vrdc1Result.subscribe(refreshFormulas);
    self.Vrdc2Result.subscribe(refreshFormulas);
    self.VrdcResult.subscribe(refreshFormulas);
    self.VrdcSummary.subscribe(refreshFormulas);

    //output for members REQUIRING shear reinfrcement
    self.fywd = ko.observable(1);
    self.fywdResult = ko.pureComputed(function () {
        var part1 = "f_{ywd}=";
        var part2 = "\\frac {f_{ywk}}{\\gamma_S}=";
        var part3 = "\\frac {" + self.fywk() + " }{" + self.gammaS() + "}=" + self.fywd() + "{N \\over mm^2}";
        //return "\\(" + part1 + part2 + part3 + "\\)";
        return convertToFormula(part1, part2, part3);
    });
    self.z = ko.observable(1);
    self.zResult = ko.pureComputed(function () {
        var part1 = "z=";
        var part2 = "0.9 \\cdot d=";
        var part3 = "0.9 \\cdot" + self.d() + "=" + self.z() + "mm";
        //return "\\(" + part1 + part2 + part3 + "\\)";
        return convertToFormula(part1, part2, part3);
    });
    self.v1 = ko.observable(1);
    self.v1Result = ko.pureComputed(function () {
        var part1 = "v_1=";
        var part2 = "0.6 \\cdot [1 - \\frac{f_{ck}}{250}]=";
        var part3 = "0.6 \\cdot [1-\\frac{" + self.fck() + "}{250}]=" + self.v1();
        //return "\\(" + part1 + part2 + part3 + "\\)";
        return convertToFormula(part1, part2, part3);
    });
    self.alfaCw = ko.observable(1);
    self.alfaCwResult = ko.pureComputed(function () {
        var part1 = "\\alpha_{cw}=";
        var part2 = "";
        var part3 = "";
        if (self.sigmacp() <= 0.25 * self.fcd()) {
            part2 = "(1+\\frac{\\sigma_{cp}}{f_{cd}})=";
            part3 = "(1+\\frac{" + self.sigmacp() + "}{" + self.fcd() + "})=" + self.alfaCw();
        }
        else if (0.25 * self.fcd() < self.sigmacp() && self.sigmacp() <= 0.5 * self.fcd()) {
            part2 = self.sigmacp();
        }
        else {
            part2 = "2.5 \\cdot (1 - \\frac{\\sigma_{cp}}{f_{cd}})="
            part3 = "2.5 \\cdot (1 - \\frac{" + self.sigmacp() + "}{" + self.fcd() + "})=" + self.alfaCw();
        }
        //var part2 = "0.6 \\cdot [1 - \\frac{f_{ck}}{250}]=";
        //var part3 = "0.6 \\cdot [1-\\frac{" + self.fck() + "}{250}]=" + self.v1();
        //return "\\(" + part1 + part2 + part3 + "\\)";
        return convertToFormula(part1, part2, part3);
    });
    self.theta = ko.observable(1);
    self.thetaResult = ko.pureComputed(function () {
        var part1 = "\\theta=";
        var part2 = "\\frac{1}{2} \\cdot \\arcsin \\frac{2 \\cdot V_{Ed}}{\\alpha_{cw} \\cdot b_w \\cdot z \\cdot v_1 \\cdot f_{cd}}=";
        var part3 = "\\frac{1}{2} \\cdot \\arcsin \\frac{2 \\cdot" + formatNumber(self.Ved()) + "}{" + self.alfaCw() + "\\cdot" + self.bw() + "\\cdot" + self.z() + "\\cdot" + self.v1() + "\\cdot" + self.fcd() + "}=" + self.theta();
        //return "\\(" + part1 + part2 + part3 + "\\)";
        return convertToFormula(part1, part2, part3);
    });
    self.cotTheta = ko.observable(1);
    self.cotThetaResult = ko.pureComputed(function () {
        var part1 = "";
        var part2 = "\\cot \\theta_{min}=" + self.cotThetaMin() + "\\leq \\cot \\theta=" + self.cotTheta() + "\\leq \\cot \\theta_{max}=" + self.cotThetaMax();
        var part3 = "";
        //return "\\(" + part1 + part2 + part3 + "\\)";
        return convertToFormula(part1, part2, part3);
    });
    self.cotThetaCalcs = ko.observable(1);
    self.cotThetaCalcsResult = ko.pureComputed(function () {
        var part1 = "";
        var part2 = "\\cot \\theta=" + self.cotThetaCalcs();
        var part3 = "";
        //return "\\(" + part1 + part2 + part3 + "\\)";
        return convertToFormula(part1, part2, part3);
    });
    self.tanTheta = ko.observable(1);
    self.Vrdmax = ko.observable(1);
    self.VrdmaxResult = ko.pureComputed(function () {
        var part1 = "V_{Rd,max}=";
        var part2 = "\\frac{\\alpha_{cw} \\cdot b_w \\cdot z \\cdot v_1 \\cdot f_{cd}}{\\cot \\theta + \\tan \\theta}=";
        var part3 = "\\frac{" + self.alfaCw() + "\\cdot" + self.bw() + "\\cdot" + self.z() + "\\cdot" + self.v1() + "\\cdot" + self.fcd() + "}{" + self.cotThetaCalcs() + "+" + self.tanTheta() + "}=" + formatNumber(self.Vrdmax()) + "N";
        //return "\\(\\displaystyle " + part1 + part2 + part3 + "\\)";
        return convertToFormula(part1, part2, part3);
    });
    self.Vrds = ko.observable(1);
    self.VrdsResult = ko.pureComputed(function () {
        var part1 = "V_{Rd,s}=";
        var part2 = "\\frac{A_{sw}}{s} \\cdot z \\cdot f_{ywd} \\cdot \\cot \\theta=";
        var part3 = "\\frac{" + self.Asw() + "}{" + self.s() + "} \\cdot" + self.z() + "\\cdot" + self.fywd() + "\\cdot" + self.cotThetaCalcs() + "=" + formatNumber(self.Vrds()) + "N";
        //return "\\(" + part1 + part2 + part3 + "\\)";
        return convertToFormula(part1, part2, part3);
    });
    self.VrdsSummary = ko.pureComputed(function () {
        var part1 = "V_{Ed}=" + formatNumber(self.Ved()) + "N";
        var part2 = self.Ved() > self.Vrds() ? ">" : "\\leq ";
        var part3 = "V_{Rd,s}=" + formatNumber(self.Vrds()) + "N";
        return "\\(" + part1 + part2 + part3 + "\\)";
    });

    self.zResult.subscribe(refreshFormulas);
    self.v1Result.subscribe(refreshFormulas);
    self.alfaCwResult.subscribe(refreshFormulas);
    self.thetaResult.subscribe(refreshFormulas);
    self.cotThetaResult.subscribe(refreshFormulas);
    self.VrdmaxResult.subscribe(refreshFormulas);
    self.VrdsResult.subscribe(refreshFormulas);
    self.VrdsSummary.subscribe(refreshFormulas);
    self.NoSolution = ko.observable(false);

    function getData(newValue) {
        var inputData = {
            Ved: self.Ved(),
            fck: self.fck(),
            Ned: self.Ned(),
            gammaC: self.gammaC(),
            bw: self.bw(),
            d: self.d(),
            Asl: self.Asl(),
            h: self.h(),
            k1: self.k1(),
            cotThetaMax: self.cotThetaMax(),
            cotThetaMin: self.cotThetaMin(),
            fywk: self.fywk(),
            gammaS: self.gammaS(),
            Asw: self.Asw(),
            s: self.s(),
        };
        $.post("/api/ShearReinforcementApi", inputData, function (returnedData) {
            self.Vrdc1(returnedData.Vrdc1);
            self.Vrdc2(returnedData.Vrdc2);
            self.Vrdc(returnedData.Vrdc);
            self.Crdc(returnedData.Crdc);
            self.sigmacp(returnedData.sigmacp);
            self.vmin(returnedData.vmin);
            self.fcd(returnedData.fcd);
            self.ro1(returnedData.ro1);
            self.k(returnedData.k);
            self.fcd(returnedData.fcd);

            self.VrdcSummary.call();

            self.v1(returnedData.v1);
            self.z(returnedData.z);
            self.alfaCw(returnedData.alfaCw);
            self.fywd(returnedData.fywd);
            self.cotTheta(returnedData.cotTheta);
            self.cotThetaCalcs(returnedData.cotThetaCalcs);
            self.tanTheta(returnedData.tanTheta);
            self.theta(returnedData.theta);
            self.Vrdmax(returnedData.Vrdmax);
            self.Vrds(returnedData.Vrds);
            self.NoSolution(returnedData.NoSolution);
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

    function convertToFormula() {
        var input = "";
        for (var i = 0; i < arguments.length; i++) {
            input = input + arguments[i];
            console.log(input);
        }
        return "\\(\\displaystyle \\ " + input + "\\)"
    }
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