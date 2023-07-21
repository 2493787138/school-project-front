import Mock from 'mockjs'
import homeApi from './mockServeData/home';
import userApi from './mockServeData/user';



//定义mock请求拦截
//路径与index引入的路径相同，相当于给方法定义一个操作路径让index调用
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)
Mock.mock('/api/user/add','post',userApi.createUser)
Mock.mock('/api/user/edit','post',userApi.updateUser)
Mock.mock('/api/user/del','post',userApi.deleteUser)
Mock.mock(/api\/user\/getUser/,'get',userApi.getUserList)
// Mock.mock('/api/user/',userApi.batchremove)

