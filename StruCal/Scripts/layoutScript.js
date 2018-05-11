$(document).ready(function () {
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    $("#aboutBtn").on('click', function () {
        window.location.href = "/#about";
    });
})

$(window).scroll(function () {
    $(".slideanim").each(function () {
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 400) {
            $(this).addClass("slide");
        }
    });
});

$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $('#startchange');
    var offset = startchange.offset();
    if (startchange.length) {
        $(document).scroll(function () {
            scroll_start = $(this).scrollTop();
            if (scroll_start > offset.top - $("#myNavbar").height() - 10) {
                $('.navbar-default').css('border-bottom', '0');
                $('#navbar').addClass('scrolled-nav');
            } else {
                $(".navbar-default").css('border-bottom', '1px solid #fff');
                $('#navbar').removeClass('scrolled-nav');
            }
        });
    }
});

// Script for dragable widget
$(window).load(function () {
    var offsetFromEdgeOfTheScreenX = 40;
    var offsetFromEdgeOfTheScreenY = 20;

    var pageHeight = $(window).height();
    var pageWidth = $(window).width();

    var elemHeight = $(".widget").height();
    var elemWidth = $(".widget").width();

    $(".widget").css({ 'top': pageHeight - elemHeight - offsetFromEdgeOfTheScreenY, 'left': pageWidth - elemWidth - offsetFromEdgeOfTheScreenX })
});

// Script for dragable widget
$(document).ready(function () {
    $(".widget").draggable();
});