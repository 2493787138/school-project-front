import jsCookie from "js-cookie"
import { getMenu } from "@/api"
export default {
    state: {
        user:'',
        isCollapse: false, //控制菜单收起打开
        tabsList: [//面包屑,首页默认存在
            {
                path: '/',
                name: 'home',
                label: '我的主页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ],
        //store中的数据存在浏览器内存中，刷新就会删除
        menu: []

    },
    mutations: {
        //修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },

        //更新面包屑
        selectMenu(state, val) {
            //console.log(val,'val')
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                //如果不存在
                if (index === -1) {
                    state.tabsList.push(val)
                    //console.log(state.tabsList,'tablist')
                }
            }
        },

        //删除标签时删除tabsList里的数据
        closeTag(state, item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index, 1)

        },
        //防止刷新时vuex数据丢失
        refreshUser(state){
            if(jsCookie.get('token'))
            state.user=JSON.parse(jsCookie.get('token'))

        },

        //设置menu的数据
        setMenu(state, val) {
            const user=JSON.parse(jsCookie.get('token'))
            switch(user.role){
                case 0:
                    state.menu=[
                        {
                            path: '/home',
                            name: 'home',
                            label: '系统数据',
                            icon: 's-home',
                            url: 'Home.vue'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'User.vue'
                        },
                        {
                            path: '/opinion-collection',
                            name: 'opinion-collection',
                            label: '意见收集',
                            icon: 'message',
                            url: 'Option-collection.vue'
                        },
                        
                    ]
                    break;
                case 1:
                    state.menu=[
                        {
                          path: '/home',
                          name: 'home',
                          label: '我的主页',
                          icon: 's-home',
                          url: 'Home.vue'
                        },
                        {
                            label: '作品管理',
                            icon: 'folder-opened',
                            children: [
                              {
                                path: '/myArticle',
                                name: 'myArticle',
                                label: '我的作品',
                                icon: 'document',
                                url: 'MyArticle.vue'
                              },
                              {
                                path: '/ralationship',
                                name: 'relationship',
                                label: '人物关系图',
                                icon: 'setting',
                                url: 'Relationship.vue'
                              },
                              {
                                path: '/timeline',
                                name: 'timeline',
                                label: '故事时间线',
                                icon: 'setting',
                                url: 'Timeline.vue',
                              }
                            ]
                        },
                        {
                            label: '写作工具',
                            icon: 'edit',
                            children: [
                              {
                                path: '/sentence',
                                name: 'sentence',
                                label: '名人名句',
                                icon: 'chat-dot-square',
                                url: 'Sentence.vue'
                              },
                              {
                                path: '/words',
                                name: 'words',
                                label: '相关词',
                                icon: 's-release',
                                url: 'Words.vue'
                              },
                              
                            ]
                          }
                        
                      ]
                      break
            }
            
            
            //console.log(state.menu,'state')
            //cookie必须是字符创，用json转换
            jsCookie.set('menu', JSON.stringify(state.menu))
        },

        //动态注册路由
        addMenu(state, router) {
            const user=JSON.parse(jsCookie.get('token'))
            if (!jsCookie.get('menu')) {
                return
            }
            else {
                const menu = JSON.parse(jsCookie.get('menu'))
                state.menu = menu
                //组装动态路由的数据
                const menuArray = []
                menu.forEach(item => {
                    if (item.children) {
                        item.children = item.children.map(item => {
                            item.component = () => import(`../views/${item.url}`)
                            return item
                        })
                        menuArray.push(...item.children)
                    }
                    else{
                        item.component = () => import(`../views/${item.url}`)
                        menuArray.push(item)
                    }


                })
                //console.log(menuArray,'array')
                //路由的动态添加
                menuArray.forEach(item=>{
                    router.addRoute('Main',item)
                })
            }

        }



    }
}