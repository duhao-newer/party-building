<template>
  <div class="main">
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
        <el-select v-model="value" placeholder="请选择">
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
          ref="upload"
          :show-file-list="true"
          :http-request="uploadFile"
          :auto-upload="true"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
        <el-button type="primary" @click.prevent="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  created() {
    this.getnewstype();
  },
  data() {
    return {
      form: {}, //表单的数据
      options: [], //下拉框的数据
      value: "", //下拉框选中的数据
      content: "", // 富文本框的内容
      imageUrl: "", //获取到的图片
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
  methods: {
    //表单提交
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取图片并转为base64
    // let fileObj=e.file;
    // let fr = new FileReader();
    // fr.readAsDataURL(fileObj);
    // fr.onload = () => {
    // this.img = fr.result;
    // };
    //自定义获取图片
    uploadFile(e) {
      console.log(e.file)
      const form = new FormData(); // FormData 对象
      form.append("pic", e.file); // 文件对象
      form.append("title", this.form.title); // 文件对象
      form.append("author", this.form.author); // 文件对象
      form.append("titleDesc", this.form.titleDesc); // 文件对象
      form.append("type", this.value); // 文件对象
      form.append("content", this.content); // 文件对象
      this.$store.dispatch("newpaper/addnewspaper", form).then((res) => {
        if (res.status != 0) {
          return this.$message.error(res.massage);
        }
        this.$message({
          message: "添加新闻成功~",
          type: "success",
        });
        this.$router.push("/newspaper/newspaperlist");
      });
    },
    //获取新闻类型
    getnewstype() {
      this.$store.dispatch("newpaper/newstype").then((res) => {
        this.options = res.data;
      });
    },
    //取消按钮
    cancel() {
      this.$router.push("/newspaper/newspaperlist");
    },
  },
  components: {
    quillEditor,
  },
};
</script>
<style lang="scss">
.main {
  padding: 20px 20px;
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
  margin-left: 500px;
}
</style>