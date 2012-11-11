/**
 * Unread message counter for the dock.
 * Uses notify_lib to support Prism and Fluid
 */

(function () {

  var count = 0
    , _dockBadge = $.noop;

  // Attempt to detect Prism
  var prism = false;
  try {
    window.platform.icon().badgeText;
    prism = true;
  } catch(e) {}

  if (prism) {
    _dockBadge = function (text) {
      window.platform.icon().badgeText = text + '';
    }
  } else if (window.fluid) {
    _dockBadge = function (text) {
      window.fluid.dockBadge = text + '';
    }
  } else {
    return; // we don't need to bind events
  }

  Talker.client.on("message", function (e) {
    // Don't notify replayed events
    if (e.replay) {
      return;
    }

    if (!Talker.focused) {
      count += 1;
      _dockBadge(count);
    }
  });

  Talker.client.on("focus", function () {
    count = 0;
    _dockBadge('');
  });

}());

