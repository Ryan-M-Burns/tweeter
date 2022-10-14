$(document).ready(() => {
  const $form = $(".new-tweet");

  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      const $convTweet = createTweetElement(tweet);
      $(".tweet-cage").prepend($convTweet);
    }

  };


  const createTweetElement = function(tweet) {
    let difference = (Date.now() - tweet.created_at);
    let timeAgo = timeago.format((Date.now() - difference));
    
    let $tweet = ` 
    <article class="tweet">
        <header>
          <span>
            <img src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
          </span>
          <p class="tweeter-tag"><strong>${tweet.user.handle}</strong></p>
        </header>
        <div>${tweet.content.text}</div>
        <footer>
          <p class="timeago">${timeAgo}</p>
          <span>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
      </article>`;

    return $tweet;
  };

  $form.on("reset", (event) => $("#tweet-text").val("").trigger("input"));


  $form.on("submit", (event) => {
    event.preventDefault();
    const dataArray = $form.serializeArray();
    const dataToSend = $form.serialize();
    const dataToText = dataArray[0].value;

    if (!dataToText) {
      return alert("No message!");
    }

    if (dataToText.length > 140) {
      return alert("Too long!!");
    }

    $form.trigger('reset');

    $.post('/tweets', dataToSend, () => loadTweets());

  });


  const loadTweets = () => $.get('/tweets', renderTweets);

  loadTweets();

});