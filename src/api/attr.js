import axios from '@/libs/api.request'

//分页查询商品属性信息
export const AttriList = ({ attributeCategoryId, attributeType, pageNum, pageSize }) => {
    const params = {
        attributeCategoryId, attributeType, pageNum, pageSize
    }
    return axios.request({
        url: `/productAttribute/list`,
        params,
        method: 'get',
    })
}

//添加商品属性信息
export const AttriAdd = (data) => {
    return axios.request({
        url: '/productAttribute/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//修改商品属性信息
export const AttriUpdate = (attributeId,data) => {
    return axios.request({
        url: `/productAttribute/update/${attributeId}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}