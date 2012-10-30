/**
 * Message box: textarea that allows sending messages
 */

$(function () {

  /**
   * Send as message (single line) or as paste (multiline)
   */
  function _postMessage(msg) {
    if (msg.match(/\n/gim)) {
      // sanitize
      msg = msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');

      Talker.client.emit('paste', {
        message: msg,
        nick: Talker.client.nick,
        channel: Talker.client.channel });
    } else {
      // Trim spaces and run filters
      msg = Talker.client.msg(msg.trim());

      Talker.client.emit('message', {
        message: msg,
        nick: Talker.client.nick,
        channel: Talker.client.channel });
    }
  }

  /**
   * Send message when pressing enter without modifiers
   */
  $(".chat_input textarea").keypress(function (e) {
    if (e.keyCode === 13 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      var $textarea = $(e.target)
        , msg = $textarea.val();

      e.preventDefault();

      if (msg[0] === '/'){
        Talker.client.emit('raw', msg);
      } else if (msg.length) {
        _postMessage(msg);
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
