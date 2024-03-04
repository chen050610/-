<script setup>
import BreadCrumb from '@/components/bread_crumb.vue'
import {reactive, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import { onBeforeUnmount } from 'vue'
//添加入库
import Product_in_warehouse from "@/views/product/component/product_in_warehouse.vue";
//申请出库
import Apply from '../component/apply.vue'
//编辑产品信息
import EditProduct from "@/views/product/component/editProduct.vue";
//产出产品信息
import DeleteProduct from "@/views/product/component/DeleteProduct.vue";
import {getProductList} from '@/api/product.js'
//导入bus
import {bus} from '@/utils/mitt.js'
//通过入库标号进行搜索
import { searchProductForId ,searchProductForApplyId} from "@/api/product.js";
//获取审核列表，审核
import { applyProductList } from "@/api/product.js"
import AuditProduct from '../component/audit.vue'
//撤回申请
import WithdrawProduct from '../component/withdraw.vue'
//再次申请的操作
import AgainApply from "@/views/product/component/againApply.vue";
//获取产品列表
import {returnApplyProductListData,returnProductListData,getProductListLength,getApplyProductListLength} from  '@/api/product.js'
//面包屑
const breadCrumb =ref()
const item=reactive({
  first:'产品管理',
  second:'产品列表',
})
//主页的标签页
const activeName = ref('first')
//搜索框
const productId = ref()//通过入库编号进行搜索
const productOutId = ref()//通过产品申请出库编号进行搜索
//表格数据
const tableData = ref([])
const applyTableData = ref([])
//编辑添加产品弹窗
const inwarehouse = ref()
const openInwarehouse = ()=>{
  inwarehouse.value.open()
}
//申请出库弹窗
const apply = ref()
const openApply = (row)=>{
  bus.emit('applyId',row)
  apply.value.open()
}
// 获取审核列表
const applyProductlist =async ()=>{
  applyTableData.value = await applyProductList()
}
applyProductlist()
//获取产品列表
const getProductlist = async ()=>{
  tableData.value = await getProductList()
}
getProductlist()
//全部页面的刷新
const allPagerRefresh =  ()=>{
  getProductlist()
  applyProductlist()
}
//编辑产品信息
const edit = ref()
const openEdit = (row)=>{
  bus.emit('emitProductId',row)
  edit.value.open()
}
//删除产品信息
const deleteP = ref()
const openDelete = (row)=>{
  bus.emit('deleteProductId',row)
  deleteP.value.open()
}
//同构入库编号进行搜索
const searchProduct =async ()=>{
  tableData.value = await searchProductForId(productId.value)
}
//通过产品申请出库id进行搜索
const searchApplyId =async ()=>{
  applyTableData.value = await searchProductForApplyId(productOutId.value)
}

//审核的操作
const auditP  = ref()
const openAudit =(row)=>{
  bus.emit('auditProduct',row)
  auditP.value.open()
}
//撤回i申请
const withdrawP = ref()
const openWithdraw = (row)=>{
  bus.emit("withdrawData",row)
  withdrawP.value.open()
}
//再次申请
const againP = ref()
const openAgain = (row)=>{
  bus.emit('againId',row)
  againP.value.open()
}
// 实现分页的功能
//实现分页的功能


const paginationData  = reactive({
  productTotal:1,
  //总页数
  productpageCount:1,
  //当前所处的页数
  productcurrentPage:1,
  //申请的总页数
  applyTotal:1,
  //申请列表的总页数
  applypageCount:1,
  //申请列表所处额页数
  applycurrentPage:1,

})
//获取产品列表的页数
const getProductListlength = async ()=>{
  const res = await getProductListLength()
  console.log(res)
  paginationData.productTotal  =  res.length
  paginationData.productpageCount = Math.ceil(res.length/10 )
  console.log(paginationData.productpageCount)
}
getProductListlength()
//获取申请列表的总页数
const getApplyListlength = async ()=>{
  const res = await getApplyProductListLength()
  paginationData.applyTotal = res.length
  paginationData.applypageCount = Math.ceil(res.length/10 )
}
getApplyListlength()
//默认获取产品列表第一页
const getFirstProductPageList = async ()=>{
  tableData.value = await returnProductListData(1)
}
getFirstProductPageList()
//默认获取审核列表第一页
const getFirstApplyPageList = async ()=>{
  applyTableData.value = await returnApplyProductListData(1)
}
getFirstApplyPageList()
//监听产品列表换页
const productcurrentChange =async (value)=>{
  paginationData.productcurrentPage = value
  tableData.value = await returnProductListData(paginationData.productcurrentPage)
}
//监听审核列表换页
const applycurrentChange =async (value)=>{
  paginationData.applycurrentPage = value
  applyTableData.value = await returnApplyProductListData(paginationData.applycurrentPage)
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
        <el-tab-pane label="产品列表" name="first">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <div class="search-wrapped">
                  <el-input
                      v-model="productId"
                      class="w-50 m-2"
                      size="large"
                      placeholder="输入入库编号进行搜索"
                      :prefix-icon="Search"
                      style="width: 200px"
                      clearable
                      @clear="getProductlist"
                      @change="searchProduct()"
                  />
                </div>
                <div class="button-wrapped">
                  <el-button type="primary" @click="openInwarehouse" >产品入库</el-button>
                </div>
              </div>
              <div class="module-common-table">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column type="index" width="50px"></el-table-column>
                  <el-table-column prop="product_id" label="入库标号" width="200" />
                  <el-table-column prop="product_name" label="产品名称" width="160" />
                  <el-table-column prop="product_category" label="产品类别" width="100" />
                  <el-table-column prop="product_unit" label="单位"  />
                  <el-table-column prop="product_inwarehouse_number" label="库存数量" width="100" />
                  <el-table-column prop="product_single_price" label="产品单价" width="150" />
                  <el-table-column prop="product_all_price" label="库存总价" width="100" />
                  <el-table-column prop="product_status" label="库存状态" width="100" >
                    <template #default="{row}" >
                      <el-tag type="danger" v-if="row.product_inwarehouse_number<100">库存较少</el-tag>
                      <el-tag type="success" v-else-if="row.product_inwarehouse_number>100&&row.product_inwarehouse_number<300">库存正常</el-tag>
                      <el-tag type="success" v-else-if="row.product_inwarehouse_number>300">库存过剩</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="product_create_person" label="入库负责人" width="100" />
                  <el-table-column prop="product_create_time" label="入库时间" width="200" />
                  <el-table-column prop="product_update_time" label="最后修改时间" width="200" />
                  <el-table-column prop="in_memo" label="入库备注" width="200" />
                  <el-table-column  label="操作" width="300" fixed="right" >
                    <template #default="{row}">
<!--                      如果有人点击申请出库的话，那么别人点不了所以这样写-->
                      <el-button type="primary" @click="openApply(row)" :disabled="row.product_out_status=='申请出库' || row.product_inwarehouse_number=='0'">申请出库</el-button>
                      <el-button type="success" @click="openEdit(row)"   :disabled="row.product_out_status=='申请出库'">编辑</el-button>
                      <el-button type="danger" @click="openDelete(row)" :disabled="row.product_out_status=='申请出库'">删除</el-button>
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
                    :total="paginationData.productTotal"
                    :current-page="paginationData.productcurrentPage"
                    :page-count="paginationData.productpageCount"
                    :pager-count="11"
                    layout="prev, pager, next"
                    @current-change="productcurrentChange"
                />
            </div>
          </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核列表" name="second">
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
                  </div>
                </div>
                <div class="module-common-table">
                  <el-table :data="applyTableData" border style="width: 100%">
                    <el-table-column type="index" width="50px"></el-table-column>
                    <el-table-column prop="product_out_id" label="申请出库编号" width="200" />
                    <el-table-column prop="product_name" label="产品名称" width="200" />
                    <el-table-column prop="product_out_number" label="申请出库的数量" width="180" />
                    <el-table-column prop="product_out_price" label="申请出库总价" width="180"  />
                    <el-table-column prop="product_out_apply_person" label="申请人" width="100" />
                    <el-table-column prop="product_apply_time" label="申请出库时间" width="180" />
                    <el-table-column prop="apply_memo" label="申请出库备注" width="200" />
                    <el-table-column prop="product_out_audit_person" label="审核人" width="150" />
                    <el-table-column prop="product_out_audit_time" label="审核时间" width="150" />
                    <el-table-column prop="product_out_status" label="审核状态" width="100" />
                    <el-table-column prop="audit_memo " label="审核备注" width="100" />
                    <el-table-column   label="操作" width="300px"  fixed="right">
                      <template #default="{row}">
                        <el-button type="primary" @click="openWithdraw(row)" >撤回申请</el-button>
                        <el-button type="primary" @click="openAgain(row)" :disabled="row.product_out_status=='申请出库'">再次申请</el-button>
                        <el-button type="success" @click="openAudit(row)">审核</el-button>
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
                      :total="paginationData.applyTotal"
                      :current-page="paginationData.applycurrentPage"
                      :page-count="paginationData.pageCount"
                      :pager-count="11"
                      layout="prev, pager, next"
                      @current-change="applycurrentChange"
                  />
                </div>
              </div>
            </div>
          </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <Product_in_warehouse ref="inwarehouse" @success="allPagerRefresh"></Product_in_warehouse>
  <Apply ref="apply" @success="allPagerRefresh"></Apply>
  <EditProduct ref="edit" @success="allPagerRefresh"></EditProduct>
  <DeleteProduct ref="deleteP" @success="allPagerRefresh"></DeleteProduct>
  <AuditProduct ref="auditP" @success="allPagerRefresh"></AuditProduct>
  <WithdrawProduct ref="withdrawP" @success="allPagerRefresh"></WithdrawProduct>
  <AgainApply ref="againP" @success="allPagerRefresh"></AgainApply>
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
</style>