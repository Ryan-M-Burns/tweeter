$(() => {
  const textArea = $("#tweet-text");
  const $counter = $(".counter");

  textArea.on("input", () => {
    let count = 140 - textArea.val().length;

    if (count < 0) {
      $counter.css({ color: 'red' });
    } else {
      $counter.css({ color: "rgb(84, 81, 73)" });
    }

    $counter.text(count);
  });

});