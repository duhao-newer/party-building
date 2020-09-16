<template>
  <div class="dis">
    <div class="filterBox">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
      <el-button type="primary" @click="getcustomerlist()">查询</el-button>
      <el-button type="success">导入用户</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="id_card" label="证件" width="180"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="total_score" label="积分"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope)">启用</el-button>
          <el-button size="mini" type="danger" @click="del(scope)">密码重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getcustomerlist();
  },
  data() {
    return {
      value: "",
      input: "",
      tableData: [
        {
          id: 2,
          username: "1",
          id_card: "42467990054444",
          phone: "13456780924",
          total_score: 3,
          disabled: 0,
        },
      ],
      page: 1,
      limit: 10,
    };
  },
  methods: {
    getcustomerlist() {
      console.log("s")
      this.$store
        .dispatch("customer/customers", { page: this.page, limit: this.limit })
        .then((res) => {
          if (res.status != 0) {
            return this.$message.error("用户名或密码错误~");
          }
          this.$message({
            message: "登录成功~",
            type: "success",
          });
          // this.$router.push({ path: this.redirect || "/" });
        })
        .catch(() => {
          // this.loading = false;
        });
    },
  },
};
</script>
<style  lang="scss">
.dis {
  padding: 20px;
}
.filterBox {
  text-align: left;
  margin-bottom: 30px;
  margin-top: 30px;
  .el-input {
    width: auto;
    margin-left: 20px;
  }
  .el-button {
    margin-left: 20px;
  }
}
.block {
  float: right;
  margin-top: 20px;
  padding-right: 20px;
}
</style>