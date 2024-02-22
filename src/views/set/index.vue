<script setup lang="ts">
import BreadCrumb from '@/components/bread_crumb.vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import {onMounted, reactive, ref, toRaw} from "vue";
import {useUserInfoStore} from '@/store/userInfo/index'
import {bind,changeName,changeSex,changeEmail} from '@/api/userInfo'
import Editor from "@/views/set/components/editor.vue";
import ChangePassword from './components/change_password.vue'
import { bus } from "@/utils/mitt.js"
import {getCompanyName,changeCompanyName,getAllSwiper,setDepartment,getDepartment} from '@/api/setting'
const breadCrumb =ref()
const userStore = useUserInfoStore()
const activeName = ref('first')
const item=reactive({
  first:'系统设置',

})
const changePassword = ref()
const editorP = ref()
//头像上传成功的函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  if (response.status == 0){
    userStore.imageUrl = response.url
    ElMessage({
      message:"更新头像成功",
      type:'success'
    }),
    (async ()=>{
      const res = await bind(userStore.account,response.onlyId,response.url)
    })()
  } else {
    ElMessage.error('更新头像失败!请重新上传')
  }
}
//头像上传的之前的函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像必须是jpg格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片必须小于5MB!')
    return false
  }
  return true
}
const AccountDetailData = reactive({
  account:'',
  identity:'',
  department:'',
  name:'',
  sex:'',
  email:'',
})
const changPasswd = ()=>{
  changePassword.value.open()
}
const saveName =async ()=>{
  const res = await changeName(userStore.name,localStorage.getItem('id'))
  if (res.status == 0){
    ElMessage({
      message:"修改成功",
      type:'success'
    })
  } else {
    ElMessage.error('修改失败')
  }
}
const saveSex =async ()=>{
  const res = await changeSex(userStore.sex,localStorage.getItem('id'))
  if (res.status == 0){
    ElMessage({
      message:"修改成功",
      type:'success'
    })
  } else {
    ElMessage.error('修改失败')
  }
}
const saveEmail =async ()=>{
  const res = await changeEmail(userStore.email,localStorage.getItem('id'))
  if (res.status == 0){
    ElMessage({
      message:"修改成功",
      type:'success'
    })
  } else {
    ElMessage.error('修改失败')
  }
}

const companyName = ref()

onMounted(async ()=>{
  companyName.value =await getCompanyName()
})
const openEditor = (id:number)=>{
  bus.emit('editorTitle',id)
  editorP.value.open()
}
const changeCompanyname =async () =>{
  const res = await changeCompanyName(companyName.value)
  if(res.status == 0){
    ElMessage({
      message:"修改成功",
      type:'success'
    })
  } else {
    ElMessage.error('修改失败，请重新更改')
  }
}


const handleSwiperSuccess : UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  getAllswiper()
}
const imageUrl = ref<string[]>([])
const swiperData =  [
  {name:'swiper1'},{name:'swiper2'},{name:'swiper3'},{name:'swiper4'},{name:'swiper5'},{name:'swiper6'}
]
const getAllswiper = async ()=>{
  imageUrl.value = await getAllSwiper() as any
}
getAllswiper()
//标签
import { nextTick, } from 'vue'
import { ElInput } from 'element-plus'


const inputValue = ref('')
const dynamicTags = ref()
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()


//获取部门数据
const getdepartment = async ()=>{
  dynamicTags.value = await getDepartment() as any
}
getdepartment()

//关闭时的回调
const handleClose =async (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  const res =await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
  if(res.status == 0){
    ElMessage({
      message:"删除部门成功",
      type:'success'
    })
  } else {
    ElMessage.error('删除部门成功，请重新更改')
  }
}
//点击按钮出现输入框
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
//输入数据以后
const handleInputConfirm =async () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
    const res =await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
    if(res.status == 0){
      ElMessage({
        message:"添加部门成功",
        type:'success'
      })
    } else {
      ElMessage.error('添加部门失败，请重新更改')
    }
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<template>

