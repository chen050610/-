<script setup>
import CreateAdmin from '../component/ceateAdmin.vue'
import BreadCrumb from '@/components/bread_crumb.vue'
import {reactive, ref} from "vue";
import {bus} from  '@/utils/mitt.js'
import { Search } from '@element-plus/icons-vue'
const breadCrumb =ref()
const item=reactive({
  first:'消息管理员',
})
const input1 = ref('')
const tableData = ref([
  {
    index:1,
    account:"123456781",
    name:'王昌晨',
    department:'全栈工程师',
    email:'344588',

  }
])
const Create = ref()
const openCreate = (id)=>{
  Create.value.open()
  bus.emit("createId",id)
}
</script>

<template>
  <BreadCrumb ref="breadCrumb" :item="item"></BreadCrumb>
  <div class="table-wrapped">
    <!--    顶部-->
    <div class="table-top">
      <div class="table-header">
        <!--        搜索框-->
        <div class="search-wrapped">
          <el-input
              v-model="input1"
              class="w-50 m-2"
              size="large"
              placeholder="输入账号进行搜索"
              :prefix-icon="Search"
          />
        </div>
        <div class="button-wrapped">
          <el-button type="primary" @click="openCreate(3)">添加消息管理员</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%" border  >
          <el-table-column type="index" width="50" />
          <el-table-column prop="account" label="账号"  />
          <el-table-column prop="name" label="姓名"  />
          <el-table-column prop="department" label="部门"  />
          <el-table-column prop="email" label="邮箱"  />
          <el-table-column   label="操作"  >
            <template #default="{row}">
              <el-button type="success">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--    底部-->
    <div class="table-footer">
      <el-pagination
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
      />
    </div>
  </div>
  <CreateAdmin ref="Create"></CreateAdmin>
</template>

<style scoped lang="scss">

</style>