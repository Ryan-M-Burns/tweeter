$(() => {

  const $form = $(".new-tweet");
  const $textBox = $("#tweet-text");

  $form.on("reset", () => $("#tweet-text").val("").trigger("input"));  
  $form.on("submit", generateTweets);
  $form.on("submit", () => randomBackground());
  $textBox.focus(() => $("#error-box").slideUp());
  $textBox.on("input", () => composerCharacterCounter());
  $("#error-box").hide();
  $(".back-to-top").on("click", () => $(window).scrollTop(0));
  $(".write-tweet-button").on("click", () => toggleWriteTweet());
  $(window).on('scroll', () => toggleToTopButton());
  

});

