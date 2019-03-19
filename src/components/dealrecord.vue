<template>
<section>
        <div class="seedcontain seedbg">
                <ul class="tab-nav">
                    <li class="tab-nav-item"  :class="tabactive?'tab-active':''" @click="saletab(0)"><a href="javascript:;">我出售的</a></li>
                    <li class="tab-nav-item"  :class="tabactive2?'tab-active':''" @click="saletab(1)"><a href="javascript:;">我购买的</a></li>
                </ul>

                   <div class="seedWcontainr">
                        <div class="tab-panel-item">
                          <router-link :to="{path: '/view/h5/app/seed/dealdetail?buystate=0'}">
                              <div class="m-cell seedWbg">
                                    <section class="cellLR bottborl">
                                      <span class="left_cell" v-if="buystate==0"  style="flex:1"><span class="sellIcon margr10"><img src="../assets/icon-chushou@2x.png" /></span>出售树苗</span>
                                      <span class="left_cell" v-if="buystate==1" style="flex:1"><span class="sellIcon margr10"><img src="../assets/icon-goumai@2x.png" /></span>购买树苗</span>
                                      <span class="right_cell" style="flex:1">2019-02-08 18:06:32</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">买家</span>
                                        <span class="right_cell" style="flex:1">微信昵称</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">单价</span>
                                        <span class="right_cell" style="flex:1">10BGT/棵</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">总价</span>
                                        <span class="right_cell" style="flex:1">1000BGT</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">手续费</span>
                                        <span class="right_cell" style="flex:1">12BGT 1%</span>
                                    </section>
                                    <section class="cellLR bottborl">
                                        <span class="left_cell" style="flex:1">订单号</span>
                                        <span class="right_cell" style="flex:1">OTC12345678915432145</span>
                                    </section>
                                     <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">数量<span class="blacktext">120</span></span>
                                        <span class="right_cell blacktext" style="flex:1">交易成功</span>
                                    </section>
                              </div>
                          </router-link>
                        </div>
                  </div>
                
        </div>
</section>
</template>
<script>
export default {
  name: "dealrecord",
  data() {
    return {
      tabactive: true,
      tabactive2: false,
      buystate:0,       //订单状态0为出售，1位购买
    };
  },
  methods: {
      saletab:function(type){
        if(type==0){
           this.tabactive=true;
            this.tabactive2=false;
            this.buystate =0;
        }else if(type==1){
           this.tabactive=false;
          this.tabactive2=true;
           this.buystate =1;
        } 
      },
     
  }
};
</script>
 <style scoped>
.seedcontain{padding: 0}
.tab-panel{background: none}
.m-cell:after{border: 0 !important}
</style>


