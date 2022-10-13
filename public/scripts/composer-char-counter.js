$(document).ready(function() {
  
  $('#tweet-text').keyup(function() {
    let charCounter = $(this).val().length;
    let counterVal = 140;
    let currentChar = counterVal - charCounter;

    $('.counter').text(currentChar);

    if (currentChar < 0) {
      $(".counter").addClass("charLimit");
    } else {
      $(".counter").removeClass("charLimit");
    }
    
});

});