$(document).ready(() => {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      const $convTweet = createTweetElement(tweet);
      $(".tweet-cage").prepend($convTweet);
    }

  };

  const createTweetElement = function(tweet) {
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
          <p>${tweet.created_at}</p>
          <span>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
      </article>`;

    return $tweet;
  };

  renderTweets(data);

});