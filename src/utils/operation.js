import {operationLog } from "@/api/log.js";

export const tracking = async (module,operation_person,operation_object,operation_level,operation_status)=>{
    if (module == '管理员'){
        //操作内容
        let operation_content = `对管理员'${operation_object}' 进行删除操作`
        await operationLog({operation_person,operation_content,operation_level})
    }
    if (module == '产品'){
        //操作内容
        if (operation_status==0){}
        let operation_content = `对产品'${operation_object}' 进行审核出库操作,审核结果'${operation_status}'`
        await operationLog({operation_person,operation_content,operation_level})
    }

}
