<template>
  <div class="hello">
    <!-- tab -->
    <section class="mart10">
      <ul class="tab-nav">
        <li
          class="tab-nav-item"
          :class="tabactive?'tab-active':''"
          @click="saletab(0)"
        ><a href="javascript:;">购买树苗</a></li>
        <li
          class="tab-nav-item"
          :class="tabactive2?'tab-active':''"
          @click="saletab(1)"
        ><a href="javascript:;">出售树苗</a></li>
      </ul>
      <div class="tab-panel">
        <div class="tab-panel-item tab-active">
          <ul>
            <li class="seedlist" v-for="(item,index) in buylist" :key="index">
              <h1>
                <span class="userphoto">
                  <img
                    :src="item.userPhoto" alt="用户头像" :onerror="errorImg01"/>
                </span>
                <span class="userName">{{item.userNickname}}</span></h1>
              <section class="seedWbg">
                <div class="listcell">
                  <div class="cellLR">
                    <div class="left_cell">出售总数:<span class="graytext">{{item.gameType}}</span></div>
                    <div class="right_cell">已成交:<span class="graytext">{{item.pourMoney}}笔</span></div>
                  </div>
                  <div class="cellLR">
                    <div class="left_cell">剩余数量:<span class="graytext">{{item.resultMoney}}</span></div>
                    <div class="right_cell"></div>
                  </div>
                </div>
                <section class="cellLR pad5">
                  <span class="left_cell">树苗售价:<strong class="greenText">{{item.pourMoney}}BGT/棵</strong></span>
                  <span class="right_cell">
                    <button
                      @click="clickHandler"
                      class="smallbuyBtn"
                    >立即购买</button>
                  </span>
                </section>
              </section>
            </li>
          </ul>
        </div>
        <div class="tab-panel-item">222222</div>
      </div>
    </section>
    <!-- 右下角添加 -->
    <router-link :to="{path: '/view/h5/app/seed/deal?token='+token}">
      <div class="roundicon">
          <img src="../assets/rightPlus.png" />
      </div>
    </router-link>
  </div>
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
  name: "HelloWorld",
  data() {
    return {
      web:this.GLOBAL.serverSrc,//直接通过this访问全局变量。,
      token:GetQueryString('token'),//头部获取。,
      userphoto: require("../assets/notuserphoto.png"),
      userName: "珠穆拉玛",
      errorImg01: 'this.src="' + require("../assets/notuserphoto.png") + '"',
      tabactive: true,
      tabactive2: false,
      getType:10,
      buylist:[{
        userphoto:'',
        userName:'低调的风',
        amount:10000,
        bargain:20,
        residue:200,
        sellingPrice:5

      }]
    };
  },
  methods:{
    saletab: function(type) {
      if (type == 0) {
        this.getType=10;
        this.tabactive = true;
        this.tabactive2 = false;
        this.getlist();
      } else if (type == 1) {
        this.getType=20;
        this.tabactive = false;
        this.tabactive2 = true;
        this.getlist();
      }
    },

    clickHandler() {
      this.$router.push({ path: "/view/h5/app/seed/seedBuy" });
    },
    getlist:function(){
      var that =this;
      console.log(that.web);
          this.$http.post(this.web+'/appGameUserRoom/getGameList', {
              token:this.token,
              getType:this.getType,
          }).then((data) => {
              console.log(data);
              this.buylist=data.data.data.dataList;
          }).catch((err) => {
              console.log(err);
          });
    },  
  },
  mounted:function(){
      this.getlist()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.nut-icon {
  width: 25px;
  height: 25px;
}
.nut-swiper img {
  width: 100%;
}
.tab-nav-item{color: #999}
</style>
