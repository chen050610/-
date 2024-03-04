<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"
import {downloadFile,deleteFile, updateDownload} from '@/api/file.js'
const open =()=>{
  dialogFormVisible.value = true
}
const title = ref()
const dialogFormVisible  = ref(false)
const fileId = ref()
const url = ref()
const number = ref()//下载量
bus.on('download', (row)=>{
  title.value = '下载文件'
  fileId.value = row.id
  url.value = row.file_url
  number.value = row.download_number
})
bus.on('deleteFile', (row)=>{
  title.value = '删除文件'
  fileId.value = row.id
})
const emit=defineEmits(['success'])
//删除产品
const optionFile = async ()=>{
  if (title.value=='删除文件'){
    const res  = await  deleteFile(fileId.value)
    if (res.status == 0){
      ElMessage({
        message: '删除文件成功',
        type: 'success',
      })
      dialogFormVisible.value= false
      emit('success')
    } else {
      ElMessage.error('删除文件失败!请再次尝试')
    }
  }
}
//增加点击量
const changeClick =async (number,id)=>{
  await updateDownload(number,id)
  dialogFormVisible.value = false
  emit('success')
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="600px" destroy-on-close>
    <span v-if='title=="下载文件"'>是否下载该文件?</span>
    <span v-else='title=="删除文件"'>是否删除该文件?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="optionFile" v-if="title=='删除文件'">
          删除
        </el-button>
        <el-button type="primary" @click="optionFile" v-else>
          <template #default>
            <a :href="url" @click="changeClick(number,fileId)" style="text-decoration: none;color: #409eff">下载文件</a>
          </template>
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>