import http from "@/utils/request";

//请求首页数据
export const getData = () =>{
    //返回promise对象
    return http.get('home/getData')
}
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



export const test = (data) =>{
    return http.get('/user',data)
}
export const test2 = (data) =>{
    return http.post('/user',data)
}