<div>
  <BreadCrumb ref="breadCrumb" :item="item"></BreadCrumb>
  <div class="common-wrapped">
    <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs" >
        <el-tab-pane label="账号详情" name="first">
          <div class="account-infor-wrapped">
            <span>用户头像:</span>
            <div class="account-infor-content">
              <!--              action是上传头像接口,show-file-list展示上传文件的 on-success上传成功以后的回调 before-upload  -->
              <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:3007/user/uploadAvator"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
              >
                <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>用户账号:</span>
            <div class="account-infor-content">
              <el-input v-model=" userStore.account" disabled></el-input>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>用户密码:</span>
            <div class="account-infor-content">
              <el-button type="primary" @click="changPasswd">修改密码</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>用户姓名:</span>
            <div class="account-infor-content">
              <el-input v-model=" userStore.name" ></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="saveName">保存</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>用户性别:</span>
            <div class="account-infor-content">
              <el-select v-model="userStore.sex" :style="{width: '200px'}">
                <el-option label="男" value=man />
                <el-option label="女" value="woman" />
              </el-select>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="saveSex">保存</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>用户身份:</span>
            <div class="account-infor-content">
              <el-input v-model=" userStore.identity" disabled></el-input>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>用户部门:</span>
            <div class="account-infor-content">
              <el-input v-model=" userStore.department" disabled></el-input>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>用户邮箱:</span>
            <div class="account-infor-content">
              <el-input v-model=" userStore.email" ></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="saveEmail">保存</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <div class="account-infor-wrapped">
            <span>公司名称</span>
            <div class="account-infor-content">
              <el-input v-model=" companyName" ></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="success" @click="changeCompanyname">编辑公司名称</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司介绍</span>
            <div class="account-infor-content">
              <el-button type="success" @click="openEditor(1)">编辑公司介绍</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司架构</span>
            <div class="account-infor-content">
              <el-button type="success" @click="openEditor(2)">编辑公司介绍</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>公司战略</span>
            <div class="account-infor-content">
              <el-button type="success" @click="openEditor(3)">编辑公司介绍</el-button>
            </div>
          </div>
          <div class="account-infor-wrapped">
            <span>现任高层</span>
            <div class="account-infor-content">
                <el-button type="success"  @click="openEditor(4)">编辑公司介绍</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="首页管理" name="third">
          <div class="home-wrapped">
            <div class="tips">
              <span>
                提示:点击图片框进行切换首页轮播图
              </span>
            </div>
            <div class="swiper-wrapped" v-for="(item,index) in swiperData " :key="index">
              <div class="swiper-name">轮播图{{index+1}}:&nbsp&nbsp&nbsp</div>
              <el-upload
                  class="avatar-uploader"
                   action="http://127.0.0.1:3007/set/uploadSwiper"
                  :show-file-list="false"
                  :on-success="handleSwiperSuccess"
                  :before-upload="beforeAvatarUpload"
                  :data="item"
              >
                <template #trigger>
                  <img v-if="imageUrl[index]" :src="imageUrl[index]" class="swiper" />
                  <img src="@/assets/雪碧图.png" alt="" v-else>
                </template>
              </el-upload>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth">
          <div class="other-set">
            <div class="department-set">
              <span>部门设置</span>
              <el-tag
                  v-for="tag in dynamicTags"
                  :key="tag"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                  v-if="inputVisible"
                  ref="InputRef"
                  v-model="inputValue"
                  class="w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput">
                + New Tag
              </el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</div>
  <ChangePassword ref="changePassword"></ChangePassword>
  <Editor ref="editorP"></Editor>
</template>

<style scoped lang="scss">
.common-wrapped {
  padding: 8px;
  background: #f5f5f5;
  height: calc(100vh - 101px);
  .common-content{
    padding: 0 10px;
    height: 100%;
    background: #fff;
    .account-infor-wrapped {
      display: flex;
      align-items: center;
      padding-left: 50px;
      margin-bottom: 24px;
      font-size: 14px ;
      .account-infor-content{
        margin-left: 24px;
        margin-right: 16px;
      }
      // 按钮
      .account-save-button {
        margin-left: 16px;
      }
    }
    .home-wrapped {
      padding-left: 50px;
      display: flex;
      flex-direction: column;
      .tips{
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        span{
          font-size: 14px;
          color: silver;
        }
      }
      .swiper-wrapped{
        display: flex;
        margin-bottom: 16px;
        .swiper-name{
          font-size: 14px;
          margin-bottom: 24px;
        }
        .swiper{
          width: 336px;
          height: 96px;
        }
      }
    }
  }
}
.other-set {
  padding-left: 50px;
  font-size: 14px;
  .department-set{
    margin-bottom: 24px;
    span{
      margin-right: 24px;
    }
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>