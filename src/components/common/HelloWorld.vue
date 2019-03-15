<template>
  <div class="hello">
    <!-- sweiper -->
    <nut-swiper
            direction="horizontal"
            ref="demo3"
            :loop="true"
            :canDragging="false"
            :paginationVisible="true" >
            <div  class="nut-swiper-slide gray" >
                <span>page 1</span>
            </div>
            <div  class="nut-swiper-slide gray_1" >
                <span>page 2</span>
            </div>
            <div  class="nut-swiper-slide gray" >
                <span>page 3</span>
            </div>
            <div  class="nut-swiper-slide gray_1" >
                <span>page 4</span>
            </div>
        </nut-swiper>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
    data(){
      return{

      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
