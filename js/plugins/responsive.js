/**
 * Sets the responsive mode if screen is under 450px wide
 */

(function () {

  function _controlSidebarVisibility() {
    if ($(window).width() < 450) {
      $('body').addClass("thin");
    } else {
      $('body').removeClass("thin");
    }
  }

  $(window).resize(_controlSidebarVisibility);
  $(_controlSidebarVisibility);

}());
