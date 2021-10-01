<template>
  <div id="categoriesList">
    <el-card class="box-card">
      <el-button type="success" @click="openAddDialog" class="addBtn"
        >新增物品</el-button
      >
      <h1>物品列表</h1>
      <el-table :data="items" class="flex1">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="name" label="物品名称"></el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="height: 3em" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="delClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--    新增分类-->
      <el-dialog title="新增物品" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图标" :label-width="formLabelWidth" prop="icon">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="addForm.icon" :src="addForm.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </div>
      </el-dialog>
      <!--    编辑分类-->
      <el-dialog title="修改物品" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm">
          <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-input v-model="editForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="分类名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="editForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCategory">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  addCategories,
  categoriesList,
  delCategory,
  editCategories,
} from "../api/categories";
export default {
  name: "CategoriesItems",
  data() {
    return {
      items: [],
      addForm: {
        name: "",
        icon: "",
      },
      editForm: {
        name: "",
        icon: "",
      },
      formLabelWidth: "100px",
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      itemsUrl: "items",
    };
  },
  created() {},
  mounted() {
    this.fetch();
  },
  methods: {
    openAddDialog() {
      this.addDialogFormVisible = true;
      this.addForm.name = "";
      this.addForm.icon = "";
    },
    async addCategory() {
      this.addDialogFormVisible = false;
      await addCategories(this.addForm, this.itemsUrl);
      await this.fetch();
      this.$message.success("保存成功！");
    },
    async fetch() {
      const res = await categoriesList(this.itemsUrl);
      this.items = JSON.parse(res.data);
    },
    async handleClick() {
      this.editDialogFormVisible = true;
      // const res = await categoryDetail(row._id, this.itemsUrl);
      // this.editId = JSON.parse(res.data)._id;
      // this.editForm.name = JSON.parse(res.data).name;
    },
    delClick(row) {
      this.$confirm(`是否确定删除分类"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delCategory(row._id, this.itemsUrl);
          if (!JSON.parse(res.data).success) return;
          await this.fetch();
          this.$message.success("删除成功！");
        })
        .catch((err) => err);
    },
    async editCategory() {
      this.editDialogFormVisible = false;
      const res = await editCategories(
        this.editId,
        this.editForm,
        this.itemsUrl
      );
      console.log(res);
      await this.fetch();
    },
    afterUpload(res, file) {
      // res表示服务端的响应，file是图片信息
      this.addForm.icon = URL.createObjectURL(file.raw);
    },
  },
};
</script>
<style scoped>
.el-dialog {
  width: 50%;
  height: 100%;
}
.addBtn {
  margin: 0 0 20px 0;
}
::v-deep .avatar-uploader .el-upload {
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
.flex1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
