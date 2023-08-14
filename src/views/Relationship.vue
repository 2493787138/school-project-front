<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <el-select v-model="article" placeholder="请选选择作品" class="select1" :popper-append-to-body="false"
                @change="chooseArticle">
                <el-option v-for="item in myArticle" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-button @click="newNode.open = true" type="primary" class="addNode" :disabled="disabled">添加角色</el-button>
            <el-button @click="newLink.open = true" type="primary" class="addNode" :disabled="disabled">添加关系</el-button>
            <!-- 类别管理 -->
            <el-popover placement="right" width="450" trigger="click" style="position: relative;"
                @after-leave="recreateGraph">
                <el-table :data="graphcategories">
                    <el-table-column width="150" property="name" label="类名">
                        <template slot-scope="scope2">
                            <el-input v-model="scope2.row.name" class="editCategory" @focus="temp = scope2.row.name"
                                @blur="editCategory(scope2.row.name)">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column width="150" property="symbolSize" label="节点大小">
                        <template slot-scope="scope2">
                            <el-input-number v-model="scope2.row.symbolSize" size="mini" :min="30"
                                :max="150"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column width="80" prop="" label="颜色">
                        <template slot-scope="scope2">
                            <el-color-picker v-model="scope2.row.itemStyle.color" @change="test"
                                size="small"></el-color-picker>
                        </template>
                    </el-table-column>
                    <el-table-column width="70" prop="" label="操作">
                        <template slot-scope="scope2">
                            <el-button icon="el-icon-delete" class="delete1"
                                @click="deleteCategory(scope2.row.name)"></el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <div class="buttons2">
                    <el-input v-model="newCategory.name"></el-input>
                    <button class="button" @click="addCategory">
                        <i class="el-icon-circle-plus-outline"></i>
                    </button>
                </div>
                <el-button slot="reference" type="primary" class="addNode" :disabled="disabled">类别管理</el-button>
            </el-popover>
            <!-- 大保存 -->
            <el-button @click="save" type="primary" class="save" :disabled="disabled">保存</el-button>
        </div>

        <!-- 关系图 -->
        <div ref="graph" id="main" style="width: 100%;height: 550px;">
        </div>
        <!-- 抽屉 -->
        <el-drawer title="" :visible.sync="drawer" :with-header="false" class="drawer" :before-close="handleClose">
            <div class="title">
                <el-input v-model="node.name" placeholder="请输入角色姓名" @change="nameChange"></el-input>
            </div>
            <div class="must-attribute">
                角色类别：<el-select v-model="node.category" placeholder="请选择角色分类">
                    <el-option v-for="item in graphcategories" :key="item.name" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="must-attribute">
                性别：
                <el-radio v-model="node.attribute.sex" label="男"><i class="el-icon-male"
                        style="color: cornflowerblue;"></i>男</el-radio>
                <el-radio v-model="node.attribute.sex" label="女"><i class="el-icon-female"
                        style="color: rgb(237, 100, 182);"></i>女</el-radio>
            </div>
            <div class="must-attribute">
                身份描述：
                <el-input type="textarea" maxlength="100" v-model="node.attribute.description">

                </el-input>
            </div>
            <div class="myattribute" v-for="(value, key) in node.attribute" v-if="key != 'sex' && key != 'description'">
                {{ key }}:
                <button class="delete" @click="deleteAttribute(key)"><i class="el-icon-close"></i></button>
                <el-input type="textarea" autosize placeholder="请输入内容" v-model="node.attribute[key]">
                </el-input>

            </div>
            <div class="buttons">
                <el-button @click="newAttribute.open = true" type="success" plain>+ 增加属性</el-button>
                <el-button @click="deleteLinkOrNode('node')" type="danger" plain>- 删除角色</el-button>
            </div>

        </el-drawer>

        <!-- 新增角色 -->
        <el-dialog width="30%" title="新角色" :visible.sync="newNode.open" @close="close(newNode)" class="dialog">
            <el-form ref="newNode" :model="newNode" label-width="110px" :rules="noderules">
                <el-form-item label="角色姓名:" prop="name">
                    <el-input v-model="newNode.name"></el-input>
                </el-form-item>
                <el-form-item label="角色分类:" prop="category">
                    <el-select v-model="newNode.category" placeholder="请选择角色分类">
                        <el-option v-for="item in graphcategories" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色性别:" prop="attribute.sex">
                    <el-radio v-model="newNode.attribute.sex" label="男"><i class="el-icon-male"
                            style="color: cornflowerblue;"></i>男</el-radio>
                    <el-radio v-model="newNode.attribute.sex" label="女"><i class="el-icon-female"
                            style="color: rgb(237, 100, 182);"></i>女</el-radio>
                </el-form-item>
                <el-form-item label="角色描述:" prop="description">
                    <el-input type="textarea" maxlength="100" v-model="newNode.attribute.description">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addNode">确 定</el-button>
                <el-button @click="close(newNode)">取消</el-button>
            </div>
        </el-dialog>


        <!-- 新增连接 -->
        <el-dialog :visible="newLink.open" :destroy-on-close="true" :append-to-body="true" width="30%"
            :title="editLink ? '编辑关系' : '新增关系'" class="dialog" @close="close(newLink)">
            <el-form ref="newLink" :model="newLink" label-width="110px" :rules="linkrules">
                <el-form-item label="源:" prop="source">
                    <el-select v-model="newLink.source" :disabled="editLink">
                        <el-option v-for="item in graphdata" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目标:" prop="target">
                    <el-select v-model="newLink.target" :disabled="editLink">
                        <el-option v-for="item in graphdata" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="newLink.name"></el-input>
                </el-form-item>
                <el-form-item label="关系类型:" prop="symbol">
                    <el-select v-model="newLink.symbol">
                        <el-option v-for="item in linkOption" :key="item.line" :label="item.line" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click="deleteLinkOrNode('link')" v-if="editLink">删 除</el-button>
                <el-button type="primary" @click="addLink">确 定</el-button>
                <el-button @click="close(newLink)">取 消</el-button>
            </div>
        </el-dialog>


        <!-- 新增属性 -->
        <el-dialog width="30%" title="请输入新增属性名" :visible.sync="newAttribute.open" class="dialog">
            <el-input v-model="newAttribute.key"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addAttribute">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as jquery from 'jquery';
