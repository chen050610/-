import instance from '@/http/index.js'

//绑定上传的人
export const bindFileAndUser = (name,url) =>{
    return instance({
        url:'/file/bindFileAndUser',
        method:'POST',
        data:{
           name,
            url
        }
    })
}
//更新下载量
export const updateDownload = (download_number,id) =>{
    return instance({
        url:'/file/updateDownload',
        method:'POST',
        data:{
            download_number,
            id
        }
    })
}
//下载文件
export const downloadFile = (id) =>{
    return instance({
        url:'/file/downloadFile',
        method:'POST',
        data:{
            id
        }
    })
}
//下文件列表
export const fileList = () =>{
    return instance({
        url:'/file/fileList',
        method:'POST',
    })
}
//搜索问价
export const searchFile = (file_name) =>{
    return instance({
        url:'/file/searchFile',
        method:'POST',
        data:{
            file_name
        }
    })
}
//删除文件
export const deleteFile = (id) =>{
    return instance({
        url:'/file/deleteFile',
        method:'POST',
        data:{
            id
        }
    })
}
//获取文件总数
export const fileListLength = () =>{
    return instance({
        url:'/file/fileListLength',
        method:'POST',
    })
}
//返回数据
export const returnFileListData = (pager) =>{
    return instance({
        url:'/file/returnFileListData',
        method:'POST',
        data:{
            pager
        }
    })
}