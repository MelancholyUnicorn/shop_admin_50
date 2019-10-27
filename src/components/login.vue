<template>
  <div class="login">
   <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon>
     <img src="../assets/01.jpg" alt="">
  <el-form-item label="用户名:" prop="username" >
    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
    <el-form-item label="密码:" prop="password" >
    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click.enter="login">登录</el-button>
      <el-button @click="reset" ref="myrest">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: ['blur', 'change'] }
        ]

      }
    }
  },
  methods: {
    reset () {
      // console.log('点击了')
      // 使用$ref获取元素
      // console.log(this.$refs.myrest)

      this.$refs.form.resetFields()
    },
    async login () {
      try {
        // 等待一个成功的结果
        await this.$refs.form.validate()
        // 能到这里说明等到了成功的结果 可以发送ajax请求
        // console.log('能到这里')
        const { meta, data } = await this.$axios.post('login', this.form)
        if (meta.status === 200) {
          this.$message({
            message: '提示消息',
            type: 'success',
            duration: 1000
          })
          localStorage.setItem('token', data.token)
          this.$router.push('./index')
        } else if (meta.status === 400) {
          console.log(meta.msg)
          this.$message({
            message: '用户名或者密码错误',
            type: 'error',
            duration: 1000
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  background-color:#2d434c;
  overflow: hidden;
  .el-form{
    background-color: white;
    width: 440px;
    padding: 20px;
    padding-top: 70px;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 200px;
    position: relative;
    img{
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: solid 4px pink;
    position: absolute;
    top:-75px;
    left:50%;
    transform: translateX(-50%);

    }
.el-button{
  margin-left: 20px;
}
  }
}
</style>
