$(() => {
  // Set default state
  $("#error-box").hide();

  const $form = $(".new-tweet");

  $form.on("reset", () => $("#tweet-text").val("").trigger("input"));


  $(".write-tweet-button").on("click", () => {
    $(".new-tweet").toggle(400);
    $("textarea").focus();
  });

  $(window).on('scroll', () => { toggleToTopButton(); });

  $(".back-to-top").on("click", () => { $(window).scrollTop(0); });

  // Prepend new tweet to the existing tweets if legal tweet
  $form.on("submit", (event) => {
    
    event.preventDefault();

    const dataArray = $form.serializeArray();
    const dataToSend = $form.serialize();
    const dataToText = dataArray[0].value;

    if (!isIllegalTweet(dataToText)) {
      $form.trigger('reset');

      $.post('/tweets', dataToSend, () => loadTweets());
    }
  });

  // hides error message when tweet text box selected
  $("#tweet-text").focus(() => $("#error-box").slideUp());

});

// Helper Functions

// Verify tweet is not empty and at or below 140 characters
const isIllegalTweet = (tweet) => {
  const $errorBox = $("#error-box");

  if (!tweet) {
    $errorBox.text("🦤 Don't you have more to say? 🦤").slideDown();
    return true;
  }

  if (tweet.length > 140) {
    $errorBox.text("📖 Leave the Odysseys to Homer! 📖").slideDown();
    return true;
  }

  return false;
};

// toggle show/hide status of return to top button
const toggleToTopButton = () => {
  const $toTop = $(".back-to-top");

  if (window.scrollY > 160) {
    return $toTop.css("display", "block");
  }

  $toTop.css("display", "none");
};


const renderTweets = (tweets) => {
  const $tweetArea = $(".tweet-cage");
  $tweetArea.empty();
  $('html').css("background-image", randomBackground());

  for (let tweet of tweets) {
    const $convTweet = createTweetElement(tweet);
    $tweetArea.prepend($convTweet.tweetText);
    $("#safe-text").text($convTweet.unsafeText);
  }

};


const randomBackground = () => {

  const randomInt = Math.ceil(Math.random() * 24);
  return `url("../images/backgrounds/background${randomInt}.png")`;

};

const createTweetElement = (tweet) => {
  let difference = (Date.now() - tweet.created_at);
  let timeAgo = timeago.format((Date.now() - difference));
  let unsafeText = tweet.content.text;
  let $tweet = ` 
  <article class="tweet">
    <header>
      <span>
        <img src="${tweet.user.avatars}">
        <p>${tweet.user.name}</p>
      </span>
      <p class="tweeter-tag"><strong>${tweet.user.handle}</strong></p>
    </header>
      <div id="safe-text"></div>
    <footer>
      <p class="timeago">${timeAgo}</p>
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>`;

  return {
    tweetText: $tweet,
    unsafeText: unsafeText
  };

};

const loadTweets = () => $.get('/tweets', renderTweets);

loadTweets();