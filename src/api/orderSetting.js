import axios from '@/libs/api.request'
//获取指定订单设置
export const orderSetting = () => {
    const params = {
    }
    return axios.request({
        url: `/orderSetting/1`,
        params,
        method: 'get',
    })
}

//修改订单
export const update = (data) => {
    return axios.request({
      url: '/orderSetting/update/1',
      data,
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    })
  }