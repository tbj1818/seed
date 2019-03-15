<template>
    <section>
        <nut-navbar 
            @on-click-back="back" 
            @on-click-title="title" 
            @on-click-more="more" 
            :leftShow="true" 
            :rightShow="true">demo</nut-navbar>
    </section>
</template>
<script>
export default {
    methods:{
        back(){
             this.$toast.text('header头部， 点击返回');
        },
        title(){
             this.$toast.text('header头部， 点击title');
        },
        more(){
             this.$toast.text('header头部， 点击更多');
        }
    }     
}
</script>
<style>

</style>


