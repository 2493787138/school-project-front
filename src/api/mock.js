import Mock from 'mockjs'
import ManagerHomeApi from './mockServeData/managerHome';
import userApi from './mockServeData/user';
import myArticleApi from './mockServeData/myArticle'
import graphApi from './mockServeData/graph';


//定义mock请求拦截
//路径与index引入的路径相同，相当于给方法定义一个操作路径让index调用

Mock.mock(/api\/managerHome\/getUserAge/,'get',ManagerHomeApi.getUserAge)//管理员登录后进入管理员主页时触发，刷新可触发（用户年龄图
Mock.mock(/api\/managerHome\/getUserSex/,'get',ManagerHomeApi.getUserSex)//管理员登录后进入管理员主页时触发，刷新可触发（用户性别图
Mock.mock('/api/managerHome/getUserCategory','get',ManagerHomeApi.getUserCategory)//管理员登录后进入管理员主页时触发，刷新可触发（用户活跃图
Mock.mock('/api/managerHome/getManageData','get',ManagerHomeApi.getManageData)//管理员登录后进入管理员主页时触发，刷新可触发（上方数据

Mock.mock('/api/myArticle/getLabels','get',myArticleApi.getLabels)
Mock.mock('/api/myArticle/getArticle','get',myArticleApi.getArticleList)

//管理员登录用户管理增删改查
Mock.mock('/api/user/add','post',userApi.createUser)
Mock.mock('/api/user/edit','patch',userApi.updateUser)
Mock.mock('/api/user/del','delete',userApi.deleteUser)
Mock.mock(/api\/user\/getUser/,'get',userApi.getUserList)//管理员登录后第一次进入用户管理和增删改查，重新拉取触发


Mock.mock(/api\/graph\/getArticleName/,'get',graphApi.getArticleName)//用户登录后，进入时间线或关系图触发，结果给到选择作品下拉框里
Mock.mock('/api/graph/save','post',graphApi.save)//时间线或关系图点击保存按钮时触发
Mock.mock(/api\/graph\/get/,'get',graphApi.get)//时间线或关系图选定作品后触发

