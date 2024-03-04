<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"
import { deleteProduct } from '@/api/product'
const open =()=>{
  dialogFormVisible.value = true
}
const dialogFormVisible  = ref(false)
const productId = ref()
bus.on('deleteProductId', (row)=>{
  productId.value = row.id
})
const emit=defineEmits(['success'])
//删除产品
const deleteproduct = async ()=>{
  const res  = await  deleteProduct(productId.value)
  if (res.status == 0){
    ElMessage({
      message: '删除产品成功',
      type: 'success',
    })
    dialogFormVisible.value= false
    emit('success')
  } else {
    ElMessage.error('删除产品失败!请再次尝试')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="删除产品" width="600px" destroy-on-close>
    <span>是否删除该产品?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteproduct">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>