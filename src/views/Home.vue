<template>
  <div class="div">
    <!-- 编辑用户信息弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form ref="form" inline :model="form" label-width="80px" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <!-- prop与rule中字段一致用于校验 -->
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-DD">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog title="提示" :visible.sync="pswdialogVisible" width="50%" :before-close="handleClose_psw">
      <!-- 密码 -->
      <el-form ref="pswform" inline :model="pswform" label-width="80px" :rules="pswrules">
        <el-form-item label="原密码" prop="old_password">
          <!-- prop与rule中字段一致用于校验 -->
          <el-input placeholder="请输入原密码" v-model="pswform.old_password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input placeholder="请输入新密码" v-model="pswform.new_password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="NEW_password">
          <el-input placeholder="请再次输入新密码" v-model="pswform.NEW_password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose_psw">取 消</el-button>
                <el-button type="primary" @click="submit_psw">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 用户为作者时 -->
    <el-container v-if="$store.state.tab.user.role == 1" class="container">
      <!-- 名片框 -->
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
            <p>性别：<span>{{ $store.state.tab.user.gender }}</span></p>
            <p>出生日期：<span>{{ $store.state.tab.user.birthdate }}</span></p>
            <p>作品数：</p>
            <el-button type="primary" class="button" @click="handleEdit">
              编辑资料
            </el-button>
            <br><br>
            <el-button type="primary" class="button" @click="handleEdit_psw">
              修改密码
            </el-button>
          </div>
        </el-card>
        <el-card class="note">

        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="graph">
          <rada_capacity></rada_capacity>
        </el-card>
      </el-col>
    </el-container>

    <!-- 用户为管理员时 -->
    <el-row v-if="$store.state.tab.user.role == 0">
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

              <span class="desc">{{ item.name }}:</span>
              <span class="price">{{ item.value }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div class="bottombox" v-if="$store.state.tab.user.role == 0">

      <el-card>
        <user_category></user_category>
      </el-card>
      <el-card>
        <user_sex></user_sex>
      </el-card>
      <el-card>
        <user_age></user_age>
      </el-card>

    </div>
  </div>
</template>
<script>
import user_sex from '../components/graph/users-category.vue'
import user_category from '../components/graph/users-sex.vue'
import user_age from '../components/graph/users-age.vue'
import rada_capacity from '../components/graph/rada-capacity.vue'
import {addUser, editUser, editUserPassword, getUserPassword} from "@/api";

export default {
  components: {
    user_category,
    user_sex,
    user_age,
    rada_capacity,
  },
  data() {
    return {
      dialogVisible: false,
      pswdialogVisible: false,
      form: {
        name: '',
        age: '',
        birth: '',
        sex: '',
      },
      pswform: {
        old_password: '',
        new_password: '',
        NEW_password: '',
      },
      rules: {
        name: [
          {
            message: '请输入姓名'
          }
        ],
        age: [
          {
            message: '请输入年龄'
          }
        ],
        sex: [
          {
            message: '请选择性别'
          }
        ],
        birth: [
          {
            message: '请选择出生日期'
          }
        ],

      },
      pswrules: {

        old_password: [
          {
            required: true,
            message: '请输入原密码'
          }
        ],
        new_password: [
          {
            required: true,
            message: '请输入新的密码'
          }
        ],
        NEW_password: [
          {
            required: true,
            message: '请再次输入新的密码'
          }
        ],
      },
      countData: [
        {
          name: '用户总数',
          value: 100,
          icon: 'user',
          color: '#2ec7c9'
        },
        {
          name: '管理员总数',
          value: 100,
          icon: 'user-solid',
          color: 'lightblue'
        },
        {
          name: '用户作品总数',
          value: 100,
          icon: 'folder',
          color: '#2ec7c9'
        },
        {
          name: '功能模块数',
          value: 3,
          icon: 's-opportunity',
          color: 'lightblue'
        },
      ]

    }
  },
  methods: {

    handleClose() {
      //关闭编辑资料弹窗时清空弹窗内容
      this.$refs.form.resetFields();
      this.dialogVisible = false

    },
    handleClose_psw() {
      //关闭修改密码弹窗时清空弹窗内容
      this.$refs.pswform.resetFields();
      this.pswdialogVisible = false

    },
    handleEdit() {
      // 将form对象的属性设置为当前页面的数据
      this.form.name = this.$store.state.tab.user.username;
      this.form.age = this.$store.state.tab.user.age;
      this.form.sex = this.$store.state.tab.user.sex;
      this.form.birth = this.$store.state.tab.user.birth;

      this.dialogVisible = true;
    },
    handleEdit_psw() {
      this.pswdialogVisible = true
    },
    submit() {

      this.$refs.form.validate((valid) => {
        if (valid) {

          editUser(this.form).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            //刷新数据
            this.$store.commit('refreshUser')
          })
        } else {
          this.$message.error('修改失败');
        }
        this.handleClose()

      })
    },
    submit_psw() {
      this.$refs.pswform.validate((valid) => {
        if (valid) {
          // 验证原密码是否正确
          if (this.pswform.old_password !== getUserPassword()) {
            this.$message.error('原密码不正确!');
            return;
          }
          // 验证新旧密码是否相同
          if (this.pswform.new_password === this.pswform.old_password) {
            this.$message.error('新密码不能与原密码相同!');
            return;
          }
          // 验证确认新密码是否与新密码相同
          if (this.pswform.new_password !== this.pswform.NEW_password) {
            this.$message.error('两次新密码不相同!');
            return;
          }
          editUserPassword(this.pswform.new_password).then(() => {
            this.$message({
              type: 'success',
              message: '修改密码成功!'
            });
            //退出系统，重新登录
            this.$router.push('/login');
          })
        } else {
          this.$message.error('修改失败');
        }
        this.handleClose_psw()

      })
    },
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
    this.$store.commit('refreshUser')

  },

}
</script>
<style lang="less" scoped>
.div {
  height: 100%;
  width: 100%;
}

.container {
  height: 100%;
  width: 100%;

  .graph {
    width: 98%;
    height: 631px;
  }

  .note {
    margin-top: 15px;
    margin-right: 15px;
    width: 96%;
    height: 28%;

  }
}

.user-card {
  margin-right: 15px;
  height: 67%;

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

    .button {
      width: 100%;

    }
  }
}


.num {
  margin-right: 15px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 49%;
    margin-bottom: 15px;
    padding: 0;

  }

  i {
    width: 124px;
    height: 124px;
    font-size: 30px;
    text-align: center;
    line-height: 124px;
    color: white;
  }

  .detail {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    flex-direction: row;
    width: 100%;
    align-items: center;

    .price {
      font-size: 28px;

      height: 28px;
      line-height: 28px;
      width: 50%
    }

    .desc {
      margin-left: 5%;
      width: 45%;
      font-size: 23px;
      color: #999999;
      text-align: left;

    }
  }

}

.bottombox {
  display: flex;

  .el-card {
    margin-right: 15px;
  }
}
</style>