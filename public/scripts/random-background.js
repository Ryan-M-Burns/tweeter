const randomBackground = () => {
  const randomInt = Math.ceil(Math.random() * 24);
  $('html').css("background-image", `url("../images/backgrounds/background${randomInt}.png")`);
};