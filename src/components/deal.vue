<template>
  <section>
    <div
      class="root"
      v-wechat-title="$route.meta.title"
    ></div>
    <div class="seedcontain seedbg">
       <header class="m-navbar">
        <a href="javascript:history.go(-1);"  class="navbar-item">
            <i class="back-ico"></i>
        </a>
        <div class="navbar-center">
            <span class="navbar-title">挂单交易</span>
        </div>
    </header>
      <ul class="tab-nav">
        <li
          class="tab-nav-item"
          :class="tabactive?'tab-active':''"
          @click="saletab(0)"
        ><a href="javascript:;">我要出售</a></li>
        <li
          class="tab-nav-item"
          :class="tabactive2?'tab-active':''"
          @click="saletab(1)"
        ><a href="javascript:;">我要购买</a></li>
      </ul>

      <div class="seedWcontainr fixedtop">
        <div class="tab-panel-item tab-active">
          <div class="m-cell seedWbg">
            <div class="cell-item">
              <div
                class="cell-left"
                v-if="publishType==10"
              >出售内容</div>
              <div
                class="cell-left"
                v-if="publishType==20"
              >购买内容</div>
              <div class="cell-right">农场树苗</div>
            </div>
            <div class="cell-item">
              <div
                class="cell-left"
                v-if="publishType==10"
              >出售总数</div>
              <div
                class="cell-left"
                v-if="publishType==20"
              >收购总数</div>
              <div class="cell-right">
                <input
                  type="number"
                  v-if="publishType==10"
                  pattern="[0-9]*"
                  @input="inputFun($event.target)"
                  oninput="if(value.length>4)value=value.slice(0,4)"
                  v-model="dealnum"
                  style="text-align:right"
                  class="cell-input"
                  placeholder="请输入出售总量"
                  autocomplete="off"
                />
                <input
                  type="number"
                  v-if="publishType==20"
                  pattern="[0-9]*"
                   @input="inputFun($event.target)"
                  oninput="if(value.length>4)value=value.slice(0,4)"
                  v-model="dealnum"
                  style="text-align:right"
                  class="cell-input"
                  placeholder="请输入收购总量"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="cell-item">
              <div class="cell-left"></div>
              <div class="cell-right">
                <section v-if="publishType==10">
                  我的树苗总量{{saplingNum | numSlicefour}} <span
                    class="bluetext marl10"
                    @click="allsale"
                  >全部出售</span>
                </section>
                <section v-if="publishType==20">
                  当前BGT总量{{balance | numSlicefour}}
                </section>

              </div>
            </div>
          </div>

          <div class="m-cell seedWbg">
            <div class="cell-item">
              <div class="cell-left">设置单价</div>
              <div class="cell-right">
                <input
                  type="number"
                  @input="inputFun($event.target)"
                  pattern="[0-9]*"
                  oninput="if(value.length>4)value=value.slice(0,4)"
                  v-model="dealprice"
                  style="text-align:right"
                  class="cell-input mar_r10"
                  placeholder="请设置单价"
                  autocomplete="off"
                />BGT
              </div>
            </div>
          </div>

        </div>
        <button
          type="button"
          v-if="publishType==10" :class="btnactive?'active':''"
          class="btn-block rechargeaffirmbtn"
          @click="enterbuy"
        >确定出售</button>
        <button
          type="button"
          v-if="publishType==20" :class="btnactive?'active':''"
          class="btn-block rechargeaffirmbtn"
          @click="enterbuy"
        >确定购买</button>
        <section
          class="guadanrules"
          v-if="publishType==10"
        >
          <h1>挂单出售规则：</h1>
          <ul>
            <li>1、出售总数不得超过您的持有总量 </li>
            <li>2、出售中的树苗不再产生阳光收益 </li>
            <li>3、系统将收取1%的佣金作为交易手续费</li>
          </ul>
        </section>
        <section
          class="guadanrules"
          v-if="publishType==20"
        >
          <h1>挂单购买规则：</h1>
          <ul>
            <li>1、确认收购后，将从账户暂时扣除相应的BGT保证金 </li>
            <li>2、有订单成交后，将自动扣除保证金给出售用户</li>
            <li>3、每个用户树苗持有量不能超过7000棵</li>
          </ul>
        </section>
      </div>
    </div>
    <!-- 挂单确认弹窗 -->
    <div
      class="mask-black-dialog"
      id="YDUI_CONFRIM"
      v-show="dialogshow"
    >
      <div class="m-confirm">
        <div class="confirm-hd"><strong class="confirm-title">挂单确认</strong></div>
        <div class="confirm-bd">出售内容: <em class="bluetext">树苗</em></div>
        <div class="confirm-bd">出售总量: <em class="bluetext">{{dealnum}}棵</em></div>
        <div class="confirm-bd">树苗单价: <em class="bluetext">{{dealprice}}BGT</em></div>
        <div
          class="confirm-bd"
          v-if="publishType==20"
        >购买保证金: <em class="bluetext">{{dealnum*dealprice}}BGT</em></div>
        <div class="confirm-ft">
          <a
            href="javascript:;"
            class="confirm-btn default"
            @click="hide"
          >取消</a>
          <button
            href="javascript:;"
            :disabled="isDisable"
            class="confirm-btn primary"
            @click="orderentrer(token,publishType,dealnum,dealprice)"
          ><em class="bluetext">确定</em>
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
  name: "deal",
  data() {
    return {
      token: GetQueryString("token"), //头部获取token
      fund:this.GLOBAL.serverSrc,              //直接通过this访问全局变量。,
      saplingNum: 0, //我的树苗总量
      balance: 0, //我的BGT总量
      userphoto: "../../images/notuserphoto.png",
      tabactive: true,
      tabactive2: false,
      dialogshow: false,
      loadpic: true, //等待图标
      isDisable: false, //按钮重复点击
      publishType: 10, //挂单交易状态10为出售 20为购买
      dealnum: "", //交易数量
      dealprice: "", //交易单价
       btnactive:false
    };
  },
  methods: {
    inputFun:function(target){
                if(!/^\d+$/.test(target.value)){
                this.dealnum = '';
                }
                if(this.dealnum){
                    this.btnactive=true;
                }
    },
    inputFun2:function(target){
                if(!/^\d+$/.test(target.value)){
                this.dealprice = '';
                }
                if(this.dealprice){
                    this.btnactive=true;
                }
    },
    saletab: function(type) {
      if (type == 0) {
        this.tabactive = true;
        this.tabactive2 = false;
        this.publishType = 10;
        this.dealprice = "";
        this.dealnum = "";
      } else if (type == 1) {
        this.tabactive = false;
        this.tabactive2 = true;
        this.publishType = 20;
        this.dealprice = "";
        this.dealnum = "";
      }
    },
    allsale: function() {
      this.dealnum = this.saplingNum;
    },
    enterbuy: function() {
      if (!this.dealnum) {
         this.$toast.text("请输入交易总数");
        return;
      } else if (this.dealnum > 1000) {
         this.$toast.text("交易总数不能大于1000");
        return;
      } else if (!this.dealprice) {
         this.$toast.text("请输入交易单价");
        return;
      }
      this.dialogshow = true;
    },
    hide: function() {
      this.dialogshow = false;
    },
    getUserWalletV2: function() {
      var that=this;
      this.$http({
        method: "post",
        url: this.fund + "/appFundUserWallet/getUserWalletV2",
        data: {
          token: this.token,
          platform: "H5"
        },
        emulateJSON: true
      }).then(
        function(data) {
          // console.log(data);
          if (data.data.code == 0) {
            that.saplingNum = data.data.data.saplingNum;
            for (var i in data.data.data.walletInfo) {
              var item = data.data.data.walletInfo;
              if (data.data.data.walletInfo[i].wallteType == 30) {
                that.balance = data.data.data.walletInfo[i].balance;
              }
            }
            // this.balance=data.data.data.walletInfo.balance;
            // console.log(data.data.data.walletInfo);
          } else {
             this.$toast.text(data.data.message);
          }
        },
        function(error) {
          console.log(error);
        }
      );
    },
    orderentrer: function(token, publishType, num, price) {
      this.dialogshow = false;
      this.isDisable = true;
      var that=this;
      this.$http({
        method: "post",
        url: that.fund + "/appSceneGoods/publishGoods",
        data: {
          token: that.token,
          publishType: publishType,
          num: num,
          price: price,
          platform: "H5"
        },
        emulateJSON: true
      }).then(
        function(data) {
          console.log(data);
           that.$toast.text(data.data.message);
          if (data.data.code == 0) {
             that.$toast.text(data.data.message);
            that.isDisable = false;

            window.history.go(-1);
          } else {
            that.isDisable = false;
             that.$toast.text(data.data.message);
          }
          // setTimeout(function(){
          //     window.location.href="treeDeal.html?token="+token
          // },1000);
        },
        function(error) {
          console.log(error);
        }
      );
      // window.location.href="dealRecord.html?token="+token
    }
    // goback:function(){
    //     window.location.href="orderDetail.html?token="+this.token
    // }
  },
  filters: {
    numSlicefour: function(val) {
      if (val) {
        return parseFloat(val.toFixed(4));
      }
    }
  },
  mounted: function() {
    //加载层
    this.$nextTick(function() {
      var that = this;
      setTimeout(function() {
        that.loadpic = false;
      }, 1000);
    });
    this.getUserWalletV2();
  }
};
</script>
<style scoped>
.seedcontain{padding: 0}
    .tab-panel{background: none}
    .m-cell:after{border: 0 !important}
    .tab-nav-item{ background: #FFF !important;}
    .cell-item:not(:last-child){border-bottom: #f3f3f3 solid 1px}
    .cell-item{line-height: 1.15rem}
</style>



