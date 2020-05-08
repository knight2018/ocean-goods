import axios from '@/libs/api.request'
//分页查询活动
export const activityList = (params) => {
    return axios.request({
        url: `/activity/list`,
        params,
        method: 'get',
    })
}
//单个活动详情
export const activityDetail = (id) => {
    return axios.request({
        url: `/activity/detail/${id}`,
        params:{},
        method: 'get',
    })
}
//添加活动
export const activityAdd = (data) => {
    return axios.request({
        url: '/activity/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}
//编辑活动
export const activityUpdate = (id,data) => {
    return axios.request({
        url: `/activity/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}