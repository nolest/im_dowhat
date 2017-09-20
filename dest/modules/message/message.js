Vue.component('window-message', {
    template:
        '<div class="each" :class="this.color(pkgs.from)">'+
            '<div v-if="pkgs.type === \'text\'" class="ds-box orient-v text" >'+
                '<div class="head">{{ pkgs.sender }} {{ this.get_date(pkgs.time) }}</div>' +
                '<div class="content">{{ pkgs.items.txt_content }}</div>' +
            '</div>' +
            '<div v-else-if="pkgs.type === \'rich_text\'">'+
                '<div class="head">{{ pkgs.sender }} {{ this.get_date(pkgs.time) }}</div>' +
                '<div class="content">rich_text {{ pkgs.items.rich_content }}</div>' +
            '</div>' +
            '<div v-else-if="pkgs.type === \'image\'">' +
                '<div class="head">{{ pkgs.sender }} {{ this.get_date(pkgs.time) }}</div>' +
                '<div class="content">' +
                    '<img :src="pkgs.items.img_thumb" style="max-height:150px;cursor: pointer" @click.stop="open_img(pkgs.items.img_url)"/>' +
                    '<input style="font-size: 10px;width: 100px;height: 20px;border: none;background: none;" :value="pkgs.items.img_url">'+
                '</div>' +
            '</div>' +
            '<div v-else-if="pkgs.type === \'sound\'">' +
                '<div class="head">{{ pkgs.sender }} {{ this.get_date(pkgs.time) }}</div>' +
                '<audio controls="controls" type="audio/mp3" :src="parse_audio(pkgs.items.sound_url)" data-role="sound_line"></audio>' +

            '</div>' +
            '<div v-else-if="pkgs.type === \'video\'">{{ pkgs.items.rich_content }}</div>' +
            '<div v-else-if="pkgs.type === \'file\'">{{ pkgs.items.rich_content }}</div>' +
            '<div v-else-if="pkgs.type === \'tips\'">{{ pkgs.items.rich_content }}</div>' +
            '<div v-else-if="pkgs.type === \'location\'">' +
                '<div class="head">{{ pkgs.sender }} {{ this.get_date(pkgs.time) }}</div>' +
                '<div class="content">' +
                    '<div>location : {{ pkgs.items.loc_info }}</div>'+
                '</div>' +
            '</div>' +
            '<div v-else-if="pkgs.type === \'sysmsg\'">{{ pkgs.items.rich_content }}</div>' +
            '<div v-else-if="pkgs.type === \'receipt\'">{{ pkgs.items.rich_content }}</div>' +
            '<div v-else-if="pkgs.type === \'custom\'" class="ds-box orient-v" >'+

                '<!--div>{{ pkgs.type}}:{{pkgs.items.type }}</div-->' +

                '<div class="head">{{ pkgs.sender }} {{ this.get_date(pkgs.time) }}</div>' +

                '<div class="ds-box content custom " v-if="pkgs.items.type == \'merchandise\'">' +
                    '<img :src="pkgs.items.file_small_url" style="width: 40px;height: 40px;margin-right:20px;border-radius: 2px;"/>'+
                    '<div class="ds-box orient-v flex-1">' +
                        '<div>{{ pkgs.items.card_text1 }}</div>' +
                        '<div>{{ pkgs.items.card_text2 }}</div>' +
                    '</div>'+

                '</div>'+

                '<div class="ds-box content custom" v-if="pkgs.items.type == \'rich_text\'">' +
                    '<div class="ds-box orient-v">' +
                        '<div>{{ pkgs.items.card_text2 }}</div>' +
                        '<div v-html @click.stop="go_to_detail(calculate_order_sn(pkgs))">{{ pkgs.items.rich_content }}</div>' +
                        '<div class="ds-box" v-if="this.show_order_btn(pkgs)">' +
                            '<div class="accept" @click.stop="control_order(\'accept\',calculate_order_sn(pkgs),pkgs)">YES</div>'+
                            '<div class="deny" @click.stop="control_order(\'deny\',calculate_order_sn(pkgs),pkgs)">NO</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+

                '<div class="ds-box content custom" v-if="pkgs.items.type == \'notify\'">' +
                    '<img :src="pkgs.items.file_small_url" style="width: 40px;height: 40px;border-radius: 2px;"/>'+
                    '<div class="ds-box orient-v">' +
                        '<div>{{ pkgs.items.card_text1 }}</div>' +
                        '<div>{{ pkgs.items.card_text2 }}</div>' +
                    '</div>'+
                '</div>'+

                '<div class="ds-box content custom" v-if="pkgs.items.type == \'notice\'">' +
                    '<img :src="pkgs.items.file_small_url" style="width: 40px;height: 40px;border-radius: 2px;"/>'+
                        '<div class="ds-box orient-v">' +
                            '<div>{{ pkgs.items.card_text1 }}</div>' +
                            '<div>{{ pkgs.items.card_text2 }}</div>' +
                    '</div>'+
                '</div>' +

                '<div class="ds-box content custom" v-if="pkgs.items.type == \'card\' || pkgs.items.type == \'\'">' +
                    '<img :src="pkgs.items.file_small_url" style="width: 40px;height: 40px;border-radius: 2px;"/>'+
                    '<div class="ds-box orient-v">' +
                        '<div>{{ pkgs.items.card_text1 }}</div>' +
                        '<div>{{ pkgs.items.card_text2 }}</div>' +
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div v-else-if="pkgs.type === \'withdraw\'">{{ pkgs.items.rich_content }}</div>' +
            '<div v-else>empty message</div>' +
        '</div>',
    props : ['message','client','mark'],
    data: function () {
        return {
            pkgs : this.message
        }
    },
    methods : {
        'get_date' : function(date_num){
            var date_obj = new Date(date_num*1000);
            var year = date_obj.getFullYear();
            var month = date_obj.getMonth()+1;
            var day = date_obj.getDate();
            var hour = date_obj.getHours();
            var mins = date_obj.getMinutes();
            var second = date_obj.getSeconds();
            return year + '/' + month + '/' + day + ' ' + hour + ':' + mins + ':' + second
        },
        'color' : function(from){
            var that = this;
            var color = '';
            if(that.client == from){
                color = 'agent'
            }
            else{
                color = 'service'
            }
            return color
        },
        'show_order_btn' : function(pkgs){
            var that = this;
            var url = pkgs.items.link_url;
            console.log(pkgs);
            console.log(url);
            if(JSON.stringify(pkgs.items).indexOf(that.mark) != -1)return true
        },
        'calculate_order_sn' : function(pkgs){
            var that = this;
            console.log(pkgs);
            var order_sn = pkgs.items.link_url.substring(pkgs.items.link_url.indexOf('order_sn=')+9,pkgs.items.link_url.length);
            console.log(order_sn)
            return order_sn
        },
        'control_order' : function(type,sn,pkgs){
            console.log(pkgs);
            console.log(sn);

            var that = this;
            that.$http.post(
                '//www.yueus.com/im/dest/ajax/room/accept_or_refuse_order2.php',
                {
                    user_id : pkgs.peer,
                    order_sn : sn,
                    operate : type
                },
                {
                    'emulateJSON' : true
                }).then(
                function(res){
                    console.log(res);
                    console.log(res.data.result_data.data.message)
                },
                function(res){
                    console.log(res);
                });
        },
        'open_img' : function(url){
            console.log(url)
        },
        'parseEmoji' : function(content){
            var that = this;
            var str = content;
            for(var i = 0 in that.emoji){
                console.log(that.emoji[i])
                var k = "/[" + that.emoji[i] + "]/g";

                str = str.replace(eval(k),i);
                //console.log('<img src="../../image/emoji/'+i+'.png"' + 'style="width: 30px;height: 30px;"/>')
            }
            return str
        },
        'go_to_detail' : function(sn){

            //window.open('//yp.yueus.com/mall/order/detail/index.php?order_sn=' + sn);
        },
        'parse_audio' : function(a){
            console.log('audio');
            console.log(a);
        }
    }
});