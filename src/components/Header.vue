<template>
  <div class="header">
    <i class="left el-icon-back" @click="changeCollapse"></i>
    <div class="right">
      <!-- admin 超级管理员 -->
      {{uname}} {{realname}}
      <span @click="equitLogin">退出登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "",
      realname: ""
    };
  },
  mounted() {
    this.uname = localStorage.getItem("uname");
    this.realname = localStorage.getItem("realname");
  },
  methods: {
    changeCollapse() {
      // console.log(123);
      this.$emit("handleClick");
    },
    equitLogin() {
      this.$axios({
        url: "/admin/account/logout",
        type: "GET"
      }).then(res => {
        // console.log(res);
        const { status, message } = res.data;
        if (status == 0) {
          this.$router.push("/login");
          localStorage.removeItem("uname");
          localStorage.removeItem("realname");
        }
      });
    }
  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
