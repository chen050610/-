import instance from '@/http/index.js'


export const createProduct = data =>{
    const {
        product_id,
        ...in_memo
    } = data
    return instance({
        url:'/pro/createProduct',
        method:'POST',
        data:{
            product_id,
            ...in_memo
        }
    })
}


export const deleteProduct = id =>{
    return instance({
        url:'/pro/deleteProduct',
        method:'POST',
        data:{
            id
        }
    })
}
export const editProduct = data =>{
    const {
        product_name,
        ...id
    } = data
    return instance({
        url:'/pro/editProduct',
        method:'POST',
        data:{
            product_name,
            ...id
        }
    })
}
export const getProductList = () =>{
    return instance({
        url:'/pro/getProductList',
        method:'POST',
    })
}
//产品申请出库
export const applyOutProduct = data =>{
    const {
        id,
        ...apply_memo
    } = data
    return instance({
        url:'/pro/applyOutProduct',
        method:'POST',
        data:{
            id,
            ...apply_memo
        }
    })
}
//产品审核列表
export const applyProductList = () =>{
    return instance({
        url:'/pro/applyProductList',
        method:'POST',
    })
}
//产品审核,审核成功以后，更新产品数量。总价，计算出路总价，同时把出库的数据插入output表，把审核的数据设置为空
export const auditProductList = data =>{
    const {
        id,
        ...product_out_number
    } = data
    return instance({
        url:'/pro/auditProductList',
        method:'POST',
        data:{
            id,
            ...product_out_number
        }
    })
}
export const auditProduct = data =>{
    const {
        id,
        ...product_out_number
    } = data
    return instance({
        url:'/pro/auditProduct',
        method:'POST',
        data:{
            id,
            ...product_out_number
        }
    })
}
//通过出库申请对产品进行搜索
export const searchProductForId = product_id =>{
    return instance({
        url:'/pro/searchProductForId',
        method:'POST',
        data:{
            product_id
        }
    })
}
// 通过入库编号对产进行搜索
export const searchProductForApplyId = product_out_id =>{
    return instance({
        url:'/pro/searchProductForApplyId',
        method:'POST',
        data:{
            product_out_id
        }
    })
}
//通过出库编号对产进行搜索
export const searchProductForOutId = product_out_id =>{
    return instance({
        url:'/pro/searchProductForOutId',
        method:'POST',
        data:{
            product_out_id
        }
    })
}
//对产品进行撤回申请
export const withdrawProductApply = id =>{
    return instance({
        url:'/pro/withdrawProductApply',
        method:'POST',
        data:{
            id
        }
    })
}
//获取产品总数
export const getProductListLength = () =>{
    return instance({
        url:'/pro/getProductListLength',
        method:'POST',
    })
}
//获取申请出库的产品总数

export const getApplyProductListLength = () =>{
    return instance({
        url:'/pro/getApplyProductListLength',
        method:'POST',
    })
}
//获取出库的产品总数
export const getOutProductListLength = () =>{
    return instance({
        url:'/pro/getOutProductListLength   ',
        method:'POST',
    })
}
//监听换页返回数据 页码 身份
export const returnProductListData = pager =>{
    return instance({
        url:'/pro/returnProductListData',
        method:'POST',
        data:{
            pager
        }
    })
}
//申请出出库
export const returnApplyProductListData = pager =>{
    return instance({
        url:'/pro/returnApplyProductListData',
        method:'POST',
        data:{
            pager
        }
    })
}
//出库页面
export const returnOutProductListData = pager =>{
    return instance({
        url:'/pro/returnOutProductListData',
        method:'POST',
        data:{
            pager
        }
    })
}
//获取产品出库列表
export const getauditProductList = () =>{
    return instance({
        url:'/pro/getauditProductList',
        method:'POST',
    })
}