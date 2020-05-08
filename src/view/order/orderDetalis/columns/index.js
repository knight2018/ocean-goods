export const basicInformation = [
    {
        title: '订单编号',
        key: 'orderSn',
        align: 'center'
    },
    {
        title: '发货单流水号',
        key: 'sadf',
        align: 'center',
        render: (h, params) => {
            return h('div', {}, '暂无')
        }
    },
    {
        title: '用户账号',
        key: 'customerName',
        align: 'center'
    },
    {
        title: '支付方式',
        key: 'payType',
        align: 'center',
        render: (h, params) => {
            return h('div', {}, getPay(params.row.payType))
        }
    },
    {
        title: '订单来源',
        key: 'id',
        align: 'center',
        render: (h, params) => {
            return h('div', {}, '微信小程序')
        }
    },
    {
        title: '订单类型',
        key: 'status',
        align: 'center',
        render: (h, params) => {
            return h('div', {}, getStatus(params.row.status))
        }
    },
]
export const basicInformation2 = [
    {
        title: '配送方式',
        key: 'deliveryCompany',
        align: 'center'
    },
    {
        title: '物流单号',
        key: 'deliverySn',
        align: 'center'
    },
    {
        title: '自动确认收货时间',
        key: 'autoConfirmDay',
        align: 'center'
    },
    {
        title: '订单可得积分',
        key: 'integration',
        align: 'center'
    },
    {
        title: '订单可得成长值',
        key: 'growth',
        align: 'center'
    },
    {
        title: '活动信息',
        key: 'promotionInfo',
        align: 'center',
        tooltip: true
    },
]

export const consignee = [
    {
        title: '收货人',
        key: 'receiverName',
        align: 'center'
    },
    {
        title: '手机号码',
        key: 'receiverPhone',
        align: 'center'
    },
    {
        title: '邮政编码',
        key: 'receiverPostCode',
        align: 'center'
    },
    {
        title: '收货地址',
        key: 'receiverDetailAddress',
        align: 'center'
    },
]

export const commodityInformation = [
    {
        title: '商品图片',
        key: 'productPic',
        align: 'center',
        render: (h, params) => {
            return h('img', {
                attrs: {
                    src: params.row.productPic
                },
                style: {
                    width: '75px',
                    height: '100px',
                    padding: '10px 0'
                }
            })
        }
    },
    {
        title: '商品名称',
        key: 'productName',
        align: 'center'
    },
    {
        title: '价格/货号',
        key: 'id',
        align: 'center',
        render: (h, params) => {
            return h('div', {}, [
                h('p', {}, `价格:${params.row.productPrice}`),
                h('p', {}, `货号:${params.row.productSn}`)
            ])
        }
    },
    {
        title: '属性',
        key: 'productAttr',
        align: 'center',
        render: (h, params) => {
            return h('p', {}, getAttr(params.row.productAttr))
        }
    },
    {
        title: '数量',
        key: 'productQuantity',
        align: 'center'
    },
    {
        title: '小计',
        key: 'realAmount',
        align: 'center'
    },
    {
        title: '评价内容',
        key: 'commentContent',
        align: 'center'
    },
    {
        title: '评价时间',
        key: 'commentCreateTime',
        align: 'center'
    },
]
export const priceInformation = [
    {
        title: '商品合计',
        key: 'totalAmount',
        align: 'center'
    },
    {
        title: '运费',
        key: 'freightAmount',
        align: 'center'
    },
    {
        title: '优惠券',
        key: 'couponAmount',
        align: 'center'
    },
    {
        title: '积分抵扣',
        key: 'integrationAmount',
        align: 'center'
    },
]

export const priceInformation2 = [
    {
        title: '活动优惠',
        key: 'promotionAmount',
        align: 'center'
    },
    {
        title: '折扣金额',
        key: 'integrationAmount',
        align: 'center'
    },
    {
        title: '订单总金额',
        key: 'totalAmount',
        align: 'center'
    },
    {
        title: '应付款金额',
        key: 'payAmount',
        align: 'center'
    },
]

export const operation = [
    {
        title: '操作者',
        key: 'operater',
        align: 'center'
    },
    {
        title: '操作时间',
        key: 'createTime',
        align: 'center'
    },
    {
        title: '订单状态',
        key: 'orderStatus',
        align: 'center',
        render: (h, params) => {
            return h('div', {}, getStatus(params.row.orderStatus))
        }
    },
    {
        title: '付款状态',
        key: 'id',
        align: 'center',
        render: (h, params) => {
            return h('div', {}, params.row.orderStatus === 0 ? '未付款' : '已付款')
        }
    },
    {
        title: '发货状态',
        key: 'id',
        align: 'center',
        render: (h, params) => {
            return h('div', {}, params.row.orderStatus === 2 || params.row.orderStatus === 3 ? '已发货' : '未发货')
        }
    },
    {
        title: '备注',
        key: 'note',
        align: 'center',
        tooltip: true
    },
]

let getPay = (payType) => {
    let str = ''
    switch (payType) {
        case 0:
            str = '未支付'
            break;
        case 1:
            str = '微信'
            break;
        default:
            str = '德昌没给我返'
            break;
    }
    return str
}

export const getStatus = (status) => {
    let str = ''
    switch (status) {
        case 0:
            str = '待付款'
            break;
        case 1:
            str = '待发货'
            break;
        case 2:
            str = '已发货'
            break;
        case 3:
            str = '待评价'
            break;
        case 4:
            str = '已评价'
            break;
        case 5:
            str = '已取消'
            break;
        case 6:
            str = '无效订单'
            break;
        default:
            str = '未知'
            break;
    }
    return str
}
const getAttr = (attr) => {
    let str = ''
    try {
        let arr = JSON.parse(attr)
        arr.forEach(item => {
            let name = `${item.key}:${item.value}`
            str ? str = `${str};${name}` : str = name
        })
    } catch (err) {
        str = attr
    }
    console.log(str)
    return str
}