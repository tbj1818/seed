<template>
<section>
        <div class="seedcontain seedbg">
            <header class="m-navbar">
            <a href="javascript:;" @click="goback"  class="navbar-item">
                <i class="back-ico"></i>
            </a>
            <div class="navbar-center">
                <span class="navbar-title">交易记录</span>
            </div>
            <a href="javascript:;" @click="goorderdetail(token)" class="navbar-item">
                挂单记录
            </a>
        </header>
        <ul class="tab-nav">
            <li class="tab-nav-item"  :class="tabactive?'tab-active':''" @click="saletab(20)"><a href="javascript:;">我出售的</a></li>
            <li class="tab-nav-item"  :class="tabactive2?'tab-active':''" @click="saletab(10)"><a href="javascript:;">我购买的</a></li>
        </ul>

        <div class="seedWcontainr">
            <div class="tab-panel-item">
                    <div class="m-cell seedWbg" @click="dealdetail(token,getType,item)" v-for="(item,index) in orderlist" :key="index">
                        <section class="cellLR bottborl lh8">
                            <span class="left_cell blacktext" v-if="getType==20"  style="flex:1"><span class="sellIcon margr10"><img src="../assets/icon-chushou@2x.png" /></span>出售树苗</span>
                            <span class="left_cell blacktext" v-if="getType==10" style="flex:1"><span class="sellIcon margr10"><img src="../assets/icon-goumai@2x.png" /></span>购买树苗</span>
                            <span class="right_cell fontcolorB" style="flex:1;">{{item.buyTime}}</span>
                        </section>
                        <section class="paddtb10 bottborl">
                                <section class="cellLR ">
                                    <span class="left_cell fontcolorB" v-if="getType==10" style="flex:1">卖家</span>
                                    <span class="left_cell fontcolorB" v-if="getType==20" style="flex:1">买家</span>
                                    <span class="right_cell" style="flex:1">{{item.sellerUserNickname}}</span>
                                </section>
                                <section class="cellLR ">
                                    <span class="left_cell fontcolorB" style="flex:1">单价</span>
                                    <span class="right_cell" style="flex:1">{{item.goodsPrice}}BGT/棵</span>
                                </section>
                                <section class="cellLR ">
                                    <span class="left_cell fontcolorB" style="flex:1">总价</span>
                                    <span class="right_cell" style="flex:1">{{item.payMoney | numSlicefour}}BGT</span>
                                </section>
                                <section class="cellLR" v-if="getType==20">
                                    <span class="left_cell fontcolorB" style="flex:1">手续费</span>
                                    <span class="right_cell" style="flex:1">{{item.sxFee}}BGT {{item.sxFee/item.payMoney*100}}%</span>
                                </section>
                                <section class="cellLR">
                                    <span class="left_cell fontcolorB" style="flex:1">订单号</span>
                                    <span class="right_cell" style="flex:1">{{item.orderNo}}</span>
                                </section>
                        </section>    
                        <section class="cellLR lh8">
                            <span class="left_cell fontcolorB" style="flex:1">数量<span class="blacktext mar_l5">{{item.buyNum}}</span></span>
                            <span class="right_cell blacktext" style="flex:1">交易成功</span>
                        </section>
                    </div>
                    <p class="nodata" v-if="orderlist.length==0">暂无数据</p>
                    <div class="nodata downtext" @click="loadMorelist(getType)" v-show="loadMore">加载更多</div>
            </div>
        </div>
    </div>
     <!--等待图标-->
     <div class="pukeloading" v-show="loadpic">
        <img src="../assets/blueloading.gif" />
    </div>
</section>
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
  name: "dealrecord",
  data() {
    return {
      web:this.GLOBAL.serverSrc,        //直接通过this访问全局变量。
       token:GetQueryString('token'),   //头部获取。
              tabactive: true,
                tabactive2: false,
                loadMore:false,
                limit:20,
                offset:1,
                loadpic: true,      //等待图标     
                getType:20,       //订单状态10：我购买的订单 20：我出售的订单
                orderlist:[]        //订单列表
    };
  },
  methods: {
      getlist: function () {
                    var that=this;
                    this.$http({
                        method: "post",
                        url: this.web+ "/appSceneGoodsOrder/getOrderList",
                        data: {
                            token: this.token,
                            getType: this.getType,
                            limit:this.limit,
                            offset:this.offset++,
                            platform: 'H5'
                        },
                        emulateJSON: true
                    }).then(function (data) {
                        console.log(data);
                        if(data.data.code==0){
                            if(data.data.data){
                                for (var i  in data.data.data.list) {
                                    var item = data.data.data.list[i]
                                        that.orderlist.push(item);
                                        if(!item.sellerUserNickname){
                                            item.sellerUserNickname='微信昵称';
                                        }
                                }
                                if (data.data.data.list.length >= this.limit) {
                                    this.loadMore = true;
                                }else{
                                    this.loadMore = false;
                                    // layer.msg('已加载完');
                                }
                            }else{
                                this.loadMore = false;
                                    // layer.msg('已加载完'); 
                            }
                        }else{
                            layer.msg(data.data.message)
                        }
                               
                            }, function (error) {
                        layer.msg('接口出错');
                    })
                },
                loadMorelist:function(getType){
                    this.getlist(getType)
                },   
            saletab:function(type){
                    this.orderlist=[];
                    this.offset=1;
                    //加载层
                     var that = this;
                     that.loadpic = true;
                    setTimeout(function () {
                        that.loadpic = false;
                    }, 1000)
                    if(type==20){
                        this.tabactive=true;
                        this.tabactive2=false;
                        this.getType =20;
                        this.getlist();
                    }else if(type==10){
                        this.tabactive=false;
                        this.tabactive2=true;
                        this.getType =10;
                        this.getlist(); 
                    }
                },
            dealdetail:function(token,getType,item){
                window.location.href="dealDetail.html?token="+token+"&getType="+getType+"&orderNo="+item.orderNo;
            },
            goorderdetail:function(token){
                 this.$router.push({ path: "/view/h5/app/seed/orderdetail",query: { token:  token }});
                // window.location.href="orderDetail.html?token="+token;
            },
            goback:function(){
                window.location.href="treeDeal.html?token="+this.token+"&appType="+this.appType;
            }
  },
  filters: {
                numSlicefour: function (val) {
                    if (val) {
                        let transformVal = parseFloat(val).toFixed(5)
                        let realVal = transformVal.substring(0, transformVal.length - 1)
                        // num.toFixed(3)获取的是字符串
                        return parseFloat(realVal)
                    }
                },
            },
        mounted:function(){
            this.getlist();
            this.appType = localStorage.getItem("appType");
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
 .seedcontain{padding: 0}
    .tab-panel{background: none}
    .m-cell:after{border: 0 !important}
    .tab-nav-item{ background: #FFF !important;}
    .cell-item:not(:last-child){border-bottom: #f3f3f3 solid 1px}
    .seedWbg{padding:0 10px 0 10px}
</style>


