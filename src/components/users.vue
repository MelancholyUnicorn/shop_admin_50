<template >
   <div class="user">
     <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<hr>
<!-- 搜索框 -->
<div class="search">
   <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
    <el-button slot="append" icon="el-icon-search"  @click="search"></el-button>
  </el-input>
    <el-button  plain type="success"  @click="dialogshow">添加用户</el-button>
</div>
      <el-table
    :data="userlist"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
       prop="mobile"
        width="180"
        label="电话">
      </el-table-column>
       <el-table-column
        width="180"
        label="用户状态">
       <template v-slot:default="obj" >
          <el-switch
        v-model="obj.row.mg_state"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="change(obj.row.id,obj.row.mg_state)">
      </el-switch>
       </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <template v-slot:default="obj">
           <el-button size="mini" plain type="primary"  icon="el-icon-edit" @click="editdialogshow(obj.row.id)"></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-delete" @click="del(obj.row.id)" ></el-button>
            <el-button size="mini" plain type="danger"  icon="el-icon-check" @click="alloteRoles(obj.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <!--@size-change="handleSizeChange"每页条数的变化时触发  -->
    <!-- @current-change="handleCurrentChange"当前页面变化的时候触发  -->
    <!-- :current-page="currentPage4"当前页 -->
    <!-- :page-sizes="[100, 200, 300, 400]"供用户选择的每页条数 -->
    <!-- :page-size="100" 当前每页的条数-->
     <template>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      <!-- layout="total, sizes, prev, pager, next, jumper"控件列表 -->
      <!-- :total="400"总条数 -->
    </el-pagination>
     </template>
     <!-- 修改用户 -->
     <el-dialog
    title="修改用户"
    :visible.sync="editdialogVisible"
    width="30%">
    <span>
    <el-form :model="editform" label-width="80px" :rules="rules" ref="editform">
    <el-form-item label="用户名">
      <el-tag type="success" >{{editform.username}}</el-tag>
    </el-form-item>
    <el-form-item label="邮箱"  prop="email" >
    <el-input v-model="editform.email" placeholder="请输入邮箱" ></el-input>
    </el-form-item>
    <el-form-item label="手机"  prop="phone" >
    <el-input v-model="editform.phone" placeholder="请输入手机号码" ></el-input>
    </el-form-item>
     </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible= false">取 消</el-button>
    <el-button type="primary" @click="editusers">确 定</el-button>
  </span>
</el-dialog>
     <!-- 添加用户弹框 -->
        <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="40%"
      @close="dialogclose"
     >
  <span >
 <el-form :model="addForm"  label-width="80px"  status-icon :rules="rules" ref="addForm">
    <el-form-item label="用户名"  prop="username" >
    <el-input v-model="addForm.username" placeholder="请输入用户名" ></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password" >
    <el-input v-model="addForm.password"  placeholder="请输入密码" type="password" ></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email" >
    <el-input v-model="addForm.email" placeholder="请输入邮箱" ></el-input>
  </el-form-item>
    <el-form-item label="手机" prop="phone" >
    <el-input v-model="addForm.phone" placeholder="请输入手机号码" ></el-input>
  </el-form-item>
  </el-form>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="addusers">确 定</el-button>
  </span>
</el-dialog>
  <!-- 分配角色 -->
  <el-dialog
  title="分配角色"
  :visible.sync="allotdialogVisible"
  width="30%">
  <span>
    <el-form ref="alloteform" :model="alloteform" label-width="80px">
      <el-form-item label="用户名">
      <el-tag>{{alloteform.username}}</el-tag>
      </el-form-item>
      <el-form-item label="角色列表">
        <!-- 此处注意 select选择器的value就是option的value值 -->
         <el-select v-model="alloteform.rid" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
  </el-select>
  </el-form-item>
    </el-form>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="allotdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allote">分配</el-button>
  </span>
</el-dialog>
   </div>
</template>

