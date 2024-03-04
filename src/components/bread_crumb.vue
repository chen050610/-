<script setup >
import SvgIcon from '@/components/SvgIcon.vue'
const prop = defineProps(['item'])

</script>

<template>
  <div class="bread-crumb">
    <SvgIcon icon-name="location" class="bread-crumb-icon"></SvgIcon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{prop.item.first}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{prop.item.second}}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.bread-crumb {
  height: 30px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.bread-crumb-icon{
  margin-right: 4px;
}
:deep(.el-breadcrumb__item){
  height: 30px;
  font-size: 16px;
  line-height: 30px;
}
:deep(.el-breadcrumb__inner){
  font-weight: 500;
}

</style>