<template>
    <div class="tabs">
        <el-tag v-for="(item,index) in tags" 
         :key="item.path"
         :closable="item.name!=='home'" 
         :effect="$route.name===item.name ? 'dark':'plain'"
         @click="changMenu(item)"
         @close="handleClose(item,index)"
         size="small"
         >
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex';
export default {
    data(){
        return{

        }
    },
    methods:{
        //通过mapmutations获取store中的函数
        ...mapMutations(['closeTag']),
        //点击标签跳转页面
        changMenu(item){
            if(this.$route.name!==item.name)
            this.$router.push({name:item.name})
        },
        //删除标签
        handleClose(item,index){
            this.closeTag(item)
            const length=this.tags.length
            // console.log(length)
            // console.log(index)
            if(item.name !== this.$route.name){
                return
            }
            //删除的是最后一项,往前一项跳转
            if(index===length){
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }
            //删除的是中间项，往后一项跳转
            else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }

        }

    },

    computed:{
        ...mapState({//若返回的是对象就要用扩展函数加上...
            tags:state => state.tab.tabsList

        })
    }

}
</script>

<style lang="less" scoped>
.tabs{
    padding-left:20px;
    padding-top: 20px;
    padding-right:20px ;
    .el-tag{
        margin-right:  15px;
        cursor:pointer;//鼠标悬停的小手样式

    }
}
</style>