<template>
  <router-view></router-view>
  
</template>

<script>
import { RouterView } from 'vue-router';


export default {
    name: "App",
    components: { RouterView }
}
</script>

<style lang="less" >

h3,p,div{
  margin: 0;
  padding: 0;
}
body,html{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
