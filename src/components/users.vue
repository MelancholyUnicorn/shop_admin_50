<template >
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
        inactive-color="#ff4949">
      </el-switch>
       </template>
      </el-table-column>
       <el-table-column
        label="操作">
        <el-button size="mini" plain type="primary"      icon="el-icon-edit"></el-button>
        <el-button size="mini" plain type="success"     icon="el-icon-delete"></el-button>
        <el-button size="mini" plain type="danger"      icon="el-icon-check" >分配角色</el-button>
      </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userlist: []
    }
  },
  created () {
    this.getuserlist()
  },
  methods: {
    getuserlist () {
      // axios.get(地址,配置项)
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 3
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res.data)
        const { data } = res.data
        this.userlist = data.users
      })
    }
  }
}
</script>

<style>

</style>
