<template>
    <div>
        <el-button @click="echartsRestore">重置</el-button>
        <div ref="graph" id="main" style="width: 100%;height: 800px;">

        </div>
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
            //target: [],
            realData: [
                {
                    name: 'node01',//name必须是唯一标识
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    symbolSize: 70,//节点大小，有特殊要求的可以传，无要求可以外部统一设置
                    category: 0,//节点分类index
                    status: 1,//孩子展开收起的状态，前端渲染时赋值不用传
                    parent: ''
                },
                {
                    name: 'node02',
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    symbolSize: 50,
                    category: 1,
                    parent: 'node01'
                },
                {
                    name: 'node03',
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    symbolSize: 50,
                    category: 1,
                    parent: 'node01'
                },
                {
                    name: 'node04',
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    symbolSize: 50,
                    category: 1,
                    parent: 'node01'
                },
                {
                    name: 'node05',
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    symbolSize: 50,
                    category: 1,
                    parent: 'node01'
                },
                {
                    name: '3.1',
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    symbolSize: 50,
                    category: 2,
                    parent: 'node03'
                },
                {
                    name: '3.2',
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    symbolSize: 50,
                    category: 2,
                    parent: 'node03'
                },
                {
                    name: '4.1',
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    symbolSize: 50,
                    category: '类3',
                    parent: 'node04'
                },
                {
                    name: 'node6',
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                    },
                    symbolSize: 50,
                    category: 1,
                },



            ],
            graphcategories: [
                {
                    name: '类1',
                    symbolSize: 100,//节点大小
                    itemStyle: {
                        color: 'black',
                    }
                },
                {
                    name: '类2'
                },
                {
                    name: '类3'
                },
            ],
            graphdata: [
                {
                    name: 'node01',//name必须是唯一标识
                    attribute: {
                        age: 15,//节点要展示的属性
                        num: 100,
                        haha: 'haha'
                    },
                    symbolSize: 70,//节点大小，有特殊要求的可以传，无要求可以外部统一设置
                    category: 0,//节点分类index
                    status: 0//孩子展开收起的状态，前端渲染时赋值,不用传
                },

            ],
            graphlink: [
                {
                    source: 'node01',//起点和终点与node中name对应
                    target: 'node02',
                    name: 'link01',//提示文字

                }, {
                    source: 'node01',
                    target: 'node03',
                    name: 'link02',
                    des: 'link02des'
                }, {
                    source: 'node01',
                    target: 'node04',
                    name: 'link03',
                    des: 'link03des'
                }, {
                    source: 'node01',
                    target: 'node05',
                    name: 'link04',
                    des: 'link05des'
                }, {
                    source: 'node03',
                    target: '3.1',
                    name: 'link',
                    des: ''
                }, {
                    source: 'node03',
                    target: '3.2',
                    name: 'link01',
                    des: 'link01des'
                }, {
                    source: 'node04',
                    target: '4.1',
                    name: 'link01',
                    des: 'link01des'
                },
            ]

        }
    },
    methods: {

        //重置整个图到只有一个根节点
        echartsRestore() {
            for (var i = 0; i < this.realData.length; i++) {
                this.realData[i].status = 0
            }
            this.graphdata = []
            this.graphdata.push(this.realData[0])
            this.recreateGraph()
        },

        click(node) {
            var that = this
            var target = [node.name]
            if (node.status == 1)//删除
            {
                for (var i = 0; i < this.graphdata.length; i++) {
                    if (
                        target.some(function (item, index, arr) {
                            return item == that.graphdata[i].parent
                        })
                    ) {
                        target.push(this.graphdata[i].name)
                        this.graphdata.splice(i, 1);
                        i--
                    }
                }
                node.status=0
            }
            else if (node.status == 0) {//增加
                this.realData.forEach(element => {
                    if (element.parent == node.name) {
                        that.graphdata.push(element)
                        target.push(element.name)
                    }
                });
                node.status=1
            }
            
            if(target.length!=1)
            {
                this.recreateGraph()
            }


        },

        // click(node) {

        //     this.target = []
        //     var that = this
        //     //找到要操作的子节点的名字
        //     this.graphlink.forEach(element => {
        //         if (element.source === node.name) {
        //             this.target.push(element.target)
        //         }
        //     });
        //     //console.log(this.target)
        //     if (this.target.length != 0) {
        //         if (node.status == 1) { //现在孩子是显示的，要让他不显示
        //             //console.log('删除')
        //             this.graphdata = this.graphdata.filter(function (item, index, arr) {
        //                 //var bool=true
        //                 //console.log(that.target)
        //                 var bool = that.target.some(function (subitem, subindex, subarr) {
        //                     return subitem == item.name
        //                 })
        //                 return !bool
        //             })
        //             node.status = 0
        //         }
        //         else { //现在孩子未显示，要让他显示
        //             //console.log('增加')
        //             this.realData.forEach(element => {
        //                 if (that.target.some(function (subitem, subindex, subarr) {
        //                     return subitem == element.name
        //                 }))
        //                     that.graphdata.push(element)
        //             });
        //             node.status = 1
        //         }
        //         //console.log(this.graphdata, 'result')
        //         this.recreateGraph()
        //     }


        // },

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
        for (var i = 0; i < this.realData.length; i++) {
            this.realData[i].status = 0
        }

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
                        console.log(params.data)
                        // 打印确认params是对象还是数组
                        if (params.dataType == 'node') {

                            let str = ''
                            for (i in params.data.attribute) {
                                console.log(i)
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
                    edgeLength: [10, 100],
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