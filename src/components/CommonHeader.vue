<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu" style="margin-right: 20px;" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <!-- <span class="text">首页</span> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item 
                v-for="item in tags" :key="item.path"  :to="{ path: item.path }" @click="clickBreadcrumb(item)" >
                    {{ item.label }}
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleclick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/picture/头像.jpg" alt="图片显示失败">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="out">退出</el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import jsCookie from 'js-cookie';
import { mapState } from 'vuex';
export default {
    data() {
        return {

        }
    },
    methods: {
        handleclick(command){
            if(command==='out')
            {
                this.logout()
                this.$router.push({name:'login'})
            }
                

        },
        //登出
        logout(){
            //console.log('执行登出')
            jsCookie.remove('token')
            jsCookie.remove('menu')
            this.$store.state.tab.user=''
            console.log(this.$store.state.tab.user,'loginout')
        },

        handleMenu() {
            this.$store.commit('collapseMenu')//调用store中的方法
            //调用store定义的方法
        },
        clickBreadcrumb(item) {
            console.log(111)
            if (this.$route.path !== item.path &&
                !(this.$route.path === '/home' && (item.path === '/'))) {
                    console.log('执行了')
                this.$router.push(item.path)
            }

        }

    },
    computed: {
        //从store中读取数据
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    mounted() {
        //console.log(this.tags, 'tags')
    }

}

</script>
<style lang="less" scoped>
.header-container {
    margin: 0;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between; //内容显示在两端
    align-items: center; //垂直居中
    padding-left: 20px;

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .r-content {
        margin-right: 10px;

        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .l-content {
        display: flex;
        align-items: center;

        /deep/.el-breadcrumb__item {
            
            .el-breadcrumb__inner {
                font-weight: normal;

                &.is-link {
                    color: #666
                }
            }

            &:last-child {

                //最后一个孩子
                .el-breadcrumb__inner {
                    color: #fff;
                }


            }

        }
    }
}</style>
