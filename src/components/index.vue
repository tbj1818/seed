<template>
  <div class="hello">
    <header class="m-navbar">
        <a href="javascript:;" @click="goback(appType)" class="navbar-item">
            <i class="back-ico"></i>
        </a>
        <div class="navbar-center">
            <span class="navbar-title">树苗交易</span>
        </div>
        <a href="javascript:;" @click="gorecord(token)" class="navbar-item">
            交易记录
       </a>
    </header>
        <!-- tab -->
         <section>
            <ul class="tab-nav">
                <li class="tab-nav-item"
                    :class="tabactive?'tab-active':''"
                    @click="saletab(10)"
                ><a href="javascript:;">购买树苗</a></li>
                <li
                        class="tab-nav-item"
                        :class="tabactive2?'tab-active':''"
                        @click="saletab(20)"
                ><a href="javascript:;">出售树苗</a></li>
            </ul>
            <div class="tab-panel">
                <div class="tab-panel-item tab-active">
                    <ul>
                        <li class="seedlist" v-for="(item,index) in buylist" :key="index">
                            <h1>
                            <span class="userphoto">
                              <img :src="item.userPhoto" alt="用户头像"/>
                            </span><span class="userName">{{item.userNickname}}</span>
                            </h1>
                            <section class="seedWbg">
                                <div class="listcell">
                                    <div class="cellLR">
                                        <div class="left_cell" v-if="getType==10" >出售总数:<span class="graytext">{{item.goodsNum}}</span>
                                        </div>
                                        <div class="left_cell" v-if="getType==20" >收购总数:<span class="graytext">{{item.goodsNum}}</span>
                                        </div>
                                        <div class="right_cell">已成交:<span class="graytext" >{{item.userId}}笔</span>
                                        </div>
                                    </div>
                                    <div class="cellLR">
                                        <div class="left_cell">剩余数量:<span class="graytext">{{item.residueNum}}</span>
                                        </div>
                                        <div class="right_cell"></div>
                                    </div>
                                </div>
                                <section class="cellLR padtb5">
                                    <span class="left_cell">树苗售价:<strong
                                            class="greenText">{{item.goodsPrice}}BGT/棵</strong></span>
                                    <span class="right_cell">
                                        <button @click="clickHandler(token,item)" :disabled="isDisable" v-if="getType==10" class="smallbuyBtn">立即购买</button>
                                        <button @click="clickHandler(token,item)" :disabled="isDisable"  v-if="getType==20" class="smallbuyBtn">立即出售</button>
                                  </span>
                                </section>
                            </section>
                        </li>
                        <p class="nodata" v-if="buylist.length==0">暂无数据</p>
                        <div class="nodata downtext" @click="loadMorelist(getType)" v-show="loadMore">加载更多</div>
                    </ul>
                </div>
            </div>
        </section>
         <!--等待图标-->
        <div class="pukeloading" v-show="loadpic">
            <img src="../assets/blueloading.gif" />
        </div>
        <!-- 右下角添加 -->
        <div class="roundicon" @click="pluslink(token)">
            <img src="../assets/rightPlus.png"/>
        </div>
        <nut-backtop :right='25'></nut-backtop>
    </div>
</template>

<script>
    /* 获取头部信息 */
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2];
        }
    };
