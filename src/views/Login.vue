<template>
  <div class="container">
    <el-main>
      <div class="title-img">
        <img src="../assets/picture/titleimg.png">
      </div>
      <div class="left-side-img">
        <img src="../assets/picture/loginbg.png">
      </div>
      <el-form
          label-width="70px"
          ref="form"
          :model="form"
          :rules="rules"
          v-show="showLoginForm"
          class="loginform"
          inline
      >
        <h3 class="login_title">系统登录</h3>
        <el-form-item prop="username" label="用户:">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码:" inline>
          <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <div></div>
        <el-form-item>
          <el-button type="primary" @click="submit" class="button">登录</el-button>
          <el-button type="primary" @click="goregister" class="button">注册</el-button>
          <br/><br/>
          <a>忘记密码？</a>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import {login} from '../api'

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
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
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

          login(this.form).then(({data}) => {

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

  .title-img {
    img {
      width: 450px;
      height: auto;
      margin-left: 200px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  .left-side-img {
    margin-top: 0px;
    width: 50px;
    height: 45px;
  }

  .loginform {
    width: 32%;
    height: 35%;
    border: solid 1px;
    border-color: #eaeaea;
    margin-top: 0px;
    margin-bottom: 0px;
<<<<<<< HEAD
    margin-left: 600px;
    margin-right: 100px;
=======
    margin-left: 800px;
>>>>>>> b712c9c838bb8205f759125c376d18f171ff03b5
    padding-left: 35px;
    padding-right: 40px;
    padding-top: 35px;
    padding-bottom: 15px;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    text-align: center;
    align-items: center;
    background-color: #fff; /* 将背景颜色修改为 #c28e8e */
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