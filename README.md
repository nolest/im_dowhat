## im_dowhat
* yueyue 干点啥项目 教师后台im
* 该项目重构于客服im(im_service)，涉及php端服务器、im服务器、前端

## 目录说明
* 版本一
	* /dest 目标目录
	* /src 源码目录
	* /gulpfile.js gulp配置文件
	* ~working.cmd 监听开始

## 版本一：
* 基于vue.js，编译环境gulp，scr => dest，异步文件夹ajax
    * lib/IMSDK.js 封装了 lib/mqtt_client.js 以及调用页面方法
    * 登录成功 login_success 
    * 链接成功 connect_lost
    * 收到消息 message_receive
    * 订阅信箱 onSubscribe
* [MQTT协议文档](http://gitlab.yueus.com/pocoyun-pub/documents/wikis/imcore/apis)
* 联系方式QQ：
    * 34429255 瑞新（im服务器）
    * 234722572 nolest（前端）
    * 30019672 荣少（php端服务器、后台历史记录操作、配置）
* 主要功能包括
    * 鉴权
    ```javascript
        mqtt_auth
        mqtt_login
        get_auth
    ```
    * 验证
    ```javascript
        get_ali_token
        calculate
    ```
    * 角色选择
    ```javascript
        change_login_type
        ok_login_type
        go_to_login
    ```
    * mqtt链接状态
    ```javascript
        login_success
        connect_lost
        message_receive
        onSubscribe
        onSubscribe_barrage
    ```
    * 新增消息
    ```javascript
        resolve_new_receive
    ```
    * 聊天室列表
    ```javascript
        get_service_list
        serviceId_click
        go_to_meeting
        get_meeting_list
        get_group_info
        get_group_members
        load_more_menber
    ```
    * php服务器请求
    ```javascript
        $http.post
    ```
    * im服务器请求
    ```javascript
        api_request
    ```
    * 发送消息（文字、图片、自定义消息类型、语音、服务卡片等、表情）
    ```javascript
        send_request
        base_send_parame
        send
        emoji
        input_pic
        choose_face
    ```
    * 历史记录
    ```javascript
        fetch_history
        get_history_more
    ```
    * 日常用语增删
    ```javascript
        options_words
        options_words_send
        go_to_edit_word
    ```
    * 商品列表
    ```javascript
        fetch_goods_list
        options_service
        resource_send
        fetch_treasure_list
        fetch_creations_info
    ```
    * 输入状态维护
    ```javascript
        textarea_change
    ```
    * 禁言操作
    ```javascript
        switch_anno
        silence
        silence_user
        announce
        silence_in_bar
    ```
    * 聊天室操作
    ```javascript
        end_meeting
        meeting_operate
        meeting_group_operate
    ```
    * 弹幕操作
    ```javascript
        switch_pop
    ```