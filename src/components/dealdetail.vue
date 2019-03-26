<template>
<section>
        <div class="seedcontain seedbg">
          <header class="m-navbar">
                  <a href="javascript:history.go(-1);" class="navbar-item">
                      <i class="back-ico"></i>
                  </a>
                  <div class="navbar-center">
                      <span class="navbar-title">交易详情</span>
                  </div>
          </header>
                  <div class="tab-panel-item">
                <div class="m-cell seedWbg">
                    <section class="succeedicon">
                        <img src="../assets/icon-chenggong @2x.png" />
                        <p>交易成功</p>
                    </section>
                    <section class="cellLR ">
                        <span class="left_cell" v-if="getType==20" style="flex:1">买家</span>
                        <span class="left_cell" v-if="getType==10" style="flex:1">卖家</span>
                        <span class="right_cell" style="flex:1">{{UserNickname}}</span>
                    </section>
                    <section class="cellLR ">
                        <span class="left_cell" style="flex:1">单价</span>
                        <span class="right_cell" style="flex:1">{{goodsPrice}}BGT/棵</span>
                    </section>
                    <section class="cellLR">
                        <span class="left_cell" style="flex:1">订单号</span>
                        <span class="right_cell" style="flex:1">{{orderNo}}</span>
                    </section>
                    <section class="cellLR">
                        <span class="left_cell" style="flex:1">订单时间 </span>
                        <span class="right_cell" style="flex:1">{{buyTime}}</span>
                    </section>
                    <section class="cellLR">
                        <span class="left_cell" style="flex:1">总价 </span>
                        <span class="right_cell" style="flex:1">{{payMoney | numSlicefour}}BGT</span>
                    </section>
                    <section class="cellLR" v-if="getType==20">
                        <span class="left_cell" style="flex:1">手续费 </span>
                        <span class="right_cell" style="flex:1">{{sxFee}}BGT 1%</span>
                    </section>
                    <section class="cellLR" v-if="getType==20">
                        <span class="left_cell" style="flex:1">实际收入 </span>
                        <span class="right_cell" style="flex:1">{{payMoney-sxFee}}BGT</span>
                    </section>
                </div>
                <div class="m-cell seedWbg">
                    <section class="cellLR" style="line-height:1rem">
                        <span class="left_cell" style="flex:1">购买树苗数量</span>
                        <span class="right_cell blacktext" style="flex:1">{{buyNum}}棵</span>
                    </section>
                </div>
            </div>
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
                token:GetQueryString('token'),//头部获取。,
                getType:GetQueryString('getType'),       //订单状态0为出售，1位购买
                orderNo:GetQueryString('orderNo'),       //获取订单编号
                UserNickname:'',         //微信昵称
                goodsPrice:'',           //单价
                payMoney:'',            //总价
                buyNum:'',              //交易数量
                buyTime:'',            //交易时间
                sxFee:'',                //手续费
                goodsPrice:''            //实际收入
    };
  },
  methods: {
     goback:function(){
                window.location.href="dealRecord.html?token="+this.token
            },
            getMyGoodsList:function(){
             var that=this;
                this.$http({
                        method: "post",
                        url: this.web+ "/appSceneGoodsOrder/getDealDetail",
                        data: {
                            token: this.token,
                            orderNo: this.orderNo,
                            platform: 'H5'
                        },
                        emulateJSON: true
                    }).then(function (data) {
                        console.log(data);
                        if(data.data.code==0){
                            var datainfo=data.data.data.data;
                            that.UserNickname=datainfo.nickname;
                            that.buyTime=datainfo.buyTime;
                            that.buyNum=datainfo.buyNum;
                            that.orderNo=datainfo.orderNo;
                            that.payMoney=datainfo.payMoney;
                            that.goodsPrice=datainfo.goodsPrice;
                            that.sxFee=datainfo.sxFee;
                        }
                    }, function (error) {
                        layer.msg(data.data.message);
                        layer.msg('接口出错');
                    })
            },
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
            this.getMyGoodsList();
            // console.log(this.orderNo);
        }
};
</script>
 <style scoped>
.seedcontain{padding: 0}
.tab-panel{background: none}
.m-cell:after{border: 0 !important}
.seedWbg{width: 95% !important; margin-top: 10px !important;}
</style>


