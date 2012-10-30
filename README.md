Talker2 web client
==================

This repo is related a client for [talker2-server](https://github.com/teambox/talker2-server),
an IRC-Socket.io proxy that allows you to use IRC from any web connection.

It's a static repository containing a web client for it.

To run it, simply set up a web server:

    python -m SimpleHTTPServer 1234

You're done. Connect from a URL like this one:

http://localhost:8000/?server=localhost:80&channel=lol&nick=gato/

Configure the values for:

- server: Where is the node.js server hosted? (defaults to talker-bridge.jit.su:80)
- channel: Default channel to join
- nick: Nickname of choice

