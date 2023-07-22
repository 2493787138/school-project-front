<template>
    <div>
        
        <el-container>
            <el-aside width="auto">
                <CommonAside/>
            </el-aside>
            <el-container>
                <el-header>
                    <CommonHeader />
                </el-header>
                <CommonTag></CommonTag>
                <el-main>
                    <!-- 路由出口 -->
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
    
</template>
<script>

import { RouterView } from 'vue-router';
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import CommonTag from '@/components/CommonTag.vue';


export default{
    data() {
        return {};
    },
    components: {
    CommonAside,
    CommonHeader,
    CommonTag,
    RouterView,
    CommonTag
}
}
</script>
<style>
.el-container{
    height: 100vh;
    
}
.el-aside{
    height: 100%;
}
.el-header{
    padding: 0;
    margin: 0;
}
.el-main{
    padding: 0;
    margin-left: 20px;
}
</style>

