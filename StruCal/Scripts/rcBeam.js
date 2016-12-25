$(document).ready(function () {

    ko.options.deferUpdates = true;
    var inputVM = new inputDataViewModel();
    ko.applyBindings(inputVM);

});

var inputDataViewModel = function () {
    var self = this;

    //input parameters
    self.ConcreteClassList = ko.observableArray(['C12/15', 'C16/20', 'C20/25', 'C25/30', 'C30/37', 'C35/45', 'C40/50', 'C45/55', 'C50/60', 'C55/67', 'C60/75', 'C70/80', 'C80/95', 'C90/105']);
    self.ConcreteClass = ko.observable('C30/37');
    self.ConcreteClassValidation = ko.pureComputed(function () {
        return self.ConcreteClass();
    });

    self.Fck = ko.observable(37);
    self.Fcd = ko.computed(function () { return Number(self.Fck()) + 10 }, this);

    self.AlphaCC = ko.observable('1');
    self.AlphaCCValidation = ko.pureComputed(function () {
        return self.AlphaCC();
    });


    this.StressStrain = {
        labels: ["0", "", "\u03B5"],
        datasets: [
            {
                label: 'Characteristic',
                backgroundColor: "rgba(220,220,220,0.2)",
                borderColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [{x: 0, y: 0}, {x: 1, y: self.Fck}, {x: 2, y: self.Fck}],
            },
            {
                label: 'Design',
                backgroundColor: "rgba(151,187,205,0.2)",
                borderColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [{ x: 0, y: 0}, {x: 1, y: self.Fcd}, {x: 2, y: self.Fcd}],
            }
        ]
    };
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