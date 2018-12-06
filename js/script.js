/*JS file*/
$(document).ready(function() {
  $("#title").change(function(){
    if( $('#title').val() == "other"){
      $('#other-title').slideDown();
    } else {
      $('#other-title').slideUp();
    }
  })

  $("#design").change(function(){
    if( $('#design').val() == "js puns" ){
      $('#color option').hide();
      $('#color option').attr('selected',null);
      
      $('#color option:contains("JS Puns shirt only")').show();
      $("#color option[value*='cornflowerblue']").attr('selected','true');

    } else if( $('#design').val() == "heart js" ) {

      $('#color option').hide();
      $('#color option').attr('selected',null);

      $('#color option:contains("JS shirt only")').show();
      $("#color option[value*='tomato']").attr('selected','true');

    } else {

      $('#color option').show();

    }
  })
})
