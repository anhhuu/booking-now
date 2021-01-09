jQuery(function() {
    new WOW().init();

    $('#carousel-partner').on('slide.bs.carousel', function(e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 5;
        var totalItems = 8;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('#bkpartner').eq(i).appendTo('#carousel-bkpartner');
                } else {
                    $('#bkpartner').eq(0).appendTo('#carousel-bkpartner');
                }
            }
        }
    });
});

$(document).ready(function() {
    $('.searchbar > *')
        .focus(function() {
            $('.searchbar').addClass('searchbar_focus');
        })
        .blur(function() {
            $('.searchbar').removeClass('searchbar_focus');
        });
});