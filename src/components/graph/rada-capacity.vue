<template>
    <div ref="graph" class="graph">

    </div>
</template>
<script>
import * as echarts from 'echarts'
import { getLabels } from '@/api'

var chartDom
var myChart
var option = {
    title: {
        text: ''
    },
    legend: {
        data: ['作品类型', 'Actual Spending']
    },

    textStyle: {
        fontSize: 20,
        color: 'black'
    },



    radar: {
        // shape: 'circle',
        indicator: [

        ]
    },
    series: [
        {
            type: 'radar',
            data: [
                {

                    value: '',
                    name: '作品类型',
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 1,
                                color: '#7ac1f8'
                            },
                            // 这个加上就是渐变色     
                            {
                                offset: 0,
                                color: '#fff'
                            },
                        ])
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: function (params) {
                                return params.value;
                            }
                        }
                    }

                },

            ]
        }
    ]
};

export default {
    data() {
        return {
            labels: ''
        }

    },
    mounted() {
        getLabels().then((data) => {
            //设置option中的数据
            option.series[0].data[0].value = data.data.map(item => { return item.value });
            let maxValue = Math.max(...option.series[0].data[0].value)
            option.radar.indicator = []
            if (maxValue > 5) {
                data.data.forEach(element => {
                    option.radar.indicator.push({
                        name: element.name,
                        max: maxValue
                    })
                });
                //console.log(option.radar.indicator, 'indicator')
                //console.log(option.series[0].data, 'data')
            }
            else {
                data.data.forEach(element => {
                    option.radar.indicator.push({
                        name: element.name,
                        max: 5
                    })
                });
            }
            //画图
            var chartDom = this.$refs.graph;
            var myChart = echarts.init(chartDom);
            myChart.setOption(option);



        })


    }

}
</script>
<style lang="less" scoped>
.graph {

    height: 790px;
    width: 990px;
}
</style>