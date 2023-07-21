<template>
    <el-row>
        <el-col :span="8">
            <el-card class="user-card">
                <div class="user">
                    <img src="../assets/picture/头像.jpg" alt="图片显示失败">
                    <div class="user-info">
                        <p class="name">admin</p>
                        <p class="access">超级管理员</p>

                    </div>
                </div>
                <hr>
                <div class="login-info">
                    <p>上次登录时间: <span>2023/6/11</span></p>
                    <p>上次登录地点: <span>上海</span></p>

                </div>
            </el-card>
            <el-card class="buy-card">
                <el-table :data="tableData" style="width: 100%">
                    <!-- prop对应数据中的字段 -->
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>

                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" class="right-content">
            <div class="num">
                <el-card v-for="(item) in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                    <i :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="desc">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card class="line-chart">
                <!-- 折线图 -->
                <div ref="echarts1" style="height:237px; width:100% ;align-items: center;">

                </div>

            </el-card>
            <div class="graph">
                <el-card>
                    <div ref="echarts2" style="height:228px ;width:100%; align-items: center;"></div>
                </el-card>
                <el-card>
                    <div ref="echarts3" style="height:200px ;width:100%; align-items: center;"></div>
                </el-card>

            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
    data() {
        return {
            tableLabel:
            {
                name: '品牌',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买',
            }
            ,
            tableData: [
                1
            ],
            countData: [
                1
            ]
        }
    },
    mounted() {
        //获取mock中的数据
        getData().then(({ data }) => {
            const { tableData,countData } = data.data
            this.tableData = tableData
            this.countData =countData
            

            //获取dom初始化echart实例
            const echarts1 = echarts.init(this.$refs.echarts1);
            const echarts2 = echarts.init(this.$refs.echarts2);
            const echarts3 = echarts.init(this.$refs.echarts3);
            //指定图表的配置和数据
            var option = {
            }

            //折线图
            const { orderData } = data.data
            var echarts1Option = {}
            //x轴
            const xAxis =orderData.date
            const pingpai = Object.keys(orderData.data[0])
            echarts1Option.xAxis = {
                data: xAxis
            }
            //y轴
            echarts1Option.yAxis = {

            }
            //图例
            echarts1Option.legend = {
                data:pingpai
            }
            //数据
            echarts1Option.series = []
            pingpai.forEach(key => {
                echarts1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })
            echarts1.setOption(echarts1Option)

            //柱状图
            const { userData } = data.data
            var echarts2Option = {
                legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                yAxis: [
                    {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                    },
                ],
                color: ["#2ec7c9", "#b6a2de"],
                series: [
                    {
                        name: '新增用户',
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
            echarts2.setOption(echarts2Option)

            //饼图
            const { videoData } = data.data
            var echarts3Option = {
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [
                    {
                        data:videoData,
                        type:'pie'
                    }
                ],
            }
            echarts3.setOption(echarts3Option)

        }
        )
            
            
            
            
        


}
}
</script>
<style lang="less" scoped>
.user-card {

    .user {
        display: flex; //标签可以同一行显示
        align-items: center; //内容垂直居中
        padding-bottom: 20px;

        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin-right: 40px
        }

        hr {
            color: darkgray;
        }

        .user-info {
            .name {
                font-size: 32px;
                margin-bottom: 10px;
            }

            .access {
                color: darkgray;
            }
        }
    }

    .login-info {
        margin-top: 20px;

        p {
            color: darkgray;
            font-size: 14px;
            line-height: 28px;

            span {
                color: #666666;
                margin-left: 60px;

            }
        }
    }
}

.buy-card {
    margin-top: 15px;
    height: 370px;
}

.right-content {
    padding-left: 15px;

    .num {

        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 15px;
            padding: 0;

        }

        i {
            width: 70px;
            height: 70px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: white;
        }

        .detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 15px;

            .price {
                font-size: 28px;
                margin-bottom: 10px;
                height: 28px;
                line-height: 28px;

            }

            .desc {
                font-size: 14px;
                color: #999999;
                text-align: center;

            }
        }

    }

    .line-chart {
        height: 237px;

    }

    .graph {
        display: flex;
        justify-content: space-between;
        margin-top: 14px;
        height: 228px;

        .el-card {
            width: 49%;
            height: 100%;
        }
    }
}
</style>