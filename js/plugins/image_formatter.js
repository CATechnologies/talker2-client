/**
 * Embed images in the log view
 */

(function () {

  var image_expression = /(^https?:\/\/[^\s]+\.(?:gif|png|jpeg|jpg)(\?)*(\d+)*$)/gi;

  /**
   * Receives event from the logger adding a message
   */
  Talker.client.on("log:add", function (e) {
    var image_match = e.content.match(image_expression);

    if (image_match) {
      var $img = $("<img>").attr({ src: image_match[0] })
        , $content = $("<a>").attr({ href: image_match[0], target: "_blank" }).append($img);

      // Replace for linked image once it's loaded, and scroll down
      $img.imagesLoaded(function ($all, $proper, $broken) {
        if ($proper.length) {
          $(e.element).find("span.content").html($content);
          Talker.log.scrollToBottom();
        }
      });
    }
  });

}());
