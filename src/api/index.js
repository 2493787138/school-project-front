import http from "@/utils/request";
import { data } from "jquery";

//login
export const login = (data) =>{
    return http.post('/login/login',data)
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
    return http.get('/user\/getUser/',params)
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

//myArticle
export const getLabels =()=>{
    return http.get('/myArticle/getLabels')
}

//Timeline
export const saveTimeline = (data) =>{
    return http.post('/timeline/save',data)
}


//chx


//