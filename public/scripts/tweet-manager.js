// Prepend new tweet to the existing tweets if legal tweet
const generateTweets = (event) => {
  event.preventDefault();

  const $form = $(".new-tweet");
  const dataArray = $form.serializeArray();
  const dataToSend = $form.serialize();
  const dataToText = dataArray[0].value;

  if (!isIllegalTweet(dataToText)) {
    $form.trigger('reset');
    $.post('/tweets', dataToSend, () => loadTweets());
  }

};


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


const renderTweets = (tweets) => {
  const $tweetArea = $(".tweet-cage");

  $tweetArea.empty();

  for (let tweet of tweets) {
    const $convTweet = createTweetElement(tweet);

    $tweetArea.prepend($convTweet.tweetText);
    $("#safe-text").text($convTweet.unsafeText);
  }

};


// generates HTML for tweet
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