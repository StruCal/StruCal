(function ($) {
    "use strict"; // Start of use strict

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip({ animation: true, delay: { show: 400, hide: 50 }, selector: "", placement: "auto left", container: "body" });
    });
})(jQuery); // End of use strict