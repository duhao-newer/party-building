<template>
  <div class="content">
    <!-- 内容表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column prop="ids" label="#"></el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <a
            href="#"
            style="color: #3cb4e5; text-decoration: underline"
            @click.prevent="desc(scope)"
            >{{ scope.row.title_desc }}</a
          >
        </template>
      </el-table-column>
      <el-table-column label="状态">
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
          <el-button size="mini" type="primary" @click="updates(scope)"
            >修改</el-button
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
    <!-- 详细弹出层 -->
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="60%">
      <el-table :data="table" border style="width: 100%">
        <el-table-column prop="title_desc" label="标题" align="center">
        </el-table-column>
        <el-table-column label="时间" width="165px" align="center">
          <template slot-scope="scope">{{
            scope.row.create_time | formatDate
          }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100px" align="center">
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
        <el-table-column label="内容" align="center">
          <template slot-scope="scope">
            <p v-html="scope.row.content"></p>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 修改评议弹出层 -->
    <el-dialog :visible.sync="dialogVisibles" width="70%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor ref="text" v-model="content" class="quill-editor" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit"
            @click="submitForm('ruleForm')"
            >确定修改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/index.js";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  created() {
    this.getlist();
  },
  data() {
    return {
      tableData: [], //表格内容
      table: [], //弹出层内容
      checkboxData: [], //多选框选中的
      page: 1, //分页
      limit: 8, //每页限制的信息数
      total: 99, //总的信息数
      flag: false, //控制状态颜色
      opens: 1, //控住提交的状态
      dialogVisible: false, //详细弹出层
      dialogVisibles: false, //修改弹出层
      loading: false, //加载
      ruleForm: {
        title: "",
      }, //表单
      content: "", //富文本框
      options: [
        {
          value: "0",
          label: "未开启",
        },
        {
          value: "1",
          label: "进行中",
        },
        {
          value: "2",
          label: "已结束",
        },
      ], //下拉框
      value: "", //选中的内容
      rules: {
        title: [{ required: true, message: "请输入评议标题", trigger: "blur" }],
      },
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
      this.loading = true;
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
          this.loading = false;
        });
    },
    //描述
    desc(scope) {
      this.dialogVisible = true;
      this.$store
        .dispatch("Democraticappraisal/findcommit", { commentID: scope.row.id })
        .then((res) => {
          this.table = [];
          this.table.push(res.data);
        });
    },
    //更新状态
    check(scope) {
      this.$confirm("是否要更改所选评议吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
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
          this.$store
            .dispatch("Democraticappraisal/upcomment", obj)
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error(res.massage);
              }
              this.$message({
                type: "success",
                message: "更改状态成功!",
              });
              this.getlist();
            });
        })
        .catch((rea) => {});
    },
    //回显评议
    updates(scope) {
      this.dialogVisibles = true;
      this.$store
        .dispatch("Democraticappraisal/findcommit", { commentID: scope.row.id })
        .then((res) => {
          this.ruleForm.title = res.data.title_desc;
          this.ruleForm.id = res.data.id;
          if (res.data.is_open == 0) {
            this.value = "未开启";
          } else if (res.data.is_open == 1) {
            this.value = "进行中";
          } else {
            this.value = "已结束";
          }
          this.content = res.data.content;
        });
    },
    //重置
    resetForm() {
      this.ruleForm = {};
      this.content = "";
      this.value = "";
    },
    //提交修改
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let status = this.options.find((item) => {
            return item.label == this.value || item.value == this.value;
          });
          let obj = {
            title_desc: this.ruleForm.title,
            is_open: status.value,
            commentID: this.ruleForm.id + "",
            content: this.content,
          };
          this.$store
            .dispatch("Democraticappraisal/updatecommit", obj)
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error(res.massage);
              }
              this.$message({
                type: "success",
                message: "更改评议成功!",
              });
              this.getlist();
              this.dialogVisibles = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  components: {
    quillEditor,
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
.ql-container {
  height: 300px;
}
.submit {
  margin-left: 300px;
}
</style>