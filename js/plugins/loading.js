/**
 * Disable controls when Talker isn't loaded yet
 */

(function () {

  function _start(msg) {
    $("textarea").attr("disabled", true).addClass("disabled");
    $("textarea").val(msg || "Loading...");
  }

  function _end(msg) {
    $("textarea").attr("disabled", false).removeClass("disabled");
    $("textarea").val("");
  }

  $(function () {
    _start("Not connected");
  });

  Talker.client.on("connect", function () {
    _start("Loading...");
  });

  Talker.client.on("registered", function () {
    _end();
  });

  Talker.client.on("disconnect", function () {
    _start("Disconnected");
  });

}());