export default {
  name: "HelloWorld",
  data() {
    return {
                fund:this.GLOBAL.serverSrc,              //直接通过this访问全局变量。,
                token: GetQueryString('token'),         //头部获取token,
                appType: GetQueryString('appType'),     //头部获取设备来源,
                getType: GetQueryString('getType'),     //交易类型20：出售单，10：收购单
                userphoto: require("../assets/notuserphoto.png"),
                tabactive: true,
                tabactive2: false,  
                isDisable:false,   
                loadMore:false,
                limit:20,
                offset:1,
                loadpic: true,      //等待图标       
                buylist: [],
                finishnum:[]
    };
  },
  methods:{
    getlist: function (getType) {
                    var that=this;
                  
                    this.$http({
                        method: "post",
                        url:this.fund+ "/appSceneGoods/getGoodsList",
                        data: {
                            token: this.token,
                            getType: this.getType,
                            limit:this.limit,
                            offset:this.offset++,
                            platform: 'H5'
                        },
                        emulateJSON: true
                    }).then(function (data) {
                        // console.log(data);
                        // this.buylist = data.data.data.list;
                        if(data.data.code==0){
                            if(data.data.data){
                                that.finishnum=data.data.data.finishNumMap;
                                for (var i  in data.data.data.list) {
                                        var item = data.data.data.list[i]
                                            that.buylist.push(item);
                                            if(!item.userPhoto){
                                                item.userPhoto=require("../assets/notuserphoto.png");
                                            }
                                            if(!item.userNickname){
                                                item.userNickname="微信昵称";
                                            }

                                            var num=item.userId;
                                            if(item.userId=that.finishnum[num]){
                                                item.userId=that.finishnum[num]
                                            };
                                }
                                if (data.data.data.list.length >= that.limit) {
                                    that.loadMore = true;
                                }else{
                                    that.loadMore = false;
                                    //  this.$toast.text('已加载完');
                                }
                            }else{
                                    that.loadMore = false;
                                    //  this.$toast.text('已加载完');
                                }
                           
                        }else{
                             that.$toast.text(data.data.message)
                        }
                    }, function (error) {
                         this.$toast.text('接口出错');
                    });
                },
                loadMorelist:function(getType){
                    this.getlist(getType)
                },
                saletab: function (type) {
                    var test=window.location.href;  
                    // console.log(test);
                    this.buylist=[];
                    this.offset=1;
                    if (type ==10) {
                        this.getType =10;
                        this.tabactive = true;
                        this.tabactive2 = false;
                        if(test.indexOf("getType")>=0){
                            history.replaceState("", "Title", 'treeDeal.html?token='+this.token+'&getType=10'+"&appType="+this.appType);
                        }
                        this.getlist();
                    } else if (type ==20) {
                        this.getType =20;
                        this.tabactive = false;
                        this.tabactive2 = true;
                            
                        if(test.indexOf("getType")>=0){
                            history.replaceState("", "Title", 'treeDeal.html?token='+this.token+'&getType=20'+"&appType="+this.appType);
                        }
                        this.getlist();
                    }
                },
                gorecord:function(token){
                   this.$router.push({ path: "/view/h5/app/seed/dealrecord",query: { token:  token }});
                  // window.location.href="dealRecord.html?token="+token;
                },
                pluslink: function (token) {
                  this.$router.push({ path: "/view/h5/app/seed/deal",query: { token:  token }});
                    // window.location.href = "orderDeal.html?token=" + token;
                },
                clickHandler: function (token,item) {
                    this.$router.push({ path: "/view/h5/app/seed/seedBuy",query: { token:  token,goodsNum:item.goodsNum,residueNum:item.residueNum,goodsId:item.rowId,goodsPrice:item.goodsPrice, finishNum:item.userId,getType:this.getType,userNickname:encodeURI(item.userNickname),userPhoto:item.userPhoto}});
                    // window.location.href = "seedBuy.html?token=" + token+"&goodsNum="+item.goodsNum+"&residueNum="+item.residueNum+"&goodsId="+item.rowId+"&goodsPrice="+item.goodsPrice+"&finishNum="+item.userId+"&getType="+this.getType+"&userNickname="+encodeURIComponent(item.userNickname)+"&userPhoto="+item.userPhoto;
                },
                
                goback:function(appType){
                    var that=this;
                    if(appType==undefined){
                        console.log(localStorage.getItem("appType"));
                        var appType = localStorage.getItem("appType");
                         this.$toast.text(appType);
                    }
                    if (appType == 'ios') {
                    //调用IOS原生方法
                        window.webkit.messageHandlers.closePage.postMessage(1);
                        return;
                    } else if (appType == 'android') {
                        window.android.closePage();
                        return;
                    } else {
                        console.log(1);
                         that.$toast.text('请在手机端操作')
                        return;
                    }
                },
  },
  mounted:function(){
     if(this.getType==10){
                    this.tabactive = true;
                    this.tabactive2 = false;
                    this.getlist();
                }else if(this.getType==20){
                    this.tabactive2 = true;
                    this.tabactive = false;
                    this.getlist();
                }else{
                    this.getType=10;
                    this.getlist();
    }
  },
  beforeCreate:function(){
                    //加载层
                    var that = this;
                    setTimeout(function () {
                        that.loadpic = false;
                    }, 1000);
            }
};
</script>
<style scoped>
 .hello .tab-panel-item{margin: 0 auto; padding: 0; width: 95%}
</style>
