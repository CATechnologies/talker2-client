/**
 * Autocomplete user nicks when typing "@"
 */

(function () {

  function bindAutocompleter() {
    $("textarea").autocompleter("@", function () {
      return _($("ul.users li").map(function (i, e) {
        return $(e).text();
      })).reject(function (nick) {
        return nick === Talker.client.nick;
      });
    });
  }

  $(bindAutocompleter);


}());
