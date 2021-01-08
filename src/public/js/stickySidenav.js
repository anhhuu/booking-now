jQuery(function() {
    var toggleAffix = function(affixElement, wrapper, scrollElement) {
        if (scrollElement.scrollTop() < $('#nhan-xet').offset().top - 200) {
            if (scrollElement.scrollTop() >= wrapper.offset().top - 50) {
                affixElement.addClass("affix");
            } else {
                affixElement.removeClass("affix");
            }
        } else {
            affixElement.removeClass("affix");
        }
    };
    $('[data-toggle="affix"]').each(function() {
        var ele = $(this),
            wrapper = $('<div></div>');
        ele.before(wrapper);
        $(window).on('scroll resize', function() {
            toggleAffix(ele, wrapper, $(this));
        });
        // init
        toggleAffix(ele, wrapper, $(window));
    });
});