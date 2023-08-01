<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <el-select v-model="article" placeholder="请选选择作品" class="select1" :popper-append-to-body="false"
                @change="chooseArticle">
                <el-option v-for="item in myArticle" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-button @click="newNode.open = true" type="primary" class="addNode">添加角色</el-button>
            <el-button @click="addLink.open = true" type="primary" class="addNode">添加关系</el-button>
            <el-button @click="addCategory.open = true" type="primary" class="addNode">添加类别</el-button>
            <el-button @click="save" type="primary" class="save">保存</el-button>
        </div>

        <!-- 关系图 -->
        <div ref="graph" id="main" style="width: 100%;height: 550px;">
        </div>
        <!-- 抽屉 -->
        <el-drawer title="" :visible.sync="drawer" :with-header="false" class="drawer">
            <div class="title">
                <el-input v-model="node.name" placeholder="请输入角色姓名"></el-input>
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
            </div>

        </el-drawer>

        <!-- 新增角色 -->
        <el-dialog title="新角色" :visible.sync="newNode.open">
            <el-form ref="newNode" :model="newNode" label-width="80px">
                <el-form-item label="角色姓名:">
                    <el-input v-model="newNode.name"></el-input>
                </el-form-item>
                <el-form-item label="角色分类:">
                    <el-select v-model="newNode.category" placeholder="请选择角色分类">
                        <el-option v-for="item in graphcategories" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色性别:">
                    <el-radio v-model="newNode.attribute.sex" label="男"><i class="el-icon-male"
                            style="color: cornflowerblue;"></i>男</el-radio>
                    <el-radio v-model="node.attribute.sex" label="女"><i class="el-icon-female"
                            style="color: rgb(237, 100, 182);"></i>女</el-radio>
                </el-form-item>
                <el-form-item label="角色描述:">
                    <el-input type="textarea" maxlength="100" v-model="newNode.attribute.description">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addAttribute">确 定</el-button>
                <el-button @click="close(newNode)">取消</el-button>
            </div>
        </el-dialog>


        <!-- 新增连接 -->
        <el-dialog title="请输入新增属性名" :visible.sync="newAttribute.open">
            <el-input v-model="newAttribute.key"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addAttribute">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 新增类别 -->
        <el-dialog title="请输入新增属性名" :visible.sync="newAttribute.open">
            <el-input v-model="newAttribute.key"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addAttribute">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 新增属性 -->
        <el-dialog title="请输入新增属性名" :visible.sync="newAttribute.open">
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

var chartDom;
var myChart;
var option;
var a = {
    num: 1
}
export default {
    data() {
        return {
            myArticle: ['霸道总裁爱上我', '我不爱吃饭'],
            article: '',
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
                type: '',
                open: false
            },
            newCategory: {
                open: false,
                name: '',
                symbolSize: '',//节点大小
                itemStyle: {
                    color: '',
                }
            },
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
                        description:''
                    },
                    category: '主角',//节点分类index
                },
                {
                    name: '小莲花',
                    attribute: {
                        age: 15,
                        num: 100,
                        sex: '女',
                        description:'女主的好朋友'
                    },
                    category: '同龄好友',
                },



            ],
            graphcategories: [
                {
                    name: '主角',
                    symbolSize: 80,//节点大小
                    itemStyle: {
                        color: 'lightpink',
                    }
                },
                {
                    name: '同龄好友',
                    symbolSize: 60,//节点大小
                    itemStyle: {
                        color: 'lightgreen',
                    }
                },

            ],
            graphlink: [
                {
                    source: '厚小花',//起点和终点与node中name对应
                    target: '小莲花',
                    name: '闺蜜',//提示文字

                }, {
                    source: '厚小花',
                    target: '肖霸',
                    name: '情侣',
                },
            ]

        }
    },
    methods: {
        addNode() {

        },
        addLink() {

        },
        addCategory() {

        },
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
        save() {

        },

        chooseArticle() {

        },
        clear(obj) {
            for (let key in obj) {
                if (!obj.hasOwnProperty(key)) return;//排除掉原型继承而来的属性
                if (typeof obj[key] == 'object' || typeof obj[key] == 'function') {
                    this.clear(obj[key]);//递归遍历属性值的子属性
                }
                else{
                    obj[key]=''
                }
            }
        },
        close(obj) {
            this.clear(obj)
            console.log(obj)
            obj.open = false
        },

        click(node) {
            this.drawer = true
            this.node = node
        },

        //重画图
        recreateGraph() {
            option.series[0].data = this.graphdata
            myChart = echarts.init(chartDom).clear()
            myChart = echarts.init(chartDom)
            myChart.setOption(option, 'option');

        }

    },
    mounted() {
        var that = this
        window.clicknode = this.click
        chartDom = this.$refs.graph;
        myChart = echarts.init(chartDom);


        //点击事件
        myChart.on('click', function (params) {
            if (params.dataType === 'node') {
                clicknode(option.series[0].data[params.dataIndex])
                that.clickNodeIndex = (params.dataIndex)
            }
            else {
                console.log('点击了连接')
            }
        });

        option = {
            // 图的标题
            title: {
                text: 'ECharts 关系图'
            },
            // 提示框的配置
            tooltip: {
                formatter:
                    (params) => {

                        // 打印确认params是对象还是数组
                        if (params.dataType == 'node') {
                            let str = params.data.attribute.description
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
                    // 还原
                    restore: {
                        show: true,
                        click: () => {
                            console.log('刷新了')


                        },
                    },
                    // 保存为图片
                    saveAsImage: {
                        show: true
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
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20,
                        }
                    }
                },
                force: {
                    repulsion: 2500,
                    edgeLength: [50, 500],
                    layoutAnimation: false
                },
                draggable: true,
                lineStyle: {
                    normal: {
                        width: 2,
                        color: '#4b565b',
                    }
                },
                edgeLabel: {
                    normal: {
                        show: true,
                        formatter: function (x) {
                            return x.data.name;//边上的文字
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {}
                    }
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