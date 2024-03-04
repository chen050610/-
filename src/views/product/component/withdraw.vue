<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"
import { withdrawProductApply } from '@/api/product'
const dialogWithdrawVisible  = ref(false)
const open =()=>{
  dialogWithdrawVisible.value = true
}
const withdrawId = ref()
bus.on('withdrawData', (row)=>{
  withdrawId.value = row.id
})
const emit=defineEmits(['success'])
//删除产品
const withdrawProductapply = async ()=>{
  const res  = await  withdrawProductApply(withdrawId.value)
  console.log(res)
  if (res.status == 0){
    ElMessage({
      message: '撤回出库申请成功',
      type: 'success',
    })
    dialogWithdrawVisible.value= false
    emit('success')
  } else {
    ElMessage.error('撤回出库申请失败!请再次尝试')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogWithdrawVisible" title="撤回申请" width="600px" destroy-on-close>
    <span>确定删除此产品的出库申请吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogWithdrawVisible= false">取消
        </el-button>
        <el-button type="primary" @click="withdrawProductapply">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>