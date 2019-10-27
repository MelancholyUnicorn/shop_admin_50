<template>
<div class="rights">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
<hr>
<div class="table">
   <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        label="层级">
        <!-- 通过row拿到每一行的数据 -->
      <template v-slot:default="{row}">
        <span v-if="row.level==='0'">一级</span>
        <span v-if="row.level==='1'">二级</span>
        <span v-if="row.level==='2'">三级</span>
      </template>
      </el-table-column>
    </el-table>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getRightlist()
  },
  methods: {
    async getRightlist () {
      const { meta, data } = await this.$axios.get(`rights/list`)
      if (meta.status === 200) {
        // this.$message.success(meta.msg)
        this.tableData = data
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style>

</style>
