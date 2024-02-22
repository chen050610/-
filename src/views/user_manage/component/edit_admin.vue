<script setup lang="ts">
import { reactive, ref } from 'vue'
import {bus} from  '@/utils/mitt.js'
import {create} from "axios";
import {getUserInfor,editAdmin} from '@/api/userInfo'
import {getDepartment} from '@/api/setting'
import {ElMessage} from "element-plus";
const dialogFormVisible = ref(false)
const title = ref()
const open =()=>{
  dialogFormVisible.value = true
}
bus.on("createId",(id:number)=> {
  if (id == 1){title.value='新建产品管理员'}
  if (id == 2){title.value='新建用户管理员'}
  if (id == 3){title.value='新建消息管理员'}
})

interface formdata {
  id:number,
  account:string,
  name:string,
  sex:string,
  email:string,
  department:string
}
const formData:formdata = reactive({
  id:null,
  account:'',
  name:'',
  sex:'',
  email:"",
  department:''
})
const rules = reactive({
  account:[
    { required: true, message: '请输入管理员的注册账号',trigger:'blur' },
  ],
  email:[
    { required: true, message: '请输入管理员的注册邮箱' ,trigger:'blur'},
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
bus.on('editId',async (id:number)=>{
  const res =await getUserInfor(id)
  formData.id = res.id
  formData.account = res.account
  formData.name = res.name
  formData.sex = res.sex
  formData.email = res.email
  formData.department = res.department
})
const emit=defineEmits(['success'])
const aditadmin = async()=>{
  const res = await editAdmin(formData)
  if (res.status == 0){
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
    dialogFormVisible.value= false
    emit('success')
  } else {
    ElMessage.error('修改失败!请再次尝试')
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
  <el-dialog v-model="dialogFormVisible" title="编辑管理员信息" width="600px" align-center  draggable>
    <div class="dialog-content">
      <el-form :model="formData" label-width="100px" :rules="rules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formData.account" disabled/>
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
        <el-button type="primary" @click="aditadmin">
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