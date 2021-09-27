<template>
  <div id="categoriesList">
    <el-card class="box-card">
      <el-button type="success" @click="openAddDialog" class="addBtn"
        >新增分类</el-button
      >
      <h1>分类列表</h1>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="220"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--    新增分类-->
      <el-dialog title="新增分类" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm" :rules="addRules" ref="ruleAddForm">
          <el-form-item
            label="分类名称"
            required
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </div>
      </el-dialog>
      <!--    编辑分类-->
      <el-dialog title="修改" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm" :rules="editRules" ref="ruleEditForm">
          <el-form-item
            label="分类名称"
            :label-width="formLabelWidth"
            prop="editName"
          >
            <el-input v-model="editForm.editName" autocomplete="off"></el-input>
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
  editCategories,
} from "../api/categories";
export default {
  name: "CategoriesList",
  data() {
    return {
      items: [],
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      addForm: {
        name: "",
      },
      editForm: {
        editName: "",
      },
      editId: "",
      formLabelWidth: "100px",
      addRules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
      editRules: {
        editName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    openAddDialog() {
      this.addDialogFormVisible = true;
      this.addForm.name = "";
    },
    async addCategory() {
      this.addDialogFormVisible = false;
      await this.$refs.ruleAddForm.validate(async (valid) => {
        if (valid) {
          const res = await addCategories(this.addForm);
          console.log(res);
          this.$message.success("保存成功！");
          await this.fetch();
        } else {
          this.$message.warning("请输入分类名称");
          return false;
        }
      });
    },
    async fetch() {
      const res = await categoriesList();
      this.items = JSON.parse(res.data);
    },
    async handleClick(row) {
      this.editDialogFormVisible = true;
      const res = await categoryDetail(row._id);
      this.editId = JSON.parse(res.data)._id;
      this.editForm.editName = JSON.parse(res.data).name;
    },
    async editCategory() {
      this.editDialogFormVisible = false;
      const form = {
        name: this.editForm.editName
      }
      const res = await editCategories(this.editId, form);
      console.log(res);
      await this.fetch();
    },
  },
};
</script>
i
<style scoped>
.el-dialog {
  width: 50%;
  height: 100%;
}
.addBtn {
  margin: 0 0 20px 0;
}
</style>
