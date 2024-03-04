<script setup lang="ts">
import {reactive, ref} from 'vue'
import Forget from '@/views/login/component/forget_password.vue'
import {
  login,register
} from "@/api/login";
import { ElMessage } from 'element-plus'
import {useRouter} from "vue-router";
import {useUserInfoStore} from '@/store/userInfo/index'
import {loginLog} from '@/api/log'
const date = ref(Date())
const router = useRouter()
const store = useUserInfoStore()
interface formData  {
  account:number,
  password:string,
  rePassword ?:string
}
const activeName = ref('first')
const forgetP = ref()
const loginData:formData = reactive({
  account:null,
  password:'',
})
const registerData = reactive<formData>({
  account:null,
  password:'',
  rePassword:'',
})
//打开忘记密码弹窗
const openForget =()=>{
  forgetP.value.open()
}

const Register =async ()=>{
  if (registerData.password === registerData.rePassword){
    const res= await register(registerData)
    // console.log(res)
    //@ts-ignore
    if (res.message =="注册账号成功"){
      ElMessage({
        message: '注册成功',
        type: 'success',
      })
      activeName.value = 'first'
    } else {
      ElMessage.error('注册失败')
    }
  } else {
    ElMessage.error('两次密码不一致')
  }
}
const Login=async ()=>{
  const res =await  login(loginData)
  //@ts-ignore
  if (res.message === '登录成功'){
    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    router.push({
      path:'/home'
    })
    const { token } = res
    const {id,name,account,email} = res.results
    localStorage.setItem('token',token)
    //@ts-ignore
    store.userInfo(res.results.id)
    localStorage.setItem('id',res.results.id)
    await loginLog({account,name,email})
  } else {
    ElMessage.error('登录失败')
  }
}


</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-wrapped">
        <div class="header-content">
          <h3>通用后台管理系统</h3>
          <span class="welcome">欢迎您的登录</span>
        </div>
      </el-header>
      <el-main>
        <div class="login-wrapped">
          <el-card class="box-card">
            <el-tabs v-model="activeName" class="demo-tabs" :stretch='true'>
              <el-tab-pane label="登录" name="first">
                <el-form class="login-form">
                  <el-form-item label="账号">
                    <el-input v-model="loginData.account" placeholder="请输入账号" />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="loginData.password" placeholder="请输入密码" show-password />
                  </el-form-item>
                  <!-- 底部外壳 -->
                  <div class="footer-wrapped">
                    <div class="forget-password">
                      <span class="forget-password-button" @click="openForget">忘记密码</span>
                    </div>
                    <div class="footer-button">
                      <el-button type="primary" @click="Login">登录</el-button>
                    </div>
                    <div class="footer-go-register">
                      还没有账号？<span class="go-register">马上注册</span>
                    </div>
                  </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form class="login-form">
                  <el-form-item label="账号">
                    <el-input v-model="registerData.account" placeholder="账号长度6-12位" />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="registerData.password" placeholder="密码需长度6-12位含字母数字" />
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input v-model="registerData.rePassword" placeholder="请再次输入密码" />
                  </el-form-item>
                  <div class="footer-button">
                    <el-button type="primary" @click="Register">注册</el-button>
                  </div>
                </el-form>
              </el-tab-pane>

            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <el-footer class="footer-wrapped">
        <div class="footer-content">
          <div class="title">
            <span>中北大学学生</span> |
            <span>chenw</span> |
            <span>{{date}}</span>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
  <Forget ref="forgetP"></Forget>
</template>

<style scoped lang="scss">
.header-wrapped {
  .header-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .welcome {
      font-size: 13px;
    }
  }
}
.el-main {
  background-image: url("../../assets/background.jpg");
  height: 600px;
  --el-main-padding:  0;
  .login-wrapped {
    width: 1200px;
    height: 600px;
    margin: 0 auto;

    .box-card {
      width: 350px;
      height: 375px;
      float: right;
      position: relative;
      top: 14%;
      .login-form {
        //登录底不外壳
        .footer-wrapped{
          display: flex;
          flex-direction: column;
          .forget-password{
            display: flex;
            justify-content: flex-end;
            margin: 10px 0;
            .forget-password-button{
              font-size: 12px;
              color: #409eff;
              cursor: pointer;
            }
          }
          .footer-button {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .footer-go-register {
            font-size: 12px;
            margin: 12px 0;
            display: flex;
            justify-content: center;
            .go-register {
              font-size: 12px;
              color: #409eff;
              //鼠标移动的效果
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.footer-wrapped {
  margin-top: 10px;
  .footer-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .title{
      color: #666;
    }
    span {
      color: #666;
      font-size: 12px;
    }
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-form {
  margin-top: 30px;
}
:deep(.el-tabs__item){
  color: #333;
  font-size: 18px;
}
:deep(.el-input_inner){
  height: 40px;
}
:deep(.el-form-item_label) {
  height: 40px;
  line-height: 40px;

}
:deep(.el-button){
  width: 300px;
  height: 45px;
  font-size: 16px;
}
</style>