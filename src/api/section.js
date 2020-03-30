import axios from '@/libs/api.request'
//获取所有栏目
export const ListAll = () => {
    const params = {}
    return axios.request({
        url: `/column/listAll`,
        params,
        method: 'get',
    })
}
//修改栏目
export const columnUpadte = (id, data) => {
    return axios.request({
        url: `/column/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//获取所有栏目
export const productList = (columnCategoryId) => {
    const params = {}
    return axios.request({
        url: `/column/product/list/${columnCategoryId}`,
        params,
        method: 'get',
    })
}

//添加栏目商品
export const productAdd = (data) => {
    return axios.request({
        url: '/column/product/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//修改栏目商品
export const productUpdate = (id, data) => {
    return axios.request({
        url: `/column/product/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}