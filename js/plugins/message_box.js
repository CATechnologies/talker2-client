/**
 * Message box: textarea that allows sending messages
 */

$(function () {

  /**
   * Send as message (single line) or as paste (multiline)
   */
  function _postMessage(to, msg) {
    if (msg.match(/\n/gim)) {
      // sanitize
      msg = msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');

      Talker.client.emit('paste', {
        message: msg,
        nick: Talker.client.nick,
        channel: to });
    } else {
      // Trim spaces and run filters
      msg = Talker.client.msg(msg.trim());

      Talker.client.emit('message', {
        message: msg,
        nick: Talker.client.nick,
        channel: to });
    }
  }

  /**
   * Send message when pressing enter without modifiers
   */
  $(".chat_input textarea").keypress(function (e) {
    if (e.keyCode === 13 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      var $textarea = $(e.target)
        , msg = $textarea.val()
        , command = msg.match(/^\/(\S+)/)
        , parsed;

      e.preventDefault();

      if (command){
        switch (command[1].toLowerCase()) {
          case "msg":
            parsed = msg.match(/^\/(\S+) (\S+) (.*)/);
            if (parsed[2] && parsed[3]) {
              _postMessage(parsed[2], parsed[3]);
            } else {
              alert("Incomplete message");
            }
            break;
          default:
            alert("Command not supported. Someday we'll implement /help.");
        };
      } else if (msg.length) {
        _postMessage(Talker.client.channel, msg);
      }
      $textarea.val('');
    }
  });

  // Focus textarea only if there's no selected text (avoid wrong click event)
  function _focusTextarea () {
    var selection = $(document).getSelectedText() + '';
    if (!selection.length) {
      $("textarea").focus();
    }
  }

  $(".log").mouseup(_focusTextarea);
  Talker.client.on("registered", _focusTextarea);

});
