<template>
  <div>
    <el-container class="admin-container">
      <el-aside width="auto">
        <Aside :collapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header>
          <Header @handleClick="updateCollapse"/>
        </el-header>
        <el-main>
          <el-breadcrumb separator=">" class="el-breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in routerInfo" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../components/Aside.vue";
import Header from "../components/Header.vue";
export default {
  components: {
    Aside,
    Header
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    updateCollapse() {
      // console.log(456);
      this.isCollapse = !this.isCollapse;
    }
  },
  mounted() {
    // console.log(this.$route);
  },
  computed: {
    routerInfo() {
      const arr = this.$route.matched.map(v => {
        return v.meta;
      });
      return arr;
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100%;
}
/* html,
body {
  height: 100%;
} */
.admin-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-aside {
  background-color: rgb(0, 21, 41);
  color: #fff;
  text-align: center;
  line-height: 200px;
  height: 100%;
}
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
