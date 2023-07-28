import Mock from 'mockjs'


let List = []
export default {
  //统计数据
  getManageData:()=>{
    return {
      user:100,//用户总数
      manager:5,//管理员总数
      article:248,//文章总数
    }
  },
  
  // 图表数据
  getUserAge: () => {
    return [10,20,15,45,5,12]
    //数组中的6个数分别代表用户年龄层次10~19、20~19、。。。60~69
  },
  getUserCategory:()=>{
    return{
      active:55,//活跃用户数，上次登录时间在一个月以内
      normal:30,//一般用户数，上次登录时间在6个月以内
      die:24,//流失用户，上次登录时间在6个月以上
    }
  },
  getUserSex:()=>{
    return{
      male:50,//男性用户数量
      female:50,//女性用户数量
    }
  }
}


