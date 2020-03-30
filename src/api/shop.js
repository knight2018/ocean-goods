import axios from '@/libs/api.request'

//查询商品
export const productList = ({ productCategoryId, productName, publishStatus, pageNum, pageSize, productSn }) => {
    const params = {
        productCategoryId, productName, publishStatus, productSn, pageNum, pageSize
    }
    return axios.request({
        url: `/product/list`,
        params,
        method: 'get',
    })
}

//创建商品
export const productAdd = (data) => {
    return axios.request({
        url: '/product/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//更新商品
export const productUpdate = (productId, data) => {
    return axios.request({
        url: `/product/update/${productId}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//批量上下架
export const PublishStatus = ({ productIds, publishStatus }) => {
    productIds = productIds.join(',')
    const params = {
        productIds, publishStatus
    }
    return axios.request({
        url: '/product/update/publishStatus',
        params,
        method: 'post',
        // headers: {
        //     'content-type': 'application/json'
        // }
    })
}

//批量修改删除状态
export const DeleteStatus = (productIds) => {
    productIds = productIds.join(',')
    const params = {
        productIds, deleteStatus: 0
    }
    return axios.request({
        url: '/product/update/deleteStatus',
        params,
        method: 'post',
        // headers: {
        //     'content-type': 'application/json'
        // }
    })
}

//查询单个商品属性


export const productAttribute = (attributeId) => {
    const params = {}
    return axios.request({
        url: `/productAttribute/${attributeId}`,
        params,
        method: 'get',
    })
}


export const UpdateInfo = (productId) => {
    const params = {}
    return axios.request({
        url: `/product/updateInfo/${productId}`,
        params,
        method: 'get',
    })
}

//组件查询商品
export const productList2 = ({ productName, firstCategoryId, secondCategoryId, pageNum, pageSize }) => {
    const params = {
        productName, firstCategoryId, secondCategoryId, pageNum, pageSize
    }
    return axios.request({
        url: `/product/list2`,
        params,
        method: 'get',
    })
}
//根据货号查询商品
export const productItem = (productSn) => {
    const params = { productSn }
    return axios.request({
        url: `/product/item`,
        params,
        method: 'get',
    })
}