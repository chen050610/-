<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {reactive, ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"
import { applyOutProduct } from '@/api/product'
const open =()=>{
  dialogFormVisible.value = true
}
const dialogFormVisible  = ref(false)
const formData = reactive({
  id:null,
  product_out_id:null,
  product_name:null,
  product_out_number:null,
  product_out_apply_person:'',
  apply_memo:'',
  product_single_price:null,
  product_inwarehouse_number:null,
})
bus.on('againId', (row)=>{
  console.log(row)
  formData.id= row.id
  formData.product_name= row.product_name
  formData.product_single_price= row.product_single_price
  formData.product_inwarehouse_number= row.product_inwarehouse_number
  formData.product_out_number= row.product_out_number
  formData.apply_memo= row.apply_memo
})
const emit=defineEmits(['success'])
//删除产品
const applyProduct = async ()=>{
  const res  = await  applyOutProduct(formData)
  if (res.status == 0){
    ElMessage({
      message: '再次申请成功',
      type: 'success',
    })
    dialogFormVisible.value= false
    emit('success')
  } else {
    ElMessage.error('申请失败失败!请再次尝试')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="再次申请出库" width="600px" destroy-on-close>
    <span>请确认此操作将再次申请产品出库</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="applyProduct">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>