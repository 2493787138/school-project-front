<template>
    <div class="main" id="main" @scroll="divScroll($event)" el>
        <el-button type="primary" @click="handleclick">点我一下</el-button>

    </div>
</template>
<script>
class Person{
    //构造函数
    constructor(name,age){
        this.name=name
    }
    //静态函数或属性
    static a=2
    //函数直接写
    sayHi()
    {}
    
}
export default {

    data() {
        return {

        }
    },
    methods: {

        handleclick(e) {
            console.log(a)
            console.log(b)
            console.log(name,'name')
            console.log(age,'age')
        }
    },
    mounted() {
        

    }
}
</script>
<style lang="less" scoped>
.main {
    height: 100%;
    //background-color: blueviolet;

}
</style>