<script setup lang="ts">
//导入图标
import {
  Document,
  Setting,
} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import {useUserInfoStore} from '@/store/userInfo/index'
const router = useRouter()
const userStore = useUserInfoStore()
const goLogin = ()=>{
  router.push({
    path:'/login'
  })
  localStorage.setItem('pinia-userInfo','')
  localStorage.setItem('token','')
  localStorage.setItem('id','')
}

</script>

<template>
<!--  菜单里面的router的作用就相当于router——link-->
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1" class="el-menu-vertical-demo" router>
          <div class="title">通用后台管理系统</div>
          <el-menu-item index="home">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="overview">
            <el-icon><Document /></el-icon>
            <span>系统概览</span>
          </el-menu-item>

          <el-sub-menu index="product_manage">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="product_manage">产品管理员</el-menu-item>
              <el-menu-item index="users_manage">用户管理员</el-menu-item>
              <el-menu-item index="message_manage">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工列表">
              <el-menu-item index='user_list'>用户列表</el-menu-item>
            </el-menu-item-group>
            </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon><TakeawayBox /></el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="入库管理">
              <el-menu-item index="product_list">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库管理">
              <el-menu-item index="out_product_manage_list">出库列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="5">
            <template #title>
              <el-icon><ChatSquare /></el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item-group title="消息管理">
              <el-menu-item index="message_list">消息列表</el-menu-item>

            </el-menu-item-group>
            <el-menu-item-group title="回收站">
              <el-menu-item index="recycle">回收站</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-menu-item index="file">
            <el-icon><DocumentRemove /></el-icon>
            <span>合同管理</span>
          </el-menu-item>
          <el-menu-item index="operationLog">
            <el-icon><DocumentRemove /></el-icon>
            <span>操作日志</span>
          </el-menu-item>
          <el-menu-item index="loginLog">
            <el-icon><SetUp /></el-icon>
            <span>登录日志</span>
          </el-menu-item>
          <el-menu-item index="set">
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content">尊敬的{{userStore.name}} 欢迎登录本系统</span>
          <div class="header-right-content">
            <el-icon :size="20"><Message></Message></el-icon>
            <el-avatar :size="35" :src="userStore.imageUrl" />
            <el-dropdown>
              <span class="el-dropdown-link">设置
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.el-aside {
  height: 100vh;
  background: #2b303b;
  width: 210px;
  overflow-x: hidden;
  .title {
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #fff;
    background: #2b303b;
  }
  .el-menu {
    background: #2b303b;
    width: 210px;
    height: 100vh;
    border-right: 0px;
  }
  .el-menu-item {
    color:  #fff;
  }

}
.el-header {
  display: flex;
  height: 55px;
  background: #262f3e;
  color: #c1c6c8;
  align-items: center;
  justify-content: space-between;
  .header-left-content {
    font-size: 14px;
  }
  .header-right-content {
    width:160px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.el-main {
  --el-main-padding: 0;
  background-color: #f3f4fa;
}


.el-menu-item:hover {
  background: #006eff;
}
:deep(.el-sub-menu__title:hover){
  background: #006eff;
}
:deep(.el-sub-menu__title){
  color: #fff;
}
:deep(.el-menu--inline){
  background: #2b303b;
}
</style>