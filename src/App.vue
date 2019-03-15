<template>
  <div id="app">
    <!-- 顶部header -->
    <Header></Header>
   <router-view></router-view>
   <!-- 底部tabbar -->
    <Footer></Footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Index from './components/index.vue'
import Footer from './components/common/footer'
import Header from './components/common/header'

export default {
  name: 'app',
  data(){
    return{
    
    }
  },
    methods:{
     
    },
    components:{
        Footer,
        Header,
    },

}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
