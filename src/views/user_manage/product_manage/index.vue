<script setup lang="ts">
import BreadCrumb from '@/components/bread_crumb.vue'
import {reactive, ref} from "vue";
import {
  getAdminList,
  searchUser,
  getAdminListLength
,returnListData
} from '@/api/userInfo'
import { Search } from '@element-plus/icons-vue'
import CreateAdmin from '../component/ceateAdmin.vue'
import {bus} from  '@/utils/mitt.js'
import EditAdmin from '../component/edit_admin.vue'
import {onBeforeUnmount} from "vue";
import DeleteAdmin from '../component/delete_admin.vue'

const breadCrumb =ref()
const item=reactive({
  first:'用户管理',
  second:'产品管理员',
})
const adminAccount = ref('')
const tableData =ref([
])
const Create = ref()
const openCreate = (id)=>{
  Create.value.open()
  bus.emit("createId",{id,identity:item.second})
}
const Edit = ref()
const openEdit = (id:number)=>{
  bus.emit('editId',id)
  Edit.value.open()
}

const Delete = ref()
const openDelete = (Id:number)=>{
  bus.emit('deleteId',Id)
  Delete.value.open()
}
const searchAdmin = async()=>{
  tableData.value = await searchUser(adminAccount.value) as any
}
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
  const res = await getAdminListLength(item.second)
  adminTotal.value  =  res.length
  paginationData.pageCount = Math.ceil(res.length/10 )
}
getAdminListlength()

//默认获取第一页
const getFirstPageList = async ()=>{
  tableData.value = await returnListData(1,item.second) as any
}
getFirstPageList()
//监听换页
const currentChange =async (value)=>{
  paginationData.currentPage = value
  tableData.value = await returnListData(paginationData.currentPage,item.second) as any
}
const getAdminlist =async ()=>{
  await getAdminListlength
}
// getAdminlist()
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
        <div class="search-wrapped">
          <el-input
              v-model="adminAccount"
              class="w-50 m-2"
              size="large"
              placeholder="输入账号进行搜索"
              :prefix-icon="Search"
              @change="searchAdmin()"
          />
        </div>
        <div class="button-wrapped">
          <el-button type="primary" @click="openCreate(1)">添加产品管理员</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%" border  >
          <el-table-column type="index" width="50" />
          <el-table-column prop="account" label="账号"  />
          <el-table-column prop="name" label="姓名"  />
          <el-table-column prop="department" label="部门"  />
          <el-table-column prop="email" label="邮箱"  />
          <el-table-column prop="update_time" label="更新时间"  />
          <el-table-column   label="操作"  >
            <template #default="{row}">
              <el-button type="success" @click="openEdit(row.id)">编辑</el-button>
              <el-button type="danger" @click="openDelete(row.id)">删除</el-button>
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
  <CreateAdmin ref="Create" @success="getAdminlist"></CreateAdmin>
  <EditAdmin ref="Edit" @success="getAdminlist"></EditAdmin>
  <DeleteAdmin ref="Delete" @success="getAdminlist"></DeleteAdmin>
</template>

<style scoped lang="scss">

</style>