(function () {

  Talker = {};

  Talker.client = {};

  /**
   * Connect the Talker client to the given server, channel and nick.
   *
   * Nick might change to to collissions.
   */
  Talker.client.connect = function (server, channel, nick) {
    var socket = io.connect('http://' + server);

    _(Talker.client).extend({ socket: socket, server: server, channel: channel, nick: nick });

    // These are the IRC listeners we'll be paying attention to.
    //
    // Whenever we receive an event of this type, it'll be broadcasted
    // in JS with Talker.client.trigger
    var listeners = ["ready", "registered", "message", "join", "part", "names", "quit", "nick", "notice",
        "recent_messages", "load_paste"];

    // Add all listeners
    _(listeners).each(function (l) {
      socket.on(l, function (evt) {
        Talker.client.trigger(l, evt);
      });
    });

    // Connect to server, and request IRC connection
    socket.on('connect', function () {
      Talker.client.trigger("connect");
    });

    // Connect to server, and request IRC connection
    socket.on('registered', function (e) {
      Talker.client.nick = e.nick;
    });

    socket.on('ready', function () {
      socket.emit('init', { nick: nick, channel: channel });
    });

    // Lost socket connection
    socket.on('disconnect', function (e) {
      console.log("Lost socket connection!", e);
      Talker.client.trigger("disconnect");
    });
  };


  /**
   * EVENTS
   */

  /**
   * Send a message to the IRC proxy
   */
  Talker.client.emit = function (type, msg) {
    Talker.client.socket.emit(type, msg);
    Talker.client.trigger("send:" + type, msg);
  };

  /**
   * Bind a specific client-side event
   */
  Talker.client.on = function (type, callback) {
    $(Talker.client).on("talker:" + type, function (evt, msg) {
      callback(msg);
    });
  };

  /**
   * Unbind all events of the given type
   */
  Talker.client.off = function (type) {
    $(Talker.client).off("talker:" + type);
  };

  /**
   * Trigger an event
   */
  Talker.client.trigger = function (type, event) {
    $(Talker.client).trigger("talker:" + type, event);
  };

  /**
   * Holds the list of before_send functions
   * @type {Array}
   */
  var before_send = [];

  /**
   * Adds a function to the before_send chain
   * @param  {Function} op must be non-blobking
   */
  Talker.client.before_send = function (op){
    before_send.push(op);
  };

  /**
   * Runs the before_send chain, and returns the new msg string
   * @param  {String} msg
   * @return {String} new_msg
   */
  Talker.client.msg = function (msg){
    var final_msg = msg;
    _(before_send).each(function (m){
      final_msg = m(final_msg);
    });
    return final_msg;
  };

}());
