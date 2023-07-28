import http from "@/utils/request";

//请求首页数据
export const getData = () =>{
    //返回promise对象
    return http.get('home/getData')
}
<<<<<<< HEAD
// 假设后端接口中的 gender 参数是字符串类型
export function register(registerForm) {
    return request({
        url: '/register',
        method: 'post',
        data: {
            username: registerForm.username,
            password: registerForm.password,
            age: registerForm.age,
            gender: String(registerForm.gender) // 将性别从数字转换为字符串
        }
    })
}

// 假设后端接口中的 gender 参数是字符串类型
export function register(registerForm) {
    return request({
        url: '/login/register',
        method: 'post',
        data: {
            username: registerForm.username,
            password: registerForm.password,
            age: registerForm.age,
            gender: String(registerForm.gender) // 将性别从数字转换为字符串
        }
    })
}

//managerHome
export const getUserAge = () =>{
    return http.get('/managerHome/getUserAge')
}

export const getUserSex = () =>{
    return http.get('/managerHome/getUserSex')
}

export const getUserCategory = () =>{
    return http.get('/managerHome/getUserCategory')
}

export const getManageData = () =>{
    return http.get('/managerHome/getManageData')
}

//User
=======
>>>>>>> b712c9c838bb8205f759125c376d18f171ff03b5
export const getUser = (params) =>{
    //console.log(params,'params')
    return http.get('/api\/user\/getUser/',params)
}

export const addUser = (data) =>{
    return http.post('/user/add',data)
    
}

export const editUser = (data) =>{
    return http.post('/user/edit',data)
}

export const delUser = (data) =>{
    return http.post('/user/del',data)
}

export const login = (data) =>{
    return http.post('/login/login',data)
}
// 假设后端接口中的 gender 参数是字符串类型
export function register(registerForm) {
    return request({
        url: '/register',
        method: 'post',
        data: {
            username: registerForm.username,
            password: registerForm.password,
            age: registerForm.age,
            gender: String(registerForm.gender) // 将性别从数字转换为字符串
        }
    })
}
export const test = (data) =>{
    return http.get('/user',data)
}
export const test2 = (data) =>{
    return http.post('/user',data)
}

//chx


//