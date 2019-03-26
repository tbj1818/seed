<template>
<section>
        <div class="seedcontain seedbg">
                <header class="m-navbar">
                        <a href="javascript:history.go(-1);"  class="navbar-item">
                            <i class="back-ico"></i>
                        </a>
                        <div class="navbar-center">
                            <span class="navbar-title">挂单记录</span>
                        </div>
                        <a href="javascript:;" @click="goorderdeal(token)" class="navbar-item">
                            我要挂单
                        </a>
                </header>  
                   <div class="tab-panel-item">
                <div class="m-cell seedWbg" v-for="(item,index) in orderlist" :key="index">
                    <section class="cellLR bottborl lh8">
                        <span class="left_cell" style="flex:1" v-if="item.dealType==10"><span class="sellIcon margr10"><img
                                src="../assets/icon-chushou@2x.png"/></span>出售树苗</span>
                        <span class="left_cell" style="flex:1" v-if="item.dealType==20"><span class="sellIcon margr10"><img
                                src="../assets/icon-goumai@2x.png"/></span>购买树苗</span>
                        <span class="right_cell" style="flex:1">{{item.publishTime}}</span>
                    </section>
                    <section class="cellLR ">
                        <span class="left_cell" style="flex:1">单价</span>
                        <span class="right_cell" style="flex:1">{{item.goodsPrice}}BGt/棵</span>
                    </section>
                    <section class="cellLR " v-if="item.dealType==10">
                        <span class="left_cell" style="flex:1">出售总量</span>
                        <span class="right_cell" style="flex:1">{{item.goodsNum}}</span>
                    </section>
                    <section class="cellLR " v-if="item.dealType==20">
                        <span class="left_cell" style="flex:1">购买总量</span>
                        <span class="right_cell" style="flex:1">{{item.goodsNum}}</span>
                    </section>
                    <section class="cellLR bottborl"  v-if="item.dealType==10">
                        <span class="left_cell" style="flex:1">已出售量</span>
                        <span class="right_cell" style="flex:1">{{item.goodsNum-item.residueNum}}</span>
                    </section>
                    <section class="cellLR"  v-if="item.dealType==20">
                        <span class="left_cell" style="flex:1">已购买量</span>
                        <span class="right_cell" style="flex:1">{{item.goodsNum-item.residueNum}}</span>
                    </section>
                    <section class="cellLR"  v-if="item.dealType==20">
                        <span class="left_cell" style="flex:1">初始保证金</span>
                        <span class="right_cell" style="flex:1">{{item.promiseFeeDeduct}}</span>
                    </section>
                    <section class="cellLR bottborl"  v-if="item.dealType==20">
                        <span class="left_cell" style="flex:1">当前保证金</span>
                        <span class="right_cell" style="flex:1">{{item.promiseFeeResidue}}</span>
                    </section>
                    <section class="cellLR "  v-if="item.state==10">
                        <span class="left_cell" style="flex:1"></span>
                        <span class="right_cell bluetext" style="flex:1"><strong @click="cancelorder(item.rowId)">撤销挂单</strong></span>
                    </section>
                    <section class="cellLR "  v-if="item.state==20">
                        <span class="left_cell" style="flex:1"></span>
                        <span class="right_cell" style="flex:1"><strong >已成交</strong></span>
                    </section>
                    <section class="cellLR "  v-if="item.state==30">
                        <span class="left_cell" style="flex:1"></span>
                        <span class="right_cell" style="flex:1"><strong >已撤销</strong></span>
                    </section>
                    <section class="backout" v-if="item.state==20"><img src="../assets/img-wancheng@2x.png"/></section>
                    <section class="backout" v-if="item.state==30"><img src="../assets/img-chexiao@2x.png"/></section>   
                </div> 
                <p class="nodata" v-if="orderlist.length==0">暂无数据</p>
                <div class="nodata downtext" @click="loadMorelist()" v-show="loadMore">加载更多</div>
            </div>
        </div>
        <div class="mask-black-dialog" id="YDUI_CONFRIM"  v-show="dialogshow">
            <div class="m-confirm">
                <div class="confirm-hd"><strong class="confirm-title">撤销挂单</strong></div>
                <div class="confirm-bd">确定撤销挂单？</div>
                <div class="confirm-ft">
                    <a href="javascript:;" @click="hide" class="confirm-btn default">取消</a>
                    <a href="javascript:;"  @click="cancelGoods(token)" class="confirm-btn primary">确定</a>
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
               token: GetQueryString("token"), //头部获取token
                fund:this.GLOBAL.serverSrc,              //直接通过this访问全局变量。,
                buystate: GetQueryString('buystate'),       //订单状态0为出售，1位购买
                dialogshow:false,
                loadMore:false,
                limit:20,
                offset:1,
                goodsId:'',
                loadpic:true,                               //等待图标
                orderlist:[]                                //记录列表
    };
  },
  methods: {
     cancelorder: function (goodsId) {
                    this.dialogshow=true;
                    this.goodsId=goodsId;
                },
                hide:function () {
                    this.dialogshow=false;
                },
                goorderdeal:function(token){
                    this.$router.push({ path: "/view/h5/app/seed/deal",query: { token:  token }});
                    // window.location.href="orderDeal.html?token="+token
                },
                goback:function(){
                    window.location.href="orderDeal.html?token="+this.token
                },
                cancelGoods:function(token){
                    this.$http({
                        method: "post",
                        url: this.fund+ "/appSceneGoods/cancelGoods",
                        data: {
                            token: this.token,
                            goodsId:this.goodsId,
                            platform: 'H5'
                        },
                        emulateJSON: true
                    }).then(function (data) {
                        this.dialogshow=false;
                         this.$toast.text(data.data.message);
                        window.location.reload();
                    }, function (error) {
                         this.$toast.text('接口出错');
                    })
                },
                getlist: function () {
                    var that=this;
                    this.$http({
                        method: "post",
                        url: this.fund+ "/appSceneGoods/getMyGoodsList",
                        data: {
                            token: this.token,
                            limit:this.limit,
                            offset:this.offset++,
                            platform: 'H5'
                        },
                        emulateJSON: true
                    }).then(function (data) {
                        console.log(data);
                        if(data.data.code==0){
                            //  this.$toast.text(data.data.message);
                            if(data.data.data){
                                for (var i  in data.data.data.list) {
                                        var item = data.data.data.list[i]
                                            that.orderlist.push(item);
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
                             this.$toast.text(data.data.message)
                        }
                               
                            }, function (error) {
                         that.$toast.text('接口出错');
                    })
                }, 
                loadMorelist:function(){
                    this.getlist()
                },        
  },
   mounted: function () {
                this.getlist()
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
    .seedWbg{padding:0 10px; margin-bottom: 10px !important}
    .bluetext { color: #5856d0 !important; font-size: .28rem !important }
</style>


