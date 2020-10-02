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
      <el-table-column prop="ids" label="#" width="80"></el-table-column>
      <el-table-column label="缩略图" align="center" height="10px" width="250">
        <template slot-scope="scope">
          <el-popover placement="right" title="" trigger="hover">
            <img :src="scope.row.img_url" />
            <img
              slot="reference"
              :src="scope.row.img_url"
              style="max-height: 50px; max-width: 130px"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="顺序" prop="priority"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag class="gray" v-if="scope.row.status == 0">{{
            scope.row.status | statu
          }}</el-tag>
          <el-tag class="green" v-if="scope.row.status == 1">{{
            scope.row.status | statu
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="upd(scope)"
            >修改</el-button
          >
          <el-button size="mini" type="danger" @click="del(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 批量重置密码 -->
    <el-button
      type="primary"
      icon="el-icon-edit"
      class="del"
      @click="checkAll()"
      >添加</el-button
    >
    <el-button
      type="danger"
      icon="el-icon-delete"
      class="del"
      @click="checkAll()"
      >批量删除</el-button
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
    statu(msg) {
      if (msg == 0) {
        return "禁用";
      } else {
        return "启用";
      }
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
    //获取轮播图列表
    getlist() {
      this.$store
        .dispatch("Rotationchart/carousellist", {
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
    //批量删除
    checkAll() {
      if (this.checkboxData.length == 0) {
        return this.$message({
          message: "请先选择要删除的轮播图~",
          type: "warning",
        });
      }
      this.$confirm("你确定要批量删除吗？", "提示", {
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
            .dispatch("Rotationchart/delcarousels", { carouselsIds: arr })
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error(res.massage);
              }
              this.$message({
                message: "批量删除成功~",
                type: "success",
              });
              this.getlist();
            });
        })
        .catch(() => {
          this.getlist();
        });
    },
    //删除轮播图
    del(scope) {
      this.$confirm("你确定要批量删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("Rotationchart/delcarousel", { carouselId: scope.row.id })
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error(res.massage);
              }
              this.$message({
                message: "批量删除成功~",
                type: "success",
              });
              this.tableData.splice(scope.$index, 1);
            });
        })
        .catch(() => {});
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