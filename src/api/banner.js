import axios from '@/libs/api.request'
//分页查询商品属性信息
export const CarouselList = ({ name, showStatus, pageNum, pageSize }) => {
    const params = {
        name, showStatus, pageNum, pageSize
    }
    return axios.request({
        url: `/carousel/list`,
        params,
        method: 'get',
    })
}

//添加轮播
export const CarouselAdd = (data) => {
    return axios.request({
        url: '/carousel/create',
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//修改商品属性信息
export const carouselUpdate = (id, data) => {
    return axios.request({
        url: `/carousel/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}