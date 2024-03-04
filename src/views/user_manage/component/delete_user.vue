<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {tracking} from '@/utils/operation'
import {
  ElMessage
} from "element-plus"
import {deleteUser} from '@/api/userInfo'
const open =()=>{
  dialogDeleteVisible.value = true
}
const dialogDeleteVisible  = ref(false)
const id = ref()
const account = ref()
const userName = ref()
bus.on('deleteUserId',async (data)=>{
  id.value = data.id
  account.value = data.account
  userName.value =  data.name
})
const emit=defineEmits(['success'])
const deleteuser = async ()=>{
  const res  = await  deleteUser(id.value,account.value)
  if (res.status == 0){
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    const name=JSON.parse(localStorage.getItem('pinia-userInfo')).name
    tracking('管理员',name,userName.value,'高级')
    dialogDeleteVisible.value = false
    bus.emit('offDialog',1)
    bus.emit('refeshone',1)
  } else {
    ElMessage.error('降级失败!请再次尝试')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogDeleteVisible" title="删除操作" width="600px" destroy-on-close>
    <span v-if="adminid">是否永久删除此用户</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteuser">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>