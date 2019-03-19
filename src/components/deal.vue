<template>
<section>
   <div class="root"  v-wechat-title="$route.meta.title"></div>
        <div class="seedcontain seedbg">
                <ul class="tab-nav">
                    <li class="tab-nav-item"  :class="tabactive?'tab-active':''" @click="saletab(0)"><a href="javascript:;">我要出售</a></li>
                    <li class="tab-nav-item"  :class="tabactive2?'tab-active':''" @click="saletab(1)"><a href="javascript:;">我要购买</a></li>
                </ul>

                   <div class="seedWcontainr">
                        <div class="tab-panel-item tab-active">
                              <div class="m-cell seedWbg">
                                <div class="cell-item">
                                    <div class="cell-left" v-if="dealstate==0">出售内容</div>
                                    <div class="cell-left"  v-if="dealstate==1">购买内容</div>
                                    <div class="cell-right">农场树苗</div>
                                </div>
                                <div class="cell-item">
                                    <div class="cell-left">出售总数</div>
                                    <div class="cell-right">
                                      <input type="number" pattern="[0-9]*" v-model="dealnum" style="text-align:right" class="cell-input" placeholder="请输入出售总量" autocomplete="off" />
                                    </div>
                                </div>
                                 <div class="cell-item">
                                    <div class="cell-left"></div>
                                    <div class="cell-right">
                                     我的树苗总量{{allnum}}  <span class="bluetext marl10" @click="allsale">全部出售</span>
                                    </div>
                                 </div>
                              </div>

                              <div class="m-cell seedWbg">
                                  <div class="cell-item">
                                      <div class="cell-left">设置单价</div>
                                      <div class="cell-right">
                                        <input type="number" pattern="[0-9]*" v-model="dealprice" style="text-align:right" class="cell-input" placeholder="请设置单价" autocomplete="off" />
                                      </div>
                                  </div>
                              </div>
                      
                        </div>
                         <button type="button" class="btn-block rechargeaffirmbtn" @click="enterbuy">确定出售</button>
                         <section class="guadanrules">
                           <h1>挂单出售规则：</h1>
                           <ul>
                             <li>1、出售总数不得超过您的持有总量 </li>
                             <li>2、出售中的树苗不再产生阳光收益 </li>
                             <li>3、系统将收取1%的佣金作为交易手续费</li>
                           </ul>
                         </section>
                  </div>
        </div>
        <!-- 挂单确认弹窗 -->
        <div class="mask-black-dialog" id="YDUI_CONFRIM" v-show="dialogshow">
          <div class="m-confirm">
            <div class="confirm-hd"><strong class="confirm-title">挂单确认</strong></div>
            <div class="confirm-bd">出售内容: <em class="bluetext">树苗</em></div>
            <div class="confirm-bd">出售总量: <em class="bluetext">{{dealnum}}棵</em></div>
            <div class="confirm-bd">树苗单价: <em class="bluetext">{{dealprice}}BGT</em></div>
            <div class="confirm-ft">
              <a
                href="javascript:;"
                class="confirm-btn default"
                @click="hide">取消</a>
              <a
                href="javascript:;"
                class="confirm-btn primary"
                @click="orderentrer"
              ><em class="bluetext">确定</em></a>
            </div>
          </div>
        </div>
</section>
</template>
<script>
export default {
  name: "deal",
  data() {
    return {
      userphoto: require("../assets/notuserphoto.png"),
      userName: "珠穆拉玛",
      tabactive: true,
      tabactive2: false,
      dialogshow: false,
      dealstate:0,            //挂单交易状态0为出售 1为购买
      dealnum:'',             //交易数量
      dealprice:'',           //交易单价
      allnum:'350',              //全部树苗总量

    };
  },
  methods: {
      saletab:function(type){
        if(type==0){
           this.tabactive=true;
            this.tabactive2=false;
            this.dealstate=0;
            this.dealprice='';
            this.dealnum='';
        }else if(type==1){
           this.tabactive=false;
          this.tabactive2=true;
          this.dealstate=1;
          this.dealprice='';
            this.dealnum='';
        } 
      },
      allsale:function(){
        this.dealnum=this.allnum;
      },
      enterbuy:function(){
          this.dialogshow=true;
      },
      hide:function(){
          this.dialogshow=false;
      },
      orderentrer:function(){
        this.$toast.text('点击了确定');
        this.dialogshow=false;
      }
  }
};
</script>
 <style scoped>
.seedcontain{padding: 0}
.tab-panel{background: none}
.m-cell:after{border: 0 !important}
</style>


