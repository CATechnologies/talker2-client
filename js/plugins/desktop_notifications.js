/**
 * Desktop notifications for different events
 *
 * Configurable through Talker.sound_notifications.
 *
 * TODO: Untested for Fluid, Prism and Growler
 */

(function () {

  Talker.desktop_notifications = {
    all_messages: false
  , mentions: true
  , notify_on_focus: false
  };

  // Growler support
  if (navigator.userAgent.indexOf('Safari') !== -1) {
    if (!window.fluid) { //this isn't Fluid
      //check if Growler plug-in is installed
      for(var i=0, growler = false;i<navigator.plugins.length;i++){
        if(navigator.plugins[i].name === 'Growler'){
          window.addEventListener('load', function(){
            var e = document.createElement('embed');
            e.type = 'application/x-growl';
            e.name = 'Growler'; 
            e.width = '0'; 
            e.height = '0';
            document.body.appendChild(e);
          }, true);
          break;
        }
      }
    }
  }

  // Platform support
  var prism = !!(window.platform && window.platform.showNotification) //this is Firefox/Prism
    , fluid = !!(window.fluid || document.embeds.Growler) // this is WebKit/Fluid
    , growler = !!(document.embeds.Growler || window.growler)
    , webkit = window.webkitNotifications;

  // Constants for Webkit permissions
  var PERMISSION_ALLOWED = 0
    , PERMISSION_NOT_ALLOWED = 1
    , PERMISSION_DENIED = 2; // we should handle this and explain how to re-enable

  // Needs better support.. this is only supported in a small % of browsers, but works on Chrome
  function _notify(e) {
    var message = e.nick + ': ' + e.message
      , icon = "http://" + location.host + "/images/favicon.ico"; 

    // Chrome notifications
    if (webkit) {
      if (window.webkitNotifications.checkPermission() === PERMISSION_ALLOWED) {
        var notif = window.webkitNotifications.createNotification(icon, Talker.client.channel, message);

        notif.onclick = function() { window.focus(); this.cancel(); };
        notif.show(); 
        setTimeout(function () { notif.close(); }, 2000);
      }
    } else if (prism) {
      window.platform.showNotification(Talker.client.channel, message, args.icon);
    } else if (fluid) {
      fluid.showGrowlNotification({
        title: Talker.client.channel
      , description: message
      , icon: icon
      });
    }
  }

  Talker.client.on("message", function (e) {
    // If focused and we don't want notify on focus, return
    if (Talker.focused && !Talker.desktop_notifications.notify_on_focus) {
      return;
    }

    // Don't notify replayed events
    if (e.replay) {
      return;
    }

    // Notify according to settings
    if (Talker.desktop_notifications.all_messages) {
      _notify(e);
    } else if (Talker.desktop_notifications.mentions) {
      var regexp = new RegExp('\\b' + Talker.client.nick + '\\b', 'gi');
      if (e.message.match(regexp)) {
        _notify(e);
      }
    }
  });

  // Request permissions when clicking anywhere. We need a user initiated action.
  $(document).click(function () {
    if (webkit && window.webkitNotifications.checkPermission() !== PERMISSION_ALLOWED) {
      window.webkitNotifications.requestPermission($.noop);
    }
  });

}());
