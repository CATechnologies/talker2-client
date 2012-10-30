/**
 * Auto links URLs in messages
 */

(function () {

  var url_expression = /(https?:\/\/|www\.)[^\s<]*/gi;
  var protocol_expression  = /^(http|https|ftp|ftps|ssh|irc|mms|file|about|mailto|xmpp):\/\//;

  Talker.client.on("log:add", function (e) {
    var content = e.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (content.match(url_expression)) {
      $(e.element).find("span.content").html(content.replace(url_expression, function(locator){
        return '<a href="' 
          +  (!locator.match(protocol_expression) ? 'http://' : '') + locator
          + '" target="_blank">' 
          +   locator 
          + "</a>";
      }));
    }
  });


}());

