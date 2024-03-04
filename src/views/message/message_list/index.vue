<script setup>
import BreadCrumb from '@/components/bread_crumb.vue'
import {reactive, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import { onBeforeUnmount } from 'vue'
//添加入库
//导入bus
import {bus} from '@/utils/mitt.js'
//部门的
import {getDepartment} from '@/api/setting.js'
import Create from "@/views/message/components/create.vue";
//获取公司消息列表，,获取系统消息列表,通过部门进行筛选，通过等级进行筛选
import {companyMessageList,systemMessageList,searchMessageBydepartment,searchMessageByLevel} from '@/api/message.js'
//初次删除公告
import Delete from '../components/delete.vue'
//实现分页功能的
import {getCompanyMessageLength,getSystemMessageLength,returnCompanyListData,returnSystemListData} from '@/api/message.js'
const breadCrumb =ref()
const item=reactive({
  first:'消息管理',
  second:'消息列表',
})

//根据消息等级进行筛选
const message_level = ref('')
//表格的信息
const companytableData = ref([
])
const systemtableData  = ref([
])
//主页的标签页
const activeName = ref('first')
//获取公司消息列表
const getCompanyMessageList = async ()=>{
  companytableData.value = await companyMessageList()
}
getCompanyMessageList()
//获取系统消息列表
const getSystemMessageList = async ()=>{
  systemtableData.value = await systemMessageList()

}
getSystemMessageList()
// 全部的刷新
const allPageRefesh = ()=>{
  getCompanyMessageList()
  getSystemMessageList()
}
// 实现分页的功能
const paginationData  = reactive({
  //所有的数据总量
  companymessageTotal:1,
  //所有的页数
  companymessageCount:1,
  //当前所处的页数
  companymessagePage:1,
  //总数
  systemmessageTotal:1,
  //总页数
  systemmessageCount:1,
  //当前所在的页数
  systemmessagePage:1,

})
//获取公司信息的分页
const getCompanylength = async ()=>{
  const res = await getCompanyMessageLength()
  paginationData.companymessageTotal  =  res.length
  paginationData.companymessageCount = Math.ceil(res.length/10 )
}
getCompanylength()

//获取系统消息的总页数
const getSystemlength = async ()=>{
  const res = await getSystemMessageLength()
  paginationData.systemmessageTotal = res.length
  paginationData.systemmessageCount = Math.ceil(res.length/10 )
}
getSystemlength()
//默认获取公司公告列表第一页
const getFirstCompanyPageList = async ()=>{
  // companytableData.value = await returnCompanyListData(1)
}
getFirstCompanyPageList()
//默认获取系统消息第一页
const getFirstSystemPageList = async ()=>{
  // systemtableData.value = await returnSystemListData(1)
}
getFirstSystemPageList()
//监听公司公告列表换页
const companycurrentChange =async (value)=>{
  paginationData.companymessagePage = value
  companytableData.value = await returnCompanyListData(paginationData.companymessagePage)
}
//监听系统消息换页
const systemcurrentChange =async (value)=>{
  paginationData.systemmessagePage = value
  systemtableData.value = await returnSystemListData(paginationData.systemmessagePage)
}
//发布公告
const createM = ref()
const openPublish =(id)=>{
  bus.emit('publishMessage',id)
  createM.value.open()
}
//编辑公告
const editMessage = (row)=>{
  let content = {
    row:row,
    name:"编辑公告"
  }
  bus.emit('editPublishMessage',content)
  createM.value.open()
}
//删除公告和系统消息
const deleteM  = ref()
const deleteMessage = (row)=>{
  bus.emit('deletePublishMessage',row)
  deleteM.value.open()
}
//编辑系统公告
const editSystemMessage =(row)=>{
  let content = {row:row,name:'编辑系统消息'}
  bus.emit('editSystemPublishMessage',content)
  createM.value.open()
}
//获取所有的部门
const departmentData =ref([])
const getdepartment = async ()=>{
  departmentData.value = await getDepartment()
}
getdepartment()
//根据部门进行筛选
const message_publish_department = ref()
const getListByDepartment = async ()=>{
  companytableData.value = await searchMessageBydepartment(message_publish_department.value)
}
//通过等级进行筛选
const level = ref()
const getMessageByLevel = async ()=>{
  companytableData.value=await searchMessageByLevel(level.value)
}
onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<template>
  <BreadCrumb :ref="breadCrumb" :item="item"></BreadCrumb>
  <div class="module-common-wrapped">
    <div class="module-common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="公司管理" name="first">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <div class="search-wrapped">
                  <el-select v-model="message_publish_department" style="width: 180px" placeholder="请选择部门筛选"  @change="getListByDepartment">
                      <el-option v-for="(item,index) in departmentData " :label="item" :value="item" :key="index"/>
                  </el-select>
                  <el-radio-group v-model="level" style="width: 300px" @change="getMessageByLevel">
                    <el-radio label="一般">一般</el-radio>
                    <el-radio label="重要">重要</el-radio>
                    <el-radio label="必要">必要</el-radio>
                  </el-radio-group>
                </div>
                <div class="button-wrapped">
                  <el-button type="primary"  plain @click="getCompanyMessageList">全部公告</el-button>
                  <el-button type="success" @click="openPublish(1)">发布公告</el-button>
                </div>
              </div>
              <div class="module-common-table">
                <el-table :data="companytableData" border style="width: 100%">
                  <el-table-column type="index" width="50px"></el-table-column>
                  <el-table-column prop="message_title" label="公告主题" width="320" />
                  <el-table-column prop="message_category" label="类别"  />
                  <el-table-column prop="message_publish_department" label="发布部门" width="120" ></el-table-column>
                  <el-table-column prop="message_publish_name" label="发布人"  />
                  <el-table-column prop="message_receipt_object" label="接收对象"  width="120"/>
                  <el-table-column prop="message_level" label="公告等级" width="120" />
                  <el-table-column prop="message_publish_time" label="发布时间" width="200" >
                    <template #default="{row}">
                      <div>{{row.message_publish_time?.slice(0,10)}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="message_update_time" label="最新编辑时间" width="200" >
                    <template #default="{row}">
                      <div>{{row.message_update_time?.slice(0,10)}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="message_click_number" label="阅读人数" width="200" />
                  <el-table-column  label="操作" width="180" fixed="right" >
                    <template #default="{row}">
                      <el-button type="success" @click="editMessage(row)">编辑</el-button>
                      <el-button type="danger" @click="deleteMessage(row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="table-footer">
              <!--              分页-->
              <div class="table-footer">
                <el-pagination
                    :page-size="20"
                    :total="paginationData.companymessageTotal"
                    :current-page="paginationData.companymessagePage"
                    :page-count="paginationData.companymessageCount"
                    :pager-count="11"
                    layout="prev, pager, next"
                    @current-change="companycurrentChange"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="系统消息" name="second">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <div class="search-wrapped">
                  <el-input
                      v-model="productOutId"
                      class="w-50 m-2"
                      size="large"
                      placeholder="输入入库编号进行搜索"
                      :prefix-icon="Search"
                      style="width: 200px"
                      clearable
                      @clear="applyProductlist"
                      @change="searchApplyId()"
                  />
                </div>
                <div class="button-wrapped">
                  <el-button type="primary" @click="openPublish(2)">发布系统消息</el-button>
                </div>
              </div>
              <div class="module-common-table">
                <el-table :data="systemtableData" border style="width: 100%">
                  <el-table-column type="index" width="50px"></el-table-column>
                  <el-table-column prop="message_title" label="消息主题"  />
                  <el-table-column prop="message_publish_name" label="发布者" />
                  <el-table-column prop="message_click_number" label="阅读人数"/>
                  <el-table-column prop="message_publish_time" label="发布时间" width="200" >
                    <template #default="{row}">
                      <div>{{row.message_publish_time?.slice(0,10)}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column   label="操作" width="180px"  fixed="right">
                    <template #default="{row}">
                      <el-button type="success" @click="editSystemMessage(row)">编辑</el-button>
                      <el-button type="danger" @click="deleteMessage(row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="table-footer">
              <!--              分页-->
              <div class="table-footer">
                <el-pagination
                    :page-size="20"
                    :total="paginationData.systemmessageTotal"
                    :current-page="paginationData.systemmessagePage"
                    :page-count="paginationData.systemmessageCount"
                    :pager-count="11"
                    layout="prev, pager, next"
                    @current-change="systemcurrentChange"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <Create ref="createM" @success="allPageRefesh"></Create>
  <Delete ref="deleteM" @success="allPageRefesh"></Delete>
</template>

<style scoped lang="scss">
.module-common-wrapped{
  padding: 8px;
  background: #F5F5F5;
  height: calc(100vh - 101px);
  .module-common-content{
    padding: 0 10px;
    height: 100%;
    background: #fff;
  }
  .pane-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 166px);
    background: #fff;
    .pane-top{
      .module-common-header{
        padding: 0 20px;
        display: flex;
        align-items: center ;
        justify-content: space-between;
        .search-wrapped{
          display: flex;

        }
      }
      .module-common-table{
        min-height: 10px;
        padding: 10px 20px 20px;
        margin-bottom: 8px;
        background: #fff;
      }
    }
    //分页
    .table-footer {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
:deep(.el-table .cell){
  font-weight: 400;
}
.el-radio-group{
  margin-left: 20px;
}
</style>