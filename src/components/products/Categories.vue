<template>
<div class="categories">
  <div class="addCategory">
    <el-button type="success" plain @click="addCategories">添加商品</el-button>
  </div>
  <!-- 添加 -->
  <el-dialog
  title="添加分类"
  :visible.sync="dialogVisible"
  width="30%"
 >
  <span>
    <el-form :model="addcategoriesList" label-width="100px" class="demo-ruleForm" :rules="rules" ref="addcategoriesList">
        <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="addcategoriesList.cat_name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" >
           <el-cascader
              v-model="addcategoriesList.cat_pid"
              :options="options"
              clearable
              :props="props"
             >
              </el-cascader>
        </el-form-item>
    </el-form>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </span>
</el-dialog>
  <div class="categoryTable">
     <el-table
       v-loading="loading"
      :data="categoryList"
      row-key="cat_id"
      style="width: 100%">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="180">
        <template v-slot:default="{row}">
        {{row.cat_deleted?'否':'是'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="排序">
      </el-table-column>
       <el-table-column
        label="操作">
        <template >
        <el-button type="primary" plain icon="el-icon-edit" size='small' ></el-button>
        <el-button type="danger" plain icon="el-icon-delete" size='small' ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 分页 -->
    <el-pagination
     @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>

<script>
export default {
  data () {
    return {
      props: { checkStrictly: true,
      // 对应的id
        value: 'cat_id',
        // label是框中需要显示的内容
        label: 'cat_name',
        // children:'children'是axios返回对象的子对象的名字
        children: 'children'

      },
      addcategoriesList: {
        cat_name: '',
        cat_pid: [],
        cat_level: ''
      },
      options: [],
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ]
      },
      categoryList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      loading: true,
      dialogVisible: false
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      const { data, meta } = await this.$axios.get(`categories`, {
        params: {
          type: 3,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        // console.log(data)
        this.loading = false
        this.categoryList = data.result
        this.total = data.total
      }
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      // 改变当前的每页条数 要确保当前页为第一页不变化
      this.pagenum = 1
      this.getCategoryList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getCategoryList()
    },
    async addCategories () {
      this.dialogVisible = true
      // 点击的时候去发送ajaxs
      const { data, meta } = await this.$axios.get(`categories?type=2`)
      if (meta.status === 200) {
        // console.log(data)
        this.options = data
      }
    },
    async add () {
      // 校验
      this.$refs.addcategoriesList.validate()
      // console.log(this.addcategoriesList.cat_pid)
      // 发送ajax
      const { meta } = await this.$axios.post(`categories`, {

        cat_pid: this.addcategoriesList.cat_pid[this.addcategoriesList.cat_pid.length - 1] || 0,
        cat_name: this.addcategoriesList.cat_name,
        cat_level: this.addcategoriesList.cat_pid.length
      })
      if (meta.status === 201) {
        // 隐藏
        this.dialogVisible = false
        this.$message.success(meta.msg)
        this.getCategoryList()
      } else {
        this.$message.error(meta.msg)
        console.log('2345678')
      }
    },
    // 重置
    closeDialog () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.addCategory{
margin-bottom: 10px
}
.categoryTable{
margin-bottom: 4px
}
</style>
