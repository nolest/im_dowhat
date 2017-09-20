function arrayToString(uarr) {
    var asc_content = String.fromCharCode.apply(null, uarr);
    return decodeURIComponent(escape(asc_content));
}

function readInt32BE(src, pos) {
    var num = src[pos] << 24 | src[pos + 1] << 16 | src[pos + 2] << 8 | src[pos + 3];
    num <<= 0;
    return num;
}

function readInt64BE(src, pos) {
    var num = src[pos] << 56 | src[pos + 1] << 48 | src[pos + 2] << 40 | src[pos + 3] << 32 | src[pos + 4] << 24 | src[pos + 5] << 16 | src[pos + 6] << 8 | src[pos + 7];
    num <<= 0;
    return num;
}

function parseSubscribeAck(granted) {
    var pos = 0;
    var buffer = granted.grantedQos;
    var result = [];

    while (pos < buffer.length) {
        var obj = {};

        // The mqtt protocol.(1 Byte of qos)
        obj.qos = buffer.subarray(pos, pos + 1)[0];
        pos += 1;
        // console.log("qos: ", obj.qos);

        // The poco chat protocol
        // last_peer_seq (8B) + length (4B) + content(length B)
        if (pos + 12 > buffer.length) {
            console.error('poco chat protocol fail.');
            return;
        }
        var last_peer_seq = readInt64BE(buffer, pos);;
        pos += 8;
        // console.log('last_peer_seq: ', last_peer_seq);

        var com_len = readInt32BE(buffer, pos);
        pos += 4;
        // console.log('com_len: ', com_len);

        if (0 === com_len) {
            continue;
        }
        if (pos + com_len > buffer.length) {
            console.error('poco chat protocol fail.');
            return;
        }

        var com_comtent = buffer.subarray(pos, pos + com_len);
        pos += com_len;

        var real_buffer = (new Zlib.Inflate(com_comtent)).decompress();
        var real_pos = 0;
        var msg_count = readInt32BE(real_buffer, real_pos);
        real_pos += 4;
        // console.log('count: ', msg_count);

        obj.messages = [];
        for (var i = 0; i < msg_count; ++i) {
            var real_msg_len = readInt32BE(real_buffer, real_pos);
            real_pos += 4;

            // console.log(real_msg_len);

            var real_content = real_buffer.subarray(real_pos, real_pos + real_msg_len);
            real_pos += real_msg_len;

            // console.log(real_content);
            obj.messages.push(arrayToString(real_content));
        }

        result.push(obj);
    }

    return result;
}

function MqttClient() {
    this.SHA1 = new Hashes.SHA1;

    this.client = null;
    this.is_loggin = false;
    this.hostname;
    this.port;
    this.mqtt_id;
    this.yueyue_id;
    this.password;
}

MqttClient.prototype.login = function(options) {
    var self = this;
    console.log(options);
    function onConnect(context) {
        // Subscribe after connect success.
        self.subscribe(self.yueyue_id);

        // Subscribe only my topic for forceOffline
        self.subscribe(self.mqtt_id);
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("Connection Lost: ", responseObject.errorMessage);
        }

        console.log('Reconnect.');
        self.client.connect({
                           onSuccess: onConnect,
                           keepAliveInterval: 10,
                           userName: self.yueyue_id,
                           password: self.password
                        });
    }

    function onMessageArrived(message) {
        console.log(message.payloadString);
        var msg_data = JSON.parse(message.payloadString);
        // 收到消息后需要主动删除消息，否则下次登录时仍然会收到。
        self.deleteMessage(self.client, msg_data.to + '/' + msg_data.peer, msg_data.peer_seq)
    }

    // Begin login
    if (self.is_loggin) {
        return;
    }
    self.is_loggin = true;

    var identify = options.user_id;

    self.hostname = options.hostname;
    self.port = options.port;
    self.mqtt_id = options.user_type + '/' + identify + '/web/' + Date.now();
    self.yueyue_id = options.user_type + '/' + identify

    self.password = options.password

    self.client = new Paho.MQTT.Client(self.hostname, self.port, self.mqtt_id);
    // set callback handlers
    self.client.onConnectionLost = onConnectionLost;
    self.client.onMessageArrived = onMessageArrived;

    // connect the client
    self.client.connect({
                       onSuccess: onConnect,
                       keepAliveInterval: 10,
                       userName: self.yueyue_id,
                       password: self.password
                    });
}

MqttClient.prototype.deleteMessage = function(client, chat_id, peer_seq) {
    this.client.subscribe('$READPOINT/' + chat_id + ':' + peer_seq);
}

MqttClient.prototype.subscribe = function(topic) {
    var self = this;

    function onSubscribeSuccess(granted) {
        var suback_obj = parseSubscribeAck(granted);
        for (var i = 0; i < suback_obj.length; ++i) {
            if (suback_obj[i].messages) {
                var all_msg = suback_obj[i].messages;
                for (var j = 0; j < all_msg.length; ++j) {
                    console.log(all_msg[j]);
                    var msg_data = JSON.parse(all_msg[j]);
                    // 收到消息后需要主动删除消息，否则下次登录时仍然会收到。
                    self.deleteMessage(self.client, msg_data.to + '/' + msg_data.peer, msg_data.peer_seq);
                }
            }
        }

        console.log("Subscribe: " + topic + " success.");
    }

    self.client.subscribe(topic, {qos: 1, onSuccess: onSubscribeSuccess});
}

MqttClient.prototype.unsubscribe = function(topic) {
    var self = this;

    function onUnSubscribeSuccess() {
        console.log("Unsubscribe: " + topic + " success.");
    }

    self.client.unsubscribe(topic, {onSuccess: onUnSubscribeSuccess});
}

define('mqtt_client', function(require, exports, module) {
    module.exports = MqttClient;
})
