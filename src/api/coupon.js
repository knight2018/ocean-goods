import axios from '@/libs/api.request'

//分页查询金额列表
export const amountSetting = (params) => {
    params.type = params.type || null
    params.name = params.name.trim();
    return axios.request({
        url: `/coupon/amountSetting/list`,
        params,
        method: 'get',
    })
}
//添加设置金额列表
export const amountSettingAdd = (data) => {
    return axios.request({
        url: '/coupon/amountSetting/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}