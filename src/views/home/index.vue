<script setup lang="ts">
import BreadCrumb from '@/components/bread_crumb.vue'
import {getAllSwiper,getAllCompanyIntroduce} from '@/api/setting'
import {reactive, ref} from "vue";
import {bus} from '@/utils/mitt.js'

import Introduce from './component/introduce.vue'
const breadCrumb =ref()
const item=reactive({
  first:'首页',

})
const tableData = [

]
const imageUrl = ref<string[]>([])
const getAllswiper = async ()=>{
  imageUrl.value = await getAllSwiper() as any
}
getAllswiper()
const companyIntroduce =ref([])
const getAllCompanyintroduce =async ()=>{
  companyIntroduce.value = await getAllCompanyIntroduce() as any
}
getAllCompanyintroduce()
const intro = ref()
const openIntroduce = (id:number)=>{
  bus.emit('introduceTitle',id)
  intro.value.open()
}


</script>

<template>
  <BreadCrumb ref="breadCrumb" :item="item"></BreadCrumb>
  <div class="home-wrapped">
    <div class="swiper-wrapped">
        <el-carousel :interval="2000" arrow="always" height="320px" indicator-position="outside">
          <el-carousel-item v-for="(item,index) in imageUrl" :key="index">
            <img :src="item" alt="" class="swiper">
          </el-carousel-item>
        </el-carousel>
    </div>
    <div class="layout-wrapped">
      <el-row :gutter="20">
          <el-col :span="6" v-for="(item ,index) in companyIntroduce" :key="index"  @click="openIntroduce(index)" v-show="!(item.set_name === '公司名称')">
          <div class="company-message-area" >
            <span>{{item.set_name}}</span>
            <div v-html="item.set_text" class="company-introduce"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="two-table-wrapped">
      <div class="company-notice">
        <span class="title">公司公告</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <div class="system-message">
        <span class="title">系统消息</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
  </div>
  <Introduce ref="intro"></Introduce>
</template>

<style scoped lang="scss">
@mixin table-class {
  height: 230px;
  width: 48%;
  display: flex;
  flex-direction: column;

}

// 首页外壳
.home-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background: #f5f5f5;
  display: flex;
  flex-direction: column;

  // 轮播图外壳
  .swiper-wrapped {
    padding: 0 20px;
    background: #fff;
    margin-bottom: 8px;
    //height: 900px;
    .swiper{
      width: 100%;
      height: 320px;
      object-fit: contain;
    }

    .swiper {
      width: 100%;
      height: 100%;
    }
  }

  // 栅格布局外壳
  .layout-wrapped {
    padding: 8px;
    margin-bottom: 8px;
    background: #fff;

    // 公司信息区域
    .company-message-area {
      background: #f5f5f5;
      height: 200px;
      padding: 8px;
      cursor: pointer;

      span {
        border-bottom: 1px solid #409eff;
        font-size: 14px;
      }
      .company-introduce{
        text-indent: 24px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;

      }

      .company-introduce {
        text-indent: 24px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }

    .company-message-area:hover {
      cursor: pointer;
      background-color: #eef5ff;
    }
  }

  // 表格外壳
  .two-table-wrapped {
    height: 230px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;



    // 公司公告
    .company-notice {
      @include table-class
    }

    // 系统消息
    .system-message {
      @include table-class
    }

    .title {
      font-size: 14px;
      margin-bottom: 5px;
      border-bottom: 1px solid #ea0709;
    }
  }
}

.message_title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

//转的
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>