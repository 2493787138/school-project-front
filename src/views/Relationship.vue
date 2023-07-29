<template>
    <div>
        <!-- 头部 -->
        <el-select v-model="article" placeholder="请选选择作品" class="select1" :popper-append-to-body="false"
            @change="chooseArticle">
            <el-option v-for="item in myArticle" :key="item" :label="item" :value="item">
            </el-option>
        </el-select>
        <el-button @click="save" type="primary" class="save">添加角色</el-button>
        <el-button @click="save" type="primary" class="save">添加关系</el-button>
        <el-button @click="save" type="primary" class="save">保存</el-button>
        <!-- 关系图 -->
        <div ref="graph" id="main" style="width: 100%;height: 550px;">
        </div>
        <!-- 抽屉 -->
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
            <span>我来啦!</span>
        </el-drawer>
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
            direction: 'rtl',
            drawer: false,
            graphdata: [
                {
                    name: '肖霸',//name必须是唯一标识
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    category: '主角',//节点分类index
                },
                {
                    name: '厚小花',//name必须是唯一标识
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    category: '主角',//节点分类index
                },
                {
                    name: '小莲花',
                    attribute: {
                        age: 15,
                        num: 100,
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

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },

        //重置整个图到只有一个根节点
        echartsRestore() {

        },

        click(node) {
            this.drawer = true
            console.log(this.drawer)

        },



        //重画图
        recreateGraph() {
            option.series[0].data = this.graphdata
            myChart = echarts.init(chartDom).clear()
            myChart = echarts.init(chartDom)
            myChart.setOption(option, 'option');
            console.log('重画了')

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
                //console.log(option.series[0].data[params.dataIndex],'111')
                clicknode(option.series[0].data[params.dataIndex])

                //console.log(option,'option')
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

                            let str = ''
                            for (var i in params.data.attribute) {
                                str += `${i}：${params.data.attribute[i]}<br/>`
                            }
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
<style lang="less" scoped></style>