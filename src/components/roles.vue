<template>
<div class="roles">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
</el-breadcrumb>
<hr>

<div class="add">
    <el-button plain  type="success" @click="dialogshow">添加角色</el-button>
</div>
<!-- 添加角色弹框 -->
<div class="dialog">
  <el-dialog
  title="添加角色"
  :visible.sync="dialogVisible"
  width="30%">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
<!-- 表格 -->
   <el-table
      :data="roleslist"
      style="width: 100%"
      type="expand"
      >
      <el-table-column
      type="expand"
      width="50">
      <template v-slot:default="{row}">
        <!-- 第一阶层 分左右 -->
      <el-row v-for="l1 in row.children" :key="l1.id">
        <el-col :span="4" >
          <el-tag  closable @close="handleclose(l1.id,row)">{{l1.authName}}</el-tag>>
        </el-col>
        <el-col :span="20">
          <el-row v-for="l2 in l1.children" :key="l2.id,">
                <el-col :span="4"> <el-tag closable @close="handleclose(l2.id,row)">{{l2.authName}}</el-tag>></el-col>
                <el-col :span="20">
                  <!-- 这边不用再加一行了 如果加了就是单个行渲染 -->
                     <el-tag v-for="l3 in l2.children" :key="l3.id" closable @close="handleclose(l3.id,row)"> {{l3.authName}}</el-tag>
                </el-col>
          </el-row>
        </el-col>
      </el-row>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      <template v-slot:default="obj">
      <el-button plain icon="el-icon-edit" type="primary"></el-button>
      <el-button plain icon="el-icon-delete" type="warning" @click="del(obj.row)"></el-button>
      <el-button plain icon="el-icon-check"  type="success" >分配权限</el-button>
      </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      roleslist: [],
      dialogVisible: false
    }
  },
  created () {
    this.getroleslist()
  },
  methods: {
    async getroleslist () {
      const { meta, data } = await this.$axios.get(`roles`)
      console.log(data)
      if (meta.status === 200) {
        this.roleslist = data
      }
    },
    dialogshow () {
      this.dialogVisible = true
    },
    async del (row) {
      const { meta } = await this.$axios.delete(`roles/${row.id}`)
      if (meta.status === 200) {
        this.$message.success('删除成功')
        this.getroleslist()
      }
    },
    async handleclose (id, row) {
      const { meta, data } = await this.$axios.delete(`roles/${row.id}/rights/${id}`)
      // console.log(res)
      if (meta.status === 200) {
        row.children = data
        this.$message.error(meta.msg)
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add{
margin-top: 10px;
margin-bottom: 10px;
}
</style>
