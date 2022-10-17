const toggleToTopButton = () => {
  const $toTop = $(".back-to-top");

  if (window.scrollY > 160) {
    return $toTop.css("display", "block");
  }

  $toTop.css("display", "none");
};