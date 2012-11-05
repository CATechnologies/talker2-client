/**
 * Presence user list: keeps track of who's in the room
 */

(function () {

  function _removeUser(nick) {
    $('ul.users li[data-user=' + nick + ']').remove();
  }

  function _addUser(nick) {
    _removeUser(nick);

    if (Talker.isBot(nick)) {
      return;
    }

    var $li = $("<li>").text(nick).attr('data-user', nick);
    if (nick === Talker.client.nick) {
      $li.css("font-weight", "bold");
    }
    $('ul.users').append($li);
  }

  function _sortUsers() {
    var $ul = $('ul.users');
    var $lis = $ul.children('li').get();
    $lis.sort(function(a, b) {
      return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    })
    $.each($lis, function(idx, itm) { $ul.append(itm); });
  }

  // When entering a room, list users
  Talker.client.on("names", function (msg) {
    var $users = $("ul.users").empty();
    _(msg.users).each(function (mode, nick) {
      _addUser(nick);
    });

    _sortUsers();
  });

  // Join room
  Talker.client.on("join", function (msg) {
    _addUser(msg.nick);
    _sortUsers();
  });

  // Part room
  Talker.client.on("part", function (msg) {
    _removeUser(msg.nick);
  });

  // Quit
  Talker.client.on("quit", function (msg) {
    _removeUser(msg.nick);
  });

  // Rename user
  Talker.client.on("nick", function (msg) {
    $('ul.users li[data-user=' + msg.old_nick + ']').text(msg.new_nick).attr('data-user', msg.new_nick);
    _sortUsers();
  });

}());
