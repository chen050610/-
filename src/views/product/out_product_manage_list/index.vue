<script setup lang="ts">
import BreadCrumb from '@/components/bread_crumb.vue'
import {reactive, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
//通过出库id进行搜素
import { searchProductForOutId } from '@/api/product'
//获取出库产品总数的接口
import {getauditProductList} from '@/api/product'
//出库列表
import { returnOutProductListData,getOutProductListLength} from '@/api/product'
//面包屑
const breadCrumb =ref()
const item=reactive({
  first:'产品管理',
  second:'出库列表',
})


//搜索框
const productOutId =ref()
//通过出库id进行搜素
const searchProductOutId =async ()=>{
  //@ts-ignore
  tableData.value = await searchProductForOutId(productOutId.value)
}
//表格数据
const tableData = ref([])
//获取第一页的数据
const getAuditProductlist =async ()=>{
  ///@ts-ignore
  tableData.value = await getauditProductList()
}
getAuditProductlist()
//实现分页的功能


const paginationData  = reactive({
  //总页数
  pageCount:1,
  //当前所处的页数
  currentPage:1,

})
//获取管理员的数量
const outProductTotal = ref(0)
const getoutProductListlength = async ()=>{
  const res = await getOutProductListLength()
  outProductTotal.value  =  res.length
  paginationData.pageCount = Math.ceil(res.length/10 )
}
getoutProductListlength()

//默认获取第一页
const getFirstPageList = async ()=>{
  tableData.value = await returnOutProductListData(1) as any
}
getFirstPageList()
//监听换页
const currentChange =async (value)=>{
  paginationData.currentPage = value
  tableData.value = await returnOutProductListData(paginationData.currentPage) as any
}
</script>

<template>
  <BreadCrumb :ref="breadCrumb" :item="item"></BreadCrumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-header">
        <div class="search-wrapped">
          <el-input
              v-model="productOutId"
              class="w-50 m-2"
              size="large"
              placeholder="输入出库编号进行搜索"
              :prefix-icon="Search"
              style="width: 200px"
              clearable
              @clear="getAuditProductlist"
              @change="searchProductOutId()"
          />
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" width="50px"></el-table-column>
          <el-table-column prop="product_out_id" label="出库标号" width="200" />
          <el-table-column prop="product_out_number" label="申请数量" width="180" />
          <el-table-column prop="product_out_price" label="申请出库总价" width="180" />
          <el-table-column prop="product_out_apply_person" label="出库申请人" width="100" />
          <el-table-column prop="product_audit_time" label="申请出库时间" width="180" />
          <el-table-column prop="product_out_audit_person" label="审核人" width="150" />
          <el-table-column prop="product_audit_time" label="审核时间" width="180" />
          <el-table-column prop="audit_memo" label="审核备注" width="200" />
        </el-table>
      </div>
    </div>
    <div class="table-footer">
      <el-pagination
          :page-size="1"
          :pager-count="7"
          layout="prev, pager, next"
          :total="outProductTotal"
          :page-count="paginationData.pageCount"
          :current-page="paginationData.currentPage"
          @current-change="currentChange"
      />
    </div>
  </div>
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
    height: calc(100vh - 134px);
    display: flex;
    flex-direction: column;
    .table-header{
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      background: #fff;

    }
    .table-content{
      min-height: 10px;
      padding: 10px 20px 20px;
      margin-bottom: 8px;
      background: #fff;
    }
  }
  .table-footer {
    position: absolute;
    bottom: 20px;
    right: 20px;
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
</style>