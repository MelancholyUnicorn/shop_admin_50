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
  width="30%"
  @close="reset"
  >
  <span>
    <el-form :model="addroleslist" label-width="80px"  :rules="rules" ref="addroles" >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addroleslist.roleName"></el-input>
      </el-form-item>
       <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="addroleslist.roleDesc"></el-input>
      </el-form-item>
    </el-form>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addroles">确 定</el-button>
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
      <el-button plain icon="el-icon-edit" type="primary" @click="editrolesdialogshow(obj.row)"></el-button>
      <el-button plain icon="el-icon-delete" type="warning" @click="del(obj.row)"></el-button>
      <el-button plain icon="el-icon-check"  type="success" >分配权限</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 修改角色 -->
    <el-dialog
  title="修改角色"
  :visible.sync="editdialogVisible"
  width="30%">
  <span>
      <el-form :model="editroleslist" label-width="80px"  :rules="rules" ref="editroles" >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="editroleslist.roleName"></el-input>
      </el-form-item>
       <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="editroleslist.roleDesc"></el-input>
      </el-form-item>
    </el-form>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editroles(editroleslist)">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      roleslist: [],
      dialogVisible: false,
      editdialogVisible: false,
      addroleslist: {
        roleName: '',
        roleDesc: ''
      },
      editroleslist: {
        roleName: '',
        roleDesc: '',
        id: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: ['blur', 'change'] },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: ['blur', 'change'] },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getroleslist()
  },
  methods: {
    reset () {
      this.$refs.addroles.resetFields()
    },
    async getroleslist () {
      const { meta, data } = await this.$axios.get(`roles`)
      // console.log(data)
      if (meta.status === 200) {
        this.roleslist = data
      }
    },
    dialogshow () {
      this.dialogVisible = true
    },
    async del (row) {
      try {
        await this.$confirm('此操作将永久删除该角色, 是否继续?', '温馨提示', {
          type: 'warning'
        })
        const { meta } = await this.$axios.delete(`roles/${row.id}`)
        if (meta.status === 200) {
          this.$message.success('删除成功')
          this.getroleslist()
        }
      } catch (e) {
        this.$message('已取消')
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
    },
    async addroles () {
      try {
        await this.$refs.addroles.validate()
        const { meta } = await this.$axios.post('roles', this.addroleslist)
        if (meta.status === 201) {
          this.$message.success('添加成功')
          this.getroleslist()
          this.dialogVisible = false
        }
      } catch (e) {
        this.$message.error('添加失败')
      }
    },
    editrolesdialogshow (row) {
      // console.log('带你接了')
      this.editdialogVisible = true
      this.editroleslist.roleName = row.roleName
      this.editroleslist.roleDesc = row.roleDesc
      this.editroleslist.id = row.id
    },
    async editroles ({ roleName, roleDesc, id }) {
      try {
        await this.$refs.editroles.validate()
        const { meta } = await this.$axios.put(`roles/${id}`, {
          roleName,
          roleDesc
        })
        if (meta.status === 200) {
          this.$message.success('修改成功')
          this.editdialogVisible = false
          this.getroleslist()
        }
      } catch (e) {
        console.log(e)
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
