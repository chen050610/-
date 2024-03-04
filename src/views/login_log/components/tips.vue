<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"
import {clearLogList} from '@/api/log'
const open =()=>{
  dialogFormVisible.value = true
}
const dialogFormVisible  = ref(false)

const emit=defineEmits(['success'])
//删除产品
const optionLog = async ()=>{
  const res  = await  clearLogList()
  if (res.status == 0){
    ElMessage({
      message: '清空登录日志成功',
      type: 'success',
    })
    dialogFormVisible.value= false
    emit('success')
  } else {
    ElMessage.error('清空登录日志失败!请再次尝试')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="清空日志" width="600px" destroy-on-close>
    <span >是否清空登录日志?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="optionLog">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>