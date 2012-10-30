/**
 * Sound notifications for different events
 *
 * Configurable through Talker.sound_notifications.
 */

(function () {

  // Needs better support.. this is only supported in a small % of browsers, but works on Chrome
  function _playSound() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', '/button.mp3');
    audioElement.play();
  }

  Talker.sound_notifications = {
    all_messages: false
  , mentions: true
  , notify_on_focus: true
  };

  Talker.client.on("message", function (e) {
    // If focused and we don't want notify on focus, return
    if (Talker.focus && !Talker.sound_notifications.notify_on_focus) {
      return;
    }

    // Notify according to settings
    if (Talker.sound_notifications.all_messages) {
      _playSound();
    } else if (Talker.sound_notifications.mentions) {
      var regexp = new RegExp('\\b' + Talker.client.nick + '\\b', 'gi');
      if (e.message.match(regexp)) {
        _playSound();
      }
    }
  });

}());
