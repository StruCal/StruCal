$('.img-small').hover(makeBigger, returnToOriginalSize);

$('#cog').on('mouseover', function () {
    var $this = $(this);

    if ($(this).hasClass("gly-spin"))
        return;
    $(this).addClass("gly-spin");
    setTimeout(function () {
        $this.removeClass("gly-spin");
    }, 2000);
});

function makeBigger() {
    $(this).css({ height: '+=10%', width: '+=10%' });
}
function returnToOriginalSize() {
    $(this).css({ height: "", width: "" });
}