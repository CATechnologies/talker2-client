(function () {

  Talker.isBot = function (nick) {
    return nick === "teambox" || nick === "github";
  };

}());
