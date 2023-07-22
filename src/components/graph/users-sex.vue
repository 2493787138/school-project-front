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
        text: '用户男女比例 ',  // 主标题名称
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
        radius: '70%',
        
        // adjust the start angle
        
        label: {
          show: false,
          
        },
        data: [  
        ]
      }
    ]
  };
  
  export default {
    data() {
      return {
        usersSex:{
          male:88,
          female:65
          
        }
  
      }
  
    },
    mounted() {
      option.series[0].data=[
        
          { value: this.usersSex.female, name: '女性用户' ,itemStyle:{color:'hotpink'}},
          { value: this.usersSex.male, name: '男性用户' },
          
        ]
      chartDom = this.$refs.graph;
      myChart = echarts.init(chartDom);
      myChart.setOption(option);
      
    }
  
  }
  </script>
  <style lang="less" scoped>
 .graph {

height: 455px;
width: 455px;
}
  </style>