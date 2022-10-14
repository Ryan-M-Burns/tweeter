$(document).ready(() => {
  const $form = $(".new-tweet");

  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      const $convTweet = createTweetElement(tweet);
      $(".tweet-cage").prepend($convTweet.tweetText);
      $("#safe-text").text($convTweet.unsafeText);
    }

  };


  const createTweetElement = function(tweet) {
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

  $form.on("reset", (event) => $("#tweet-text").val("").trigger("input"));


  $form.on("submit", (event) => {
    event.preventDefault();
    const dataArray = $form.serializeArray();
    const dataToSend = $form.serialize();
    const dataToText = dataArray[0].value;
    const $errorBox = $("#error-box");


    if (!dataToText) {
      return $errorBox.text("Don't you have more to say?").slideDown();
    }

    if (dataToText.length > 140) {
      return $errorBox.text("Leave the Odysseys to Homer!").slideDown();
    }

    $form.trigger('reset');

    $.post('/tweets', dataToSend, () => loadTweets());

  });

  $("#tweet-text").focus(() => $("#error-box").slideUp());

  const loadTweets = () => $.get('/tweets', renderTweets);

  loadTweets();

});