<template>
<section>
        <div class="seedcontain seedbg">
                   <div class="seedWcontainr">
                        <div class="tab-panel-item">
                              <div class="m-cell seedWbg">
                                    <section class="cellLR bottborl">
                                      <span class="left_cell" style="flex:1"><span class="sellIcon margr10"><img src="../assets/icon-chushou@2x.png" /></span>出售树苗</span>
                                     
                                      <span class="right_cell" style="flex:1">2019-02-08 18:06:32</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">单价</span>
                                        <span class="right_cell" style="flex:1">10BGt/棵</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">出售总量</span>
                                        <span class="right_cell" style="flex:1">100</span>
                                    </section>
                                    <section class="cellLR bottborl">
                                        <span class="left_cell" style="flex:1">已出售量</span>
                                        <span class="right_cell" style="flex:1">23</span>
                                    </section>
                                     <section class="cellLR ">
                                        <span class="left_cell" style="flex:1"></span>
                                        <span class="right_cell bluetext" style="flex:1"><strong @click="cancelorder">撤销挂单</strong></span>
                                    </section>
                                    <section class="backout"><img src="../assets/img-wancheng@2x.png" /></section>
                              </div>
                              <div class="m-cell seedWbg">
                                    <section class="cellLR bottborl">
                                      <span class="left_cell" style="flex:1"><span class="sellIcon margr10"><img src="../assets/icon-goumai@2x.png" /></span>购买树苗</span>
                                      <span class="right_cell" style="flex:1">2019-02-08 18:06:32</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">单价</span>
                                        <span class="right_cell" style="flex:1">10BGt/棵</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">购买总量</span>
                                        <span class="right_cell" style="flex:1">100</span>
                                    </section>
                                    <section class="cellLR ">
                                        <span class="left_cell" style="flex:1">已购买量</span>
                                        <span class="right_cell" style="flex:1">23</span>
                                    </section>
                                    <section class="cellLR">
                                        <span class="left_cell" style="flex:1">初始保证金</span>
                                        <span class="right_cell" style="flex:1">100</span>
                                    </section>
                                     <section class="cellLR bottborl">
                                        <span class="left_cell" style="flex:1">当前保证金</span>
                                        <span class="right_cell" style="flex:1">100</span>
                                    </section>
                                     <section class="cellLR ">
                                        <span class="left_cell" style="flex:1"></span>
                                        <span class="right_cell bluetext" style="flex:1"><strong>撤销挂单</strong></span>
                                    </section>
                                    <section class="backout"><img src="../assets/img-chexiao@2x.png" /></section>
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
      buystate:0,       //订单状态0为出售，1位购买
    };
  },
  methods: {
     cancelorder:function(){
       this.$dialog({
        title: "确定撤销此订单？",
        content: "撤销后将无法继续交易",
         onOkBtn(event) {  //确定按钮点击事件
          this.$toast.text("你点击了确定");
          this.close(); //关闭对话框
        },
      });
     }
     
  }
};
</script>
 <style scoped>
.seedcontain{padding: 0}
.tab-panel{background: none}
.m-cell:after{border: 0 !important}
</style>


