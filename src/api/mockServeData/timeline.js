import Mock from 'mockjs'
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
    save: (data) => {
        //console.log(data,'save')
        return true
    },

    get: (config) => {
        const { title } = param2Obj(config.url)
        console.log(title)//取到的文章名字信息
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