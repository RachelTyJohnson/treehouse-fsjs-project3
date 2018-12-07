/*JS file*/
$(document).ready(function() {

  //****************************************************
  //page load stuff (hide stuff with JS)
  $('#other-title').hide();
  $('.payment-pp').hide();
  $('.payment-btc').hide();
  $('.totalCost').hide();
  $('#colors-js-puns').hide();

  //****************************************************
  //show or unshow the other-title text field
  $("#title").change(function(){
    if( $('#title').val() == "other"){
      $('#other-title').slideDown();
    } else {
      $('#other-title').slideUp();
    }
  })

  //****************************************************
  //show or unshow certain colors depending on chosen shirt design
  $("#design").change(function(){
    if( $('#design').val() !== "selectthem" ){
      $('#colors-js-puns').show();
    }
    if( $('#design').val() == "js puns" ){
      $('#color option').hide();
      $('#color option').prop('selected',null);
      $('#color option:contains("JS Puns shirt only")').show();
      $("#color option[value*='cornflowerblue']").prop('selected','true');
    } else if( $('#design').val() == "heart js" ) {
      $('#color option').hide();
      $('#color option').prop('selected',null);
      $('#color option:contains("JS shirt only")').show();
      $("#color option[value*='tomato']").prop('selected','true');
    } else {
      $('#color option').show();
    }
  })

  //****************************************************
  //Register for Activities section


  let totalCost = 0;
  $('.activities input').change(function(){

    //cost logic
    $(this).prop('checked') ? totalCost += parseInt( $(this).val() ) : totalCost -= parseInt( $(this).val() );
    totalCost != 0 ? $('.totalCost').text(`Total Cost: $ ${totalCost}`).slideDown() : $('.totalCost').slideUp();

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
      $(`input[name="${disable}"]`).prop('disabled',true);
    } else {
      $(`input[name="${disable}"]`).parent().removeClass('disabled');
      $(`input[name="${disable}"]`).prop('disabled',null);
    }
  }

  //****************************************************
  //Payment Info section
  $("#payment").change(function(){
    if ($(this).val()=="credit card"){
      $('.payment').slideUp();
      $('.payment-cc').slideDown();
    } else if ($(this).val()=="paypal"){
      $('.payment').slideUp();
      $('.payment-pp').slideDown();
    } else {
      $('.payment').slideUp();
      $('.payment-btc').slideDown();
    }
  })

  //*****************************
  // Form Validation
  $('button[type="submit"]').click(function(e){
    let allGood = true;
    allGood *= validateName();
    allGood *= validateEmail();
    allGood *= validateActivities();
    allGood *= validateCC();
    allGood *= validateZIP();
    allGood *= validateCVV();
    if (!allGood) {
      e.preventDefault();
    }
  });

  $('#name').keyup(validateName);
  $('#mail').keyup(validateEmail);
  $('#cc-num').keyup(validateCC);
  $('#zip').keyup(validateZIP);
  $('#cvv').keyup(validateCVV);

})


//****************************************************
//Form Validation Functions

//check name functions
function validateName(){
  let result = /[a-z]+/i.test( $('#name').val() )
  if (!result){
    $('#name').addClass('error');
    $('#name').prev().text("Please enter a name").show();
  } else {
    $('#name').removeClass('error');
    $('#name').prev().hide();
  }
  return result;
}

//check email function
function validateEmail(){
  $('#mail').val($('#mail').val().toLowerCase());
  let result = /^[^@]+@[^@.]+\.[a-z]+$/i.test( $('#mail').val() );
  if (!result){
    $('#mail').addClass('error');
    $('#mail').prev().text("Please enter a valid email").show();
  } else {
    $('#mail').removeClass('error');
    $('#mail').prev().hide();
  }
  return result;
}

//check activities functions
function validateActivities(){
  if ($("form input:checkbox:checked").length > 0){
    $('.activities legend').removeClass('error-text');
    $('.activities .tooltip').hide();
    return true;
  } else {
    $('.activities legend').addClass('error-text');
    $('.activities .tooltip').text("Please choose at least one Activity").show();
    return false;
  }
}

//check CC number
function validateCC(){
  if ($('#payment').val() == "credit card"){
    let result = /^\d{13,16}$/.test($('#cc-num').val());
    if (!result){
      $('#cc-num').addClass('error');
      if ($('#cc-num').val() == ""){
        $('#cc-num').next().text("Please enter a CC Number").show();
      } else {
        $('#cc-num').next().text("Please enter a number that is 13-16 digits long").show();
      }
      return false;
    } else {
      $('#cc-num').removeClass('error');
      $('#cc-num').next().hide();
      return true;
    }
  }
  return true;
}

//check ZIP
function validateZIP(){
  if ($('#payment').val() == "credit card"){
    let result = /^\d{5}$/.test($('#zip').val());
    if (!result){
      $('#zip').addClass('error');
      $('#zip').next().text("Please enter a valid ZIP").show();
      return false;
    } else {
      $('#zip').removeClass('error');
      $('#zip').next().hide();
      return true;
    }
  }
  return true;
}

//check CVV
function validateCVV(){
  if ($('#payment').val() == "credit card"){
    let result = /^\d{3}$/.test($('#cvv').val());
    if (!result){
      $('#cvv').addClass('error');
      $('#cvv').next().text("Please enter a valid CVV").show();
      return false;
    } else {
      $('#cvv').removeClass('error');
      $('#cvv').next().hide();
      return true;
    }
  }
  return true;
}
