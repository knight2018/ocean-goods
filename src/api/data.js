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

//角色权限接口
export const roleAdd = ({ roleName, permission }) => {
  const data = {
    roleName, permission
  }
  return axios.request({
    url: '/role/add',
    data,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  })
}

//分页查询商品分类
export const productCategoryList = ({ parentId, pageNum, pageSize }) => {
  const params = {
    pageNum, pageSize
  }
  return axios.request({
    url: `/productCategory/list/${parentId}`,
    params,
    method: 'get',
  })
}

//添加商品分类
export const productCategoryAdd = (data) => {
  return axios.request({
    url: '/productCategory/create',
    data,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  })
}

//修改商品分类
export const productCategoryUpdate = (categoryId, data) => {
  return axios.request({
    url: `/productCategory/update/${categoryId}`,
    data,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  })
}

//删除商品分类
export const productCategoryDelete = (categoryId) => {
  return axios.request({
    url: `/productCategory/delete/${categoryId}`,
    data,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  })
}


//分页查询商品属性分类
export const productAttributeList = ({ pageNum, pageSize }) => {
  const params = {
    pageNum, pageSize
  }
  return axios.request({
    url: `/productAttribute/category/list`,
    params,
    method: 'get',
  })
}

//添加商品属性分类
export const productAttributeAdd = (data) => {
  return axios.request({
    url: '/productAttribute/category/create',
    data,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  })
}

//修改商品属性分类
export const productAttributeUpdate = (attributeCategoryId,data) => {
  return axios.request({
    url: `/productAttribute/category/update/${attributeCategoryId}`,
    data,
    method: 'post',
    headers: {
      'content-type': 'application/json'
    }
  })
}


//获取上传文件信息
export const config = () => {
  return axios.request({
    url: '/file/config',
    method: 'get'
  })
}

export const sts = (userName) => {
  const params = {
    userName
  }
  return axios.request({
    url: '/file/sts',
    method: 'get',
    params
  })
}

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
