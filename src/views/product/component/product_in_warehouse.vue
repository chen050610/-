<script setup lang="ts">
import {createAdmin} from '@/api/userInfo'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import {bus} from  '@/utils/mitt.js'
import {create, get} from "axios";
import { createProduct } from '@/api/product'
import {getProduct} from '@/api/setting'
let dialogFormVisible = ref(false)
const title = ref()
const open =()=>{
  dialogFormVisible.value = true
}

interface formData {
  product_id : number,
  product_name: string,
  product_category:string,
  product_unit :string,
  product_inwarehouse_number:number,
  product_single_price: number,
  product_create_person: string,
  identity:string,
  in_memo:string,
}
const formData:formData = reactive({
  product_id : null,
  product_name: '',
  product_category:'',
  product_unit :'',
  product_inwarehouse_number:null,
  product_single_price:null,
  product_create_person:'',
  identity:'',
  in_memo:""
})
// bus.on("createId",(data)=> {
//   if (data.id == 1){title.value='新建产品管理员'}
//   if (data.id == 2){title.value='新建用户管理员'}
//   if (data.id == 3){title.value='新建消息管理员'}
//   formData.identity = data.identity
//
// })
const rules = reactive({
  product_id:[
    { required: true, message: '请输入入库编号',trigger:'blur' },
  ],
  product_name:[
    { required: true, message: '请输入产品名称' ,trigger:'blur'},
  ],
  product_category:[
    { required: true, message: '请选择产品类别' ,trigger:'blur'},
  ],
  product_unit:[
    { required: true, message: '请选择产品的单位' ,trigger:'blur'},
  ],
  product_inwarehouse_number:[
    { required: true, message: '请输入产品的入库数量' ,trigger:'blur'},
  ],
  product_single_price:[
    { required: true, message: '请输入产品入库单价' ,trigger:'blur'},
  ],
  product_create_person:[
    { required: true, message: '请输入入库的操作人' ,trigger:'blur'},
  ],
  in_memo:[
    { required: true, message: '请输入入库备注' ,trigger:'blur'},
  ],
})
//产品入库操作
const emit=defineEmits(['success'])
const addProduct =async ()=>{
  const res = await createProduct(formData)
  if (res.status==0){
    ElMessage({
      message: '产品入库成功',
      type: 'success',
    })
    dialogFormVisible.value= false
    emit('success')
  } else {
    ElMessage.error('产品入库失败!请再次尝试')
  }
}
const categoryData = ref()
const getproduct = async ()=>{
  categoryData.value = await getProduct()
}
getproduct()
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="添加产品入库" width="600px" align-center draggable>
    <div class="dialog-content">
      <el-form :model="formData" label-width="100px" :rules="rules" :label-position="'left'">
        <el-form-item label="入库编号" prop="product_id">
          <el-input v-model="formData.product_id" />
        </el-form-item>
        <el-form-item label="产品名称" prop="product_name">
          <el-input v-model="formData.product_name" />
        </el-form-item>
        <el-form-item label="产品类别" prop="product_category">
          <el-select v-model="formData.product_category" placeholder="请选择产品类别">
              <el-option v-for="(item,index) in categoryData " :label="item" :value="item" :key="index"/>
          </el-select>
        </el-form-item>
        <el-form-item label="产品单位" prop="product_unit">
          <el-select v-model="formData.product_unit" placeholder="请选择产品">
            <el-option label="个" value="个" />
            <el-option label="件" value="件" />
          </el-select>
        </el-form-item>
        <el-form-item label="入库数量" prop="product_inwarehouse_number">
          <el-input v-model="formData.product_inwarehouse_number" />
        </el-form-item>
        <el-form-item label="入库单价" prop="product_single_price">
          <el-input v-model="formData.product_single_price" />
        </el-form-item>
        <el-form-item label="入库创建人" prop="product_create_person">
          <el-input v-model="formData.product_create_person" />
        </el-form-item>
        <el-form-item label="入库备注" prop="in_memo">
          <el-input
              v-model="formData.in_memo"
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
  padding: 20px 30px;
}
:deep(.el-form-item){
  margin: 30px;
}
</style>