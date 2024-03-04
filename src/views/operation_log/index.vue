<script setup lang="ts">
import BreadCrumb from "@/components/bread_crumb.vue";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
//获取列表和绑定上传的文件和用户
import { bus } from "@/utils/mitt.js"
import {Search} from "@element-plus/icons-vue";
import {operationLogList,searchOperationList} from '@/api/log'
import Tips from './components/tips.vue'
const breadCrumb =ref()
const item=reactive({
  first:'操作日志',
  second:"",
})
//表格的数据
const tableData = ref([])
////获取第一页的数据
const getFristPage =async ()=>{
  tableData.value = await operationLogList() as any
  console.log(tableData.value)
}
getFristPage()
//搜索的函数
const name = ref()
const searchlog =async ()=>{
  tableData.value = await searchOperationList(name.value) as any
}
//清空操作日志
const tip = ref()
const level = (level:string)=>{
  if (level == '高级'){
    return 'danger'
  }
  if (level == '中级'){
    return 'warning'
  }
  if (level == '低级'){
    return 'success'
  }
}
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
              placeholder="输入操作者进行搜索"
              :prefix-icon="Search"
              style="width: 200px"
              clearable
              @clear="getFristPage"
              @change="searchlog()"
          />
        </div>
        <div class="upload-wrapped">
            <el-button type="primary" @click="clearOperationLog">清空操作日志</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%;" >
          <el-table-column prop="operation_person" label="操作者" >
            <template #default="{row}">
              <div :class="level(row.operation_level)">
                <span class="person">{{row.operation_person}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="operation_content" label="操作内容" ></el-table-column>
          <el-table-column prop="operation_level" label="操作等级" >
            <template #default="{row}">
              <el-tag type="success" :type="level(row.operation_level)">{{row.operation_level}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operation_time" label="操作时间" >
            <template #default="{row}">
              <div>{{row.operation_time?.slice(0,10)}}</div>
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
.person{
  margin-left: 8px;
}
.danger{
  border-left: 2px solid red ;
}
.warning{
  border-left: 2px solid yellow ;
}
.normal{
  border-left: 0px  ;
}

</style>