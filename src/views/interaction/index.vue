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
      <el-table-column prop="user_id" label="#" width="80"></el-table-column>
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
      <el-table-column label="跟帖" width="280">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.is_priv }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="220">
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
    <!-- 批量重置密码 -->
    <el-button
      type="danger"
      icon="el-icon-delete"
      class="del"
      @click="deleteAll()"
      >批量重置密码</el-button
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
  created(){
    this.getallaction();
  },
  data() {
    return {
      tableData: [
        {
          forum_id: "16900968221F474681DF4DBDA121903A",
          user_id: 1,
          username: "党代表",
          header:
            "http://oowantxlb.bkt.clouddn.com/FtiXtvtPAonyJW8nDcIUjQ-7m-7v",
          create_time: "2017-05-15T07:08:11.000Z",
          is_priv: 0,
          content: "讨论一下习平总书记讲话精神",
          type: 0,
          num: 0,
        },
      ], //表格的内容
      limit:10,//每页的帖子数
      page:1,//当前的页码
      total:5,//总的帖子数
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
    getallaction(){
        this.$store
        .dispatch("interaction/interactionlist", { page: this.page, limit: this.limit })
        .then((res) => {
           
        })
    },
    //多选框的内容
    changeFun() {},
    //删除帖子
    del() {},
    //分页
    changepage() {},

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