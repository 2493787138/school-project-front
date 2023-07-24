import Mock from 'mockjs'
import ManagerHomeApi from './mockServeData/managerHome';
import userApi from './mockServeData/user';
import myArticleApi from './mockServeData/myArticle'

//定义mock请求拦截
//路径与index引入的路径相同，相当于给方法定义一个操作路径让index调用

Mock.mock(/api\/managerHome\/getUserAge/,'get',ManagerHomeApi.getUserAge)
Mock.mock(/api\/managerHome\/getUserSex/,'get',ManagerHomeApi.getUserSex)
Mock.mock('/api/managerHome/getUserCategory','get',ManagerHomeApi.getUserCategory)
Mock.mock('/api/managerHome/getManageData','get',ManagerHomeApi.getManageData)

Mock.mock('/api/myArticle/getLabels','get',myArticleApi.getLabels)

Mock.mock('/api/user/add','post',userApi.createUser)
Mock.mock('/api/user/edit','post',userApi.updateUser)
Mock.mock('/api/user/del','post',userApi.deleteUser)
Mock.mock(/api\/user\/getUser/,'get',userApi.getUserList)
//Mock.mock('/api/user/',userApi.batchremove)

