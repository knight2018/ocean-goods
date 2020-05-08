import axios from '@/libs/api.request'

export const a = (date, off) => {
    // eslint-disable-next-line one-var
    let year = date.getFullYear(),
        monter = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
        // eslint-disable-next-line semi
        day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate(),
        hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours(),
        min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    if (off) {
        return `${year}-${monter}-${day} ${hour}:${min}`
    } else {
        return `${year}-${monter}-${day}`
    }
}
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
//更新金额设置
export const amountSettingUpdate = (id, data) => {
    return axios.request({
        url: `/coupon/amountSetting/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//分页查询品类列表
export const categorySetting = (params) => {
    return axios.request({
        url: `/coupon/categorySetting/list`,
        params,
        method: 'get',
    })
}
//添加品类设置
export const categorySettingAdd = (data) => {
    return axios.request({
        url: '/coupon/categorySetting/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}
//更新品类设置
export const categoryUpdate = (id, data) => {
    return axios.request({
        url: `/coupon/categorySetting/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}
//分页优惠券列表
export const couponList = (params) => {
    return axios.request({
        url: `/coupon/list`,
        params,
        method: 'get',
    })
}

//添加优惠券设置
export const couponAdd = (data) => {
    console.log(data.endTime)
    if (data.startTime && typeof (data.startTime) === 'object') {
        data.startTime = a(data.startTime)
    }
    if (data.endTime && typeof (data.endTime) === 'object') {
        data.endTime = a(data.endTime)
    }
    console.log(data.endTime)
    return axios.request({
        url: '/coupon/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//更新优惠券设置
export const couponUpdate = (id, data) => {
    console.log(data.endTime)
    if (data.startTime && typeof (data.startTime) === 'object') {
        data.startTime = a(data.startTime)
    }
    if (data.endTime && typeof (data.endTime) === 'object') {
        data.endTime = a(data.endTime)
    }
    console.log(data.endTime)
    return axios.request({
        url: `/coupon/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//删除优惠券
export const couponDel = (id, data) => {
    return axios.request({
        url: `/coupon/delete/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//查询品类列表
export const categorySettingAll = () => {
    return axios.request({
        url: `/coupon/categorySetting/listAll`,
        params: {},
        method: 'get',
    })
}

//查询金额列表
export const amountSettingAll = () => {
    return axios.request({
        url: `/coupon/amountSetting/listAll`,
        params: {},
        method: 'get',
    })
}
//根据id查询优惠券
export const couponItem = (id) => {
    return axios.request({
        url: `/coupon/item/${id}`,
        params: {},
        method: 'get',
    })
}