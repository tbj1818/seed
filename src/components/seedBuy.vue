<template>
  <section>
    <div class="seedcontain seedbg">
           <header class="m-navbar">
            <a href="javascript:;" @click="goback"  class="navbar-item">
                <i class="back-ico"></i>
            </a>
            <div class="navbar-center">
                <span class="navbar-title">购买树苗</span>
            </div>
        </header>
          <ul>
            <li class="seedlist">
                <h1>
                  <span class="userphoto"><img :src="userPhoto" /></span>
                  <span class="userName">{{UserNickname}}</span>
                </h1>
                <h2>已成交{{finishNum}}笔</h2>
                <section class="seedWbg">
                    <div class="listcell">
                        <div class="cellLR">
                            <div class="left_cell" v-if="getType==10">出售总数:</div>
                            <div class="left_cell" v-if="getType==20">收购总数:</div>
                            <div class="right_cell">{{goodsNum}}</div>
                        </div>
                        <div class="cellLR">
                            <div class="left_cell">剩余数量:</div>
                            <div class="right_cell">{{residueNum}}</div>
                        </div>
                    </div>
                    <section class="cellLR" style="line-height: 45px;">
                        <span class="left_cell">树苗售价:</span>
                        <span class="right_cell">
                <strong class="greenText">{{goodsPrice}}BGT/棵</strong>
              </span>
                    </section>
                </section>
            </li>
        </ul>
        <div class="seedbuynum">
            <h1 v-if="getType==10">购买数量</h1>
            <h1 v-if="getType==20">出售数量</h1>
            <section class="buynum">
                <input
                        type="number" v-if="getType==10"
                         @input="inputFun($event.target)"
                        pattern="[0-9]*" v-model="buynum"
                        class="cell-input"
                        placeholder="请输入购买数量"
                        autocomplete="off"
                />
                <input
                        type="number" v-if="getType==20"
                        @input="inputFun($event.target)"
                        pattern="[0-9]*" v-model="buynum"
                        class="cell-input"
                        placeholder="请输入出售数量"
                        autocomplete="off"
                />
                <a href="javascript:;" @click="allbuy" class="btn btn-hollow" v-if="getType==10">全部购买</a>
                <a href="javascript:;" @click="allbuy" class="btn btn-hollow" v-if="getType==20">全部出售</a>
            </section>
            <div class="cellLR" style="line-height:40px">
                <div class="left_cell">最多持有7000棵</div>
                <div class="right_cell">BGT余额: <span class="graytext marl10"> {{bgtnum | numSlicefour}}</span></div>
            </div>
        </div>
        <button type="button" class="btn-block btn_redgradual" @click="enterbuy" :class="btnactive?'active':''" v-if="getType==10">确定购买</button>
        <button type="button" class="btn-block btn_redgradual" @click="enterbuy" :class="btnactive?'active':''" v-if="getType==20">确定出售</button>
    </div>
    <!-- 订单确认弹窗 -->
    <div class="mask-black-dialog" id="YDUI_CONFRIM" v-show="dialogshow">
        <div class="m-confirm">
            <div class="confirm-hd"><strong class="confirm-title">订单确认</strong></div>
            <div class="confirm-bd">购买数量: <em class="bluetext">{{buynum}}棵</em></div>
            <div class="confirm-bd">订单总价: <em class="bluetext">{{buynum*goodsPrice | numSlicefour}}BGT</em></div>
            <div class="confirm-bd" v-if="getType==20">交易手续费: <em class="bluetext">{{buynum*goodsPrice*0.01 | numSlicefour}}BGT  1%</em></div>
            <div class="confirm-ft">
                <a
                        href="javascript:;"
                        class="confirm-btn default"
                        @click="hide"
                >取消</a>
                <button
                        href="javascript:;" :disabled="isDisable"
                        class="confirm-btn primary"
                        @click="dealGoods(token,getType,goodsId,buynum)"
                >
                <em class="bluetext">确定</em>
            </button>
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
  name: "seedBUy",
  data() {
    return {
              web:this.GLOBAL.serverSrc,        //直接通过this访问全局变量。
              token: GetQueryString('token'),         //头部获取token,
               appType:'',             //设备来源
                UserNickname:decodeURIComponent(GetQueryString('userNickname')),//头部获取商品ID,
                userPhoto:decodeURIComponent(GetQueryString('userPhoto')),//头部获取用户头像,
                goodsId:GetQueryString('goodsId'),//头部获取商品ID,
                goodsNum:GetQueryString('goodsNum'),//头部获取出售总数,
                residueNum:GetQueryString('residueNum'),//头部获取剩余数量,
                goodsPrice:GetQueryString('goodsPrice'),//头部获取树苗单价,
                finishNum:GetQueryString('finishNum'),//头部获取已成交数,
                getType:GetQueryString('getType'),//头部获取已成交数,
                buynum:'',                      //交易数量
                bgtnum:'',                     //bgt余额
                isDisable:false,               //控制重复点击
                dialogshow: false,
                 btnactive:false
    };
  },
  methods: {
    inputFun:function(target){
                if(!/^\d+$/.test(target.value)){
                this.buynum = '';
                }
                if(this.buynum){
                    this.btnactive=true;
                }
            },
    enterbuy: function() {
                if(!this.buynum){
                    this.$toast.text('请输入购买数量');
                    return;
                }else{
                    this.dialogshow = true;
                }
            },
            hide: function() {
                this.dialogshow = false;
            },
            allbuy:function(){
                this.buynum=this.residueNum;
            },
            goback:function(){
                 window.location.href="treeDeal.html?token="+this.token;
            },
            dealGoods:function(token,getType,goodsId,buynum ){
                var that =this;
                this.isDisable=true;
                this.$http({
                        method: "post",
                        url: this.web+"/appSceneGoods/dealGoods",
                        data: {
                            token:token,
                            dealType:getType,
                            num:buynum,
                            goodsId:goodsId,
                            platform:'H5'
                        },
                        emulateJSON: true
                    }).then(function (data) {
                        // this.$toast.text(data.data.message);
                        if(data.data.code==0){
                            that.isDisable=false;
                            that.dialogshow = false;
                                window.location.href="dealDetail.html?token="+token+"&orderNo="+data.data.data.orderNo+"&getType="+getType;
                        }else{
                            that.isDisable=false;
                            that.$toast.text(data.data.message);
                        }
                    }, function (error) {
                        that.$toast.text(data.data.message);
                        console.log(error);
                    });
            },
            getUserWalletInfo:function() {
                    var that = this;
                    this.$http({
                        method: "post",
                        url: this.web + "/appRedPacket/getUserWalletInfo",
                        data: {
                            token: that.token,
                            platform: 'H5'
                        },
                        emulateJSON: true
                    }).then(function (data) {
                        // console.log(data);
                        if (data.data.code == 0) {
                            that.bgtnum = data.data.data.bgt;
                        } else {
                            that.$toast.text(data.data.message);
                        }
                    }, function (error) {
                        that.$toast.text('接口出错');
                    });
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
            this.getUserWalletInfo();
            this.appType = localStorage.getItem("appType");
        }
};
</script>
 <style scoped>
.cell-input {
  background: #f5f5f5;
  width: 100%;
  padding-left: 10px;
}
.cellLR .left_cell {
  flex: 1;
  color: #999;
}
.cellLR .right_cell {
  flex: 1;
}
</style>


