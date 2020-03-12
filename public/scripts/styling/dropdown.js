$(document).ready(function() {

  $('.dropdown-icon-container').on('click', function() {
    var list = $(this).siblings('.dropdown-list');
    if (list.css('display') == 'none') {
      $('#click-stopper').show();
    }
    else {
      $('#click-stopper').hide();
    }
    list.toggle();
  });

  $('#click-stopper').on('click', function() {
    $('.dropdown-list').hide();
    $(this).hide();
  });
});
