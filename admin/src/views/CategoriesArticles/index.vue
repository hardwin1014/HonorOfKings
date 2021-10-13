<template>
  <div id="categoriesList">
    <el-card class="box-card">
      <el-button type="success" class="addBtn" @click="openAddDialog"
        >新建文章</el-button
      >
      <h1>文章列表</h1>
      <el-table :data="items" class="flex1">
        <el-table-column prop="_id" label="ID" />
        <el-table-column prop="title" label="标题" />
        <el-table-column label="操作">
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
      <!--    新增文章-->
      <el-dialog title="新增文章" :visible.sync="addDialogFormVisible">
        <el-form ref="ruleAddForm" :model="addForm">
          <el-form-item
            label="所属分类"
            :label-width="formLabelWidth"
            prop="categories"
          >
            <!--            一个文章所属多个分类-->
            <el-select
              v-model="addForm.categories"
              multiple
              style="width: 100%"
            >
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="addForm.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="详情" :label-width="formLabelWidth" prop="body">
            <vue-editor
              v-model="addForm.body"
              use-custom-image-handler
              @image-added="handleImageAdded"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </div>
      </el-dialog>
      <!--    编辑文章-->
      <el-dialog title="修改文章" :visible.sync="editDialogFormVisible">
        <el-form ref="ruleEditForm" :model="editForm">
          <el-form-item
            label="所属分类"
            :label-width="formLabelWidth"
            prop="categories"
          >
            <!--一个文章所属多个分类-->
            <el-select
              v-model="editForm.categories"
              multiple
              style="width: 100%"
            >
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="editForm.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="详情" :label-width="formLabelWidth" prop="body">
            <vue-editor
              v-model="editForm.body"
              use-custom-image-handler
              @image-added="handleImageAdded"
            />
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
  categoryDetail,
  delCategory,
  editCategories,
  uploadPic,
} from "api/categories";
import { VueEditor } from "vue2-editor";
export default {
  name: "CategoriesList",
  components: {
    VueEditor,
  },
  data() {
    return {
      items: [],
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      addForm: {
        title: "",
        categories: "",
      },
      editForm: {
        title: "",
        categories: "",
      },
      editId: "",
      formLabelWidth: "100px",
      categories: [],
      articlesURL: "articles",
      categoriesURL: "categories",
    };
  },
  created() {
    this.fetch();
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    openAddDialog() {
      this.addDialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.ruleAddForm.resetFields();
      });
    },
    async addCategory() {
      this.addDialogFormVisible = false;
      await addCategories(this.addForm, this.articlesURL);
      this.$message.success("保存成功！");
      await this.fetch();
    },
    async fetch() {
      const res = await categoriesList(this.articlesURL);
      this.items = res.data;
    },
    async handleClick(row) {
      this.editDialogFormVisible = true;
      const res = await categoryDetail(row._id, this.articlesURL);
      this.editId = res.data._id;
      this.editForm = Object.assign({}, this.editForm, res.data);
    },
    async editCategory() {
      this.editDialogFormVisible = false;
      await editCategories(this.editId, this.editForm, this.articlesURL);
      await this.fetch();
    },
    delClick(row) {
      this.$confirm(`是否确定删除文章"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delCategory(row._id, this.articlesURL);
          if (!res.data.success) return;
          await this.fetch();
          this.$message.success("删除成功！");
        })
        .catch((err) => err);
    },
    // 获取所属分类的数据
    async fetchCategories() {
      const res = await categoriesList(this.categoriesURL);
      this.categories = res.data;
    },
    // vue2-editor的方法
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadPic(formData);
      // 光标位置插入一张图片,地址
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader(); // 重置上传的东西
    },
  },
};
</script>
<style scoped>
.addBtn {
  margin: 0 0 20px 0;
}
::v-deep .ql-editor img {
  width: 178px;
  height: 178px;
}
</style>
