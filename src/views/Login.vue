<template>
  <el-container class="container">
    <el-header></el-header>
    <el-row class="row">
      <el-col class="left" :span="15">
        
          <img class="title-img" src="../assets/picture/titleimg.png" >
          <img class="left-side-img animate__animated animate__fadeInLeft" src="../assets/picture/loginbg.png">
        
      </el-col>
      <el-col :span="9" class="right">
        <el-form label-width="70px" ref="form" :model="form" :rules="rules" v-show="showLoginForm" class="loginform"
          inline>
          <h3 class="login_title">系统登录</h3>
          <el-form-item prop="username" label="用户:">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码:" inline>
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <div></div>
          <el-form-item>
            <el-button type="primary" @click="submit" class="button">登录</el-button>
            <el-button type="primary" @click="goregister" class="button">注册</el-button>
            <br /><br />
            <a>忘记密码？</a>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </el-container>
</template>

<script>
import Cookie from 'js-cookie';
import { login } from '../api';
import 'animate.css';

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
      },
      showLoginForm: true
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
            } else {

              this.$message.error(data.message);
            }
          })
        }
      })
      //跳转到首页
      //this.$router.push('/home')
    },
    goregister() {
      this.$router.push('/register');
    }
  }
}
</script>
<style lang="less" scoped>
.container {

  background-color: #dfeffa;
  height: 100%;
  width: 100%;

  .el-row {
    height: 82%;
    width: 100%;
    .left {
      padding-left: 7%;
      height: 100%;
      
      .title-img {
        object-fit: cover;
        padding-left: 10%;
        padding-right: 10%;
        width: 80%;
        height: 20%;
      }

      .left-side-img {
        object-fit: cover;
        width: 100%;
        height: 80%;

      }
    }

    .right {
      padding-right: 7%;
      padding-top: 5%;
      height: 100%;

      .loginform {
        width: 83%;
        height: 80%;
        border: solid 1px;
        border-color: #eaeaea;
        padding-left: 0;
        padding-right: 0;
        padding-top: 35px;
        padding-bottom: 15px;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        
        text-align: center;
        align-items: center;
        background-color: #fff;
      }
    }

  }


  .el-header {
    height: 18%;
    width: 100%;
  }




  .login_title {

    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }

  .el-input {
    width: 100%;

  }

  .button {
    margin-top: 10px;
    margin-right: 25px;
    margin-left: 40px;
  }
}
</style>