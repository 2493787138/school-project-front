import http from "@/utils/request";
import { data } from "jquery";
//test
export const test = (data) =>{
    return http.post('/test',data)
}

//login
export const login = (data) =>{
    return http.post('/login/login',data)
}

// register (假设后端接口中的 gender 参数是字符串类型
export const register=(data)=> {
    return http.post('/login/register',data)
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
export const getUser = (params) =>{
    return http.get('/user/getUser/',params)
}

export const addUser = (data) =>{
    return http.post('/user/add',data)
}

export const editUser = (data) =>{
    return http.patch('/user/edit',data)
}

export const delUser = (data) =>{
    return http.delete('/user/del',data)
}
export const getUserPassword = () =>{
    return http.get('/user/getUserPassword')
}
export const editUserPassword = (data) =>{
    return http.post('/user/editUserPassword',data)
}

//myArticle
export const getLabels =()=>{
    return http.get('/myArticle/getLabels')
}

export const getArticle =()=>{
    return http.get('/myArticle/getArticle')
}


//Timeline
export const saveTimeline = (data) =>{
    return http.post('/timeline/save',data)
}

export const getTimeline =(data)=>{
    return http.get(`/timeline/get/`,data)
}


//chx


//