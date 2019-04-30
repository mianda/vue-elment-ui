<template>
  <div class="aside">
    <el-aside width="auto">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="rgb(0,21,41)"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
      >
        <el-submenu v-for="(item,index) in menus" :key="index" :index="`${index + 1}`">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="(v,i) in item.children" :key="i" :index="`${index + 1}-${i+1}`">
            <router-link :to="v.src" class="itemChildren">{{v.name}}</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          icon: "el-icon-menu",
          name: "购物商城",
          children: [
            { name: "商品管理", src: "/admin/goods-list" },
            { name: "栏目管理", src: "/admin/category-list" }
          ]
        },
        {
          icon: "el-icon-service",
          name: "会员管理",
          children: [{ name: "会员列表", src: "/admin/account-list" }]
        },
        {
          icon: "el-icon-document",
          name: "商城订单",
          children: [{ name: "订单管理", src: "/admin/order-list" }]
        }
      ]
    };
  },
  props: {
    collapse: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.aside {
  padding-top: 60px;
}
.itemChildren {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
}
</style>
