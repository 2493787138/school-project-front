<template>
  <el-container class="container">
    <el-header></el-header>
    <el-row class="row">
      <el-col class="left" :span="15">

        <img class="title-img" src="../assets/picture/titleimg.png" >
        <img class="left-side-img animate__animated animate__fadeInLeft" src="../assets/picture/loginbg.png">

      </el-col>
      <el-col :span="9" class="right">
        <el-form label-width="70px" ref="registerForm" :model="registerForm" :rules="registerRules" v-show="showRegisterForm" class="registerform"
                 inline>
          <h3 class="register_title">系统注册</h3>
          <el-form-item prop="username" label="用户:">
            <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码:" inline>
            <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="birthdate" label="生日:">
            <el-date-picker v-model="registerForm.birthdate" type="date" placeholder="请选择出生日期" style="width: 209px;"></el-date-picker>
          </el-form-item>
          <el-form-item prop="gender" label="性别:">
            <el-radio-group v-model.number="registerForm.gender" style="width: 209px;">
              <el-radio :label="'男'">男</el-radio>
              <el-radio :label="'女'">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <div></div>
          <el-form-item>
            <el-button type="primary" @click="register" class="button">注册</el-button>
            <el-button type="primary" @click="clearForm" class="button">取消</el-button>
            <el-row>
              <el-col :span="24" style="text-align: center;">
                <el-button type="text" @click="returnloginform">返回登录页面</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </el-container>
</template>


<script>
import Cookie from 'js-cookie';
import {register} from '../api'

export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        birthdate: '',
        gender: ''
      },
      registerRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        birthdate: [
          {required: true,  message: '请选择出生日期',trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
      },
      showRegisterForm: true
    }
  },
  methods: {
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 将性别从字符串转换为数字
          this.registerForm.gender = this.registerForm.gender === '男' ? 0 : 1;
          this.registerForm.birthdate = this.registerForm.birthdate ? new Date(this.registerForm.birthdate).toISOString().substr(0, 10) : null;
          register(this.registerForm)
              .then(({data}) => {
                if (data.success) {
                  this.$message.success("注册成功，请登录");
                  this.$refs.registerForm.resetFields();
                } else {
                  this.$message.error(data.message);
                }
              })
              .catch(error => {
                this.$message.error(error.message);
              });
        }
      })
    },
    clearForm() {
      this.$refs.registerForm.resetFields();
    },
    returnloginform() {
      this.$router.push('/login');
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

      .registerform {
        width: 83%;
        height: 80%;
        border: solid 1px;
        border-color: #eaeaea;
        padding-left: 0;
        padding-right: 0;
        padding-top: 25px;
        padding-bottom: 30px;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        text-align: center;
        align-items: center;
        background-color: #fff;
      }
      .el-form-item{
        margin-top: 1%;
        margin-bottom: 3%;
      }
    }
  }

  .el-header {
    height: 18%;
    width: 100%;
  }

  .register_title {

    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }

  .el-input {
    width: 100%;

  }

  .button {
    margin-right: 25px;
    margin-left: 40px;
  }
}
</style>