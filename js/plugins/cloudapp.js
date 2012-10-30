/**
 * Embed cloudapp images
 */

(function () {

  var image_expression = /(^https?:\/\/cl.ly\/image\/(\S+)$)/gi;

  /**
   * Receives event from the logger adding a message
   */
  Talker.client.on("log:add", function (e) {
    var image_match = e.content.match(image_expression);

    if (image_match) {
      var url = image_match[0] + "/content"
        , $img = $("<img>").attr({ src: url })
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
