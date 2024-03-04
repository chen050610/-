<script setup lang="ts">
import {createAdmin} from '@/api/userInfo'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import {bus} from  '@/utils/mitt.js'
import {create} from "axios";
import { applyOutProduct } from '@/api/product'
import {string} from "fast-glob/out/utils";
let dialogFormVisible = ref(false)
const title = ref()
const open =()=>{
  dialogFormVisible.value = true
}

interface formData {
  id:number,
  product_out_id:number,
  product_name:string
  product_out_number:number,
  product_out_apply_person:string,
  apply_memo:string,
  product_single_price:number
}
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
bus.on("applyId",(row)=> {
  formData.id= row.id
  formData.product_name= row.product_name
  formData.product_single_price= row.product_single_price
  formData.product_inwarehouse_number= row.product_inwarehouse_number
})
const rules = reactive({
  product_out_id:[
    { required: true, message: '请输入申请出库编号',trigger:'blur' },
  ],
  product_out_number:[
    { required: true, message: '请输入申请出库的数量' ,trigger:'blur'},
  ],
  product_out_apply_person:[
    { required: true, message: '请输入出库的申请人' ,trigger:'blur'},
  ],
  apply_memo:[
    { required: true, message: '请输入出库备注' ,trigger:'blur'},
  ],
})
//产品入库操作
const emit=defineEmits(['success'])
const addProduct =async ()=>{
  const res = await applyOutProduct(formData)
  if (res.status==0){
    ElMessage({
      message: '产品申请出库成功',
      type: 'success',
    })
    dialogFormVisible.value= false
    emit('success')
  } else {
    ElMessage.error('产品申请出库失败!请再次尝试')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="申请出库" width="600px" align-center draggable>
      <div class="product-name">您申请出库的产品名字是:&nbsp;{{formData.product_name}}</div>
      <div class="product-name">该产品的库存还有:&nbsp;{{formData.product_inwarehouse_number}}</div>
      <div class="dialog-content">
        <el-form :model="formData" label-width="100px" :rules="rules" :label-position="'left'">
          <el-form-item label="出库编号" prop="product_out_id">
            <el-input v-model="formData.product_out_id" />
          </el-form-item>
          <el-form-item label="出库数量" prop="product_out_number">
            <el-input v-model="formData.product_out_number" />
          </el-form-item>
          <el-form-item label="产品单价" prop="product_single_price">
            <el-input v-model="formData.product_single_price" disabled/>
          </el-form-item>
          <el-form-item label="出库申请人" prop="product_out_apply_person">
            <el-input v-model="formData.product_out_apply_person" />
          </el-form-item>
          <el-form-item label="申请出库备注" prop="apply_memo">
            <el-input
                v-model="formData.apply_memo"
                autosize
                type="textarea"
                placeholder="请输入入库备注"
            />
          </el-form-item>
        </el-form>
      </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible= false">取消</el-button>
        <el-button type="primary" @click="addProduct">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<style scoped lang="scss">
.dialog-content{
  display: flex;
  padding: 0px 30px 20px 30px;
}
.product-name{
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: #333;
  margin: 10px;
}
:deep(.el-form-item){
  margin: 30px;
}
</style>