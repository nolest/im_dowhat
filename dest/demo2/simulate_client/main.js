var Util = require('common:util');
var EntityType = require('common:entity_type');
var MqttClient = require('mqtt_client');
var AuthEncrypt = require('common:auth_encrypt');
    //var MqttClient = require('mqtt_client');
$(function() {
    function Init() {
        Util.insertOptionsToSelect(document.forms['form_project']["project"], AuthEncrypt.getProjects());
        Util.insertOptionsToSelect(document.forms['form_login']["user_type"], EntityType.imcoreGetUserEntityType());
        Util.insertOptionsToSelect(document.forms['form_group']["group_type"], EntityType.imcoreGetGroupEntityType());

        Util.insertOptionsToSelect(document.forms['form_state']["state_type"], EntityType.imcoreGetUserEntityType());
    }
    Init();

    var mqtt_client = new MqttClient();
    var auth_encrypt = new AuthEncrypt(document.forms['form_project']['project'].value);
    $('#btn_switch_project').click(function() {
        auth_encrypt = new AuthEncrypt(document.forms['form_project']['project'].value);
        console.log("Project switched: " + document.forms['form_project']['project'].value)
    })

    $("#btn_login").click(function(){

        form = document.forms['form_login'];

        // var params = {
        //     hostname: form['hostname'].value,
        //     port: parseInt(form['port'].value),
        //     user_type: form['user_type'].value,
        //     user_id: form['user_id'].value,
        // }
        // params.password = auth_encrypt.toMqttPassword(params.user_id)
        // console.log(params);
        // mqtt_client.login(params);
        //var mqtt_client = new MqttClient()
        mqtt_client.login({
            hostname : 'im-on-wifi.poco.cn',
            port : 8983,
            user_type : 'client',
            user_id : '100029',
            password : '{"identify":"100029","expire":1489133224,"access_key":"d28c3528e24ef9da8e31c71cb28011424c7b1c20","access_token":"d28c3528e24ef9da8e31c71cb28011424c7b1c20"}'//that.auth.password
        })
    });

    $("#btn_join").click(function(){
        form = document.forms['form_group'];

        var group_type = form['group_type'].value;
        var group_id = form['group_id'].value;

        mqtt_client.subscribe(group_type + '/' + group_id);
    });

    $("#btn_left").click(function(){
        form = document.forms['form_group'];

        var group_type = form['group_type'].value;
        var group_id = form['group_id'].value;

        mqtt_client.unsubscribe(group_type + '/' + group_id);
    });

    $("#btn_sub").click(function(){
        form = document.forms['form_state'];

        var state_type = form['state_type'].value;
        var state_id = form['state_id'].value;

        mqtt_client.subscribe(state_type + '/' + state_id + '/' + 'state');
    });

    $("#btn_unsub").click(function(){
        form = document.forms['form_state'];

        var state_type = form['state_type'].value;
        var state_id = form['state_id'].value;

        mqtt_client.unsubscribe(state_type + '/' + state_id + '/' + 'state');
    });
});
