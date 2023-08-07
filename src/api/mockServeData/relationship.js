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
        return {
            message:'保存成功'
        }
    },

    get: (config) => {
        const { title } = param2Obj(config.url)
        console.log(title)//取到的文章名字信息，根据文章名拿出数据库里的data，link，category信息
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
                graphdata:[],
                graphcategories:[],
                graphlink:[]
                
            }
        }

    }
}