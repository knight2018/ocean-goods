import axios from '@/libs/api.request'
import { a } from './data'
//分页查询退货申请
export const returnApply = ({ status, applyTime, handleTime, operateName, pageNum, pageSize }) => {
    if (applyTime && typeof (applyTime) === 'object'){
        applyTime = a(applyTime)
    }
    if (handleTime && typeof (handleTime) === 'object'){
        handleTime = a(handleTime)
    }
    const params = {
        status, applyTime, handleTime, operateName, pageNum, pageSize
    }
    return axios.request({
        url: `/returnApply/list`,
        params,
        method: 'get',
    })
}

