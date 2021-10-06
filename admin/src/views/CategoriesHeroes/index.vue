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
        <el-table-column prop="title" label="称号"></el-table-column>
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
      <el-dialog
        title="新增英雄"
        style="min-width: 1440px; width: 100%; height: 100vh"
        :visible.sync="addDialogFormVisible"
      >
        <el-form :model="addForm" ref="addFormRefs">
          <el-tabs value="skills" type="border-card">
            <el-tab-pane label="基础信息">
              <el-form-item
                label="名称"
                :label-width="formLabelWidth"
                prop="name"
              >
                <el-input v-model="addForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="称号"
                :label-width="formLabelWidth"
                prop="title"
              >
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
                  <img
                    v-if="addForm.avatar"
                    :src="addForm.avatar"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <!--          分类可以多选-->
              <el-form-item
                label="类型"
                :label-width="formLabelWidth"
                prop="categories"
              >
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
              <el-form-item
                label="难度"
                :label-width="formLabelWidth"
                prop="scores.difficult"
              >
                <el-rate
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                  v-model="addForm.scores.difficult"
                  autocomplete="off"
                ></el-rate>
              </el-form-item>
              <el-form-item
                label="技能"
                :label-width="formLabelWidth"
                prop="scores.skills"
              >
                <el-rate
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                  v-model="addForm.scores.skills"
                  autocomplete="off"
                ></el-rate>
              </el-form-item>
              <el-form-item
                label="攻击"
                :label-width="formLabelWidth"
                prop="scores.attack"
              >
                <el-rate
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                  v-model="addForm.scores.attack"
                  autocomplete="off"
                ></el-rate>
              </el-form-item>
              <el-form-item
                label="生存"
                :label-width="formLabelWidth"
                prop="scores.survive"
              >
                <el-rate
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                  v-model="addForm.scores.survive"
                  autocomplete="off"
                ></el-rate>
              </el-form-item>
              <el-form-item
                label="顺风出装"
                :label-width="formLabelWidth"
                prop="items1"
              >
                <el-select v-model="addForm.items1" multiple>
                  <el-option
                    v-for="item of equips"
                    :label="item.name"
                    :value="item._id"
                    :key="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="逆风出装"
                :label-width="formLabelWidth"
                prop="items2"
              >
                <el-select v-model="addForm.items2" multiple>
                  <el-option
                    v-for="item of equips"
                    :label="item.name"
                    :value="item._id"
                    :key="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="使用技巧"
                :label-width="formLabelWidth"
                prop="usageTips"
              >
                <el-input
                  v-model="addForm.usageTips"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="对战技巧"
                :label-width="formLabelWidth"
                prop="battleTips"
              >
                <el-input
                  v-model="addForm.battleTips"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="团战思路"
                :label-width="formLabelWidth"
                prop="teamTips"
              >
                <el-input
                  v-model="addForm.teamTips"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="技能" name="skills">
              <el-button
                @click="addForm.skills.push({})"
                style="margin-bottom: 20px"
                size="small"
                ><i class="el-icon-plus"></i>添加技能</el-button
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
                  :md="12"
                  style="width: 45%; margin-bottom: 20px"
                  v-for="(item, i) in addForm.skills"
                  :key="i"
                >
                  <el-form-item label="名称" class="flex2" prop="name">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="图标" prop="icon">
                    <el-upload
                      class="avatar-uploader"
                      action="http://127.0.0.1:3000/admin/api/upload"
                      :show-file-list="false"
                      :on-success="(res) => $set(item, 'icon', res.url)"
                    >
                      <img v-if="item.icon" :src="item.icon" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item class="flex2" label="描述" prop="description">
                    <el-input
                      type="textarea"
                      v-model="item.description"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class="flex2" label="小提示" prop="tips">
                    <el-input type="textarea" v-model="item.tips"></el-input>
                  </el-form-item>
                  <el-form-item class="flex2">
                    <el-button
                      type="danger"
                      size="small"
                      @click="addForm.skills.splice(i, 1)"
                      >删除</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </div>
      </el-dialog>
      <!--    编辑分类-->
      <el-dialog
        title="修改英雄"
        style="min-width: 1440px; width: 100%; height: 100vh"
        :visible.sync="editDialogFormVisible"
      >
        <el-form :model="editForm" ref="editFormRefs">
          <el-tabs value="skills" type="border-card">
            <el-tab-pane label="基础信息">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="editForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="称号" :label-width="formLabelWidth">
                <el-input
                  v-model="editForm.title"
                  autocomplete="off"
                ></el-input>
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
                  :on-success="editUpload"
                >
                  <img
                    v-if="editForm.avatar"
                    :src="editForm.avatar"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <!--          分类可以多选-->
              <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select
                  v-model="editForm.categories"
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
                <el-rate
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                  v-model="editForm.scores.difficult"
                  autocomplete="off"
                ></el-rate>
              </el-form-item>
              <el-form-item label="技能" :label-width="formLabelWidth">
                <el-rate
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                  v-model="editForm.scores.skills"
                  autocomplete="off"
                ></el-rate>
              </el-form-item>
              <el-form-item label="攻击" :label-width="formLabelWidth">
                <el-rate
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                  v-model="editForm.scores.attack"
                  autocomplete="off"
                ></el-rate>
              </el-form-item>
              <el-form-item label="生存" :label-width="formLabelWidth">
                <el-rate
                  :max="10"
                  show-score
                  style="margin-top: 10px"
                  v-model="editForm.scores.survive"
                  autocomplete="off"
                ></el-rate>
              </el-form-item>
              <el-form-item label="顺风出装" :label-width="formLabelWidth">
                <el-select v-model="editForm.items1" multiple>
                  <el-option
                    v-for="item of equips"
                    :label="item.name"
                    :value="item._id"
                    :key="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="逆风出装" :label-width="formLabelWidth">
                <el-select v-model="editForm.items2" multiple>
                  <el-option
                    v-for="item of equips"
                    :label="item.name"
                    :value="item._id"
                    :key="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="使用技巧" :label-width="formLabelWidth">
                <el-input
                  v-model="editForm.usageTips"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="对战技巧" :label-width="formLabelWidth">
                <el-input
                  v-model="editForm.battleTips"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="团战思路" :label-width="formLabelWidth">
                <el-input
                  v-model="editForm.teamTips"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="技能" name="skills">
              <el-button
                @click="editForm.skills.push({})"
                style="margin-bottom: 20px"
                size="small"
                ><i class="el-icon-plus"></i>添加技能</el-button
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
                  :md="12"
                  style="width: 45%; margin-bottom: 20px"
                  v-for="(item, i) in editForm.skills"
                  :key="i"
                >
                  <el-form-item label="名称" class="flex2">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item label="图标">
                    <el-upload
                      class="avatar-uploader"
                      action="http://127.0.0.1:3000/admin/api/upload"
                      :show-file-list="false"
                      :on-success="(res) => $set(item, 'icon', res.url)"
                    >
                      <img v-if="item.icon" :src="item.icon" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item class="flex2" label="描述">
                    <el-input
                      type="textarea"
                      v-model="item.description"
                    ></el-input>
                  </el-form-item>
                  <el-form-item class="flex2" label="小提示">
                    <el-input type="textarea" v-model="item.tips"></el-input>
                  </el-form-item>
                  <el-form-item class="flex2">
                    <el-button
                      type="danger"
                      size="small"
                      @click="editForm.skills.splice(i, 1)"
                      >删除</el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
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
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0,
        },
        skills: [],
        items1: [],
        items2: [],
        usageTips: "",
        battleTips: "",
        teamTips: "",
        partners: [],
      },
      editForm: {
        name: "",
        avatar: "",
        title: "",
        categories: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0,
        },
        skills: [],
        items1: [],
        items2: [],
        usageTips: "",
        battleTips: "",
        teamTips: "",
        partners: [],
      },
      formLabelWidth: "100px",
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      heroesUrl: "heroes",
      categoryUrl: "categories",
      itemsUrl: "items",
      editId: "",
      categoriesList: [],
      equips: [],
    };
  },
  created() {
    this.fetchCategories();
    this.fetchEquips();
  },
  mounted() {
    this.fetch();
  },
  methods: {
    openAddDialog() {
      this.addDialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.addFormRefs.resetFields();
      });
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
      this.items = Object.assign([], this.items, JSON.parse(res.data));
      console.log(this.items);
    },
    async fetchCategories() {
      const res = await categoriesList(this.categoryUrl);
      this.categoriesList = JSON.parse(res.data);
    },
    async fetchEquips() {
      const res = await categoriesList(this.itemsUrl);
      this.equips = JSON.parse(res.data);
    },
    async handleClick(row) {
      this.editDialogFormVisible = true;
      console.log(row);
      this.editForm = Object.assign(this.editForm, row);
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
::v-deep .el-dialog {
  width: 70% !important;
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
  width: 5em;
  height: 5em;
  line-height: 5em;
  text-align: center;
}
.avatar {
  width: 5em;
  height: 5em;
  display: block;
}
.flex1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.flex2 {
  display: flex;
}
</style>
