<template>
  <div id="categoriesList">
    <el-card class="box-card">
      <el-button type="success" @click="openAddDialog" class="addBtn"
        >新增管理员</el-button
      >
      <h1>管理员列表</h1>
      <el-table :data="items" class="flex1">
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="操作">
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
      <!--    新增管理员-->
      <el-dialog title="新增管理员" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm" ref="ruleAddForm">
          <el-form-item
            label="管理员名称"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="addForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input v-model="addForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </div>
      </el-dialog>
      <!--    编辑管理员-->
      <el-dialog title="修改管理员" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm" ref="ruleEditForm">
          <el-form-item
            label="管理员名称"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="editForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input v-model="editForm.password" autocomplete="off"></el-input>
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
  name: "Admin_users",
  data() {
    return {
      items: [],
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      addForm: {
        username: "",
        password: "",
      },
      editForm: {
        username: "",
        password: "",
      },
      editId: "",
      formLabelWidth: "100px",
      adminURL: "admin_users",
    };
  },
  created() {
    this.fetch();
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
          await addCategories(this.addForm, this.adminURL);
          this.$message.success("保存成功！");
          await this.fetch();
        } else {
          this.$message.warning("请输入管理员名称");
          return false;
        }
      });
    },
    async fetch() {
      const res = await categoriesList(this.adminURL);
      this.items = JSON.parse(res.data);
    },
    async handleClick(row) {
      this.editDialogFormVisible = true;
      const res = await categoryDetail(row._id, this.adminURL);
      this.editId = JSON.parse(res.data)._id;
      this.editForm.name = JSON.parse(res.data).name;
    },
    async editCategory() {
      this.editDialogFormVisible = false;
      await editCategories(this.editId, this.editForm, this.adminURL);
      await this.fetch();
    },
    delClick(row) {
      this.$confirm(`是否确定删除管理员"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delCategory(row._id, this.adminURL);
          if (!JSON.parse(res.data).success) return;
          await this.fetch();
          this.$message.success("删除成功！");
        })
        .catch((err) => err);
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
