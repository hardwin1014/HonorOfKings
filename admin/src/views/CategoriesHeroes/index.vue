<template>
  <div id="categoriesHeroes">
    <el-card class="box-card">
      <el-button type="success" @click="openAddDialog" class="addBtn"
        >新增英雄</el-button
      >
      <h1>英雄列表</h1>
      <el-table :data="items" class="flex1">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="name" label="英雄名称"></el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="height: 3em" alt="英雄头像" />
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
      <!--    新增英雄-->
      <el-dialog title="新增英雄" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="称号" :label-width="formLabelWidth">
            <el-input v-model="addForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <!--          分类可以多选-->
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select
              v-model="addForm.categories"
              multiple
              placeholder="请选择分类"
            >
              <el-option
                v-for="item of categoriesList"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" :label-width="formLabelWidth">
            <el-input
              v-model="addForm.scores.difficult"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="称号" :label-width="formLabelWidth">
            <el-input v-model="addForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="称号" :label-width="formLabelWidth">
            <el-input v-model="addForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="头像"
            :label-width="formLabelWidth"
            prop="avatar"
          >
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="addUpload"
            >
              <img v-if="addForm.avatar" :src="addForm.avatar" class="avatar" />
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
      <el-dialog title="修改英雄" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm">
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="称号" :label-width="formLabelWidth">
            <el-input v-model="editForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="avatar"
            :label-width="formLabelWidth"
            prop="avatar"
          >
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="editUpload"
            >
              <img
                v-if="editForm.avatar"
                :src="editForm.avatar"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-avatar"></i>
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
  name: "CategoriesHeroes",
  data() {
    return {
      items: [],
      addForm: {
        name: "",
        avatar: "",
        title: "",
        categories: "",
        scores: {},
      },
      editForm: {
        name: "",
        avatar: "",
        title: "",
        categories: "",
        scores: {},
      },
      formLabelWidth: "100px",
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      heroesUrl: "heroes",
      categoryUrl: "categories",
      editId: "",
      categoriesList: [],
    };
  },
  created() {
    this.fetchCategories();
  },
  mounted() {
    this.fetch();
  },
  methods: {
    openAddDialog() {
      this.addDialogFormVisible = true;
      this.addForm.name = "";
      this.addForm.avatar = "";
    },
    async addCategory() {
      this.addDialogFormVisible = false;
      await addCategories(this.addForm, this.heroesUrl);
      await this.fetch();
      this.$message.success("保存成功！");
    },
    async fetch() {
      const res = await categoriesList(this.heroesUrl);
      // 合并两个对象，不会完全合并
      this.items = Object.assign({}, this.items, JSON.parse(res.data));
    },
    async fetchCategories() {
      const res = await categoriesList(this.categoryUrl);
      this.categoriesList = JSON.parse(res.data);
    },
    async handleClick(row) {
      this.editDialogFormVisible = true;
      this.editForm.name = row.name;
      this.editForm.avatar = row.avatar;
      this.editId = row._id;
    },
    delClick(row) {
      this.$confirm(`是否确定删除分类"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delCategory(row._id, this.heroesUrl);
          if (!JSON.parse(res.data).success) return;
          await this.fetch();
          this.$message.success("删除成功！");
        })
        .catch((err) => err);
    },
    async editCategory() {
      this.editDialogFormVisible = false;
      await editCategories(this.editId, this.editForm, this.heroesUrl);
      await this.fetch();
    },
    addUpload(res) {
      this.addForm.avatar = res.url;
    },
    editUpload(res) {
      this.editForm.avatar = res.url;
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
