import Mock from 'mockjs'
import user from './user'
function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

export default {
    //根据用户名返回他所有的文章名
    getArticleName: (req) => {
        console.log(req,'name')
        const { username}=param2Obj(req.url)
        console.log(username)
        return {
            ArticleName:['霸道总裁爱上我','穿越成一只猪']

        }
    },

    //删除表里所有关于该用户该文章的记录，并保存发送过来的记录，如果tale是timeline就是对时间线表的操作，是relationship就是对角色关系表的操作
    save: (data) => {  
        console.log(data,'save')
        return true
    },
    
    //拿到表所有关于该用户该文章的记录,如果tale是timeline就是对时间线表的操作，是relationship就是对角色关系表的操作
    get: (config) => {
        const { title,username,table } = param2Obj(config.url)
        console.log(title,username,table)
        if(title=='霸道总裁爱上我'){
            return {
            data: [
                { id: 1, text: 'Task #1', start_date: '15-04-2023', duration: 3, color: '' },
                { id: 2, text: 'Task #2', start_date: '29-04-2023', duration: 3, color: '' },
                { id: 3, text: 'Task #2-1', start_date: '20-04-2023', duration: 3, parent: 1, color: 'black' }
            ],
            links: [
                //type0尾到头，type1头到头，type2尾到尾，type3头到尾
                { id: 1, source: 1, target: 2, type: '0' },
            ]
        }
        }
        else{
            return{
                data: [
                    { id: 1, text: '啾咪', start_date: '15-04-2023', duration: 3, color: '' },  
                ],
            }
        }
        
    }
}