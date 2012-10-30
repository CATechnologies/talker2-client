/**
 * Adds special styles for pastes
 *
 * When sending a paste, we display it locally and we add the styles.
 * The server then saves the original paste and broadcasts a regular
 * chat message linking it.
 *
 * When receiving one, we detect the regex and we ask the server for
 * the original paste command.
 */

(function () {

  /**
   * Detect if we have a special paste embed command
   */
  var paste_embed_regex = /^\[paste-(\d+)\]$/;
  Talker.client.on("log:add", function (e) {
    var match = e.content.match(paste_embed_regex)
      , $el = $(e.element);

    if (match) {
      // Mark this element, and request the full paste from server
      $el.attr("data-paste", match[1]).find("span.content").text("Loading paste...");
      Talker.client.emit("load_paste", match[1]);
      Talker.log.scrollToBottom();
    }
  });

  /**
   * Receive load_paste event, which we requested before
   */
  Talker.client.on("load_paste", function (e) {
    // Sanitize
    var msg = e.message.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    $(".log p[data-paste=" + e.id + "]").addClass("paste")
      .find("span.content").html("<pre>" + msg + "</pre>");

    Talker.log.scrollToBottom();
  });

  /**
   * Format my own pastes, which are added to the logger directly
   */
  Talker.client.on("log:add", function (e) {
    var $el = $(e.element);

    if ($el.hasClass("paste")) {
      $el.find(".content").html($("<pre>").text(e.content));
      Talker.log.scrollToBottom();
    }
  });

}());
