<script setup lang="ts">
import BreadCrumb from "@/components/bread_crumb.vue";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
//获取列表和绑定上传的文件和用户
import { bus } from "@/utils/mitt.js"
import {Search} from "@element-plus/icons-vue";
import {loginLogList,searchLoginList} from '@/api/log'
import Tips from './components/tips.vue'
const breadCrumb =ref()
const item=reactive({
  first:'登录日志',
  second:"",
})
//表格的数据
const tableData = ref([])
////获取第一页的数据
const getFristPage =async ()=>{
  tableData.value = await loginLogList() as any
}
getFristPage()
//搜索的函数
const name = ref()
const searchlog =async ()=>{
  tableData.value = await searchLoginList(name.value) as any
}
//清空操作日志
const tip = ref()
const clearOperationLog = async ()=>{
  tip.value.open()
}
</script>

<template>
  <BreadCrumb :ref="breadCrumb" :item="item"></BreadCrumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-header">
        <div>
          <el-input
              v-model="name"
              class="w-50 m-2"
              size="large"
              placeholder="输入账号进行搜索"
              :prefix-icon="Search"
              style="width: 200px"
              clearable
              @clear="getFristPage"
              @change="searchlog()"
          />
        </div>
        <div class="upload-wrapped">
          <el-button type="primary" @click="clearOperationLog">清空登录日志</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%;" >
          <el-table-column prop="account" label="账号" ></el-table-column>
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="email" label="邮箱" ></el-table-column>
          <el-table-column prop="login_time" label="登录时间" >
            <template #default="{row}">
              <div>{{row.login_time?.slice(0,10)}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="table-footer">

    </div>
  </div>
  <Tips ref="tip" @success="getFristPage"></Tips>
</template>

<style scoped lang="scss">
a {
  color:#fff;
  display: block;
  text-decoration: none;
}
</style>