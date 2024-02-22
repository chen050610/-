<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"
import {changeIdentityToUser} from '@/api/userInfo'
const open =()=>{
  dialogFormVisible.value = true
}
const dialogFormVisible  = ref(false)
const id = ref()
bus.on('deleteId',async (Id:number)=>{
  id.value = Id
})
const emit=defineEmits(['success'])
const deleteadmin = async ()=>{
  const res  = await  changeIdentityToUser(id.value)
  if (res.status == 0){
    ElMessage({
      message: '降级成功',
      type: 'success',
    })
    dialogFormVisible.value= false
    emit('success')
  } else {
    ElMessage.error('降级失败!请再次尝试')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="删除操作" width="600px" destroy-on-close>
    <span>是否去掉此用户的管理员职位?删除此用户将重新展现在用户列表中</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteadmin">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>