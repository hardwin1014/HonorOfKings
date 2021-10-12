<template>
  <div id="categoriesList">
    <el-card class="box-card">
      <el-button type="success" class="addBtn" @click="openAddDialog"
        >新增物品</el-button
      >
      <h1>物品列表</h1>
      <el-table :data="items" class="flex1">
        <el-table-column prop="_id" label="ID" />
        <el-table-column prop="name" label="物品名称" />
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <img :src="scope.row.icon" style="height: 3em" alt="物品图标" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="delClick(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--    新增分类-->
      <el-dialog title="新增物品" :visible.sync="addDialogFormVisible">
        <el-form ref="addFormRef" :model="addForm">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="图标" :label-width="formLabelWidth" prop="icon">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="addUpload"
            >
              <img v-if="addForm.icon" :src="addForm.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
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
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="icon" :label-width="formLabelWidth" prop="icon">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="editUpload"
            >
              <img v-if="editForm.icon" :src="editForm.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
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
  // categoryDetail,
} from "api/categories";
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
      editId: "",
    };
  },
  created() {},
  mounted() {
    this.fetch();
  },
  methods: {
    openAddDialog() {
      this.addDialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.addFormRef.resetFields();
      });
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
    async handleClick(row) {
      this.editDialogFormVisible = true;
      this.editForm.name = row.name;
      this.editForm.icon = row.icon;
      this.editId = row._id;
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
      await editCategories(this.editId, this.editForm, this.itemsUrl);
      await this.fetch();
    },
    addUpload(res) {
      console.log(111);
      // res表示服务端的响应，file是图片信息
      // this.$set(this.model,'icon',res.url)
      this.addForm.icon = res.url;
    },
    editUpload(res) {
      // res表示服务端的响应，file是图片信息
      // this.$set(this.model,'icon',res.url)
      this.editForm.icon = res.url;
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
</style>
