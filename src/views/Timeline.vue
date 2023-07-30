<template>
  <div class="app-container">
    <div>
      <el-select v-model="article" placeholder="请选选择作品" class="select1" :popper-append-to-body="false"
        @change="chooseArticle">
        <el-option v-for="item in myArticle" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="timeScale" placeholder="请选择时间单位" class="select2" :popper-append-to-body="false"
        @change="setScaleConfig(timeScale)">
        <el-option v-for="item in timeOption" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button @click="save" type="primary" class="save" :disabled="disabled">保存</el-button>


    </div>
    <div ref="gantt" class="left-container"></div>

  </div>
</template>
<script>
import gantt from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import { saveTimeline, getTimeline } from '@/api/index'

var that
gantt.plugins({
  click_drag: true
});
//拖拽
gantt.config.click_drag = {
  callback: onDragEnd,
  singleRow: true
}

//更新数据
gantt.attachEvent("onAfterTaskUpdate", function (id, item) {
  //自动更新
  console.log(that.tasks.data)
});

//添加数据
gantt.attachEvent('onBeforeTaskAdd', function (id, item) {
  console.log('添加任务')
  if (that.article == '') {
    alert('您还没有选择作品，请先选择作品再编辑故事时间线。否则将无法保存！！！')
    return
  }
  else {
    that.tasks.data.push(item)
  }

}, '')

//删除数据
gantt.attachEvent('onBeforeTaskDelete', function (id, item) {
  console.log('删除任务')
  that.tasks.data = that.tasks.data.filter(function (item) {
    return item.id != id
  })
}, '')

//添加连接
gantt.attachEvent("onAfterLinkAdd", function (id, item) {
  console.log('添加连接')
  that.tasks.links.push(item)
  console.log(that.tasks.links, 'links')
}, '')

//删除链接
gantt.attachEvent("onAfterLinkDelete", function (id, item) {
  console.log('删除连接')
  that.tasks.links = that.tasks.links.filter(function (item) {
    return item.id != id
  })
  console.log(that.tasks.links, 'links')
}, '')


//拖拽事件
function onDragEnd(startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRow) {
  console.log('拖拽了')
  if (tasksInRow.length === 1) {
    var parent = tasksInRow[0];
    gantt.createTask({
      text: "Subtask of " + parent.text,
      start_date: gantt.roundDate(startDate),
      end_date: gantt.roundDate(endDate)
    }, parent.id);
  } else if (tasksInRow.length === 0) {
    gantt.createTask({
      text: "New task",
      start_date: gantt.roundDate(startDate),
      end_date: gantt.roundDate(endDate)
    });
  }
}


export default {
  name: 'DhtmlxGantt',
  computed: {
    disabled() {
      if (this.article == '')
        return true
      else
        return false
    }
  },
  data() {
    return {
      saveMessage: '',
      timeOption: [
        '按年', '按星期', '按月', '按日'
      ],
      timeScale: '',
      myArticle: ['霸道总裁爱上我', '我不爱吃饭'],
      article: '',
      tasks: {
        data: [],
        links: []
      }
    }
  },
  watch: {
    saveMessage(newValue, oldValue) {
      if (newValue == '保存成功') {
        this.$message({
          message: this.saveMessage,
          type: 'success'
        })
      }
      else {
        this.$message({
          message: this.saveMessage,
          type: 'error'
        })
      }
    }
  },
  methods: {
    //输出当前数据
    output() {
      console.log(this.tasks.data, 'data')
      console.log(this.tasks.links, 'links')
    },

    //将当前数据传给后端保存
    save() {
      const tasks = []
      if (this.tasks.data.length != 0) {
        tasks = this.tasks.data.map(item => {
          return {
            id: item.id,
            title: item.text,
            start_date: item.start_date,
            end_date: item.end_date,
            duration: item.duration,
            color: item.color,
            parent: item.parent
          }
        })
      }
      const data = {
        tasks: tasks,
        links: this.tasks.links
      }
      //console.log(data)
      saveTimeline(data).then((res) => {
        if (res.data === true) {
          this.saveMessage = "保存成功"
        }
        else {
          this.saveMessage = "保存失败，出现内部错误"
        }
      })
    },

    //选择作品后请求该作品数据并重绘
    chooseArticle() {
      console.log(this.article)
      getTimeline({ params: { title: this.article } }).then((res) => {
        this.tasks = res.data
        //根据新数据重绘
        gantt.init(this.$refs.gantt)
        gantt.parse(this.tasks)
      })
    },


    //改变显示单位的方法
    setScaleConfig(level) {
      //console.log(level)
      switch (level) {
        case "按日":
          gantt.config.scales = [
            { unit: "day", step: 1, format: "%d %M" }
          ];
          gantt.config.scale_height = 27;
          break;
        case "按星期":
          var weekScaleTemplate = function (date) {
            var dateToStr = gantt.date.date_to_str("%d %M");
            var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
            return dateToStr(date) + " - " + dateToStr(endDate);
          };
          gantt.config.scales = [
            { unit: "week", step: 1, format: weekScaleTemplate },
          ];
          gantt.config.scale_height = 27;
          break;
        case "按月":
          gantt.config.scales = [
            { unit: "month", step: 1, format: "%F, %Y" },
          ];
          gantt.config.scale_height = 27;
          break;
        case "按年":
          gantt.config.scales = [
            { unit: "year", step: 1, format: "%Y" },
          ];
          gantt.config.scale_height = 27;
          break;
      }
      //初始化
      gantt.init(this.$refs.gantt)

      // 数据解析
      gantt.parse(this.tasks)
    }


  },
  mounted() {
    that = this
    gantt.i18n.setLocale('cn'); //设置中文
    //左侧栏配置
    gantt.config.columns = [
      { name: "text", label: "事件名称", tree: true, width: 100 },
      { name: "start_date", align: "center", width: 90 },
      { name: "duration", align: "center", width: 60 },
      { name: "add", width: 40 }
    ];
    gantt.config.resize = true;


    //日期配置，先以月为单位
    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F, %Y" },

    ];

    //输入表单配置
    gantt.config.lightbox.sections = [
      { name: "text", height: 40, map_to: "text", type: "textarea", focus: true },
      { name: "summary", height: 40, map_to: "text", type: "textarea", focus: true },
      { name: "time", height: 38, map_to: "auto", type: "time", year_range: 10 },
      {
        name: "color", height: 22, map_to: "color", type: "select", options: [
          { key: "", label: "蓝色" },
          { key: "red", label: "红色" },
          { key: "black", label: "黑色" }
        ]
      },
    ];
    gantt.locale.labels.section_color = "颜色";
    gantt.locale.labels.section_summary = "事件描述";
    gantt.locale.labels.section_text = "事件名称";

    //初始化
    gantt.init(this.$refs.gantt)
    // 数据解析
    gantt.parse(this.tasks)



  }
}

</script>
<style lang="less" scoped>
.app-container {
  margin: 18px;
  margin-left: 0;

  .select2 {
    float: right;
    margin-right: 100px;
  }

  .save {
    position: absolute;
    right: 15px;
  }

  .left-container {
    height: 550px;
    margin-top: 15px;
  }
}
</style>