define('common:util', function(require, exports, module) {

    module.exports = {

        insertOptionsToSelect: function(select, options) {
            for (var i in options) {
                var new_option = document.createElement("option");
                new_option.setAttribute("value", options[i]);
                new_option.appendChild(document.createTextNode(options[i]));
                select.appendChild(new_option);
            }
        }

    };

});
