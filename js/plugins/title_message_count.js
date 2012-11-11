/**
 * Unread message counter for the tab title.
 */

(function () {

  var count = 0
    , originalTitle = document.title;

  Talker.client.on("message", function (e) {
    // Don't notify replayed messages
    if (e.replay) { return; }

    if (!Talker.focused) {
      count += 1;
      document.title = "(" + count + ") " + originalTitle;
    }
  });

  Talker.client.on("focus", function () {
    count = 0;
    document.title = originalTitle;
  });

}());

