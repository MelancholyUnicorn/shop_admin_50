<template>
<div class="goods">
  <div class="addgoods">
    <el-button type="success" plain>添加商品</el-button>
    <!-- 渲染列表 -->
    <el-table  style="width: 100%"   :data="goodsList">
        <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column label="商品名称" width="180" prop="goods_name">
      </el-table-column>
        <el-table-column label="商品价格" width="180" prop="goods_price">
      </el-table-column>
        <el-table-column label="商品重量" width="180" prop="goods_weight">
      </el-table-column>
       <el-table-column label="创建时间" width="180" prop="upd_time">
      </el-table-column>
      <el-table-column label="操作" width="180" >
        <el-button type="primary " plain icon="el-icon-edit"></el-button>
        <el-button type="danger" plain icon="el-icon-delete"></el-button>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      goodsList: [],
      pagenum: 1,
      pagesize: 5
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      const { meta, data } = await this.$axios.get(`goods`,
        {
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
      // console.log(res)
      if (meta.status === 200) {
        this.goodsList = data.goods
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addgoods{
margin-bottom: 10px
}
</style>
