let username;
let password;

const submitSignupForm = function() {
    username = $('#username').val();
    password = $('#token').val();
    $.post(   '/signup',
              { username: username, password: password },
              function(data) {
                  if (typeof data.redirect == 'string')
                      { window.location.href = data.redirect; }
              }
          );
};

const redirectToLogin = function() {
    window.location.href = '/login';
};

$(document).ready(function() {
    $('#username, #token').keypress(function(e) {
        if (e.keyCode == 13) {
            if ($('#init-message-modal').css('display') == 'block')
                { $('#init-message-modal-close-button').click(); }
            else
                { $('#connect').click(); }
        }
    });
});
