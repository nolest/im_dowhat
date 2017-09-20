function PostRequest() {

}

PostRequest.prototype.postByJson = function(uri, data) {
    $.ajax({
        type: "POST",
        url: uri,
        contentType: "application/json",
        data: JSON.stringify(data),
        datatype: "json",
        success: function (data){
            console.log(data)
        },
        error: function (obj, msg, info) {
            console.log(info, obj.statusText);
        }
    });
}

PostRequest.prototype.postByMultipartFormdata = function(uri, data) {
    var formdata = new FormData();
    formdata.append("data", JSON.stringify(data));

    $.ajax({
        type: "POST",
        url: uri,
        data: formdata,
        contentType: false,
        processData: false,
        datatype: "json",
        success: function (data){
            console.log(data)
        },
        error: function (obj, msg, info) {
            console.log(info, obj.responseText);
        }
    });
}

define('common:post_request', function(require, exports, module) {
    module.exports = PostRequest;
})
