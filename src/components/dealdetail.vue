<template>
<section>
        <div class="seedcontain seedbg">
                   <div class="seedWcontainr">
                        <div class="tab-panel-item">
                              <div class="m-cell seedWbg">
                                   <section class="succeedicon">
                                     <img src="../assets/icon-chenggong @2x.png" />
                                     <p>交易成功</p>
                                   </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" v-if="buystate==0" style="flex:1">买家</span>
                                        <span class="left_cell" v-if="buystate==1" style="flex:1">卖家</span>
                                        <span class="right_cell" style="flex:1">微信昵称</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">单价</span>
                                        <span class="right_cell" style="flex:1">10BGT/棵</span>
                                    </section>
                                    <section class="cellLR">
                                        <span class="left_cell" style="flex:1">订单号</span>
                                        <span class="right_cell" style="flex:1">OTC12345678915432145</span>
                                    </section>
                                    <section class="cellLR">
                                        <span class="left_cell" style="flex:1">订单时间 </span>
                                        <span class="right_cell" style="flex:1">2019-02-08 18:06:32</span>
                                    </section>
                                     <section class="cellLR">
                                        <span class="left_cell" style="flex:1">总价 </span>
                                        <span class="right_cell" style="flex:1">1000BGT</span>
                                    </section>
                              </div>
                              <div class="m-cell seedWbg">
                                <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">购买树苗数量</span>
                                        <span class="right_cell blacktext" style="flex:1">200棵</span>
                                    </section>
                              </div>
                        
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
      buystate:GetQueryString('buystate'),       //订单状态0为出售，1位购买
    };
  },
  methods: {
     getlist:function(){
            
     }
  },
   mounted:function(){
        this.getlist()
   }
};
</script>
 <style scoped>
.seedcontain{padding: 0}
.tab-panel{background: none}
.m-cell:after{border: 0 !important}
</style>


