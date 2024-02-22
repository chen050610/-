<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {ref} from 'vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"
import { getCompanyIntroduce} from '@/api/setting'
import {changeIdentityToUser} from '@/api/userInfo'
// bus.on("editorTitle", async (id : number) => {
//   if (id == 1) {
//     title.value = '编辑公司介绍'
//     valueHtml.value = await getCompanyIntroduce('公司介绍')
//   }
//   if (id == 2) {
//     title.value = '编辑公司架构'
//     valueHtml.value = await getCompanyIntroduce('公司架构')
//   }
//   if (id == 3) {
//     title.value = '编辑公司战略'
//     valueHtml.value = await getCompanyIntroduce('公司战略')
//   }
//   if (id == 4) {
//     title.value = '编辑公司高层'
//     valueHtml.value = await getCompanyIntroduce('公司高层')
//   }
// })
const deleteadmin = async ()=>{
  const res  = await  changeIdentityToUser()
}
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="删除操作" width="600px" destroy-on-close>
    <span>是否去掉此用户的管理员职位?删除此用户将重新展现在用户列表中</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteadmin">
          确认定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">

</style>