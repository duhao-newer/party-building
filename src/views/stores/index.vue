<template>
  <div>
    <el-button type="primary" class="btn" @click="clear"
      >清理垃圾图片</el-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    clear() {
      this.$confirm("是否要清理垃圾图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("newpaper/clearphones").then((res) => {
            if (res.status != 0) {
              return this.$message.error(res.massage);
            }
            this.$message({
              message: "清理成功~",
              type: "success",
            });
          });
        })
        .catch((rea) => {});
    },
  },
};
</script>
<style  lang="scss">
.btn {
  margin-left: 45%;
  margin-top: 200px;
}
</style>