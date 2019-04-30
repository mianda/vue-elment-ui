<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择">
          <el-option-group v-for="group in titleArr" :key="group.title" :label="group.title">
            <el-option
              v-for="item in group.children"
              :key="item.title"
              :label="item.title"
              :value="item.category_id"
            ></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="推荐类型">
        <el-checkbox label="置顶" name="type" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" name="type" v-model="form.is_hot"></el-checkbox>
      </el-form-item>
      <el-form-item label="内容标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="form.sub_title"></el-input>
      </el-form-item>
      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8899/admin/article/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-model="form.imgList"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
      </el-form-item>
      <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
      </el-form-item>
      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>
      <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
      </el-form-item>
      <el-form-item label="图片相册">
        <el-upload
          action="http://localhost:8899/admin/article/uploadimg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          v-model="form.fileList"
          :on-success="handlePicSuccess"
        >
          <i class="el-icon-plus el-icon-plus-single"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item label="内容摘要">
        <el-input v-model="form.zhaiyao"></el-input>
      </el-form-item>
      <el-form-item label="内容描述">
        <quillEditor v-model="form.content"></quillEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//导入富文本编辑器的样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
//导入组件
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        status: false,
        is_slide: false,
        is_top: false,
        is_hot: false,
        zhaiyao: "",
        content: "",
        category_id: "",
        imgList: [
          {
            name: "",
            url: "",
            shorturl: ""
          }
        ],
        fileList: [
          {
            name: "",
            url: "",
            shorturl: ""
          }
        ]
      },

      titleArr: [],
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      value: ""
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      console.log(this.form);
      this.$axios({
        url: "/admin/goods/add/goods",
        method: "POST",
        data: this.form,
        //处理跨域请求的参数
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data;
        // console.log(status);
        // console.log(message);
        if (status == 1) {
          // console.log(123);
          //成功的提示
          this.$message({
            type: "success",
            message: "商品添加成功"
          });
          // 返回上一页
          this.$router.push("/admin/goods-list");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      // console.log(res, file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.imgList = [res];
    },
    // 上传之前的判断，如果返回值是false，上传中断并且返回
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePicSuccess(res, file, fileList) {
      // console.log(res);
      // console.log(file);
      // console.log(fileList);
      this.fileList = fileList.map(v => {
        return v.response;
      });
    },
    handleRemove(file, fileList) {
      // console.log(file);
      // console.log(fileList);
      this.fileList = fileList.map(v => {
        return v.response;
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      console.log(res);
      const { status, message } = res.data;
      if (status == 0) {
        //使用递归的方式实现
        var arr = [];
        message.forEach(v => {
          //判断是否是顶级
          if (v.parent_id == 0) {
            //如果是顶级栏目，直接把栏目添加到arr的第一层
            arr.push(v);
          } else {
            //如果不是顶级，交给递归函数去判断是哪一个栏目的子选项
            loop(arr, v);
          }
        });

        //递归函数，循环判断是否有子选项
        function loop(arr, item) {
          //循环当前数组
          arr.forEach(v => {
            //当子选项的parent_id和arr中某个栏目的category_id相等的话，//就认为它是子选项
            if (v.category_id == item.parent_id) {
              //是否有children
              if (!v.children) {
                v.children = [];
              }
              v.children.push(item);
              return;
            }
            //如果上面的循环找到父元素，并且当前元素还有子选项，继续往子选项中查找
            if (v.children) {
              loop(v.children, item);
            }
          });
        }
      }

      this.titleArr = arr;
      // console.log(this.titleArr);
    });
  },
  components: {
    quillEditor
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
