/*JS file*/
$(document).ready(function() {
  $("#title").change(function(){
    if( $('#title').val()=="other"){
      $('#other-title').slideDown();
    } else {
      $('#other-title').slideUp();
    }
  })
})
