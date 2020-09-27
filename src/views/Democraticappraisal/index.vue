<template>
  <div class="content">
    <!-- 内容表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column prop="id" label="#" width="120"></el-table-column>
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
          <el-tag>{{ scope.row.is_open | status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">{{
          scope.row.create_time | formatDate
        }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="check(scope)"
            >查看</el-button
          >
          <el-button size="mini" :type="scope.row.is_open | dos" @click="check(scope)"
            >{{scope.row.is_open == 0 ? '开启':'结束'}}</el-button
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
export default {
  //   created() {
  //     this.getlist();
  //   },
  data() {
    return {
      tableData: [
        {
          id: "1",
          content:
            '<p><img src="http://oowantxlb.bkt.clouddn.com/image/182C892878AE4F09BB37D218EFE2EEBC.png"></p>',
          create_time: "2017-06-20T09:08:50.000Z",
          title_desc: "民主评议测试撒旦撒旦",
          is_open: 0,
        },
      ], //表格内容
      checkboxData: [], //多选框选中的
      page: 1, //分页
      limit: 8, //每页限制的信息数
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
      if (msg == 0) {
        return "未开启";
      } else if (msg == 1) {
        return "进行中";
      } else {
        return "已结束";
      }
    },
    dos(msg){
      let status={
          0:'success',
          1:'danger',
      }
      return status[msg];
    }
  },
  methods: {
    //分页
    changepage() {
      this.getlist();
    },
    //获取思想汇报列表
    getlist() {-
      this.$store
        .dispatch("expreience/getAllexpreience", {
          page: this.page,
          limit: this.limit,
        })
        .then((res) => {
          this.tableData = res.data;
          this.total = res.total;
        });
    },
    //批量审核
    checkAll() {
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
            .dispatch("expreience/checkAllexpreience", { reportIds: arr })
            .then((res) => {});
        })
        .catch(() => {
          this.getlist();
        });
    },
    //描述
    desc() {},
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
  color: gray;
}
</style>