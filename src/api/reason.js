import axios from '@/libs/api.request'

//分页查询退货原因
export const ReturnReasonList = ({ pageNum, pageSize }) => {
    const params = {
        pageNum, pageSize
    }
    return axios.request({
        url: `/returnReason/list`,
        params,
        method: 'get',
    })
}

//添加退货原因
export const ReturnReasonAdd = (data) => {
    return axios.request({
        url: '/returnReason/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//修改退货原因
export const ReturnReasonUpdate = (id, data) => {
    return axios.request({
        url: `/returnReason/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//批量删除
export const returnReasonDelete = (ids) => {
    let data = { ids }
    return axios.request({
        url: `/returnReason/delete`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}