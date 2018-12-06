/*JS file*/

//show or unshow the other-title text field
$(document).ready(function() {
  $("#title").change(function(){
    if( $('#title').val() == "other"){
      $('#other-title').slideDown();
    } else {
      $('#other-title').slideUp();
    }
  })

  //show or unshow certain colors depending on chosen shirt design
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

  //Register for Activities section
  let totalCost = 0;
  $('.totalCost').hide();
  $('.activities input').change(function(){

    //cost logic
    if ( $(this).prop('checked') ){
      totalCost += parseInt( $(this).val() );
    } else {
      totalCost -= parseInt( $(this).val() );
    }
    if (totalCost != 0){
      $('.totalCost').text(`Total Cost: $ ${totalCost}`).slideDown();
    } else {
      $('.totalCost').slideUp();
    }

    //competing logic
    checkActivity('js-frameworks','express');
    checkActivity('express','js-frameworks');
    checkActivity('js-libs','node');
    checkActivity('node','js-libs');
  })

  //competing activities function
  function checkActivity(checked,disable){
    if ( $(`input[name="${checked}"]`).prop('checked') ){
      $(`input[name="${disable}"]`).parent().addClass('disabled');
      $(`input[name="${disable}"]`).attr('disabled',true);
    } else {
      $(`input[name="${disable}"]`).parent().removeClass('disabled');
      $(`input[name="${disable}"]`).attr('disabled',null);
    }
  }

})
