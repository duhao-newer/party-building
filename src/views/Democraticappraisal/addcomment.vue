<template>
  <div class="main">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="描述" prop="title_desc">
        <el-input v-model="form.title_desc"></el-input>
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
import { Random } from "mockjs";
export default {
  data() {
    return {
      form: {
        title_desc: "",
      }, //表单的数据;
      content: "", //富文本框的内容
      rules: {
        title_desc: [
          { required: true, message: "请输入评议描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //取消
    cancel() {
      this.$router.push("/Democraticappraisal/Democraticappraisallist");
    },
    //添加评议
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.content)
            return this.$message({ message: "内容不能为空~", type: "warning" });
          let year = new Date().getFullYear();
          let month = new Date().getMonth();
          let day = new Date().getDay();
          let h = new Date().getHours();
          let m = new Date().getMinutes();
          let s = new Date().getSeconds();
          let commentID = year + month + day + h + m + s + 1000000000+'';
          let obj = {
            commentID: commentID,
            content: this.content,
            title_desc: this.form.title_desc,
          };
          this.$store
            .dispatch("Democraticappraisal/addcommit", obj)
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error(res.massage);
              }
              this.$message({
                type: "success",
                message: "添加评议成功!",
              });
               this.$router.push("/Democraticappraisal/Democraticappraisallist");
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
.main {
  padding: 20px 20px;
}
.ql-container {
  height: 300px;
}
.submit {
  margin-left: 500px;
}
</style>