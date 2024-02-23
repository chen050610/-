<script setup lang="ts">
import {ref,reactive} from "vue";
import {bus} from  '@/utils/mitt.js'
import {changeIdentityToAdmin} from '@/api/userInfo'
import {ElMessage} from "element-plus";
const  radio = ref()
const dialogPromoteVisible = ref(false)
const open =()=>{
  dialogPromoteVisible.value = true
}
const userId = ref()
bus.on('promoteId', (id)=>{
  userId.value  =id
})

const yes =async ()=>{
  const res = await changeIdentityToAdmin(userId.value,radio.value)
  if (res.status == 0){
    ElMessage({
      message: '赋权成功',
      type: 'success',
    })
    dialogPromoteVisible.value= false
    bus.emit('offDialog',1)
    bus.emit('refeshone',1)
  } else {
    ElMessage.error('修改失败!请再次尝试')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogPromoteVisible" title="赋权操作" width="30%" center >
    <el-radio-group v-model="radio" class="ml-4">
      <el-radio label="产品管理员" size="large">产品管理员</el-radio>
      <el-radio label="消息管理员" size="large">消息管理员</el-radio>
      <el-radio label="用户管理员" size="large">用户管理员</el-radio>
    </el-radio-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogPromoteVisible= false">取消
        </el-button>
        <el-button type="primary" @click="yes">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-radio-group{
  display: flex;
  justify-content: center;
}
</style>