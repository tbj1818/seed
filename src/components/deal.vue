<template>
<section>
        <div class="seedcontain seedbg">
                <ul class="tab-nav">
                    <li class="tab-nav-item"  :class="tabactive?'tab-active':''" @click="saletab(0)"><a href="javascript:;">我要出售</a></li>
                    <li class="tab-nav-item"  :class="tabactive2?'tab-active':''" @click="saletab(1)"><a href="javascript:;">我要购买</a></li>
                </ul>

                   <div class="seedWcontainr">
                        <div class="tab-panel-item tab-active">
                              <div class="m-cell seedWbg">
                                <div class="cell-item">
                                    <div class="cell-left">出售内容</div>
                                    <div class="cell-right">农场树苗</div>
                                </div>
                                <div class="cell-item">
                                    <div class="cell-left">出售总数</div>
                                    <div class="cell-right">
                                      <input type="number" pattern="[0-9]*" style="text-align:right" class="cell-input" placeholder="请输入出售总量" autocomplete="off" />
                                    </div>
                                </div>
                                 <div class="cell-item">
                                    <div class="cell-left"></div>
                                    <div class="cell-right">
                                     我的树苗总量100  <span class="bluetext marl10">全部出售</span>
                                    </div>
                                 </div>
                              </div>

                              <div class="m-cell seedWbg">
                                  <div class="cell-item">
                                      <div class="cell-left">设置单价</div>
                                      <div class="cell-right">
                                        <input type="number" pattern="[0-9]*" style="text-align:right" class="cell-input" placeholder="请设置单价" autocomplete="off" />
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
      dialogshow: false
    };
  },
  methods: {
      saletab:function(type){
        if(type==0){
           this.tabactive=true;
            this.tabactive2=false;
        }else if(type==1){
           this.tabactive=false;
          this.tabactive2=true;
        } 
      },
      enterbuy:function(){
          this.dialogshow=true;
      },
      hide:function(){
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


