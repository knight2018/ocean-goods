import axios from '@/libs/api.request'
//修改积分规则
export const activityUpdate = (id,data) => {
    return axios.request({
        url: `/integrationSetting/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//单个活动详情
export const integrationSetting = (id) => {
    return axios.request({
        url: `/integrationSetting/${id}`,
        params:{},
        method: 'get',
    })
}