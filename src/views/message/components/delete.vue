<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"
import { firstDelete ,recover,deleteMessage} from '@/api/message.js'
const open =()=>{
  dialogFormVisible.value = true
}
const dialogFormVisible  = ref(false)
const messageId = ref()
bus.on('deletePublishMessage', (row)=>{
  title.value = '删除消息'
  messageId.value = row.id
})
bus.on('deleteMessage', (id)=>{
  title.value = '删除消息，您将永远的删除该信息'
  messageId.value = id
})
bus.on('renewMessage', (id)=>{
  title.value = '恢复消息'
  messageId.value = id
})
const emit=defineEmits(['success'])
//删除产品
const deletemessage = async ()=>{
  if (title.value=='删除消息'){
    const res  = await  firstDelete(messageId.value)
    if (res.status == 0){
      ElMessage({
        message: '删除消息成功，若要恢复请前往回收站',
        type: 'success',
      })
      dialogFormVisible.value= false
      emit('success')
    } else {
      ElMessage.error('删除公告失败!请再次尝试')
    }
  }
  if (title.value=='恢复消息'){
    const res  = await  recover(messageId.value)
    if (res.status == 0){
      ElMessage({
        message: '恢复消息成功',
        type: 'success',
      })
      dialogFormVisible.value= false
      emit('success')
    } else {
      ElMessage.error('恢复消息失败!请再次尝试')
    }
  }
  if (title.value=='删除消息，您将永远的删除该信息'){
    const res  = await  deleteMessage(messageId.value)
    if (res.status == 0){
      ElMessage({
        message: '删除消息成功',
        type: 'success',
      })
      dialogFormVisible.value= false
      emit('success')
    } else {
      ElMessage.error('删除公告失败!请再次尝试')
    }
  }

}
const title = ref()
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="600px" destroy-on-close>
    <span v-if='title=="删除消息"'>是否删除该公告?</span>
    <span v-if='title=="删除消息，您将永远的删除该信"'>是否永久删除该公告?</span>
    <span v-if='title=="恢复消息"'>是否恢复该公告?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deletemessage">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>