<script>
export default {
  data () {
    return {
      rolelist: [],
      alloteform: {
        rolename: '',
        userid: '',
        rid: ''
      },
      userlist: [ ],
      editform: {
        username: '',
        email: '',
        phone: '',
        id: ''
      },
      addForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 2, max: 3, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone: [
          { pattern: /^1[3-9]\d{9}/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ]
      },
      query: '',
      // 当前页
      pagenum: 1,
      // 每页条数
      pagesize: 2,
      total: 0,
      dialogVisible: false,
      editdialogVisible: false,
      allotdialogVisible: false

    }
  },
  created () {
    this.getuserlist()
  },
  methods: {
    // 修改用户
    async editusers () {
      try {
        await this.$refs.editform.validate()
        const { id, phone, email } = this.editform
        const { meta } = await this.$axios.put(`users/${id}`, {
          mobile: phone,
          email
        })
        if (meta.status === 200) {
          this.$message.success('修改成功')
          this.getuserlist()
          this.editdialogVisible = false
        } else {
          this.$message.error('修改失败')
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 完成数据的回显 根据id
    async editdialogshow (id) {
      const { meta, data } = await this.$axios.get(`users/${id}`)
      console.log(data)
      if (meta.status === 200) {
        this.editform.username = data.username
        this.editform.email = data.email
        this.editform.phone = data.mobile
        this.editform.id = data.id
        this.editdialogVisible = true
      }
    },
    handleSizeChange (val) {
      // 每页条数
      this.pagesize = val
      // 更新当前页为第一页
      this.pagenum = 1
      this.getuserlist()
    },
    handleCurrentChange (val) {
      // val为用户选择的当前是第一页
      this.pagenum = val
      // console.log(val)
      this.getuserlist()
    },
    async getuserlist () {
      const { data } = await this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        } })
      this.total = data.total
      this.userlist = data.users
    },
    // 改变状态
    async change (id, type) {
      const { meta } = await this.$axios.put(`users/${id}/state/${type}`)
      if (meta.status === 200) {
        this.$message.success('设置成功')
      } else {
        this.$message('设置失败')
      }
    },
    // 搜索
    search () {
      this.pagenum = 1
      this.getuserlist()
    },
    // 删除功能
    async del (id) {
      // console.log(id)
      try {
        await this.$confirm('您确认要删除该条数据吗?', '温馨提示', {
          type: 'warning'
        })
        const { meta } = await this.$axios.delete(`users/${id}`)
        if (meta.status === 200) {
        // 删除成功
          this.$message.success('删除成功')
          // 如果当前页只有一条数据,删除了仅有一条数据后 pagenum-1
          if (this.userlist.length === 1 && this.pagenum > 1) {
            this.pagenum--
          }
          this.getuserlist()
        } else {
          this.$message.error('删除失败哦')
        }
      } catch (e) {
        console.log(e)
        this.$message('取消了哦')
      }
    },
    dialogshow () {
      this.dialogVisible = true
    },
    async addusers () {
      try {
        await this.$refs.addForm.validate()
        const { meta } = await this.$axios.post(`users`, this.addForm)
        if (meta.status === 201) {
          this.$message.success('添加成功')
          this.total++
          this.pagenum = Math.ceil(this.total / this.pagesize)
          this.dialogVisible = false
          this.getuserlist()
        } else {
          this.$message(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    dialogclose () {
      this.$refs.addForm.resetFields()
    },
    async alloteRoles (row) {
      this.allotdialogVisible = true
      console.log(row)
      // 显示用户名
      this.alloteform.username = row.username
      this.alloteform.userid = row.id
      // 发送ajaxs获取当前用户的当前拥有的角色
      const { meta, data } = await this.$axios.get(`users/${row.id}`)
      // console.log(res)
      if (meta.status === 200) {
        this.alloteform.rid = data.rid === -1 ? '' : data.rid
      }
      const res = await this.$axios.get(`roles`)
      this.rolelist = res.data
      // console.log(res)
    },
    async allote () {
      this.allotdialogVisible = false
      // 分配角色
      const { userid, rid } = this.alloteform
      const { meta } = await this.$axios.put(`users/${userid}/role`, { rid })
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        this.getuserlist()
      } else {
        this.message(meta.msg)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.user{
.search{
.el-input{
width: 300px;
padding: 20px;
}
}

}
</style>
