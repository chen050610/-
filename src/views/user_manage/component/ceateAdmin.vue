<script setup lang="ts">
import { reactive, ref } from 'vue'
import {bus} from  '@/utils/mitt.js'
import {create} from "axios";
const dialogFormVisible = ref(false)
const title = ref()
const open =(id)=>{
  dialogFormVisible.value = true
}
bus.on("createId",(id:number)=> {
  if (id == 1){title.value='新建产品管理员'}
  if (id == 2){title.value='新建用户管理员'}
  if (id == 3){title.value='新建消息管理员'}
})
defineExpose({
  open,
})
interface formData {
  account:string,
  password:string,
  name:string,
  sex:string,
  email:string,
  department:string
}
const formData:formData = reactive({
  account:'',
  password:'',
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
            <el-option label="总裁办" value="总裁办" />
            <el-option label="项目部" value="项目部" />
            <el-option label="总裁办" value="总裁办" />
            <el-option label="总裁办" value="总裁办" />
            <el-option label="总裁办" value="总裁办" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible= false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible=false">
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