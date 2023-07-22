<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"><!-- 样式为黑底白字 -->
    <h3>{{isCollapse?'后台':'通用后台管理系统'}}</h3>
    <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name" @click="clickMenu(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path"
          @click="clickMenu(subItem)">
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>

    </el-submenu>
  </el-menu>
</template>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
  padding: 0;
  margin: 0;
}

.el-menu {
  padding: 0;
  margin: 0;
  height: 100vh;
  //height: 100%;
  border-right: none;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>

<script>
import jsCookie from 'js-cookie';

export default {
  data() {
    return {
      
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    //点击菜单路由跳转
    clickMenu(item) {
      //console.log(item.name)
      //当前页面路由与跳转的路由不一致时才允许跳转
      if (this.$route.path !== item.path &&
        !(this.$route.path === '/home' && (item.path === '/'))) {
        this.$router.push(item.path)//路由跳转的方法
      }
      this.$store.commit('selectMenu',item)


    }
  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    menuData(){
      //console.log(jsCookie.get('menu'),'jscookie')
      return JSON.parse(jsCookie.get('menu')) //|| this.$store.state.tab.menu
    }
  },
  mounted(){
    
  }
}
</script>