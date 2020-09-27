<template>
  <div class="dis">
    <!-- 查询模板 -->
    <div class="filterBox">
      <el-select v-model="value" placeholder="请选择类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.typeName"
          :value="item.newsType_id"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="findnewpaper()">查询</el-button>
      <el-button type="primary" @click="changeadd()">新增</el-button>
    </div>
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
      <el-table-column prop="news_id" label="ID" width="80"></el-table-column>
      <el-table-column
        label="标题"
        prop="title"
        width="350"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="发布时间" width="280">
        <template slot-scope="scope">{{
          scope.row.update_time | formatDate
        }}</template>
      </el-table-column>
      <el-table-column label="新闻类别" prop="typeName"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="edit(scope)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="del(scope)"
            >删除</el-button
          >
          <el-button size="mini" type="primary" @click="edit(scope)"
            >生成轮播图</el-button
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
    <!-- 编辑弹出层 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="80%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="新闻作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="新闻描述" prop="titleDesc">
          <el-input type="textarea" v-model="form.titleDesc"></el-input>
        </el-form-item>
        <el-form-item label="新闻类型">
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.newsType_id"
              :label="item.typeName"
              :value="item.newsType_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新闻图片">
          <el-upload
            class="avatar-uploader"
            action
            ref="forms"
            :limit="1"
            :show-file-list="true"
            :http-request="uploadFile"
            :auto-upload="false"
            :file-list="phonelist"
          >
            <img v-if="imageUrl" :src="imageUrl + '.jpg'" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <quill-editor ref="text" v-model="content" class="quill-editor" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.prevent="onSubmit('form')"
            class="submit"
            >立即提交</el-button
          >
          <el-button type="primary" @click.prevent="dialogVisible = false"
            >取消</el-button
          >
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
    this.getnewpaper();
    this.newpapers();
  },
  data() {
    return {
      options: [], //查询类型
      value: "", //选中的类型
      tableData: [], //党员的全部信息
      page: 1, //分页
      limit: 8, //每页限制的信息数
      total: 99, //总的信息数
      checkboxData: [], //多选框选中的
      flag: false, //控制提交
      loading: false, //加载
      dialogVisible: false, //弹出层
      form: {
        title: "",
        titleDesc: "",
        author: "",
      }, //编辑的内容
      value1: "", //编辑选中的新闻类型
      imageUrl: "", //存放选中的图片
      content: "", //富文本框的内容
      id: "", //存放编辑的id
      phonelist:[{url:''}],//存放回显的图片
      rules: {
        title: [{ required: true, message: "请输入新闻标题", trigger: "blur" }],
        author: [
          { required: true, message: "请输入新闻作者", trigger: "blur" },
        ],
        titleDesc: [
          { required: true, message: "请输入新闻描述", trigger: "blur" },
        ],
      },
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    //获取新闻列表
    getnewpaper() {
      this.$store
        .dispatch("newpaper/paperlist", { page: this.page, limit: this.limit })
        .then((res) => {
          if (res.status != 0) {
            return this.$message.error(res.massage);
          }
          this.tableData = res.data;
          this.total = res.total;
        });
    },
    //获取新闻类型
    newpapers() {
      this.$store.dispatch("newpaper/newstype").then((res) => {
        if (res.status != 0) {
          return this.$message.error(res.massage);
        }
        this.options = res.data;
      });
    },
    //监听多选框的数据
    changeFun(val) {
      this.checkboxData = val;
    },
    //查询新闻类型
    findnewpaper() {
      // if (!this.value)  return this.$message({ message: "请先选择新闻类型", type: "warning" });
      this.loading = true;
      this.$store
        .dispatch("newpaper/paperlist", {
          page: this.page,
          limit: this.limit,
          type: this.value,
        })
        .then((res) => {
          if (res.status != 0) {
            return this.$message.error(res.massage);
          }
          this.tableData = res.data;
          this.total = res.total;
        });
      this.loading = false;
    },
    //编辑的回显
    edit(scope) {
      console.log(this.phonelist)
      this.dialogVisible = true;
      this.id = scope.row.news_id;
      this.$store
        .dispatch("newpaper/getnewspaperById", {
          newID: scope.row.news_id + "",
        })
        .then((res) => {
          this.form.title = res.data.title;
          this.form.author = res.data.author;
          this.form.titleDesc = res.data.titleDesc;
          this.value1 = res.data.typeName;
          this.content = res.data.content;
          this.phonelist=[{url:''}];
          this.phonelist.forEach(item=>{
            item.url=res.data.pic;
          })
        });
    },
    //编辑提交
    onSubmit() {
      this.$refs.forms.submit();
    },
    //删除
    del(scpoe) {
      this.$confirm("是否要删除该新闻?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("newpaper/delnewspaper", {
              newID: scpoe.row.news_id + "",
            })
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error(res.massage);
              }
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.tableData.splice(scpoe.$index, 1);
        })
        .catch(() => {});
    },
    //分页
    changepage(e) {
      this.page = e;
      if (this.value) {
        this.findnewpaper();
      } else {
        this.getnewpaper();
      }
    },
    //批量删除
    deleteAll() {
      if (this.checkboxData.length == 0)
        return this.$message({
          message: "请先选择要删除的内容~",
          type: "warning",
        });
      this.$confirm("是否要删除所选新闻吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.checkboxData.forEach((item) => {
            this.$store
              .dispatch("newpaper/delnewspaper", { newID: item.news_id + "" })
              .then((res) => {
                if (res.status != 0) {
                  return this.$message.error(res.massage);
                }
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getnewpaper();
              });
          });
        })
        .catch(() => {
          this.getnewpaper();
        });
    },
    //新增跳转
    changeadd() {
      this.$router.push("/newspaper/addnewspaper");
    },
    //选择图片并配置编辑的axios
    uploadFile(e) {
      let newtype = this.options.find((item) => {
        return item.typeName == this.value1 || item.newsType_id == this.value1;
      });
      const form = new FormData(); // FormData 对象
      form.append("pic", e.file); // 文件对象
      form.append("title", this.form.title); // 文件对象
      form.append("author", this.form.author); // 文件对象
      form.append("titleDesc", this.form.titleDesc); // 文件对象
      this.options.includes(this.value1);
      form.append("type", newtype.newsType_id); // 文件对象
      form.append("content", this.content); // 文件对象
      form.append("newID", this.id); // 文件对象
      this.$store.dispatch("newpaper/updatenewspaperById", form).then((res) => {
        if (res.status != 0) {
          return this.$message.error(res.massage);
        }
        this.$message({
          message: "更新新闻成功~",
          type: "success",
        });
        this.dialogVisible=false;
      });
    },
  },
  components: {
    quillEditor,
  },
};
</script>
<style  lang="scss">
.dis {
  padding: 20px;
}
.filterBox {
  text-align: left;
  margin-bottom: 20px;
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
  margin-top: 15px;
  padding-right: 20px;
}
.del {
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.ql-container {
  height: 300px;
}
.submit {
  margin-left: 400px;
}
</style>