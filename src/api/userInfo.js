import axios from '@/libs/api.request'

export const customerList = (params) => {
    return axios.request({
        url: '/customer/list',
        params,
        method: 'get'
    })
}

export const customerDetail = (customerId) => {
    return axios.request({
        url: `/customer/detail/${customerId}`,
        params:{},
        method: 'get'
    })
}