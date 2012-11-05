$(function () {

  var nick = "user" + ~~(Math.random() * 1000);
  var channel = "#teambox";
  var server = "talker-bridge.jit.su:80";

  // get channel from url params
  var c = window.location.href.match(/channel=([a-zA-Z0-9]*)/);
  if (c && c[1]){
    channel = '#'+c[1];
  }
  // get server from url params
  var s = window.location.href.match(/server=([a-zA-Z0-9:\.]*)/);
  if (s && s[1]){
    server = s[1];
  }
  // get nick from url params
  var n = window.location.href.match(/nick=([a-zA-Z0-9]*)/);
  if (n && n[1]){
    nick = n[1];
  } else {
    nick = prompt("Choose a nickname for the chat:");
    window.location = window.location + "?nick=" + nick;
  }

  // Start Talker client
  Talker.client.connect(server, channel, nick);

});

