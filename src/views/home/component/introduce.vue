<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {
  onBeforeUnmount, ref,reactive
} from 'vue'
import { bus } from "@/utils/mitt.js"
import {getCompanyIntroduce} from '@/api/setting'
const title = ref()
const valueHtml = ref()
bus.on("introduceTitle", async (id : number) => {
  if (id == 1) {
    title.value = '公司介绍'
    valueHtml.value = await getCompanyIntroduce('公司介绍')
  }
  if (id == 2) {
    title.value = '公司架构'
    valueHtml.value = await getCompanyIntroduce('公司架构')
  }
  if (id == 3) {
    title.value = '公司战略'
    valueHtml.value = await getCompanyIntroduce('公司战略')
  }
  if (id == 4) {
    title.value = '公司高层'
    valueHtml.value = await getCompanyIntroduce('公司高层')
  }
})


const state = reactive({
  dialogFormVisible: false,
});


// 暴露open方法
const open = () => {
  state.dialogFormVisible = true;
};
defineExpose({
  open,
});

// 取消订阅/监听
onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<template>
  <el-dialog v-model="state.dialogFormVisible" :title="title" width="600px" destroy-on-close center>
    <div class="content" v-html="valueHtml"></div>
  </el-dialog>
</template>


<style scoped lang="scss">
.content{
  text-align: center;
}
</style>