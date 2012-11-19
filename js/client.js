$(function () {

  var config = { nick: "user" + ~~(Math.random() * 1000)
               , channel: "#teambox"
               , server: "talker-bridge.jit.su:80"
               };

  // get channel from url params
  var c = window.location.href.match(/channel=([a-zA-Z0-9]*)/);
  if (c && c[1]){
    config.channel = '#'+c[1];
  }
  // get server from url params
  var s = window.location.href.match(/server=([a-zA-Z0-9:\.]*)/);
  if (s && s[1]){
    config.server = s[1];
  }
  // get nick from url params
  var n = window.location.href.match(/nick=([a-zA-Z0-9]*)/);
  if (n && n[1]){
    config.nick = n[1];
  } else {
    config.nick = prompt("Choose a nickname for the chat:") || config.nick;
    console.log((window.location.href + "&nick=" + config.nick).replace(/\/&/, "?"));
    window.location = (window.location.href + "&nick=" + config.nick).replace(/\/&/, "?");
  }

  // Start Talker client
  Talker.client.connect(config.server, config.channel, config.nick);

});