import $ from 'jquery'
import * as echarts from 'echarts';
import { get, save,getArticleName } from '@/api'
var that
var chartDom;
var myChart;
var option;
var a = {
    num: 1
}
export default {
    data() {
        return {
            test: false,
            noderules: {
                name: [
                    { required: true, message: '姓名为必填项', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'change' }
                ],
                category: [
                    { required: true, message: '分类为必选项，若没有可选分类，请先在分类管理中添加', trigger: 'blur' },
                ],
                "attribute.sex": [
                    { required: true, message: '性别为必选项', trigger: 'change' }
                ]

            },
            linkrules: {
                source: [
                    { required: true, message: '源为必选项，若没有可选项，请先添加角色', trigger: 'blur' },
                ],
                target: [
                    { required: true, message: '目标为必选项，若没有可选项，请先添加角色', trigger: 'blur' },
                ],
                symbol: [
                    { required: true, message: '关系类型是必选项', trigger: 'blur' },
                ],


            },
            myArticle: ['霸道总裁爱上我', '我不爱吃饭'],
            article: '',
            temp: '',
            linkOption: [
                {
                    value: ['none', 'arrow'],
                    line: '—————————▶'
                },
                {
                    value: ['none', 'none'],
                    line: '——————————'
                }
            ],
            newAttribute: {
                key: '',
                open: false,
            },
            newNode: {
                open: false,
                name: '',
                category: '',
                attribute: {
                    sex: '',
                    description: ''
                }
            },
            newLink: {
                target: '',
                source: '',
                symbol: '',
                name: '',
                open: false
            },
            newCategory: {
                open: false,
                name: '啊啊啊',
                symbolSize: '',//节点大小
                itemStyle: {
                    color: '',
                }
            },
            editLink: false,
            clickNodeIndex: -1,//当前点击的节点的index
            node: {
                name: '',
                category: '',
                attribute: {
                    sex: '',
                    description: ''
                },
            },
            direction: 'rtl',
            drawer: false,
            graphdata: [],
            graphcategories: [],
            graphlink: []

        }
    },
    computed: {
        disabled() {
            if (this.article == '')
                return true
            else
                return false
        }
    },

    methods: {

        //角色操作
        addNode() {
            this.$refs.newNode.validate((valid) => {
                if (valid) {
                    this.newNode.open = false
                    var newArray = $.extend(true, [], this.newNode);
                    delete newArray.open
                    this.graphdata.push({ ...newArray })
                    this.recreateGraph()
                }
                else {

                }

            })

        },
        //关系操作

        addLink() {

            this.$refs.newLink.validate((valid) => {
                if (valid && !this.editLink) {
                    console.log("新增")

                    var newLink = $.extend(true, [], this.newLink)
                    console.log(newLink, 'hi')
                    delete newLink.open
                    this.graphlink.push({ ...newLink })

                    console.log(this.graphlink, 'graphlink')
                    this.recreateGraph()
                    this.close(this.newLink)

                }
                else if (valid && this.editLink) {
                    console.log("编辑")
                    var newLink = $.extend(true, [], this.newLink)
                    delete newLink.open
                    this.graphlink[this.clickNodeIndex] = { ...newLink }
                    //console.log(this.graphlink, 'graphlink')
                    this.recreateGraph()
                    this.close(this.newLink)

                }
                else {
                }
            })

        },
        deleteLinkOrNode(type) {
            //console.log(this.clickNodeIndex)
            if (type == 'link') {
                this.graphlink.splice(this.clickNodeIndex, 1)
            }
            else if (type == 'node') {
                this.graphdata.splice(this.clickNodeIndex, 1)
            }
            this.recreateGraph()
            this.close(this.newLink)
        },


        //类别操作
        deleteCategory(category) {
            if (this.graphdata.some(function (item, index, arr) {
                return (item.category == category)
            })) {
                alert('该类别下还有角色，请确保没有角色了再删除该类别')
                return
            }
            let index = this.graphcategories.findIndex(element => element.name == category)
            this.graphcategories.splice(index, 1)
            //console.log(this.graphcategories)

        },
        addCategory() {
            this.newCategory.itemStyle.color = '#BB2121'
            this.graphcategories.push({ ...$.extend(true, [], this.newCategory) })
            this.newCategory.name = ''
        },
        editCategory(category) {
            //名字没有改变
            if (category == this.temp)
                return
            //有重名

            //名字改变了,将node对准
            this.graphdata.forEach(element => {
                if (element.category == this.temp) {
                    element.category = category
                }
            });
            //console.log(this.graphdata)
            //console.log(this.graphcategories)
        },
        //属性操作
        addAttribute() {
            if (this.newAttribute.key.trim() == '') {
                alert('属性名不得为空')
                return
            }
            let obj = {}
            obj[this.newAttribute.key] = ''
            Object.assign(this.node.attribute, obj)
            this.newAttribute.open = false
            this.newAttribute.key = ''
        },
        deleteAttribute(key) {
            delete this.node.attribute[key]
            this.drawer = false
            this.drawer = true
        },
        nameChange() {
            if (this.node.name == '') {
                alert('角色姓名不允许为空')
                return
            }
            //名字没有改变
            if (this.node.name == this.temp)
                return
            //有重名
            if (this.graphdata.some(function (item, index, arr) {
                return (item.name == that.node.name && that.clickNodeIndex != index)
            })) {
                alert('已有该命名的其他角色，不允许更改')
                return
            }
            //名字改变了,将link对准
            this.graphlink.forEach(element => {
                if (element.source == this.temp) {
                    element.source = this.node.name
                }
                if (element.target == this.temp) {
                    element.target = this.node.name
                }
            });
        },
        handleClose(done) {
            this.recreateGraph()
            done()
        },

        //保存所有修改到数据库
        save() {
            var data = {
                username:this.$store.state.tab.user.username,
                article:this.article,
                table:'relationship',
                graphdata: this.graphdata,
                graphlink: this.graphlink,
                graphcategories: this.graphcategories
            }
            save(data).then((res) => {
                this.$message({
                    message: res.data.message,
                    type: 'success'
                });

            })

        },

        chooseArticle() {
            get({ params: { title: this.article,username:this.$store.state.tab.user.username,table:'relationship' } }).then((res) => {
                //console.log(res.data.graphdata, 'res')
                console.log(res.data.graphcategories)
                this.graphdata = res.data.graphdata
                this.graphcategories = res.data.graphcategories
                this.graphlink = res.data.graphlink
                this.recreateGraph()

            })
        },
        clear(obj) {
            for (let key in obj) {
                if (!obj.hasOwnProperty(key)) return;//排除掉原型继承而来的属性
                if (typeof obj[key] == 'object' || typeof obj[key] == 'function') {
                    this.clear(obj[key]);//递归遍历属性值的子属性
                }
                else {
                    obj[key] = ''
                }
            }
        },
        close(obj) {
            this.clear(obj)
            obj.open = false
            this.editLink = false
        },

        clickNode(node) {
            this.drawer = true
            this.node = node
            this.temp = node.name
            //console.log(this.temp, 'temp')
        },
        clickLink(link) {

            this.newLink = {
                ...$.extend(true, [], link),
                open: false
            }
            this.editLink = true
            this.newLink.open = true

            // if (link.symbol.toString() == ['none', 'none'].toString())
            //     this.newLink.symbolnum = 2
            // else {
            //     this.newLink.symbolnum = 1
            // }
        },

        //重画图
        recreateGraph() {
            option.series[0].data = this.graphdata
            option.series[0].links = this.graphlink
            option.series[0].categories = this.graphcategories
            //console.log(option.series[0], '0')
            myChart = echarts.init(chartDom);
            myChart.setOption(option)

        }

    },
    mounted() {
        that = this
        window.clicknode = this.clickNode
        window.clicklink = this.clickLink
        chartDom = this.$refs.graph;
        chartDom.setAttribute('_echarts_instance_', '')
        myChart = echarts.init(chartDom);
        getArticleName({ params: { username: this.$store.state.tab.user.username } }).then((res) => {
            console.log(res)
            this.myArticle = res.data.ArticleName
        })


        //点击事件
        myChart.on('click', function (params) {
            that.clickNodeIndex = (params.dataIndex)
            if (params.dataType === 'node') {
                clicknode(option.series[0].data[params.dataIndex])
            }
            else {
                //console.log(params.data)
                clicklink(option.series[0].links[params.dataIndex])
            }
        });

        option = {
            // 图的标题
            title: {
                
            },
            // 提示框的配置
            tooltip: {
                formatter:
                    (params) => {

                        // 打印确认params是对象还是数组
                        if (params.dataType == 'node') {
                            let str = params.data.category
                            str += '<br/>'
                            str += params.data.attribute.description
                            return str
                        }
                        else {
                            return
                        }

                    }


            },
            // 工具箱
            toolbox: {
                // 显示工具箱
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                
                    myTool1: {
                        show: true,
                        title: "刷新",
                        icon:
                            "path://M512 981.333333c-209.866667 0-396.693333-126.026667-466.293333-314.08a35.52 35.52 0 0 1 23.626666-44.426666 38.613333 38.613333 0 0 1 48 20.693333c58.666667 158.933333 217.013333 265.493333 394.666667 265.6s336-106.666667 394.666667-266.133333a37.6 37.6 0 0 1 28.853333-23.626667 38.986667 38.986667 0 0 1 35.786667 11.946667 34.773333 34.773333 0 0 1 7.146666 35.36c-69.386667 188.373333-256.48 314.666667-466.453333 314.666666z m431.36-574.08a37.92 37.92 0 0 1-35.946667-24.266666C849.386667 222.56 690.613333 114.88 512 114.72S174.72 222.346667 116.746667 382.773333A38.72 38.72 0 0 1 69.333333 403.733333a35.786667 35.786667 0 0 1-24.106666-44.373333C113.333333 169.866667 301.013333 42.666667 512 42.666667s398.666667 127.306667 467.146667 316.96a34.56 34.56 0 0 1-4.906667 32.64 38.933333 38.933333 0 0 1-30.88 14.986666z",
                        onclick: () => {
                            console.log('刷新了')
                            that.recreateGraph()
 
                        },
                    },


                    // 保存为图片
                    saveAsImage: {
                        show: true,
                        title:'下载'
                    }
                }
            },
            legend: [{
                // selectedMode: 'single',
                data: this.graphcategories.map(function (a) {
                    return a.name;
                })
            }],
            series: [{
                type: 'graph', // 类型:关系图
                layout: 'force', //图的布局，类型为力导图
                symbolSize: 40, // 调整节点的大小
                roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [2, 10],//边宽和箭头大小

                force: {
                    repulsion: 2500,
                    edgeLength: [50, 500],
                    layoutAnimation: false
                },
                draggable: true,

                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20,
                        },
                        show: true,
                        formatter: function (x) {
                            return x.data.name;//边上的文字
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 20


                        }
                    }
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.4,
                    width: 3
                },

                // 数据
                data: this.graphdata,
                links: this.graphlink,
                categories: this.graphcategories,
            }]
        };
        myChart.setOption(option);
        //console.log(option.series[0].data,'data2')

    }
}


