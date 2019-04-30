<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <!-- <div class="loginTitle">登录</div> -->
      <div class="loginTitle">登录</div>
      <el-form-item label="账号" prop="uname">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input v-model="form.upwd"></el-input>
      </el-form-item>
      <el-form-item type="flex" justify="center" class="loginBtn">
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        uname: "admin",
        upwd: "123456"
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      this.$axios({
        url: "/admin/account/login",
        data: this.form,
        method: "POST",
        withCredentials: true
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        // console.log(message);
        localStorage.setItem("uname", message.uname);
        localStorage.setItem("realname", message.realname);
        this.$router.push("/admin");
      });
    }
  },
  mounted: function() {}
};
</script>

<style>
.login {
  margin: 100px auto;
  width: 400px;
}
.loginTitle {
  color: #0094ff;
  padding-left: 68px;
  margin: 0 auto;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
}
.loginBtn {
  padding-left: 68px;
}
</style>
