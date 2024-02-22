<script setup lang="ts">
import BreadCrumb from '@/components/bread_crumb.vue'
import {reactive, ref} from "vue";
import {getAdminList,
  searchUser,
  searchUserDepartment,
  getAdminListLength,
  returnListData,
  getBanList,
  banUser,
  hotUser
} from '@/api/userInfo'
import { Search } from '@element-plus/icons-vue'
import CreateAdmin from '../component/ceateAdmin.vue'
import {bus} from  '@/utils/mitt.js'
import EditAdmin from '../component/edit_admin.vue'
import {onBeforeUnmount} from "vue";
import DeleteAdmin from '../component/delete_admin.vue'
import {ElMessage} from "element-plus";
const breadCrumb =ref()
const item=reactive({
  first:'用户',
})
const adminAccount = ref('')
const tableData = ref([
  {id:1,status:0}
])
// const Create = ref()
// const openCreate = (id)=>{
//   Create.value.open()
//   bus.emit("createId",{id,identity:item.first})
// }
// const Edit = ref()
// const openEdit = (id:number)=>{
//   bus.emit('editId',id)
//   Edit.value.open()
// }
// const getAdminlist = async ()=>{
//   tableData.value= await getAdminList(item.first) as any
// }
// getAdminlist()
// const Delete = ref()
// const openDelete = (Id:number)=>{
//   bus.emit('deleteId',Id)
//   Delete.value.open()
// }
const searchuser = async()=>{
  tableData.value = await searchUser(adminAccount.value) as any
}
const formData = reactive({
  department:''
})
const searchDepartment = async ()=>{
  tableData.value = await searchUserDepartment(formData.department) as any
}
//清空选择框
const clearOperation = ()=>{
  getAdminlist()
}
//分页
//分页

const paginationData  = reactive({
  //总页数
  pageCount:1,
  //当前所处的页数
  currentPage:1,

})
//获取管理员的数量
const adminTotal = ref(0)
const getAdminListlength = async ()=>{
  const res = await getAdminListLength(item.first)
  adminTotal.value  =  res.length
  paginationData.pageCount = Math.ceil(res.length/10 )
}
getAdminListlength()

//默认获取第一页
const getFirstPageList = async ()=>{
  tableData.value = await returnListData(1,item.first) as any
}
getFirstPageList()
//监听换页
const currentChange =async (value)=>{
  paginationData.currentPage = value
  tableData.value = await returnListData(paginationData.currentPage,item.first) as any
}
const getAdminlist = ()=>{
  getFirstPageList()
  // getAdminListlength()
}
getAdminlist()

const banUserList =async ()=>{
  tableData.value = await getBanList() as any
}
//冻结用户
const banuser = async(id)=>{
  const res=await banUser(id)
  if (res.status==0){
    ElMessage({
      message: '冻结用户成功',
      type: 'success',
    })
    getFirstPageList()
  } else {
    ElMessage.error('冻结用户失败!请再次尝试')
  }
}
const hotuser = async(id)=>{
  const res=await hotUser(id)
  if (res.status==0){
    ElMessage({
      message: '解冻用户成功',
      type: 'success',
    })
    getFirstPageList()
  } else {
    ElMessage.error('解冻用户失败!请再次尝试')
  }
}
onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<template>
  <BreadCrumb ref="breadCrumb" :item="item"></BreadCrumb>
  <div class="table-wrapped">
    <!--    顶部-->
    <div class="table-top">
      <div class="table-header">
        <!--        搜索框-->
        <div class="left-wrapped">
          <div class="search-wrapped">
            <el-input
                v-model="adminAccount"
                class="w-50 m-2"
                size="large"
                placeholder="输入账号进行搜索"
                :prefix-icon="Search"
                @change="searchuser()"
            />
          </div>
          <div class="select-wrapped">
            <el-select v-model="formData.department" placeholder="请选择部门"  clearable @change="searchDepartment" @clear="clearOperation">
              <el-option label="总裁办" value="总裁办" />
              <el-option label="项目部" value="项目部" />
            </el-select>
          </div>
        </div>
        <div class="button-wrapped">
          <el-button type="primary" plain @click="banUserList">筛选冻结用户</el-button>
          <el-button type="primary" plain @click="getAdminlist">显示全部用户</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%" border  >
          <el-table-column type="index" width="50" />
          <el-table-column prop="account" label="账号"  />
          <el-table-column prop="name" label="姓名"  />
          <el-table-column prop="department" label="部门"  />
          <el-table-column prop="email" label="邮箱"  />
          <el-table-column prop="status" label="状态"  >
            <template #default="{row}" >
              <el-tag v-if="row.status=='1'" type="danger" >冻结</el-tag>
              <el-tag v-else="row.status=='0'" type="success" >正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间"  />
          <el-table-column prop="update_time" label="更新时间"  />
          <el-table-column   label="操作"  >
            <template #default="{row}" >
              <el-button type="primary" style="width: 50px"  @click="banuser(row.id)">冻结</el-button>
              <el-button type="success"  style="width: 50px" @click="hotuser(row.id)">解冻</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--    底部-->
    <div class="table-footer">
      <el-pagination
          :page-size="1"
          :pager-count="7"
          layout="prev, pager, next"
          :total="adminTotal"
          :page-count="paginationData.pageCount"
          :current-page="paginationData.currentPage"
          @current-change="currentChange"
      />
    </div>
  </div>
<!--  <CreateAdmin ref="Create" @success="getAdminlist"></CreateAdmin>-->
<!--  <EditAdmin ref="Edit" @success="getAdminlist"></EditAdmin>-->
<!--  <DeleteAdmin ref="Delete" @success="getAdminlist"></DeleteAdmin>-->
</template>

<style scoped lang="scss">

</style>