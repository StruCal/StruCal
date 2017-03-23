angular.module('rcBeam').filter('numberFormatter', function () {
    return function (inputNumber) {
        if (inputNumber == "" || inputNumber == null)
            return inputNumber;

        var separator = " "//space 

        var decimalPart;
        var naturalPart;
        var number;
        var dotPosition = inputNumber.toString().indexOf('.');
        if (dotPosition != -1) {
            number = inputNumber.toFixed(2);
            decimalPart = number.substr(dotPosition);
            naturalPart = number.substr(0, dotPosition);
        }
        else {
            number= inputNumber.toFixed(0);
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
    };
})