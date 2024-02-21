<script setup lang="ts">
import {reactive, ref} from "vue";
import {verify,rePassword} from '@/api/login'
import { ElMessage } from 'element-plus'
interface forgetData {
  account:number,
  email:string,
  password:string,
  repassword:string
}

const dialogVisible = ref(false)
const labelPosition = ref('top')
const forgetData = reactive<forgetData>({
  account:null,
  email:'',
  password:'',
  repassword:''
})
const state = reactive({
  //控制弹窗默认关闭
  forgetPasswordDialog:false,
  changePasswordDialog:false
})
const open =()=>{
  //打开弹窗
  state.forgetPasswordDialog = true
}
//打开修改密码的弹窗
const openChangePassword =async ()=>{
  const res =await verify(forgetData)
  if (res.status == 0){
    ElMessage({
      message: '验证成功',
      type: 'success',
    })
    localStorage.setItem('id',res.id)
    state.changePasswordDialog = true
    state.forgetPasswordDialog = false
  } else {
    ElMessage.error('验证失败')
  }
}
const resetPassword =async ()=>{
  state.changePasswordDialog= false
  if (forgetData.password == forgetData.repassword){
    const newPassword = forgetData.repassword
    const id =localStorage.getItem('id')
    const res =await rePassword({id,newPassword})
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  } else {
    ElMessage.error('两次密码不一致')
  }

}
//规则
const rules = reactive({
  account:[
    { required: true, message: '请输入您的注册账号',trigger:'blur' },
  ],
  email:[
    { required: true, message: '请输入您的注册邮箱' ,trigger:'blur'},
  ],
  password:[
    { required: true, message: '请输入您要修改的密码' ,trigger:'blur'},
  ],
  repassword:[
    { required: true, message: '请再次输入您新的密码' ,trigger:'blur'},
  ],
})
defineExpose({
  open,
  openChangePassword
})
</script>

<template>
<!--  修改密码-->
  <el-dialog
      v-model="state.changePasswordDialog"
      title="修改密码"
      width="400px"
  >
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="请输您的新密码" prop="password">
        <el-input v-model="forgetData.password" placeholder="请输您的新密码" show-password/>
      </el-form-item>
      <el-form-item label="请再次输入您的新密码" prop="repassword">
        <el-input v-model="forgetData.repassword" placeholder="请再次输入您的新密码" show-password />
      </el-form-item>
      <!-- 底部内容 -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.changePasswordDialog= false">取消</el-button>
        <el-button type="primary" @click="resetPassword">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

<!--  忘记密码-->
  <el-dialog
      v-model="state.forgetPasswordDialog"
      title="忘记密码"
      width="400px"
  >
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="请输您的注册账号" prop="account">
        <el-input v-model="forgetData.account" placeholder="请输入您的注册账号" />
      </el-form-item>
      <el-form-item label="请输入您的个人邮箱" prop="email">
        <el-input v-model="forgetData.email" placeholder="请输入您的个人邮箱" />
      </el-form-item>
      <!-- 底部内容 -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.forgetPasswordDialog= false">取消</el-button>
        <el-button type="primary" @click="openChangePassword">
          下一步
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>