<template>
  <div id="categoriesList">
    <el-card class="box-card">
      <el-button type="success" class="addBtn" @click="openAddDialog"
        >新增广告位</el-button
      >
      <h1>广告位列表</h1>
      <el-table :data="items" class="flex1">
        <el-table-column prop="_id" label="ID" />
        <el-table-column prop="name" label="广告位名称" />
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
      <!--    新增广告位-->
      <el-dialog title="新增广告位" class="dialog" :visible.sync="addDialogFormVisible">
        <el-form ref="ruleAddForm" :model="addForm">
          <el-form-item
            label="广告名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="addForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="广告" :label-width="formLabelWidth" prop="items">
            <el-button
              style="margin-bottom: 20px"
              size="small"
              @click="addForm.items.push({})"
              ><i class="el-icon-plus" />添加广告</el-button
            >
            <el-row
              type="flex"
              style="
                flex-wrap: wrap;
                justify-content: space-between;
                width: 100%;
              "
            >
              <el-col
                v-for="(item, i) in addForm.items"
                :key="i"
                :md="14"
                style="width: 45%; margin-bottom: 20px"
              >
                <el-form-item
                  label="URL"
                  class="flex2"
                  style="margin-bottom: 20px"
                >
                  <el-input v-model="item.url" />
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="(res) => $set(item, 'image', res.url)"
                  >
                    <img v-if="item.image" :src="item.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
                <el-form-item class="flex2">
                  <el-button
                    type="danger"
                    size="small"
                    @click="addForm.items.splice(i, 1)"
                    >删除</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </div>
      </el-dialog>
      <!--    编辑广告位-->
      <el-dialog title="修改广告位" class="dialog" :visible.sync="editDialogFormVisible">
        <el-form ref="ruleEditForm" :model="editForm">
          <el-form-item
            label="广告位名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="editForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="广告" :label-width="formLabelWidth" prop="items">
            <el-button
              style="margin-bottom: 20px"
              size="small"
              @click="editForm.items.push({})"
              ><i class="el-icon-plus" />添加广告</el-button
            >
            <el-row
              type="flex"
              style="
                flex-wrap: wrap;
                justify-content: space-between;
                width: 100%;
              "
            >
              <el-col
                v-for="(item, i) in editForm.items"
                :key="i"
                :md="14"
                style="width: 45%; margin-bottom: 20px"
              >
                <el-form-item
                  label="URL"
                  class="flex2"
                  style="margin-bottom: 20px"
                >
                  <el-input v-model="item.url" />
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :headers="getAuthHeaders()"
                    :on-success="(res) => $set(item, 'image', res.url)"
                  >
                    <img v-if="item.image" :src="item.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
                <el-form-item class="flex2">
                  <el-button
                    type="danger"
                    size="small"
                    @click="editForm.items.splice(i, 1)"
                    >删除</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
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
        items: [],
      },
      editForm: {
        name: "",
        items: [],
      },
      editId: "",
      formLabelWidth: "100px",
      adsURL: "ads",
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
      await addCategories(this.addForm, this.adsURL);
      this.$message.success("保存成功！");
      await this.fetch();
    },
    async fetch() {
      const res = await categoriesList(this.adsURL);
      this.items = res.data
    },
    async handleClick(row) {
      this.editDialogFormVisible = true;
      const res = await categoryDetail(row._id, this.adsURL);
      this.editId = res.data._id;
      this.editForm = Object.assign({}, this.editForm, res.data);
    },
    async editCategory() {
      this.editDialogFormVisible = false;
      await editCategories(this.editId, this.editForm, this.adsURL);
      await this.fetch();
    },
    delClick(row) {
      this.$confirm(`是否确定删除广告位"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delCategory(row._id, this.adsURL);
          if (!res.data.success) return;
          await this.fetch();
          this.$message.success("删除成功！");
        })
        .catch((err) => err);
    },
  },
};
</script>
<style scoped>
.addBtn {
  margin: 0 0 20px 0;
}
.dialog{
  min-width: 800px!important;
}
</style>
