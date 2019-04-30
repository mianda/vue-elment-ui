<template>
  <div>
    <el-row class="goodsList" type="flex" justify="space-between" align="middle">
      <div class="toolTips">
        <el-button @click="handleAddGoods">新增</el-button>
        <el-button @click="handleMoreDelet">删除</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchvalue">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="300">
        <el-row slot-scope="scope" type="flex" align="middle">
          <img :src="scope.row.imgurl" alt class="category_img">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </el-row>
      </el-table-column>
      <el-table-column prop="categoryname" label="类型" width="100"></el-table-column>
      <el-table-column prop="market_price" label="价格" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalcount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 4,
      totalcount: 0,
      idsStr: "",
      searchvalue: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getGoodsList();
    },
    handleDelete(row) {
      console.log(row); //98
      const id = row.id;
      this.$confirm("确定删除?").then(() => {
        this.$axios({
          url: `/admin/goods/del/${id}`
        }).then(res => {
          console.log(res);
          const { status, message } = res.data;
          if (status == 0) {
            this.$message({
              type: "success",
              message
            });
          }
          this.getGoodsList(res => {
            console.log(res);
          });
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      const ids = val.map(v => {
        return v.id;
      });
      this.idsStr = ids.join(",");
      // console.log(this.idsStr);
    },
    handleMoreDelet(val) {
      this.$confirm("确定删除?").then(() => {
        this.$axios({
          url: `/admin/goods/del/${this.idsStr}`
        }).then(res => {
          // console.log(res);
          const { status, message } = res.data;
          if (status == 0) {
            this.$message({
              type: "success",
              message
            });
          }
          this.getGoodsList(res => {
            // console.log(res);
          });
        });
      });
    },
    handleSearch() {
      this.getGoodsList();
    },
    handleAddGoods() {
      this.$router.push("/admin/goods-add");
    },
    handleEdit(row) {
      // console.log(row);
      // console.log(row.id);
      const id = row.id;
      this.$router.push(`/admin/goods-edit/${id}`);
    },

    getGoodsList() {
      this.$axios({
        url: `/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${
          this.pageSize
        }&searchvalue=${this.searchvalue}
        `
      }).then(res => {
        // console.log(res);/
        const { message, pageIndex, pageSize, totalcount } = res.data;
        this.tableData = message;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalcount = totalcount;
        // console.log(message);
      });
    }
  },
  mounted() {
    this.getGoodsList();
  }
};
</script>

<style>
.goodsList {
  margin: 0;
  padding: 0;
  /* height: 40px; */
}
.toolTips {
  margin: 15px 0;
  height: 40px;
}
.el-main {
  line-height: 40px;
  height: 40px;
  text-align: inherit;
}
.search {
  margin: 0;
  width: 300px;
}

.el-button {
  height: 40px;
  line-height: 40px;
}
.category_img {
  width: 80px;
  height: 80px;
  vertical-align: center;
}
</style>
