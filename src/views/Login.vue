<template>
    <div class="container">
        <el-header>Header</el-header>
        <el-main>
            <el-form label-width="70px" ref="form" :model="form" :rules="rules" class="loginform" inline
                style="align-items: center;">
                <h3 class="login_title">系统登录</h3>
                <el-form-item prop="username" label="用户名:">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码:" inline>
                    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <div></div>
                <el-form-item>
                    <el-button type="primary" @click="submit" class="button">登录</el-button>
                    <el-button type="primary" @click="submit" class="button">注册</el-button>
                    <br><br>
                    <a>忘记密码？</a>

                </el-form-item>

            </el-form>
        </el-main>
    </div>
</template>
<script>
import Cookie from 'js-cookie';
import { login } from '../api'
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                //trigger何时校验，blur失去焦点时，change值改变时
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        submit() {
            //token信息
            //const token= Mock.Random.guid()
            //将token信息存入cookie用于不同页面间通信
            //Cookie.set('token',token)

            this.$refs.form.validate((valid) => {
                if (valid) {

                    login(this.form).then(({ data }) => {

                        if (data[0]) {
                            console.log(data[0])
                            Cookie.set('token', JSON.stringify(data[0]))
                            this.$message.success("登录成功");
                            //获取该权限的菜单数据存到store中        
                            this.$store.commit('setMenu')
                            this.$store.commit('addMenu', this.$router)
                            this.$router.push('/home')
                        }
                        else {

                            this.$message.error(data.message);
                        }
                    })
                }
            })
            //跳转到首页
            //this.$router.push('/home')
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    background-color: darkseagreen;
    height: 100%;
    width: 100%;

    .loginform {
        width: 20%;
        //height: 40%;
        border: solid 1px;
        border-color: #eaeaea;
        //margin: 180px auto;
        padding-left: 35px;
        padding-right: 35px;
        padding-top: 15px;
        padding-bottom: 5px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        box-sizing: border-box;
        text-align: center;
        align-items: center;

        .login_title {
            text-align: center;
            margin-bottom: 40px;
            color: #505458;
        }

        .el-input {
            width: 100%;

        }

        .button {
            margin-top: 15px;
            margin-right: 20px;
            margin-left: 20px;
        }
    }
}
</style>