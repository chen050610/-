<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {reactive, ref, shallowRef} from 'vue'
import { bus } from "@/utils/mitt.js"
import {
  ElMessage
} from "element-plus"
//发布公告,编辑公告,通过
import {publishMessage,editMessage,} from '@/api/message.js'
//获取部门列表
import {getDepartment} from '@/api/setting'
//编辑器的
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// mode
const mode = ref('default')
const toolbarConfig = {
  excludeKeys: []
}
const editorConfig = {
  placeholder: '',
  MENU_CONF: {
    // uploadImage: {
    //   //上传图片配置
    //   server: 'http://127.0.0.1:3007/set/uploadCompanyPicture', //上传接口地址
    //   fieldName: 'file', //上传文件名
    //   methods: 'post',
    //   metaWithUrl: true, // 参数拼接到 url 上
    //   // 单个文件上传成功之后
    //   // onSuccess(file, res) {
    //   // },
    //   // 自定义插入图片
    //   customInsert(res, insertFn) {
    //     insertFn(res.url)
    //   },
    // },
  }
}
// 上传图片，修改 uploadImage 菜单配置
// 需要注意的是，如何去修改参数？
toolbarConfig.excludeKeys = [
  'blockquote',
  'bgColor',
  'color',
  'group-more-style',
  'fontFamily',
  'bulletedList',
  'numberedList',
  'lineHeight',
  'todo',
  'emotion',
  'insertLink',
  'group-video',
  'insertTable',
  'codeBlock',
  'divider',
  'fullScreen',
  // 'group-image',

  // 排除菜单组，写菜单组 key 的值即可
]
const handleCreated = (editor : any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
interface formData {
  id:number,
  message_title:string,
  message_publish_department:string,
  message_publish_name:string,
  message_category:string,
  message_content:string,
  message_receipt_object:string,
  message_level:string,
}
//表单的数据
const formData:formData =reactive({
  id:null,
  message_title:"",
  message_publish_department:"",
  message_publish_name:"",
  message_category:"",
  message_content:"",
  message_receipt_object:'',
  message_level:'',

})
//表单的规则
const rules = reactive({
  message_title:[
    { required: true, message: '请输入公告标题',trigger:'blur' },
  ],
  message_publish_department:[
    { required: true, message: '请选择发布的部门',trigger:'blur' },
  ],
  message_publish_name:[
    { required: true, message: '请输入发布者',trigger:'blur' },
  ],
  message_receipt_object:[
    { required: true, message: '请输入接收对象',trigger:'blur' },
  ],
  message_content:[
    { required: true, message: '请输入公告的内容',trigger:'blur' },
  ] ,
  message_level:[
    { required: true, message: '请选择公告等级',trigger:'blur' },
  ]
})

const open =()=>{
  dialogFormVisible.value = true
}
const dialogFormVisible  = ref(false)
const productId = ref()
//发布公告的
const title = ref()
bus.on('publishMessage',(id)=>{
  if(id ==1){
    title.value = '发布公告'
  }
  if(id==2){
    title.value = '发布系统消息'
  }
})
//编辑公司公告的
bus.on('editPublishMessage',(content)=>{
  const {row,name} = content
  title.value = name
  formData.id = row.id
  formData.message_title = row.message_title
  formData.message_publish_department = row.message_publish_department
  formData.message_publish_name = row.message_publish_name
  formData.message_receipt_object = row.message_receipt_object
  formData.message_content = row.message_content
  formData.message_level = row.message_level
})
//编辑系统公告的
bus.on('editSystemPublishMessage',(content)=>{
  const {row,name} = content
  title.value = name
  formData.id = row.id
  formData.message_title = row.message_title
  formData.message_publish_name = row.message_publish_name
  formData.message_content = row.message_content
})
//确定点击事件
const emit = defineEmits(['success'])
const yes =async ()=>{
  if (title.value=='发布公告'){
    formData.message_category = '公司公告'
    const res = await publishMessage(formData)
    if (res.status == 0){
    ElMessage({
      message: '发布公告成功',
      type: 'success',
    })
    dialogFormVisible.value= false
    emit('success')
  } else {
    ElMessage.error('发布公告失败!请再次尝试')
  }}
  if(title.value == '编辑公告'){
    const res = await editMessage(formData)
    if (res.status == 0){
      ElMessage({
        message: '编辑公告成功',
        type: 'success',
      })
      dialogFormVisible.value= false
      emit('success')
    } else {
      ElMessage.error('编辑公告失败!请再次尝试')
    }
  }
  if(title.value == '发布系统消息'){
    formData.message_category = '系统消息'
    const res = await publishMessage(formData)
    if (res.status == 0){
      ElMessage({
        message: '发布系统消息成功',
        type: 'success',
      })
      dialogFormVisible.value= false
      emit('success')
    } else {
      ElMessage.error('发布系统消息失败!请再次尝试')
    }
  }
  if(title.value == '编辑系统消息'){
    const res = await editMessage(formData)
    if (res.status == 0){
      ElMessage({
        message: '编辑系统消息成功',
        type: 'success',
      })
      dialogFormVisible.value= false
      emit('success')
    } else {
      ElMessage.error('编辑系统消息失败!请再次尝试')
    }
  }
}
//调用获取部门的接口
//获取所有的部门
const departmentData =ref([])
//实现接收的是全体的成员
//包括全体成员
const allOptions = ref()
//不包括全体成员
const options = ref([])
const getdepartment = async ()=>{
  departmentData.value = await getDepartment() as any
  const res = await getDepartment() as any

  const data = []
  const datas = []
  for (let i=0;i<res.length;i++ ){
    let obj = {
      value:res[i]
    }
    data.push(obj)
    datas.push(obj)
  }
  datas.push({value:"全体成员"})
  allOptions.value = datas
  options.value = data
}
getdepartment()

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="title" append-to-body width="50%" destroy-on-close center align-center>
    <div class="dialog-content">
      <el-form :model='formData' label-width="120px" style="max-width: 600px" :rules="rules" label-position="left">
        <el-form-item label="主题" prop="message_title">
          <el-input v-model="formData.message_title" />
        </el-form-item>
        <el-form-item label="发布部门" prop="message_publish_department" v-if='title=="发布公告"|| title=="编辑公告" '>
          <el-select v-model="formData.message_publish_department" style="width: 180px" placeholder="请选择发布的部门">
            <el-option v-for="(item,index) in options " :label="item.value" :value="item.value" :key="index"/>
          </el-select>
        </el-form-item>
        <el-form-item label="发布者" prop="message_publish_name">
          <el-input v-model="formData.message_publish_name" />
        </el-form-item>
        <el-form-item label="接收部门" prop="message_receipt_object" v-if='title=="发布公告"|| title=="编辑公告"'>
          <el-select v-model="formData.message_receipt_object" style="width: 180px" placeholder="请选择接收的部门">
            <el-option v-for="(item,index) in allOptions " :label="item.value" :value="item.value" :key="index"/>
          </el-select>
        </el-form-item>
        <el-form-item label="公告等级" prop="message_level" v-if='title=="发布公告"|| title=="编辑公告"'>
          <el-select v-model="formData.message_level" style="width: 180px" placeholder="请选择公告的等级">
            <el-option label="一般" value="一般" />
            <el-option label="重要" value="重要" />
            <el-option label="必要" value="必要" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="message_content">
          <div style="border: 1px solid #ccc">
            <!-- wangEditor结构 -->
            <Toolbar style=" border-bottom: 1px solid #ccc;width: 500px" :editor="editorRef" :defaultConfig="toolbarConfig"
                     :mode="mode" />
            <Editor style="height: 300px; width: 500px ;overflow-y: hidden;" v-model="formData.message_content" :defaultConfig="editorConfig"
                    :mode="mode" @onCreated="handleCreated" />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="yes">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">
.dialog-content{
  display: flex;
  padding: 20px 30px;
  flex: 1;
  max-height: 800px;
  overflow: auto;
}
.el-dialog__body{
  padding: 0;
}
.el-input{
  width: 240px;
}
.dialog-footer{
  display: flex;
  justify-content: flex-end;
}
.el-form-item {
  margin: 16px;
}
:deep(.w-e-text-container p){
  margin: 0;
}
</style>