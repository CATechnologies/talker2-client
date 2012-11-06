/**
 * Fetch recent messages for each channel we enter
 */

(function () {

  Talker.client.on("join", function (e) {
    // TODO: It doesn't work if you receive a different nick
    if (e.nick === Talker.client.nick && !e.replay) {
      Talker.client.emit("get_recent_messages", e.channel);
      Talker.log.log("", "Loading messages...", "status loading");
    }
  });

  Talker.client.on("recent_messages", function (e) {
    // Avoid double logging "join"
    var $p = $(Talker.log.lastEvent.element);
    if ($p.hasClass("join")) {
      $p.remove();
    }

    // Remove loading message
    $(".log p.status.loading").remove();

    // TODO: Insert replayed messages where the "loading" message is

    // Replay all messages
    _(e.messages).each(function (message) {
      if (message.type === "message") {
        if (message.nick === Talker.client.nick) {
          Talker.client.trigger("send:message", message.data);
        } else {
          Talker.client.trigger("message", message.data);
        }
      } else if (message.type === "join") {
        // mark 'replay = true' to avoid re-fetching recent messages
        message.data.replay = true;
        Talker.client.trigger("join", message.data);
      } else if (message.type === "part") {
        Talker.client.trigger("part", message.data);
      }
    });

  });



}());
