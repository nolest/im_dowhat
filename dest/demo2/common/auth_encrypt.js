var project_list = {
    'sns-circle': {
        ak: '55795e42e2bac8416b6a50de67a1ee5833bf9ae6',
        sk: '4257b89d44355afffeb8404659b1bb45ed7efa71'
    },

    'facechat': {
        ak: '035655670287ef24269b5d82833ee536724e4e14',
        sk: '7a349073ac18466b310d7db788839418d8ff22a5'
    },

    'supe': {
        ak: '0bd9720edd3e2afebaa1666c3d76080e219a26a7',
        sk: '11f6d3e7552d088a0862013faf80d67e836729bf'
    }
}

function AuthEncrypt(project) {
    if (!project_list[project]) {
        throw 'Project name out of range.'
    }

    this.SHA1 = new Hashes.SHA1;
    this.project_setting = project_list[project];
}

AuthEncrypt.getProjects = function () {
    var result = [];
    for (var key in project_list) {
        result.push(key);
    }

    return result;
}

AuthEncrypt.prototype.toUri = function(origin_uri, identify) {
    var expire = Math.floor(Date.now() / 1000) + 120;
    var token_str = 'imsystem' + expire + identify + 'uriauth';
    console.log(token_str)
    var access_token = this.SHA1.hex_hmac(this.project_setting.sk, token_str);

    var real_uri = origin_uri + '?identify=' + identify + '&expire=' + expire + '&access_key=' + this.project_setting.ak + '&access_token=' + access_token;
    console.log(real_uri);
    return real_uri;
}

AuthEncrypt.prototype.toBodyParams = function(func_name, params) {
    var body = {
        time: Math.floor(Date.now() / 1000),
        params: params
    }

    var sign_str = 'imcore' + func_name + JSON.stringify(body.params) + body.time + 'bodyauth';
    console.log("Sign string: ", sign_str);
    var body_sign = this.SHA1.hex(sign_str);
    body['sign'] = body_sign;
    return body;
}

AuthEncrypt.prototype.toMqttPassword = function(identify) {
    var expire = Math.floor(Date.now() / 1000) + 120;
    var token_str = 'imsystem' + expire + identify + 'uriauth';
    var access_token = this.SHA1.hex_hmac(this.project_setting.sk, token_str);

    return JSON.stringify({
        identify: identify,
        expire: expire,
        access_key: this.project_setting.ak,
        access_token: access_token
    })
}

define('common:auth_encrypt', function(require, exports, module) {
    module.exports = AuthEncrypt;
})
