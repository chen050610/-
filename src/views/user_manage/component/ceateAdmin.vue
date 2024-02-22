<script setup lang="ts">
import {createAdmin} from '@/api/userInfo'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import {bus} from  '@/utils/mitt.js'
import {create} from "axios";
import {getDepartment} from '@/api/setting'
let dialogFormVisible = ref(false)
const title = ref()
const open =()=>{
  dialogFormVisible.value = true
}

interface formData {
  account:string,
  password:string,
  name:string,
  sex:string,
  email:string,
  department:string,
  identity:string
}
const formData:formData = reactive({
  account:'',
  password:'',
  name:'',
  sex:'',
  email:"",
  department:'',
  identity:''
})
bus.on("createId",(data)=> {
  if (data.id == 1){title.value='新建产品管理员'}
  if (data.id == 2){title.value='新建用户管理员'}
  if (data.id == 3){title.value='新建消息管理员'}
  formData.identity = data.identity

})
const rules = reactive({
  account:[
    { required: true, message: '请输入管理员的注册账号',trigger:'blur' },
  ],
  email:[
    { required: true, message: '请输入管理员的注册邮箱' ,trigger:'blur'},
  ],
  password:[
    { required: true, message: '请输入管理员的注册面膜' ,trigger:'blur'},
  ],
  department:[
    { required: true, message: '请输入管理员的部门' ,trigger:'blur'},
  ],
  sex:[
    { required: true, message: '请输入管理员的性别' ,trigger:'blur'},
  ],
  name:[
    { required: true, message: '请输入管理员的名字' ,trigger:'blur'},
  ],
})
const emit=defineEmits(['success'])
const addAdmin =async ()=>{
  const res = await createAdmin(formData)
  if (res.status==0){
    ElMessage({
      message: '添加成功',
      type: 'success',
    })
    dialogFormVisible.value= false
    emit('success')
    } else {
    ElMessage.error('添加失败!请再次尝试')
  }
}
const departmentData =ref([])
  const getdepartment = async ()=>{
  departmentData.value = await getDepartment() as any
}
getdepartment()
defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="600px" align-center draggable>
    <div class="dialog-content">
      <el-form :model="formData" label-width="100px" :rules="rules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formData.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex" placeholder="请选择性别">
            <el-option label="男" value="man" />
            <el-option label="女" value="women" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="formData.department" placeholder="请选择部门" >
            <el-option v-for="(item,index) in departmentData " :label="item" :value="item" :key="index"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible= false">取消</el-button>
        <el-button type="primary" @click="addAdmin">
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