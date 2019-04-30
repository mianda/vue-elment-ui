<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted: function() {
    this.$axios({
      url: "https://api.github.com/users",
      // data:{},
      params: {},
      type: "GET",
      dataType: "json"
    }).then(res => {
      // console.log(res.data);
    });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
