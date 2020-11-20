<template>
  <div class="content">
    <!-- 内容表格 -->
    <el-table
     v-loading="loading"
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
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column
        label="用户名"
        prop="username"
        width="180"
      ></el-table-column>
      <el-table-column
        label="内容"
        prop="content"
        width="280"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="跟帖">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.is_priv }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间">
        <template slot-scope="scope">{{
          scope.row.create_time | formatDate
        }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="del(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 批量删除 -->
    <el-button
      type="danger"
      icon="el-icon-delete"
      class="del"
      @click="deleteAll()"
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
    this.getallaction();
  },
  data() {
    return {
      tableData: [], //表格的内容
      limit: 10, //每页的帖子数
      page: 1, //当前的页码
      total: 5, //总的帖子数
      checkboxData: [], //多选框的内容
      loading:false,
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    //获取帖子列表
    getallaction() {
      this.loading=true;
      this.$store
        .dispatch("interaction/interactionlist", {
          page: this.page,
          limit: this.limit,
        })
        .then((res) => {
          this.tableData = res.data;
          this.tableData.forEach((item,index)=>{
            item.id=index+1;
          })
          this.total = res.total;
            this.loading=false;
        });
    },
    //多选框的内容
    changeFun(val) {
      this.checkboxData = val;
    },
    //删除帖子
    del(scope) {
      this.$confirm("你确定要重置密码吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("interaction/deleteinteraction", {
              ForumId: scope.row.forum_id + "",
            })
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error("网络出错了~");
              }
              this.$message({
                message: "删除成功~",
                type: "success",
              });
              this.tableData.splice(scope.$index, 1);
            });
        })
        .catch((rea) => {});
    },
    //分页
    changepage() {
      this.getallaction();
    },
    //批量删除帖子
    deleteAll() {
      if (this.checkboxData.length == 0) {
        return this.$message({
          message: "请先选择要删除的帖子~",
          type: "warning",
        });
      }
      this.$confirm("你确定要删除这些帖子吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let arr = [];
          this.checkboxData.forEach((item) => {
            arr.push({ id: item.forum_id + "" });
          });
          this.$store
            .dispatch("interaction/deleteallinteraction", { forumIds: arr })
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error("网络出错了~");
              }
              this.getallaction();
              this.$message({
                message: "删除帖子密码成功~",
                type: "success",
              });
            });
        })
        .catch((rea) => {
          this.getallaction();
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
</style>