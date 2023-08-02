<template>
    <div ref="graph" class="graph">

    </div>
</template>
<script>
import * as echarts from 'echarts'
import { getUserAge } from '@/api'

var that
var chartDom
var myChart
var option = {
    
    title: {
        text: '用户年龄分布 ',  // 主标题名称
        left:'center'
    },
    xAxis: {
        type: 'category',
        data: ['10~19', '20~29', '30~39', '40~49','50~59','60~69']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [],
            type: 'bar'
        }
    ]
};

export default {
    data() {
        return {
            userAge:[
                
            ]

        }

    },
    mounted() {
        getUserAge().then((data) => {
            this.userAge=data.data
            option.series[0].data = this.userAge
            chartDom = this.$refs.graph;
            myChart = echarts.init(chartDom);
            myChart.setOption(option);
        })
        
        
        

    }

}
</script>
<style lang="less" scoped>
.graph {

height: 380px;
width: 380px;
}
</style>