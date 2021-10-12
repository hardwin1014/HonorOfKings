<template>
  <div id="categoriesList">
    <el-card class="box-card">
      <el-button type="success" class="addBtn" @click="openAddDialog"
        >新增分类</el-button
      >
      <h1>分类列表</h1>
      <el-table :data="items" class="flex1">
        <el-table-column prop="_id" label="ID" />
        <el-table-column prop="parent.name" label="上级分类" />
        <el-table-column prop="name" label="分类名称" />
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
      <!--    新增分类-->
      <el-dialog title="新增分类" :visible.sync="addDialogFormVisible">
        <el-form ref="ruleAddForm" :model="addForm">
          <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-select v-model="addForm.parent" style="width: 100%">
              <el-option
                v-for="item in parentOptions"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="分类名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="addForm.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </div>
      </el-dialog>
      <!--    编辑分类-->
      <el-dialog title="修改分类" :visible.sync="editDialogFormVisible">
        <el-form ref="ruleEditForm" :model="editForm">
          <el-form-item label="上级分类" :label-width="formLabelWidth">
            <el-select v-model="editForm.parent" style="width: 100%">
              <el-option
                v-for="item in parentOptions"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="分类名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="editForm.name" autocomplete="off" />
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
} from "api/categories";
export default {
  name: "CategoriesList",
  data() {
    return {
      items: [],
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      addForm: {
        name: "",
        parent: "",
      },
      editForm: {
        name: "",
        parent: "",
      },
      editId: "",
      formLabelWidth: "100px",
      parentOptions: [],
      categoriesURL: "categories",
    };
  },
  created() {
    this.fetch();
  },
  mounted() {
    this.fetchParentOptions();
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
      await this.$refs.ruleAddForm.validate(async (valid) => {
        if (valid) {
          await addCategories(this.addForm, this.categoriesURL);
          this.$message.success("保存成功！");
          await this.fetch();
        } else {
          this.$message.warning("请输入分类名称");
          return false;
        }
      });
    },
    async fetch() {
      const res = await categoriesList(this.categoriesURL);
      this.items = JSON.parse(res.data);
    },
    async handleClick(row) {
      this.editDialogFormVisible = true;
      const res = await categoryDetail(row._id, this.categoriesURL);
      this.editId = JSON.parse(res.data)._id;
      this.editForm.name = JSON.parse(res.data).name;
    },
    async editCategory() {
      this.editDialogFormVisible = false;
      await editCategories(this.editId, this.editForm, this.categoriesURL);
      await this.fetch();
    },
    delClick(row) {
      this.$confirm(`是否确定删除分类"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delCategory(row._id, this.categoriesURL);
          if (!JSON.parse(res.data).success) return;
          await this.fetch();
          this.$message.success("删除成功！");
        })
        .catch((err) => err);
    },
    async fetchParentOptions() {
      const res = await categoriesList(this.categoriesURL);
      this.parentOptions = JSON.parse(res.data);
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
