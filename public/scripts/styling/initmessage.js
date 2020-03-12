// Show initial message modal
if ($('#init-message-modal-text').text() != '') {
    $('#init-message-modal').css('display', 'block');
}

// Setup modal close cases
$('#init-message-modal-close-button').on('click', closeInitMessageModal);
$('#init-message-modal').on('click', closeInitMessageModal);

// Stop clicking on modal container from closing
$('#init-message-modal .modal-container')
        .on("click", function(ev) { ev.stopPropagation(); }, false);

// Close modal function
function closeInitMessageModal() {
    $('#init-message-modal').css('display', '');
}
