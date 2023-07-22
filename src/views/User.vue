<template>
    <div class="manage">
        <!-- 弹窗 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <!-- 用户的表单信息 -->
            <el-form ref="form" inline :model="form" label-width="80px" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <!-- prop与rule中字段一致用于校验 -->
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-DD">
                    </el-date-picker>
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
            <el-form :model="userform" inline>
                <el-form-item>
                    <el-input placeholder="请输入用户姓名" v-model="userform.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">查询</el-button>
                </el-form-item>

            </el-form>

        </div>

        <div class="common-table">
            <!-- 表格 -->
            <el-table stripe :data="tableData" style="width: 100%" height="90%">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="sexLabel" label="性别">
                    <template slot-scope="scope">
                        {{ scope.row.sex == 1 ? '男' : '女' }}
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
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
import { getUser, addUser, editUser, delUser } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                birth: '',
                sex: '',
                password:'',
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名'
                    }
                ],
                age: [
                    {
                        required: true,
                        message: '请输入年龄'
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: '请选择性别'
                    }
                ],
                birth: [
                    {
                        required: true,
                        message: '请选择出生日期'
                    }
                ],
                password: [
                    {
                        
                        required: true,
                        message: '请输入密码'
                    }
                ],
                
                

            },
            tableData: [''],
            modelType: 0,//0表示新增，1表示编辑
            total: 0,//数据条数
            pageData: {
                page: 1,
                limit: 10,
            },
            userform: {
                name: ''
            }

        };
    },
    methods: {

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
                        addUser(this.form).then(() => {
                            //刷新列表数据
                            this.getList()
                            //console.log(this.form,'form')
                        })
                    }
                    else if (this.modelType === 1) {
                        editUser(this.form).then(() => {
                            //刷新列表数据
                            this.getList()
                        })
                    }
                }
                else {

                }
                this.handleClose()

            })
        },
        handleAdd() {
            this.dialogVisible = true
            this.modelType = 0
        },

        handleEdit(row) {
            this.modelType = 1
            this.dialogVisible = true
            //对当前行的数据进行深拷贝
            this.form = JSON.parse(JSON.stringify(row))

        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({ id: row.id }).then(() => {
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
            getUser({ params: { ...this.userform, ...this.pageData } }).then(({ data }) => {
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
    .manage-header{
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