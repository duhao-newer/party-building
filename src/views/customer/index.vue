<template>
  <div class="dis">
    <div class="filterBox">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
      <el-button type="primary" @click="findcustomerByname()">查询</el-button>
      <el-button type="success">导入用户</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column width="80" label="#">
        <template>
          <el-checkbox v-model="checked"></el-checkbox>
        </template>
      </el-table-column>
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
    <el-button type="danger" icon="el-icon-delete" class="del">危险按钮</el-button>
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
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" width="70%">
      <section>
       <el-table
         :show-header="false"
         :data="gridData"
         :span-method="objectSpanMethod"
         border
         :cell-style="columnStyle"
         style="width: 100%; margin-top: 20px"
       >
         <el-table-column prop="id" label="ID" width="240">
           <template slot-scope="scope">
             <div>
               <img :src="scope.row.id|setPicUrl" />
             </div>
           </template>
         </el-table-column>
         <el-table-column width="80" prop="name"></el-table-column>
         <el-table-column prop="amount1"></el-table-column>
         <el-table-column width="80" prop="amount2"></el-table-column>
         <el-table-column prop="amount3"></el-table-column>
         <el-table-column width="80" prop="amount2"></el-table-column>
         <el-table-column prop="amount3"></el-table-column>
       </el-table>
     </section>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      input: "",
      tableData: [],
      page: 1,
      limit: 8,
      total: 99,
      checked: true,
      dialogTableVisible: false,
      gridData: [{
          id: 1,
          name: "用户ID",
          amount1: 1,
          amount2: "注册时间",
          amount3: 1
        },
        {
          id:1,
          name: "微信昵称",
          amount1: 1,
          amount2: "手机号码",
          amount3: 1
        },
        {
          id: 1,
          name: "会员名称",
          amount1: 1,
          amount2: "会员等级",
          amount3: 1
        },
        {
          id: 1,
          name: "用户来源",
          amount1: 1,
          amount2: "常住地",
          amount3:
            1 +
            1 +
            1
        }],
    };
  },
  created() {
    this.getcustomerlist();
  },
  methods: {
     // 自定义列背景色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 3||columnIndex==5) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      }else{
        return "background:#ffffff;";
      }
    },
    // 和并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 6 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    //查询用户列表信息
    getcustomerlist() {
      this.$store
        .dispatch("customer/customers", { page: this.page, limit: this.limit })
        .then((res) => {
          if (res.status != 0) {
            return this.$message.error("网络出错了~");
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
      this.$store
        .dispatch("customer/seletecustomerBynames", {
          username: this.input.trim(),
        })
        .then((res) => {
          if (res.status != 0) {
            return this.$message.error("网络出错了~");
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
              return this.$message.error("网络出错了~");
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
      console.log(scope.row.id)
      this.dialogTableVisible = true;
      this.$store
        .dispatch("customer/detcustomer", { userID: scope.row.id + "" })
        .then((res) => {
          if (res.status != 0) {
            return this.$message.error("网络出错了~");
          }
          this.gridData.shift();
          this.gridData.push(res.data);
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
  margin-top: 30px;
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
</style>