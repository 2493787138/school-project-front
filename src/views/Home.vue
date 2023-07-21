<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-card class="user-card">
                    <div class="user">
                        <img src="../assets/picture/头像.jpg" alt="图片显示失败">
                        <div class="user-info">
                            <p class="name">{{ $store.state.tab.user.username }}</p>
                            <p class="access">{{ role }}</p>

                        </div>
                    </div>
                    <hr>
                    <div class="login-info">
                        <p>上次登录时间: <span>2023/6/11</span></p>
                        <p>上次登录地点: <span>上海</span></p>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <div class="num">
                    <el-card v-for="(item) in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                        <i :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                        <div class="detail">
                            <p class="price">￥{{ item.value }}</p>
                            <p class="desc">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>

            </el-col>
        </el-row>
        <!-- 用户为作者时 -->
        <div v-if=false>

        </div>
        <!-- 用户为管理员时 -->
        <div>
            <user_category></user_category>
            <user_sex></user_sex>
            <user_age></user_age>
        </div>
    </div>
</template>
<script>
import user_sex from '../components/graph/users-category.vue'
import user_category from '../components/graph/users-sex.vue'
import user_age from '../components/graph/users-age.vue'
export default {
    components: {
        user_category,
        user_sex,
        user_age
    },
    data() {
        return {

        }
    },
    computed: {
        role() {
            switch (this.$store.state.tab.user.role) {
                case 0:
                    return '系统管理员'
                    break
                case 1:
                    return '作者'
                    break
            }
        }

    },
    mounted() {
        console.log(this.$store.state.tab.user, 'user')
        //获取mock中的数据







    }
}
</script>
<style lang="less" scoped>
.user-card {

    .user {
        display: flex; //标签可以同一行显示
        align-items: center; //内容垂直居中
        padding-bottom: 20px;

        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin-right: 40px
        }

        hr {
            color: darkgray;
        }

        .user-info {
            .name {
                font-size: 32px;
                margin-bottom: 10px;
            }

            .access {
                color: darkgray;
            }
        }
    }

    .login-info {
        margin-top: 20px;

        p {
            color: darkgray;
            font-size: 14px;
            line-height: 28px;

            span {
                color: #666666;
                margin-left: 60px;

            }
        }
    }
}





.num {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-card {
        width: 32%;
        margin-bottom: 15px;
        padding: 0;

    }

    i {
        width: 70px;
        height: 70px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: white;
    }

    .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;

        .price {
            font-size: 28px;
            margin-bottom: 10px;
            height: 28px;
            line-height: 28px;

        }

        .desc {
            font-size: 14px;
            color: #999999;
            text-align: center;

        }
    }

}
</style>