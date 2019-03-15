<template>
  <div class="hello">
    <!-- sweiper -->
    <nut-swiper
            direction="horizontal"
            ref="demo3"
            :loop="true"
            :canDragging="false"
            :paginationVisible="true" >
            <div  class="nut-swiper-slide gray" v-for="(item,index) in imglist" :key="index" >
                <span><img :src="item.swiperpic" /></span>
            </div>
    </nut-swiper>
     <nut-noticebar 
      text="华为畅享9新品即将上市，活动期间0元预约可参与抽奖，赢HUAWEI WATCH等好礼，更多产品信息请持续关注！"
    ></nut-noticebar>
    <!-- tab -->
    <section  class="mart10">
            <ul class="tab-nav">
                <li class="tab-nav-item" :class="tabactive?'tab-active':''" @click="saletab(0)"><a href="javascript:;">购买树苗</a></li>
                <li class="tab-nav-item" :class="tabactive2?'tab-active':''"  @click="saletab(1)"><a href="javascript:;">出售树苗</a></li>
            </ul>
                <div class="tab-panel">
                        <div class="tab-panel-item tab-active">
                                <ul>
                                    <li class="seedlist">
                                        <h1><span class="userphoto"><img :src="userphoto" /></span><span class="userName">{{userName}}</span></h1>
                                        <section class="seedWbg">
                                            <div class="listcell">
                                                    <div class="cellLR">
                                                        <div class="left_cell">出售总数:10000</div>
                                                        <div class="right_cell">已成交：20笔</div>
                                                    </div>
                                                <p>剩余数量:666</p>
                                            </div>
                                            <section class="cellLR">
                                                <span class="left_cell">树苗售价:5BGT/棵</span>
                                                <span class="right_cell">
                                                    <nut-button  @click="clickHandler"
                                                    type="primary" 
                                                    shape="circle" 
                                                    small>
                                                    立即购买
                                                    </nut-button>
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
       <router-link :to="{path: '/view/h5/seed/deal'}">
          <div class="roundicon">
              <nut-icon 
              type="plus"  style="vertical-align:middle"
              color="#FFF"
            >
            </nut-icon>
            </div>
       </router-link>
  </div>
</template>

<script>
// import $ from 'jquery'
// setTimeout(() => {
//    $('.tab-nav li').click(function(){
//         $(this).addClass('tab-active').siblings().removeClass('tab-active');
//     }) 
// }, 300);

export default {
  name: "HelloWorld",
  data() {
    return {
     userphoto:require('../assets/notuserphoto.png'),
     userName:'珠穆拉玛',
     tabactive:true,
     tabactive2:false,
      imglist: [
        {
          swiperpic:
            "http://img.hb.aicdn.com/26b48e91203bb8c5ab691b0d36c5e45d3d5a594124f5d-IHM4Sb_sq320"
        },
        {
          swiperpic:
            "http://img.hb.aicdn.com/49487f55e242431df67f2abd36fbab96d37fbd6067372-k6fh1V_fw658"
        },
        {
          swiperpic:
            "http://img.hb.aicdn.com/ed14ef2d6c3078dd972d7eab7734dda8dc7a18d6293cde-RJ96J7_fw658"
        }
      ]
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
      clickHandler() {
           this.$router.push({path: '/view/h5/seed/seedBuy'});
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.nut-swiper img {
  width: 100%;
}

</style>
