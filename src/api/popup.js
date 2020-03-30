import axios from '@/libs/api.request'

//分页查询弹出层
export const ElasticLayerList = ({ name, position, showStatus, pageNum, pageSize }) => {
    const params = {
        name, position, showStatus, pageNum, pageSize
    }
    return axios.request({
        url: `/elasticLayer/list`,
        params,
        method: 'get',
    })
}

//添加弹出层
export const ElasticLayerAdd = (data) => {
    return axios.request({
        url: '/elasticLayer/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//修改弹出层
export const ElasticLayerUpdate = (id, data) => {
    return axios.request({
        url: `/elasticLayer/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}