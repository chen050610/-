<script setup lang="ts">
import {reactive, ref} from "vue";
//@ts-ignore
import {changePassword} from '@/api/userInfo.js'
import { ElMessage } from 'element-plus'
import {useRouter} from "vue-router";
interface passwordData {
  oldPassword:string,
  newPassword:string,
}
const router = useRouter()
const dialogVisible = ref(false)
const labelPosition = ref('top')
const passwordData = reactive<passwordData>({
  oldPassword:'',
  newPassword:'',
})
const state = reactive({
  changePasswordDialog:false
})
const resetPassword =async ()=>{
  const id= localStorage.getItem('id')
  if (passwordData.newPassword&&passwordData.oldPassword){
    const res=await changePassword(id,passwordData.oldPassword,passwordData.newPassword)
    if (res.status == 0) {
      ElMessage({
        message: '修改成功',
        type: 'success',
      })
      state.changePasswordDialog = false
      router.push('/login')
      localStorage.setItem('pinia-userInfo','')
      localStorage.setItem('token','')
      localStorage.setItem('id','')
    } else {
      ElMessage.error('修改失败')
    }
  } else {
    ElMessage.error('修改失败')
  }
}

const open =()=>{
  //打开弹窗
  state.changePasswordDialog= true
}

const rules = reactive({
  oldPassword:[
    { required: true, message: '请输入您的旧密码',trigger:'blur' },
  ],
  newPassword:[
    { required: true, message: '请输入您的新密码' ,trigger:'blur'},
  ],
})
defineExpose({
  open,
})
</script>

<template>
  <el-dialog
      v-model="state.changePasswordDialog"
      title="修改密码"
      width="400px"
  >
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="请输您的旧密码" prop="oldPassword">
        <el-input v-model="passwordData.oldPassword" placeholder="请输您的旧密码" show-password/>
      </el-form-item>
      <el-form-item label="请再次输入您的新密码" prop="newPassword">
        <el-input v-model="passwordData.newPassword" placeholder="请再次输入您的新密码" show-password />
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
</template>

<style scoped lang="scss">

</style>