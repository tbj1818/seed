<template>
    <section>
        <nut-tabbar 
            @tab-switch="tabSwitch3" 
            :tabbarList="tabList3" 
            :bottom="true"
        >
        </nut-tabbar>
    </section>
</template>
<script>
export default {

    data(){
        return{
        tabList3:[
                {
                'tabTitle':'主页',
                'curr':true,
                'icon':'http://img13.360buyimg.com/uba/jfs/t1/29316/38/1115/3203/5c0f3d61E35d0c7da/9e557f2cb5c9dab6.jpg',
                'activeIcon':'http://img20.360buyimg.com/uba/jfs/t1/9996/36/8646/4833/5c0f3d61E7c1b7e0f/c98ad61124172e93.jpg',
                'href':'/view/h5/app/seed/index.html'
                },
                {
                'tabTitle':'挂单记录',
                'curr':false,
                'icon':'http://img12.360buyimg.com/uba/jfs/t1/25443/23/1062/4600/5c0f3d61E2e9f1360/c9b3421fe18614e2.jpg',
                'activeIcon':'http://img20.360buyimg.com/uba/jfs/t1/19241/12/1048/8309/5c0f3d61E17ed5a56/c3af0964cade47f8.jpg',
                'href':'/view/h5/app/seed/orderdetail/index.html'
                },
                {
                'tabTitle':'交易记录',
                'curr':false,
                'icon':'http://img20.360buyimg.com/uba/jfs/t1/20004/20/1045/3620/5c0f3d61Eaaec1670/9e59db63983b7b9f.jpg',
                'activeIcon':'http://img14.360buyimg.com/uba/jfs/t1/23967/14/1072/6714/5c0f3d61E0ad8991e/8f741953f6e38f15.jpg',
                'href':'/view/h5/app/seed/dealrecord/index.html'
                }
            ]
        }
    },
     methods:{
             tabSwitch3:function(value,index){
            this.$toast.text(index);
            },
     }  
}
</script>
<style>

</style>


