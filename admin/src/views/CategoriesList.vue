<template>
  <div id="categoriesList">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// import {
//
// } from '@/api/categories'
export default {
  name: "CategoriesList",
  data() {
    return {
      items: [],
    };
  },
  created() {
  },
  methods(){
    // async fetch(){
    //   const res = await
    // }
  }
};
</script>

<style scoped></style>
