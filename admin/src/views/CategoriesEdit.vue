<template>
  <div class="CategoriesEdit">
    <h1>新建分类</h1>
    <el-form ref="model" :model="model" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  categories
} from '../api/categories'
export default {
  name: "CategoriesEdit",
  data() {
    return {
      model: {
        name: ''
      },
    };
  },
  methods: {
    async save() {
      const res = await categories(this.model)
      console.log(res)
      await this.$router.push('/categories/list')
      this.$message.success('保存成功！')
    }
  },
};
</script>

<style scoped></style>
