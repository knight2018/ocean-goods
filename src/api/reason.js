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
    let params = { ids }
    return axios.request({
        url: `/returnReason/delete`,
        params,
        method: 'post',
    })
}

//POST 确认退款
export const returnApplyRefund = (id) => {
    return axios.request({
        url: `/returnApply/refund/${id}`,
        data: {},
        method: 'post',
    })
}

//POST 拒绝退款
export const returnApplyRefuse = (id, note) => {
    return axios.request({
        url: `/returnApply/refuse/${id}`,
        params: { note },
        method: 'post',
    })
}

//POST 确认退货
export const returnApplyConfirm = (id) => {
    return axios.request({
        url: `/returnApply/confirm/${id}`,
        data: {},
        method: 'post',
    })
}
export const ReturnReasonItem = (id) => {
    return axios.request({
        url: `/returnApply/item/${id}`,
        params:{},
        method: 'get',
    })
}
