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
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          class="registerform"
          v-show="showRegisterForm"
          inline
      >
        <h3 class="register_title">系统注册</h3>
        <el-form-item prop="username" label="用户:">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码:">
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="birthdate" label="生日:">
          <el-date-picker v-model="registerForm.birthdate" type="date" placeholder="请选择出生日期" style="width: 209px;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="gender" label="性别:">
          <el-radio-group v-model.number="registerForm.gender" style="width: 209px;">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register" class="button">注册</el-button>
          <el-button type="primary" @click="showRegisterForm = false" class="button">取消</el-button>
          <el-row>
            <el-col :span="24" style="text-align: center;">
              <el-button type="text" @click="returnloginform">返回登录页面</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

    </el-main>
  </div>
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
          {required: true,  trigger: 'blur'}
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
          register(this.registerForm).then(({data}) => {
            if (data.success) {
              this.$message.success("注册成功，请登录");
              this.showRegisterForm = false;
            } else {
              this.$message.error(data.message);
            }
          })
        }
      })
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
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  .title-img {
    width: 450px;
    height: auto;
    margin-left: 200px;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .left-side-img {
    position: absolute;
    top: 32%;
    transform: translateY(-50%);
    width: 50px;
    height: 35%;
  }

    .register_title {
    text-align: center;
    margin-bottom: 20px;
    color: #505458;
  }

  .registerform {
    position: absolute;
    top: 53%;
    left: 82%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 65%;
    border: solid 1px;
    border-color: #eaeaea;
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

  .el-form-item {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .el-input {
    width: 100%;
  }

  .button {
    margin-top: 0px;
    margin-right: 25px;
    margin-left: 40px;
  }

}
</style>