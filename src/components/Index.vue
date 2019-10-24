<template>
  <el-container>
  <el-header>
    <div class="logo">
      <img src="../assets/logo01.png" alt="">
    </div>
    <div class="title"><h2>电商后台管理系统</h2></div>
    <div class="logout">欢迎来玩<a href="JavaScript:;" @click="logout">退出</a></div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <!-- <el-menu>主菜单 -->
      <!-- el-submenu: 子菜单 -->
      <!-- el-menu-item 子菜单展开内容 -->
       <el-menu
       router
      unique-opened
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <!-- 这边的index只要写user即可 因为解析时会自动解析成/user -->
         <el-menu-item index="user">
        <i class="el-icon-menu"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
         <el-menu-item index="2-1">
        <i class="el-icon-menu"></i>
        <span slot="title">角色列表</span>
      </el-menu-item>
        <el-menu-item index="2-2">
        <i class="el-icon-menu"></i>
        <span slot="title">权限列表</span>
      </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      // console.log('点击了')
      // 点击退出 清空本地localStorage存储的token令牌
      this.$confirm('您确定要退出吗', '提示', {
        // 此处的confirmButtonText,cancelButtonText可以定义按钮的内容 但是可以不写 默认就是确定和取消
        // confirmButtonText: '确定',
        // cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container{
  height: 100%;
  .el-header{
  background-color: #d8d8d8;
  display: flex;
  .logo{
  width: 180px;
  padding-top: 10px;
  img{
      width: 148px;
      height: 40px;
    }
  }
  .logout{
    width: 180px;
    font-size: 24px;
    font-weight: 700;
    line-height: 60px;
    a{
      color: orange;
    }

  }
  .title{
  flex: 1;
  text-align: center;
  line-height: 60px;
  }
  }
 .el-aside{
  background-color: #545c64;
  .el-menu{
    border: none;
  }
 }
 .el-main{
  background-color: #ecf0f1;
 }

}
</style>
