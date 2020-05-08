import axios from '@/libs/api.request'
//添加角色
export const roleAdd = (data) => {
    return axios.request({
        url: `/role/create`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}
//修改角色
export const roleUpdate = (id, data) => {
    return axios.request({
        url: `/role/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}
//查询角色列表
export const roleList = (params) => {
    return axios.request({
        url: `/role/list`,
        params,
        method: 'get',
    })
}


//查询所有角色列表
export const roleListAll = () => {
    return axios.request({
        url: `/role/listAll`,
        params: {},
        method: 'get',
    })
}

//添加用户
export const adminAdd = (data) => {
    return axios.request({
        url: `/admin/create`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//修改角色
export const adminUpdate = (id, data) => {
    return axios.request({
        url: `/admin/update/${id}`,
        data,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    })
}

//查询用户列表
export const adminList = (params) => {
    return axios.request({
        url: `/admin/list`,
        params,
        method: 'get',
    })
}