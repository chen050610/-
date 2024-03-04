<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {reactive, ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {tracking} from '@/utils/operation'
import {
  ElMessage
} from "element-plus"
import { auditProduct  } from '@/api/product'
import {useUserInfoStore} from '@/store/userInfo/index'
const open =()=>{
  dialogFormVisible.value = true
}
//radio单选，确定状态
const product_out_status = ref()
const dialogFormVisible  = ref(false)
const applyProductId = ref()
//使用pinia获取存储的用户信息
const userinfoStore  = useUserInfoStore()
const formData = reactive({
  id:0,
  product_out_id:0,
  product_out_status:'',
  audit_memo:"",
  product_out_price:0,
  product_out_audit_person: userinfoStore.name,
  product_out_apply_person:'',
  product_inwarehouse_number:0,
  product_single_price:0,
  product_out_number:0,
  product_name:''
})
bus.on('auditProduct', (row)=>{
  formData.id = row.id
  formData.product_out_id = row.product_out_id
  formData.product_out_price = row.product_out_price
  formData.product_out_apply_person = row.product_out_apply_person
  formData.product_inwarehouse_number = row.product_inwarehouse_number
  formData.product_single_price = row.product_single_price
  formData.product_out_number = row.product_out_number
  formData.product_name = row.product_name
})
const emit=defineEmits(['success'])


//点击确认

const auditproduct = async ()=>{
  const res  = await  auditProduct(formData)
  if (res.status == 0){
    const message = ref()
    message.value = res.message
    ElMessage({
      message: message.value,
      type: 'success',
    })
    dialogFormVisible.value= false
    const name=JSON.parse(localStorage.getItem('pinia-userInfo')).name
    tracking('产品',name,formData.product_name,'高级',formData.product_out_status)
    emit('success')
  } else {
    ElMessage.error('审核产品出库失败!请再次尝试')
  }
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="审核产品" width="600px" destroy-on-close>
    <div class="discribe">确定审核该产品的出库吗?</div>
    <el-radio-group v-model="formData.product_out_status">
      <el-radio label="同意" size="large">同意</el-radio>
      <el-radio label="否决" size="large">拒绝</el-radio>
    </el-radio-group>
    <el-input type="textarea" placeholder="请输入审核备注" v-model="formData.audit_memo"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="auditproduct">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">
.discribe{
  margin-bottom: 8px;

}
</style>