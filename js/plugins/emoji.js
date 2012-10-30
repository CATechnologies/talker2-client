/**
 * Emoji support in messages
 */

(function () {

  var regex = /:[\w_+]+:/gi;

  Talker.client.on("log:add", function (e) {
    if (e.content.match(regex)) {
      var $p = $(e.element);
      var html = $p.find("span.content").html().replace(regex, function (match) {
        var emoji = match === ':+1:' ? ':plus1:' : match
          , filename = emoji.replace(/:/g, '');

        return "<img class=\"emoji\" title=\"" + emoji + "\" alt=\"" + emoji + "\" height=\"20\" width=\"20\" align=\"absmiddle\" src=\"https://teambox.com/assets/emojis/" + filename + ".png\">";
      });
      var $content = $(html);

      // Replace for image once it's loaded, and scroll down
      $content.imagesLoaded(function ($all, $proper, $broken) {
        if ($proper.length) {
          $p.find("span.content").html(html);
          Talker.log.scrollToBottom();
        }
      });
    }
  });

}());
