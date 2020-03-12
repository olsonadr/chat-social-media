$(document).ready(function() {

    $('.collapse-button-background').each(function() {

        $(this).on("click", function() {

            // find collapsible container parent
            var cont = $(this).parents(".collapsible-container");

            // toggle hiding of collapsing content
            cont.find('.collapse-content-background').slideToggle();

            // toggle chevron on button if present
            if (cont.hasClass('up-down')) {
                $(this).find('.chevron').toggleClass('chevron-top')
                                        .toggleClass('chevron-bottom');
            }
            else if (cont.hasClass('left-right')) {
                $(this).find('.chevron').toggleClass('chevron-left')
                                        .toggleClass('chevron-right');
            }

        });
    });

});
