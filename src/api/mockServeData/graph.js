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
        console.log(req, 'name')
        const { username } = param2Obj(req.url)
        console.log(username)
        return {
            ArticleName: ['霸道总裁爱上我', '穿越成一只猪']

        }
    },

    //删除表里所有关于该用户该文章的记录，并保存发送过来的记录，如果tale是timeline就是对时间线表的操作，是relationship就是对角色关系表的操作
    save: (data) => {
        console.log(data, 'save')
        return true
    },

    //拿到表所有关于该用户该文章的记录,如果tale是timeline就是对时间线表的操作，是relationship就是对角色关系表的操作
    get: (config) => {
        const { title, username, table } = param2Obj(config.url)
        console.log(title, username, table)
        if (table == 'timeline') {
            if (title == '霸道总裁爱上我') {
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
            else {
                return {
                    data: [
                        { id: 1, text: '啾咪', start_date: '15-04-2023', duration: 3, color: '' },
                    ],
                }
            }
        }

        else {
            if (title == '霸道总裁爱上我') {
                return {
                    graphdata: [
                        {
                            name: '肖霸',//name必须是唯一标识
                            attribute: {
                                sex: '男',
                                description: '帅气又霸道的一中肖霸，对厚小花情有独钟',
                                '身高': '161cm'
                            },
                            category: '主角',//节点分类index
                        },
                        {
                            name: '厚小花',//name必须是唯一标识
                            attribute: {
                                age: 15,//节点要展示的属性
                                num: 100,
                                sex: '女',
                                description: ''
                            },
                            category: '主角',//节点分类index
                        },
                        {
                            name: '小莲花',
                            attribute: {
                                age: 15,
                                num: 100,
                                sex: '女',
                                description: '女主的好朋友'
                            },
                            category: '同龄好友',
                        },
                    ],
                    graphcategories: [
                        {
                            name: '主角',
                            symbolSize: 80,//节点大小
                            itemStyle: {
                                color: '#E79DDE',
                            }
                        },
                        {
                            name: '同龄好友',
                            symbolSize: 60,//节点大小
                            itemStyle: {
                                color: '#C7F3D2',
                            }
                        },

                    ],
                    graphlink: [
                        {
                            source: '厚小花',//起点和终点与node中name对应
                            target: '小莲花',
                            name: '闺蜜',//提示文字
                            symbol: ['none', 'none']

                        }, {
                            source: '厚小花',
                            target: '肖霸',
                            name: '情侣',
                            symbol: ['none', 'arrow']
                        },
                        {
                            source: '肖霸',
                            target: '厚小花',
                            name: '死敌',
                            symbol: ['none', 'arrow']
                        },

                    ]
                }
            }
            else {//如果为空的话就传空数组
                return {
                    graphdata: [],
                    graphcategories: [],
                    graphlink: []

                }
            }
        }

    }


}
