/**
 * Embed GIF web animations from screamcasts.com
 */

(function () {

  var image_expression = /(^https?:\/\/screamcasts.com[^\s]+\.gif$)/gi;

  /**
   * Receives event from the logger adding a message
   */
  Talker.client.on("log:add", function (e) {
    var image_match = e.content.match(image_expression);

    if (image_match) {
      $(e.element).find("span.content").html("<img src='" + image_match[0] + "' style='width:100px; height:100px;'>");
      Talker.log.scrollToBottom();
    }
  });

}());

