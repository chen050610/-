<script setup lang="ts">
import {ref,reactive} from "vue";
import {bus} from  '@/utils/mitt.js'
import Promote from './promote.vue'
import EditUser from './edit_user.vue'
import DeleteUser from './delete_user.vue'
import {onBeforeUnmount} from "vue";
const dialogUserVisible = ref(false)
const open =()=>{
  dialogUserVisible.value = true
}
let userData = reactive({
  img_url:'',
  name:'',
  sex:'',
  email:"",
  department:"",
  status:'',
  account:'',
  id:'',
})
bus.on("userId",(row:any)=>{
  Object.keys(row).forEach(key => {
    userData[key] = row[key]
  })
})
//编辑赋权弹窗
const promote = ref()
const openPromote = (id)=>{
  bus.emit("promoteId",id)
  promote.value.open()
}
bus.on('offDialog', (id)=>{
  if (id==1){
    dialogUserVisible.value = false
  }
})
//编辑用户弹窗
const Edit = ref()
const openEdit  = (id)=>{
  Edit.value.open()
  bus.emit('editid',id)
}
//删除用户弹窗
const Delete = ref()
const openDelete = (id,account)=>{
  Delete.value.open()
  bus.emit('deleteUserId',{id:id,account:account,name:userData.name})
}
defineExpose({
  open,
})
onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<template>
    <el-dialog v-model="dialogUserVisible" title="用户信息" width="500px"  center draggable>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <el-avatar shape="square" :size="120" :src="userData.image_url" />
        </el-aside>
        <el-main>
          <div>账号:{{userData.account}}</div>
          <div>姓名:{{userData.name}}</div>
          <div>性别: {{ userData.sex === 'women' ? '女' : '男' }}</div>
          <div>部门:{{userData.department}}</div>
          <div>邮箱:{{userData.email}}</div>
          <div>状态:{{userData.status === '0'  ? '正常' : '冻结' }}</div>
        </el-main>
      </el-container>
      <el-footer>
        <span  @click="openEdit(userData.id)">编辑</span>
        <span @click="openPromote(userData.id)">赋权</span>
        <span @click="openDelete(userData.id,userData.account)">删除用户</span>
      </el-footer>
    </div>
  </el-dialog>
  <Promote ref="promote"></Promote>
  <EditUser ref="Edit"></EditUser>
  <DeleteUser ref="Delete"></DeleteUser>
</template>

<style scoped lang="scss">
.el-main>div{
  margin-bottom: 8px;
}
.el-main{
  --el-main-padding: 0px;
}
.el-footer{
  display: flex;
  justify-content: flex-end;
  --el-footer-height: 8px;
  span {
    margin-left: 8px;
    color: #409eff;
    cursor: pointer;
  }
}
</style>