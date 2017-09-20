define('common:entity_type', function(require, exports, module) {

    module.exports = {

        imcoreGetUserEntityType: function() {
            return [
                "client",
                "seller"
            ]
        },

        imcoreGetGroupEntityType: function() {
            return [
                "group",
                "chatroom"
            ]
        },

        imcoreGetAllEntityType: function() {
            return [
                "client",
                "seller",
                "group",
                "chatroom"
            ]
        },

        imcoreGetAllMessageType: function() {
            return [
                "text",
                "custom",
                "location"
            ]
        },

        imcoreGetIosCertType: function() {
            return [
                'pro',
                'dev',
                'ent_pro',
                'ent_dev',
            ]
        },

        imcoreGetOsType: function() {
            return [
                'ios',
                'android'
            ]
        }
    };

});
