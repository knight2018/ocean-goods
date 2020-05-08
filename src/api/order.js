import axios from '@/libs/api.request'

export const a = (date, off) => {
    let year = date.getFullYear(),
        monter = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
        day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate(),
        hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours(),
        min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    if (off) {
        return `${year}-${monter}-${day} ${hour}:${min}`
    } else {
        return `${year}-${monter}-${day}`
    }
}

//查询订单
export const orderList = ({ orderSn, status, receiverName, receiverPhone, createTime, pageNum, pageSize }) => {
    if (createTime && typeof (createTime) === 'object') {
        createTime = a(createTime)
    }
    const params = {
        orderSn, status, receiverName, receiverPhone, createTime, pageNum, pageSize
    }
    return axios.request({
        url: `/order/list`,
        params,
        method: 'get',
    })
}

//批量删除订单
export const orderDelete = (ids) => {
    const params = {
        ids
    }
    return axios.request({
        url: '/order/delete',
        params,
        method: 'post',
    })
}

//批量关闭订单
export const orderClose = ({ ids, note, operater, operaterName }) => {
    const data = {
        ids, note, operater, operaterName
    }
    return axios.request({
        url: '/order/update/close',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//备注订单
export const orderNote = (id, data) => {
    return axios.request({
        url: `/order/update/note/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}
//修改收货人信息
export const orderReceiverInfo = (id, data) => {
    return axios.request({
        url: `/order/update/receiverInfo/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//根据id获取订单详情
export const getOrder = (id) => {
    let params = {}
    return axios.request({
        url: `/order/${id}`,
        params,
        method: 'get',
    })
}

//发货
export const orderDelivery = (id) => {
    let params = {}
    return axios.request({
        url: `/order/update/delivery/${id}`,
        params,
        method: 'post',
    })
}