</script>
<style lang="less" scoped>
.header {
    margin: 18px;
    margin-left: 0;

    .addNode {
        margin-left: 15px;
    }

    .save {
        position: absolute;
        right: 15px;
    }



}

.dialog {
    /deep/.el-input {
        width: 221px;
    }
}

.delete1 {
    margin-left: 25px;
    border: 0;
    background-color: inherit;
    color: red;
    padding: 0;
    margin: 0;
}

.editCategory {
    /deep/.el-input__inner {
        width: 95%;
        height: 25px;
    }
}

.buttons2 {
    margin-top: 15px;
    position: relative;
    height: 30px;
    display: flex;
    align-items: center;

    /deep/.el-input__inner {
        width: 60%;
        height: 25px;
    }

    .button {
        position: absolute;
        right: 20px;
        margin: 10px;
        font-size: x-large;
        border: none;
        background-color: inherit;
        font-weight: 600;
        color: darkgrey;

        :hover {
            color: deepskyblue;
        }
    }
}

.drawer {
    .title {
        margin: 35px;

        /deep/.el-input__inner {
            font-size: 35px;
            font-weight: 700;
            font-family: 楷体;
        }
    }

    .must-attribute {
        margin: 15px 35px;
    }

    .myattribute {
        position: relative;
        margin: 8px 30px;
        padding: 7px 5px;
        border: solid lightsteelblue;

        .delete {
            border: none;
            background-color: white;
            position: absolute;
            right: 0;

            :hover {
                color: red;
            }
        }
    }

    .buttons {
        position: absolute;
        bottom: 25px;

        .el-button {
            margin: 15px 30px;
        }
    }

}
</style>