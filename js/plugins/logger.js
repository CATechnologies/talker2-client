/**
 * Logger: Displays events and messages in main message pane
 */

(function () {

  var Log = {
    log: function (nick, msg, css_class) {
      var $nick = $("<span class='nick'>").text(nick)
        , $content = $("<span class='content'>").text(msg)
        , $p = $("<p>").append($nick).append($content).addClass(css_class).attr({ 'data-nick': nick });

      $(".log").append($p);
      this.lastEvent = $p;

      Log.scrollToBottom();

      Talker.client.trigger("log:add", { element: $p, content: msg, nick: nick });
    },
    scrollToBottom: function () {
      $(".log").scrollTop($(".log").height() + 10000000);
    }
  };

  Talker.log = Log;

  Talker.client.on("ready", function () {
    Log.log("***", "connecting to " + Talker.client.server + "...", "server");
  });

  Talker.client.on("registered", function () {
    Log.log("***", "connected!", "server");
  });

  Talker.client.on("notice", function (e) {
    if (e.to === "AUTH" || !e.nick || e.nick === Talker.client.nick || !e.text) {
      return;
    }
    Log.log(e.nick || e.to, e.text, "server");
  });

  Talker.client.on("send:message", function (e) {
    if (e.channel.match(/^#/)) {
      // Post to channel
      Log.log(Talker.client.nick, e.message, "own message");
    } else {
      // Private message
      Log.log(Talker.client.nick, "private to " + e.channel + ": " + e.message, "own message private");
    }
  });

  Talker.client.on("message", function (e) {
    if (e.destination === Talker.client.nick && e.nick !== Talker.client.nick) {
      // Private message
      Log.log(Talker.client.nick, "private from " + e.nick + ": " + e.message, "message private");
    } else {
      // Post to channel
      Log.log(e.nick, e.message, "message");
    }
  });

  Talker.client.on("send:paste", function (e) {
    Log.log(e.nick, e.message, "own message paste");
  });

  Talker.client.on("paste", function (e) {
    Log.log(e.nick, e.message, "message paste");
  });

  Talker.client.on("join", function (e) {
    if (!Talker.isBot(e.nick)) {
      Log.log("", e.nick + " joined the room", "status join");
    }
  });

  Talker.client.on("part", function (e) {
    if (!Talker.isBot(e.nick)) {
      Log.log("", e.nick + " left the room", "status part");
    }
  });

  Talker.client.on("quit", function (e) {
    if (e.nick !== "teambot" && e.nick !== "github") {
      Log.log("", e.nick + " quit the chat", "status quit");
    }
  });

  Talker.client.on("nick", function (e) {
    Log.log("", e.old_nick + " changes username to " + e.new_nick, "status nick");
  });

  /**
   * Compact bubbles if the previous message is from the same user
   */
  Talker.client.on("log:add", function (e) {
    // If it's the same author as last message, mark it so we don't duplicate nicks
    var $p = $(e.element)
      , $prev = $p.prev("p");

    if ($p.hasClass("message") && $prev.hasClass("message") && ($prev.attr("data-nick") === $p.attr("data-nick"))) {
      $prev.addClass("continued");
      $p.addClass("continuation");
    }
  });

  // Scroll to bottom after resizing window
  $(window).resize(_.debounce(Log.scrollToBottom, 300));

}());
