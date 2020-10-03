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
      <el-table-column label="缩略图" align="center" height="10px" width="200">
        <template slot-scope="scope">
          <el-popover placement="right" title="" trigger="hover">
            <img :src="scope.row.img_url" />
            <img
              slot="reference"
              :src="scope.row.img_url"
              style="max-height: 50px; max-width: 80px"
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
    <el-button type="primary" icon="el-icon-edit" class="del" @click="add()"
      v-show="false"
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
    <!-- 弹出层 -->
    <el-dialog :visible.sync="dialogVisible" width="80%">
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
        <el-form-item label="路径" prop="url">
          <el-input
            v-model="ruleForm.url"
            placeholder="目前请任意填写"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.newsType_id"
              :label="item.typeName"
              :value="item.newsType_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-radio v-model="ruleForm.priority" label="0">禁用</el-radio>
          <el-radio v-model="ruleForm.priority" label="1">可用</el-radio>
          <el-radio v-model="ruleForm.priority" label="2">可用</el-radio>
          <el-radio v-model="ruleForm.priority" label="3">可用</el-radio>
        </el-form-item>
        <el-form-item label="状态" prop="radio">
          <el-radio v-model="ruleForm.radio" label="0">禁用</el-radio>
          <el-radio v-model="ruleForm.radio" label="1">可用</el-radio>
        </el-form-item>
        <el-form-item label="新闻图片">
          <el-upload
            class="avatar-uploader"
            action="myUrl"
            ref="upload"
            :http-request="uploadFiles"
            :on-change="changes"
            :on-remove="removes"
            :auto-upload="false"
            list-type="picture-card"
            :file-list="phonelist"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit"
            @click="submitForm('ruleForm')"
            >提 交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/index.js";
export default {
  created() {
    this.getlist();
    this.newtypelist();
  },
  data() {
    return {
      tableData: [], //表格内容
      checkboxData: [], //多选框选中的
      options: [], //下拉框
      value1: "", //下拉框的值
      page: 1, //分页
      limit: 8, //每页限制的信息数
      total: 99, //总的信息数
      flag: false, //控制状态颜色
      dialogVisible: false, //弹出层
      ruleForm: {
        carouselId: "",
        title: "",
        priority: "",
        radio: "",
        url: "",
        img_url: "",
      }, //表单数据
      flag: true, //提示
      status: false, //控制编辑是否修改图片
      imageUrl: "", //修改会返回的路径
      phonelist: [], //存放图片
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        url: [{ required: true, message: "请输入路径", trigger: "blur" }],
      },
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
            item.img_url = "http://118.178.85.48:4000" + item.img_url;
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
                message: "删除成功~",
                type: "success",
              });
              this.tableData.splice(scope.$index, 1);
            });
        })
        .catch(() => {});
    },
    //回显修改
    upd(scope) {
      this.phonelist = [];
      this.dialogVisible = true;
      this.$store
        .dispatch("Rotationchart/findcarousels", { carouselId: scope.row.id })
        .then((res) => {
          this.ruleForm.carouselId = res.data.id;
          this.ruleForm.title = res.data.title;
          this.ruleForm.priority = res.data.priority + "";
          this.ruleForm.url = res.data.url;
          this.ruleForm.img_url = res.data.img_url;
          this.imageUrl = "http://118.178.85.48:4000" + res.data.img_url;
          this.ruleForm.radio = res.data.status + "";
          let newtype = this.options.find((item) => {
            return item.newsType_id == res.data.type;
          });
          this.value1 = newtype.typeName;
        });
    },
    //提交修改
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (!this.value1) return this.$message.warning("类型不能为空~");
          if (!this.ruleForm.priority)
            return this.$message.warning("轮播图优先级不能为空~");
          if (!this.ruleForm.radio)
            return this.$message.warning("轮播图状态不能为空~");
          if (this.status) {
            this.$refs.upload.submit();
          } else {
            let status = this.options.find((item) => {
              return (
                item.newsType_id == this.value1 || item.typeName == this.value1
              );
            });
            let obj = {
              title: this.ruleForm.title,
              url: this.ruleForm.url,
              priority: parseInt(this.ruleForm.priority),
              type: status.newsType_id,
              status: parseInt(this.ruleForm.radio),
              carouselId: this.ruleForm.carouselId + "",
              img_url: this.ruleForm.img_url,
            };
            this.$store
              .dispatch("Rotationchart/updcarousels", obj)
              .then((res) => {
                if (res.status != 0) {
                  return this.$message.error(res.massage);
                }
                this.$message({
                  message: "修改轮播图成功~",
                  type: "success",
                });
                this.dialogVisible = false;
                this.getlist();
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //回显新闻类型
    newtypelist() {
      this.$store.dispatch("newpaper/newstype").then((res) => {
        if (res.status != 0) {
          return this.$message.error(res.massage);
        }
        this.options = res.data;
      });
    },
    //添加轮播图的前置
    add() {
      this.dialogVisible = true;
      this.ruleForm = {};
    },
    //添加轮播图的提交
    uploadFiles(e) {
      let status = this.options.find((item) => {
        return item.typeName == this.value1 || item.newsType_id == this.value1;
      });
      const form = new FormData(); // FormData 对象
      form.append("pic", e.file); // 文件对象
      form.append("title", this.ruleForm.title); // 文件对象
      form.append("url", this.ruleForm.url); // 文件对象
      form.append("img_url", this.ruleForm.img_url); // 文件对象
      form.append("priority", parseInt(this.ruleForm.priority)); // 文件对象
      form.append("type",status.newsType_id); // 文件对象
      form.append("status",  parseInt(this.ruleForm.radio)); // 文件对象
      form.append("carouselId", this.ruleForm.carouselId + ""); // 文件对象
      this.$store.dispatch("Rotationchart/updcarousels", form).then((res) => {
        if (res.status != 0) {
          return this.$message.error(res.massage);
        }
        this.$message({
          message: "修改轮播图成功~",
          type: "success",
        });
        this.dialogVisible = false;
        this.getlist();
      });
    },
    //上传图片
    changes(file, fileList) {
      this.status = true;
      this.imageUrl = "";
      if (fileList.length > 1) {
        fileList.shift();
      }
    },
    //上传图片改变
    removes(file, fileList) {
      if (!fileList.length) {
        this.status = true;
      }
    },
    //表单重置
    resetForm(formName) {
      this.ruleForm.title = "";
      this.ruleForm.priority = "";
      this.ruleForm.radio = "";
      this.ruleForm.url = "";
      this.value1 = "";
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
.submit {
  margin-left: 300px;
}
</style>