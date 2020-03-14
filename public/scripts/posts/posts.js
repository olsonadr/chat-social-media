var backdrop = document.getElementById('modal-backdrop');
var modal = document.getElementById('post-content-modal');
var addpost = document.getElementById('make-post-button');
var title_input = document.getElementById('title-input');
var group_input = document.getElementById('group-input');
var body_input = document.getElementById('body-input');
var url = document.getElementById('image-input');
var image = document.getElementById('file-input');
var nsfw = document.getElementById('nsfw');
var modalcancel = document.getElementById('modal-cancel');
var modalclose = document.getElementById('modal-close');
var makepost = document.getElementById('modal-accept');
var posts = document.getElementsByClassName('post');
var usefile;

$(document).ready(function() {
  $('.post-popup-container').hide();

  $('.post').mouseenter(function() {
      $(this).children('.post-popup-container').show();
  });

  $('.post').mouseleave(function() {
      $(this).children('.post-popup-container').hide();
  });

  $('.post').click(function(event) {
      var title = $(this).find('.post-title');
      if (!$(event.target).is(title) && !$(event.target).is($('.post-popup-container-secret-background'))) {
        title.trigger("click");
      };
  });

  $('.post-title').click(function() {
      window.location.href = $(this).attr('href');
  });
});



function remove(){
  url.value = group_input.value = title_input.value = body_input.value = image.src = '';
  nsfw.checked = false;
}

function hide(){
  remove();
  backdrop.classList.toggle('hidden');
  modal.classList.toggle('hidden');
}

var loadFile = function(event) {
	image.src = URL.createObjectURL(event.target.files[0]);
};


function unhide(){
  backdrop.classList.toggle('hidden');
  modal.classList.toggle('hidden');
}

function parameters(){
 if (group_input.value=='' || body_input.value =='' || (url.value=='' && image.src=='')|| title_input.value==''){
   return false;
 }
 if (url.value!= '') {
  image.src = url.value
 }
 if (nsfw.checked === true) {
   nsfw.value = 'Tagged as NSFW';
 }
 else {
   nsfw.value = ''
 }
 return true;
}

function createpost(){
  var temp;
  var newnode = posts[posts.length-1].cloneNode(true);
  temp = newnode.getElementsByClassName('post-title');
  temp[0].textContent = title_input.value;
  temp = newnode.getElementsByClassName('post-group');
  temp[0].textContent = group_input.value;
  temp = newnode.getElementsByClassName('post-body');
  temp[0].textContent = body_input.value;
  temp = newnode.getElementsByClassName('post-image');
  temp[0].setAttribute('src', image.src);
  temp = newnode.getElementsByClassName('nsfw-tag');
  temp[0].textContent = nsfw.value;
  posts[0].parentNode.appendChild(newnode);
}

addpost.addEventListener('click', function(event){
  unhide();
});
modalclose.addEventListener('click', function(event){
  hide();
});
modalcancel.addEventListener('click', function(event){
  hide();
});
makepost.addEventListener('click', function(event){
 if(parameters()){
   // createpost();

   // post new post to the server
   $.post(   '/add-post',
             { title: title_input.value,
               group: group_input.value,
               bodytext: body_input.value,
               url:image.src,
               nsfw: nsfw.value },
             function(data) {
               if (typeof data.redirect == 'string') {
                     if (data.redirect == 'please refresh') { location.reload(); }
                     else { window.location.href = data.redirect; }
                   }
             }
         );

   // hide the makepost modal
   hide();

 }
 else{
   window.alert('All parameters must be filled!');
 }
});
