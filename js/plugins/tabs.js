/**
 * Manages channel and conversation tabs
 */

(function () {

  Talker.client.on("join", function (e) {
    if (e.nick === Talker.client.nick) {
      $("ul.channels li").text(e.channel);
    }
  });


}());
