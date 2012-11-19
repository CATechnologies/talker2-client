/**
 * Jenkins: Fetches build status from Teambox
 */

(function () {

  var $container = $("<div>")
    .addClass("jenkins_status")
    .css({ position: "fixed", "z-index": 1000, right: "20px", top: "1px", opacity: '0.6' });

  function fetchJenkinsStatus() {
    // Note: you can pass ?depth=1, =2 for more data
    $.getJSON("http://ci.teambox.com/api/json?jsonp=?", function (jenkins) {
      $container.empty();
      _(jenkins.jobs).each(function (job) {
        // Filter tb4 jobs only
        if (job.name.match(/tb4/)) {
          var icon = "//teambox.com/assets/emojis/" + (job.color === "red" ? "rage.png" : "green_heart.png")
            , $img = $("<img>")
                        .attr({ src: icon, title: job.name })
                        .css({ width: "16px", height: "16px" });

          $container.append($("<a>").attr({ href: job.url, target: "_blank" }).html($img));
        }
      });
    });
  }

  $(function () {
    $(document.body).append($container);

    fetchJenkinsStatus();
    setInterval(fetchJenkinsStatus, 60 * 1000);
  });

}());

