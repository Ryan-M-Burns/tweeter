const composerCharacterCounter = () => {
  const $counter = $(".counter");
  let count = 140 - $("#tweet-text").val().length;

  if (count < 0) {
    $counter.css({ color: 'red' });
  } else {
    $counter.css({ color: "rgb(84, 81, 73)" });
  }

  $counter.text(count);
};

const toggleWriteTweet = () => {
  $(".new-tweet").toggle(400);
  $("textarea").focus();
};