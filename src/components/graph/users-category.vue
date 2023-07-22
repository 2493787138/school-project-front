<template>
  <div ref="graph" class="graph">

  </div>
</template>
<script>
import * as echarts from 'echarts'
var that
var chartDom
var myChart
var option = {
  title: {
        text: '用户质量分析',  // 主标题名称
        left:'center'
    },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center',
    // doesn't perfectly work with our tricks, disable it
    selectedMode: false
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      
      // adjust the start angle
      
      label: {
        show: true,
        formatter(param) {
          // correct the percentage
          return param.name + ' (' + param.percent * 2 + '%)';
        }
      },
      data: [  
      ]
    }
  ]
};

export default {
  data() {
    return {
      usersCategory:{
        active:10,
        normal:25,
        die:50
        
      }

    }

  },
  mounted() {
    option.series[0].data=[
      
        { value: this.usersCategory.active, name: '活跃用户' ,itemStyle:{color:'lightgreen'}},
        { value: this.usersCategory.normal, name: '一般用户' ,itemStyle:{color:'rgb(231, 219, 54)'}},
        { value: this.usersCategory.die, name: '流失用户' ,itemStyle:{color:'grey'}},
      ]
    chartDom = this.$refs.graph;
    myChart = echarts.init(chartDom);
    myChart.setOption(option);
    
  }

}
</script>
<style lang="less" scoped>
 .graph {
//color: rgb(231, 219, 54);
height: 455px;
width: 455px;
}
</style>