/**
 * Highlights messages where I'm mentioned
 */

(function () {

  Talker.client.on("log:add", function (e) {
    var $el = $(e.element)
      , regexp = new RegExp('\\b' + Talker.client.nick + '\\b', 'gi');

    if ($el.hasClass("message") && !$el.hasClass("own") && e.content.match(regexp)) {
      $el.addClass("mention");
    }
  });

}());
