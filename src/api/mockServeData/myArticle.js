import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
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

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            article_name: Mock.Random.ctitle(),
            state: Mock.Random.integer(0, 1),//状态：0表示更新中，1表示已完成
            tags: Mock.mock({
                'array|1-3': ['@integer(1, 7)']
            }).array, // 生成一个包含 1 到 3 个随机整数的数组
        })
    )
}


export default {
    //统计数据
    getLabels:()=>{
      return [
        {
            name:'悬疑推理',  //标志数字是1
            value:10
        },
        {
            name:'都市情感',//标志数字是2
            value:3
        },
        {
            name:'青春校园',//标志数字是3
            value:3
        },
        {
            name:'古风穿越',//标志数字是4
            value:15
        },
        {
            name:'恐怖惊悚',//标志数字是5
            value:5
        },
        {
            name:'科幻玄幻',//标志数字是6
            value:5
        },
        {
            name:'社会伦理',//标志数字是7
            value:8
        },
      ]
    },
    getArticleList:(config) => {
        console.log(config);
        const { name, page = 1, limit = 20 } = param2Obj(config.url);
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit);
        const mockList = List.filter((article) => {
            if (name && article.article_name.indexOf(name) === -1 && article.tags.indexOf(name) === -1) {
                return false;
            }
            return true;
        });
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        };
    },
}