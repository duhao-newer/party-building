<template>
  <div class="content">
    <!-- 内容表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      @selection-change="changeFun"
    >
      <el-table-column
        width="80"
        type="selection"
        size="medium"
      ></el-table-column>
      <el-table-column prop="user_id" label="ID" width="100"></el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        width="240"
      ></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag class="gray" v-if="scope.row.is_accept == 0">{{
            scope.row.is_accept | status
          }}</el-tag>
          <el-tag class="green" v-if="scope.row.is_accept == 1">{{
            scope.row.is_accept | status
          }}</el-tag>
          <el-tag class="gray" v-if="scope.row.is_accept == 2">{{
            scope.row.is_accept | status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">{{
          scope.row.create_time | formatDate
        }}</template>
      </el-table-column>
      <el-table-column prop="reason" label="理由"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="check(scope)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 批量重置密码 -->
    <el-button
      type="danger"
      icon="el-icon-delete"
      class="del"
      @click="checkAll('1')"
      >批量通过</el-button
    >
    <el-button
      type="danger"
      icon="el-icon-delete"
      class="del"
      @click="checkAll(2)"
      >批量未通过</el-button
    >
    <!-- 分页模板 -->
    <div class="block">
      <el-pagination
        background
        layout="total,prev, pager, next"
        :total="total"
        :small="true"
        :page-size.sync="limit"
        :current-page.sync="page"
        @current-change="changepage"
        @prev-click="changepage"
        @next-click="changepage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/index.js";
export default {
  created() {
    this.getlist();
  },
  data() {
    return {
      tableData: [], //表格内容
      checkboxData: [], //多选框选中的
      page: 1, //分页
      limit: 9, //每页限制的信息数
      total: 99, //总的信息数
      flag: false, //控制状态颜色
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    status(msg) {
      let status = {
        0: "审核中",
        1: "通过",
        2: "未通过",
      };
      return status[msg];
    },
  },
  methods: {
    //监听多选框的状态
    changeFun(val) {
      this.checkboxData = val;
    },
    //分页
    changepage() {
      this.getlist();
    },
    //获取思想汇报列表
    getlist() {
      this.$store
        .dispatch("Thoughtreport/getAllexpreience", {
          istype: 1,
          page: this.page,
          limit: this.limit,
        })
        .then((res) => {
          this.tableData = res.data;
          this.total = res.total;
        });
    },
    //批量审核
    checkAll(num) {
      if (this.checkboxData.length == 0) {
        return this.$message({
          message: "请先选择要审核的人员~",
          type: "warning",
        });
      }
      this.$confirm("你确定要批量审核吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let arr = [];
          this.checkboxData.forEach((item) => {
            arr.push({ id: item.id + "" });
          });
          this.$store
            .dispatch("Thoughtreport/checkAllexpreience", {
              type: num,
              reportIds: arr,
            })
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error(res.massage);
              }
              this.$message({
                message: "批量审核成功~",
                type: "success",
              });
              this.getlist();
            });
        })
        .catch(() => {
          this.getlist();
        });
    },
  },
};
</script>

<style lang="scss">
.content {
  padding: 20px 20px;
}
.del {
  margin-top: 20px;
}
.block {
  float: right;
  margin-top: 15px;
  padding-right: 20px;
}
.gray {
  color: #515d6f;
  background-color: #e4e8f1;
}
.green {
  color: #26cf6d;
  background-color: #e3f6eb;
}
</style>