<template>
  <div class="manage">
    <!-- 新增作品弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 作品的表单信息 -->
      <el-form ref="form" inline :model="form" label-width="80px" :rules="rules">
        <el-form-item label="作品名称" prop="article_name">
          <!-- prop与rule中字段一致用于校验 -->
          <el-input placeholder="请输入作品名称" v-model="form.article_name"></el-input>
        </el-form-item>
        <el-form-item v-if="form.state !== undefined"label="作品状态" prop="state">
            <el-select placeholder="请选择作品状态" v-model="form.state">
              <el-option label="更新中" value="0"></el-option>
              <el-option label="已完成" value="1"></el-option>
            </el-select>

        </el-form-item>
        <el-form-item label="作品标签" prop="tags">
          <el-select placeholder="请选择标签" v-model="form.tags" multiple>
            <el-option label="悬疑推理" value="1"></el-option>
            <el-option label="都市情感" value="2"></el-option>
            <el-option label="青春校园" value="3"></el-option>
            <el-option label="古风穿越" value="4"></el-option>
            <el-option label="恐怖惊悚" value="5"></el-option>
            <el-option label="科幻玄幻" value="6"></el-option>
            <el-option label="社会伦理" value="7"></el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
    </el-dialog>
    <div class="manage-header">
      <!-- 新增按钮 -->
      <el-button @click="handleAdd" type="primary">
        +新增
      </el-button>
      <!-- 搜索 -->
      <el-form :model="articleform" inline>
        <el-form-item>
          <el-input placeholder="请输入作品名称" v-model="articleform.article_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>

      </el-form>

    </div>

    <div class="common-table">
      <!-- 表格 -->
      <el-table stripe :data="tableData" style="width: 100%" height="90%">
        <el-table-column prop="article_name" label="作品名称">
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            {{ mapState(scope.row.state)}}
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签">
          <template slot-scope="scope">
            {{ mapTags(scope.row.tags).join(', ') }}
          </template>
        </el-table-column>

        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle, addArticle, editArticle,delArticle} from '../api'

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        article_name: '',
        tags: [],
        state: '',
      },
      rules: {
        article_name: [
          {
            required: true,
            message: '请输入作品名称'
          }
        ],
        tags: [
          {
            required: true,
            message: '请选择标签'
          }
        ],

        state: [
          {
            required: true,
            message: '请选择状态'
          }
        ],

      },
      tableData: [''],
      tagMappings: { // 标签映射对象
        1: '悬疑推理',
        2: '都市情感',
        3: '青春校园',
        4: '古风穿越',
        5: '恐怖惊悚',
        6: '科幻玄幻',
        7: '社会伦理'
      },
      stateMappings: { // 状态映射对象
        0: '更新中',
        1: '已完成',
      },
      modelType: 0,//0表示新增，1表示编辑
      total: 0,//数据条数
      pageData: {
        page: 1,
        limit: 10,
      },
      articleform: {
        article_name: ''
      }

    };
  },
  methods: {
    //标签匹配
    mapTags(tags) {
      return tags.map(tag => this.tagMappings[tag]);
    },
    //状态匹配
    mapState(state) {
      return this.stateMappings[state];
    },
    //选择页码时触发
    handlePage(val) {
      //console.log(val,'val')
      this.pageData.page = val
      this.getList()

    },

    //关闭form
    handleClose() {
      //关闭弹窗时清空弹窗内容
      this.$refs.form.resetFields();
      this.dialogVisible = false
    },
    //点击确定提交表单
    submit() {

      this.$refs.form.validate((valid) => {
        if (valid) {

          if (this.modelType === 0) {
            this.form.state = 0  //新增作品初始状态为0
            addArticle(this.form).then(() => {
              //刷新列表数据
              this.getList()
              //console.log(this.form,'form')
            })
          } else if (this.modelType === 1) {
            editArticle(this.form).then(() => {
              //刷新列表数据
              this.getList()
            })
          }
        } else {

        }
        this.handleClose()

      })
    },
    handleAdd() {
      this.dialogVisible = true
      this.form.state = undefined;
      this.modelType = 0
    },

    handleEdit(row) {
      this.modelType = 1
      this.dialogVisible = true
      //对当前行的数据进行深拷贝
      this.form = JSON.parse(JSON.stringify(row))
      this.form.state = this.stateMappings[this.form.state];
      this.form.tags = this.form.tags.map(tag => this.tagMappings[tag]);
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticle({id: row.id}).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    getList() {
      getArticle({params: {...this.articleform, ...this.pageData}}).then(({data}) => {
        console.log(data)
        this.tableData = data.list
        this.total = data.count || 0
        //console.log(this.total)
      })
    }


  },
  mounted() {
    this.getList()


  }
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .common-table {
    position: relative;
    height: 100%;

    .pager {
      position: absolute;
      bottom: 0;
      right: 36%;
    }


  }
}
</style>