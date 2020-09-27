<template>
  <div class="content">
    <!-- 内容表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column prop="ids" label="#" width="120"></el-table-column>
      <el-table-column label="描述" width="420">
        <template slot-scope="scope">
          <a
            href="#"
            style="color: #3cb4e5; text-decoration: underline"
            @click.prevent="desc(scope)"
            >{{ scope.row.title_desc }}</a
          >
        </template>
      </el-table-column>
      <el-table-column label="状态" width="280">
        <template slot-scope="scope">
          <el-tag class="gray" v-if="scope.row.is_open == 0">{{
            scope.row.is_open | status
          }}</el-tag>
          <el-tag class="green" v-if="scope.row.is_open == 1">{{
            scope.row.is_open | status
          }}</el-tag>
          <el-tag class="red" v-if="scope.row.is_open == 2">{{
            scope.row.is_open | status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">{{
          scope.row.create_time | formatDate
        }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template
          slot-scope="scope"
          v-if="scope.row.is_open == 0 || scope.row.is_open == 1"
        >
          <el-button size="mini" type="primary" @click="look(scope)"
            >查看</el-button
          >
          <el-button
            size="mini"
            :type="scope.row.is_open | dos"
            @click="check(scope)"
            >{{ scope.row.is_open == 0 ? "开启" : "结束" }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
import { options } from "runjs";
export default {
  created() {
    this.getlist();
  },
  data() {
    return {
      tableData: [], //表格内容
      checkboxData: [], //多选框选中的
      page: 1, //分页
      limit: 8, //每页限制的信息数
      total: 99, //总的信息数
      flag: false, //控制状态颜色
      opens: 1, //控住提交的状态
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    status(msg) {
      let status = {
        0: "未开启",
        1: "进行中",
        2: "已结束",
      };
      return status[msg];
    },
    dos(msg) {
      let status = {
        0: "success",
        1: "danger",
      };
      return status[msg];
    },
  },
  methods: {
    //分页
    changepage() {
      this.getlist();
    },
    //获取思想汇报列表
    getlist() {
      this.$store
        .dispatch("Democraticappraisal/commentlist", {
          page: this.page,
          limit: this.limit,
        })
        .then((res) => {
          this.tableData = res.data;
          this.tableData.forEach((item, index) => {
            item.ids = index + 1;
          });
          this.total = res.total;
        });
    },
    //描述
    desc() {},
    //给更新状态
    check(scope) {
      if (scope.row.is_open == 0) {
        this.opens == 1;
      }
      if (scope.row.is_open === 1) {
        this.opens == 2;
      }
      let obj = {
        commentID: scope.row.id + "",
        is_open: scope.row.is_open + 1,
      };
      this.$store.dispatch("Democraticappraisal/upcomment", obj).then((res) => {
        if (res.status != 0) {
          return this.$message.error(res.massage);
        }
        this.$message({
          type: "success",
          message: "更改状态成功!",
        });
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
.red {
  color: #ff6261;
  background-color: #ffecec;
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