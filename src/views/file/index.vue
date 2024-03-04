<script setup lang="ts">
import BreadCrumb from "@/components/bread_crumb.vue";
import type { UploadProps, UploadUserFile} from 'element-plus'
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
//获取列表和绑定上传的文件和用户
import {fileList,bindFileAndUser } from '@/api/file'
import { bus } from "@/utils/mitt.js"
import Tips from './components/tips.vue'
const breadCrumb =ref()
const item=reactive({
  first:'文件管理',
})
//表格的数据
const tableData = ref([])
//上传的文件列表
const file = ref<UploadUserFile[]>([
])
//获取文件的列表
const filelist = async ()=>{
  tableData.value = await fileList() as any
}
filelist()
// 假设handleSuccess已经在一个可以使用async的上下文中
const handleSuccess = async (response) => {
  if (response.status == 0) {
    try {
      const piniaStr = localStorage.getItem('pinia-userInfo');
      if (!piniaStr) throw new Error('未找到用户信息');
      const pinia = JSON.parse(piniaStr);
      const name = pinia.name;

      await bindFileAndUser(name, response.url); // 假定这是一个异步函数

      ElMessage({
        message: "上传成功",
        type: 'success'
      });

      filelist(); // 假设这是刷新页面的函数，如果是异步的则需要await
    } catch (error) {
      console.error(error);
      ElMessage.error('操作失败，请重试');
    }
  } else {
    ElMessage.error('上传失败!请重试');
  }
}
//上传前的钩子
const limit = ref(3)
const handleExceed = (file:File[],uploadFiles:UploadUserFile[])=>{
  ElMessage.warning(
      '最多上传三个文件!',
  )
}
//实现下载。删除文件的逻辑
const tips = ref()
const download = (row)=>{
  bus.emit('download',row)
  tips.value.open()
}
//删除
const deleteFile = (row)=>{
  bus.emit('deleteFile',row)
  tips.value.open()
}
</script>

<template>
  <BreadCrumb :ref="breadCrumb" :item="item"></BreadCrumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-header">
        <div></div>
        <div class="upload-wrapped">
          <!--              multiple这么写就可以支持多个文件-->
          <el-upload
              v-model:file-list="file"
              class="upload-demo"
              action="http://127.0.0.1:3007/file/uploadFile"
              multiple
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              :show-file-list='false'
          >
          <el-button type="primary">上传文件</el-button>
          </el-upload>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%;" >
          <el-table-column prop="file_name" label="文件名" ></el-table-column>
          <el-table-column prop="file_size" label="文件合同大小" ></el-table-column>
          <el-table-column prop="upload_person" label="上传者" ></el-table-column>
          <el-table-column prop="download_number" label="下载次数" ></el-table-column>
          <el-table-column prop="upload_time" label="下载时间" >
            <template #default="{row}">
              <div>{{row.upload_time?.slice(0,10)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right" >
            <template #default="{row}">
              <el-button type="primary" @click="download(row)">下载</el-button>
              <el-button type="success" @click="deleteFile(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <div class="table-footer">

    </div>
  </div>
  <Tips ref="tips" @success="filelist"></Tips>
</template>

<style scoped lang="scss">
a {
  color:#fff;
  display: block;
  text-decoration: none;
}
</style>