<template>
  <section>
    <div class="seedcontain seedbg">
      <ul>
        <li class="seedlist">
          <h1><span class="userphoto"><img :src="userphoto" /></span><span class="userName">{{userName}}</span></h1>
          <h2>已成交20笔，共售出1000棵</h2>
          <section class="seedWbg">
            <div class="listcell">
              <div class="cellLR">
                <div class="left_cell">出售总数:</div>
                <div class="right_cell">10000</div>
              </div>
              <div class="cellLR">
                <div class="left_cell">剩余数量:</div>
                <div class="right_cell">10000</div>
              </div>
            </div>
            <section class="cellLR">
              <span class="left_cell">树苗售价:</span>
              <span class="right_cell">
                <strong class="greenText">10BGT/棵</strong>
              </span>
            </section>
          </section>
        </li>
      </ul>
      <div class="seedbuynum">
        <h1>购买数量</h1>
        <section class="buynum">
          <input
            type="number"
            pattern="[0-9]*"
            class="cell-input"
            placeholder="请输入购买数量"
            autocomplete="off"
          />
          <a
            href="javascript:;"
            class="btn btn-hollow"
          >全部购买</a>
        </section>
        <div class="cellLR">
          <div class="left_cell">最多可持有7000棵树</div>
          <div class="right_cell">BGT余额: <span class="graytext marl10"> 200.0152</span></div>
        </div>
      </div>
      <button
        type="button"
        class="btn-block btn_redgradual"
        @click="enterbuy"
      >确定购买</button>
    </div>
    <!-- 订单确认弹窗 -->
    <div class="mask-black-dialog" id="YDUI_CONFRIM" v-show="dialogshow">
      <div class="m-confirm">
        <div class="confirm-hd"><strong class="confirm-title">订单确认</strong></div>
        <div class="confirm-bd">购买数量: <em class="bluetext">10棵</em></div>
        <div class="confirm-bd">订单总价: <em class="bluetext">100BGT</em></div>
        <div class="confirm-ft">
          <a
            href="javascript:;"
            class="confirm-btn default"
            @click="hide"
          >取消</a>
          <a
            href="javascript:;"
            class="confirm-btn primary"
            @click="hide"
          ><em class="bluetext">确定</em></a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "seedBUy",
  data() {
    return {
      userphoto: require("../assets/notuserphoto.png"),
      userName: "珠穆拉玛",
      dialogshow: false
    };
  },
  methods: {
    enterbuy: function() {
      this.dialogshow = true;
    },
    hide: function() {
      this.dialogshow = false;
    }
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


