<script setup>
import BreadCrumb from '@/components/bread_crumb.vue'
import {ref,reactive} from "vue";
//获取回收站的内容
import {recyleList} from "@/api/message.js";
import { bus } from "@/utils/mitt.js"
import Delete from '../components/delete.vue'
//实现分页的功能
import{getRecyleMessageLength,returnRecycleListData } from '@/api/message.js'
const breadCrumb =ref()
const item=reactive({
  first:'消息管理',
  second:'回收站',
})
//表格的数据
const tableData = ref([])
//获取回收的列表
const getRecyleList = async ()=>{
  tableData.value = await recyleList()
}
getRecyleList()
//删除的操作
const deleteM =ref()
const realDelete = (id)=>{
  bus.emit('deleteMessage',id)
  deleteM.value.open()
}
//还原
const renew = (id)=>{
  bus.emit('renewMessage',id)
  deleteM.value.open()
}
//分页的操作的实现
// 实现分页的功能
const paginationData  = reactive({
  //所有的数据总量
  recylemessageTotal:1,
  //所有的页数
  recylemessageCount:1,
  //当前所处的页数
  recylemessagePage:1,
})
//获取总共的的长度
const getCompanylength = async ()=>{
  const res = await getRecyleMessageLength()
  paginationData.recylemessageTotal  =  res.length
  paginationData.recylemessageCount = Math.ceil(res.length/10 )
}
getCompanylength()
//默认获取公司公告列表第一页
const getFirstCompanyPageList = async ()=>{
  // companytableData.value = await returnCompanyListData(1)
}
getFirstCompanyPageList()
//监听公司公告列表换页
const recyleChange =async (value)=>{
  paginationData.recylemessagePage = value
  tableData.value = await returnRecycleListData(paginationData.recylemessageCount)
}

</script>

<template>
  <BreadCrumb :ref="breadCrumb" :item="item"></BreadCrumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" width="50px"/>
          <el-table-column label="消息主题" prop="message_title"/>
          <el-table-column label="消息类别" prop="message_category" />
          <el-table-column label="发布部门" prop="message_publish_department" />
          <el-table-column label="接收对象" prop="message_receipt_object"/>
          <el-table-column prop="message_delete_time" label="删除日期"  >
            <template #default="{row}">
              <div>{{row.message_delete_time?.slice(0,10)}}</div>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="180" fixed="right" >
            <template #default="{row}">
              <el-button type="success" @click="renew(row.id)">还原</el-button>
              <el-button type="danger" @click="realDelete(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="table-footer">
      <el-pagination
        :page-size="20"
        :total="paginationData.recylemessageTotal"
        :current-page="paginationData.recylemessagePage"
        :page-count="paginationData.recylemessageCount"
        :pager-count="11"
        layout="prev, pager, next"
        @current-change="recyleChange"
    />
    </div>
  </div>
  <Delete ref="deleteM" @success="getRecyleList"></Delete>
</template>

<style scoped lang="scss">
.table-wrapped{
  padding: 8px;
  height: calc(100vh - 101px);
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .table-top{
    display: flex;
    flex-direction: column;
    .table-content{
      padding: 10px 20px 20px;
      margin-bottom:8px;
      background: #fff;
    }
  }
  .table-footer{
    display: flex;
    justify-content: flex-end;
    background: #fff;
  }
}
</style>