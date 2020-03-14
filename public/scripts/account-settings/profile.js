var backdrop = document.getElementById('modal-backdrop');
var modal = document.getElementById('parental-controls-modal');
var parental_button = document.getElementById('parental-button');
var parent_password = document.getElementById('parental-password-input');
var nsfw_allow = document.getElementById('nsfw-allow');
var modalcancel = document.getElementById('modal-cancel');
var modalclose = document.getElementById('modal-close');
var save = document.getElementById('modal-accept');

function remove(){
  // console.log(parent_password);

  parent_password.value = '';
}

function hide(){
  remove();
  backdrop.classList.toggle('hidden');
  modal.classList.toggle('hidden');
}

function unhide(){
  backdrop.classList.toggle('hidden');
  modal.classList.toggle('hidden');
}

function parameters(){

 if(nsfw_allow.checked === true) {
   nsfw_allow.value = 'NSFW Content is Enabled';
 }
 else {
   nsfw_allow.value = 'NSFW Content is Disabled'
 }
 return true;
}

function save_settings(){
var temp;
// nothing yet
}

parental_button.addEventListener('click', function(event){
  unhide();
})
modalclose.addEventListener('click', function(event){
  hide();
})
modalcancel.addEventListener('click', function(event){
  hide();
})
save.addEventListener('click', function(event){
  // console.log('wow');
 if(parameters()){
   save_settings();
   //code from here to next comment is server part

   // post new post to the server
   $.post(   '/profile',
             {
               nsfw_allow: nsfw_allow.value,
               password:  parent_password.value
             }
         );

   // var postRequest = new XMLHttpRequest();
   // var requestURL = '/save_settings';
   // postRequest.open('POST', requestURL);
   // var requestBody = JSON.stringify({
   //   nsfw_allow: nsfw_allow.value,
   // });
   // postRequest.setRequestHeader('Content-Type', 'application/json');
   // postRequest.addEventListener('load', function (event) {
   // });

   // postRequest.send(requestBody);
   // console.log('sent to database');
   //End of server part
   hide();
 }
 else{
   window.alert();
 }
})
