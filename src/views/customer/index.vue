<template>
  <div class="dis">
    <!-- 查询模板 -->
    <div class="filterBox">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
      <el-button type="primary" @click="findcustomerByname()">查询</el-button>
      <el-button type="success" @click="dialogVisible = true">导入用户</el-button>
    </div>
    <!-- 内容表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      @selection-change="changeFun"
    >
      <el-table-column width="80" type="selection" size="medium"></el-table-column>
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <a
            href="#"
            style="color:#3CB4E5;text-decoration:underline"
            @click.prevent="userlist(scope) "
          >{{scope.row.username}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="id_card" label="证件" width="200"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column label="积分">
        <template slot-scope="scope">
          <el-tag>{{scope.row.total_score}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.disabled=='0'"
            size="mini"
            type="success"
            @click="opendown(scope)"
          >启用</el-button>
          <el-button
            v-if="scope.row.disabled=='1'"
            size="mini"
            @click="opendown(scope)"
            type="danger"
          >禁止</el-button>
          <el-button size="mini" type="danger" @click="resets(scope)">密码重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 批量重置密码 -->
    <el-button type="danger" icon="el-icon-delete" class="del" @click="deleteAll()">批量重置密码</el-button>
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
    <!-- 个人弹出框模板 -->
    <el-dialog title="党员信息" :visible.sync="dialogTableVisible" width="45%">
      <div class="divs">
        <div class="left">
          <img src="@/icons/1.jpg" alt="网络瞌睡了" class="avator" />
          <p>姓名：{{gridData.username}}</p>
          <dl>
            <dd>电话： {{gridData.phone}}</dd>
            <dd>QQ： {{gridData.qq_num}}</dd>
            <dd>微信：{{gridData.wx_num}}</dd>
          </dl>
        </div>
        <div class="right">
          <table class="tab">
            <tr class="tr">
              <td>民族：</td>
              <td>{{gridData.nation}}</td>
            </tr>
            <tr class="tr">
              <td>年龄：</td>
              <td>{{gridData.age}}</td>
            </tr>
            <tr class="tr">
              <td>性别：</td>
              <td>{{gridData.sex}}</td>
            </tr>
            <tr class="tr">
              <td>党支部：</td>
              <td>{{gridData.branch_name}}</td>
            </tr>
            <tr class="tr">
              <td>专业：</td>
              <td></td>
            </tr>
            <tr class="tr">
              <td>学历：</td>
              <td>{{gridData.education}}</td>
            </tr>
            <tr class="tr">
              <td>职称：</td>
              <td>{{gridData.job_rank}}</td>
            </tr>
            <tr class="tr">
              <td>入党时间：</td>
              <td>{{gridData.join_party_time}}</td>
            </tr>
            <tr class="tr">
              <td>当前积分：</td>
              <td>{{gridData.total_score}}</td>
            </tr>
            <tr class="tr">
              <td>状态：</td>
              <td>{{gridData.disabled}}</td>
            </tr>
          </table>
        </div>
      </div>
    </el-dialog>
    <!-- 导入信息模板 -->
    <el-dialog title="请选择excel文件" :visible.sync="dialogVisible" width="30%">
      <el-upload
        class="upload-demo sub"
        drag
        action
        ref="upload"
        :http-request="uploadFile"
        :auto-upload="false"
        accept=".xlsx, .xls"
        :show-file-list="true"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadExcelAll()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "", //查询名字
      tableData: [], //党员的全部信息
      page: 1, //分页
      limit: 8, //每页限制的信息数
      total: 99, //总的信息数
      checkboxData: [], //多选框选中的
      dialogTableVisible: false, //控制弹出框
      gridData: {}, //弹出框的内容
      dialogVisible: false, //控制弹出框
      flag: false, //控制提交
    };
  },
  created() {
    this.getcustomerlist();
  },
  methods: {
    //监听checkboxs的值
    changeFun(val) {
      this.checkboxData = val;
    },
    //查询用户列表信息
    getcustomerlist() {
      this.$store
        .dispatch("customer/customers", { page: this.page, limit: this.limit })
        .then((res) => {
          if (res.status != 0) {
            return this.$message.error(res.massage);
          }
          this.tableData = res.data;
          this.total = res.total;
        })
        .catch(() => {
          // this.loading = false;
        });
    },
    //分页功能
    changepage() {
      this.getcustomerlist();
    },
    //根据名字查询个人信息
    findcustomerByname() {
      if (!this.input) {
        return this.$message({
          message: "内容不能为空~",
          type: "warning",
        });
      }
      this.$store
        .dispatch("customer/seletecustomerBynames", {
          username: this.input.trim(),
        })
        .then((res) => {
          if (res.status != 0) {
            return this.$message.error(res.massage);
          }
          this.tableData = res.data;
        });
    },
    //重置密码
    resets(scpoe) {
      console.log(scpoe.row.id);
      this.$confirm("你确定要重置密码吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("customer/resetpwd", { userID: scpoe.row.id + "" })
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error("网络出错了~");
              }
              this.$message({
                message: "重置密码成功~",
                type: "success",
              });
              this.$alert("新密码为：123456", "新密码", {
                confirmButtonText: "确定",
              });
            });
        })
        .catch((rea) => {});
    },
    //启用或禁止账号
    opendown(scope) {
      let disable;
      if (scope.row.disabled == 0) {
        disable = "1";
      } else {
        disable = "0";
      }
      let val = {
        userID: scope.row.id + "",
        disabled: disable,
      };
      this.$confirm("你确定要改变账户的状态吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("customer/openAndclose", val).then((res) => {
            if (res.status != 0) {
              return this.$message.error(res.massage);
            }
            this.getcustomerlist();
            this.$message({
              message: "更改成功~",
              type: "success",
            });
          });
        })
        .catch((rea) => {});
    },
    //显示党员详细信息
    userlist(scope) {
      this.dialogTableVisible = true;
      this.$store
        .dispatch("customer/detcustomer", { userID: scope.row.id + "" })
        .then((res) => {
          if (res.status != 0) {
            return this.$message.error(res.massage);
          }
          this.gridData = res.data;
        });
    },
    //批量重置密码
    deleteAll() {
      if (this.checkboxData.length == 0) {
        return this.$message({
          message: "请先选择要重置的人员~",
          type: "warning",
        });
      }
      this.$confirm("你确定要重置选中党员的密码吗？", "提示", {
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
            .dispatch("customer/resetAllpwd", { userIDs: arr })
            .then((res) => {
              if (res.status != 0) {
                return this.$message.error(res.massage);
              }
              this.getcustomerlist();
              this.$message({
                message: "重置密码成功~",
                type: "success",
              });
              this.$alert("新密码为：123456", "新密码", {
                confirmButtonText: "确定",
              });
            });
        })
        .catch((rea) => {});
    },
    //导入用户
    uploadExcelAll(){
       this.$refs.upload.submit();
       this.dialogVisible = false
    },
    //定义excel
    uploadFile(e) {
      let fileObj = e.file;
      const form = new FormData(); // FormData 对象
      form.append("filename", fileObj); // 文件对象  'upload'是后台接收的参数名
      this.$store.dispatch("customer/uploadExcels", form).then((res) => {
        if (res.status != 0) {
          return this.$message.error(res.massage);
        }
        this.$message({
          message: "导入用户信息成功~",
          type: "success",
        });
      });
    },
  },
};
</script>
<style  lang="scss">
.dis {
  padding: 20px;
}
.filterBox {
  text-align: left;
  margin-bottom: 30px;
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
  margin-top: 20px;
  padding-right: 20px;
}
.controlopen {
  color: #fff;
  background-color: skyblue;
}
.controldown {
  color: #fff;
  background-color: red;
}
.del {
  margin-top: 20px;
}
.left {
  float: left;
  width: 30%;
  position: relative;
  .avator {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-left: 20px;
  }
  p {
    position: absolute;
    left: 19px;
    top: 83px;
    color: red;
  }
  dl {
    margin-top: 49px;
    line-height: 25px;
    margin-left: -20px;
  }
}
.right {
  width: 60%;
  margin-left: 220px;
  .tab {
    width: 100%;
  }
  td {
    line-height: 25px;
    padding: 0 20px;
  }
}
.sub{
  margin-left: 20px;
}
</style>