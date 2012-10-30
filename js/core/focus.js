(function() {

  $(window).focus(function () {
    Talker.focused = true;
    Talker.client.trigger("focus");
  });

  $(window).blur(function () {
    Talker.focused = false;
    Talker.client.trigger("blur");
  });

  Talker.focused = true;

}());
