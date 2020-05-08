<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<div class="mg-tp">
					<span>输入搜索：</span>
					<Input
						style="width:200px;"
						v-model="search.orderSn"
						@on-enter="handleSearch"
						placeholder="请输入订单号"
					/>
				</div>
				<div class="mg-30 mg-tp">
					<span>收货人姓名：</span>
					<Input
						style="width:200px;"
						v-model="search.receiverName"
						@on-enter="handleSearch"
						placeholder="收货人姓名"
					/>
				</div>
				<div class="mg-30 mg-tp">
					<span>收货人手机号：</span>
					<Input
						style="width:200px;"
						v-model="search.receiverPhone"
						@on-enter="handleSearch"
						placeholder="收货人手机号"
					/>
				</div>
				<div class="mg-30 mg-tp">
					<span>提交时间：</span>
					<DatePicker
						type="date"
						v-model="search.createTime"
						placeholder="Select date"
						style="width: 200px"
					></DatePicker>
				</div>
				<div class="mg-30 mg-tp">
					<span>订单状态：</span>
					<Select v-model="search.status" style="width:200px" clearable>
						<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
			</div>
		</Search>
		<tabBar></tabBar>
		<TablePage
			:columns="tableList.columns"
			:data="tableList.data1"
			:total="tableList.total"
			v-model="search.pageNum"
			:limit="search.pageSize"
			:handleSearch="handleSearch"
			@change-limit="handleChange"
		></TablePage>
	</div>
</template>
<script>
import { orderList, orderDelete, orderDelivery } from '../../api/order'
export default {
	data () {
		return {
			loading: false,
			search: {
				orderSn: '',
				receiverName: '',
				receiverPhone: '',
				createTime: null,
				status: undefined,
				pageNum: 1,
				pageSize: 10
			},
			statusList: [
				{
					value: 0,
					label: '待付款'
				},
				{
					value: 1,
					label: '待发货'
				},
				{
					value: 2,
					label: '已发货'
				},
				{
					value: 3,
					label: '已完成'
				},
				{
					value: 4,
					label: '已关闭'
				},
				{
					value: 5,
					label: '无效订单'
				},
			],
			tableList: {
				columns: [
					{
						title: '编号',
						key: 'id',
						align: 'center'
					},
					{
						title: '订单编号',
						key: 'orderSn',
						align: 'center'
					},
					{
						title: '提交时间',
						key: 'createTime',
						align: 'center'
					},
					{
						title: '用户账号',
						key: 'customerName',
						align: 'center'
					},
					{
						title: '订单金额',
						key: 'payAmount',
						align: 'center'
					},
					{
						title: '支付方式',
						key: 'payType',
						align: 'center',
						render: (h, params) => {
							return h('span', {}, this.getPay(params.row.payType))
						}
					},
					{
						title: '订单状态',
						key: 'status',
						align: 'center',
						render: (h, params) => {
							return h('span', {}, this.getStatus(params.row.status))
						}
					},
					{
						title: '操作',
						key: 'packName',
						align: 'center',
						render: (h, params) => {
							return h('div', {
								style: {
									display: 'flex',
									justifyContent: 'center'
								}
							}, [
								h('i-button', {
									style: {
										marginLeft: '15px'
									},
									on: {
										click: () => {
											this.$router.push({
												name: '/orderDetalis',
												query: {
													id: params.row.id
												}
											})
										}
									}
								}, '查看订单'),
								h('i-button', {
									style: {
										marginLeft: '15px',
										display: params.row.status === 1 ? 'block' : 'none'
									},
									on: {
										click: () => {
											orderDelivery(params.row.id).then((res) => {
												this.$Message.success('发货成功')
												this.handleSearch('page');
											}).catch((err) => {

											});
										}
									}
								}, '订单发货'),
								h('i-button', {
									style: {
										marginLeft: '15px',
										display: params.row.status === 2 || params.row.status === 3 ? 'block' : 'none'
									},
									on: {
										click: () => {

										}
									}
								}, '订单追踪'),
								h('i-button', {
									style: {
										marginLeft: '15px',
										display: params.row.status === 4 || params.row.status === 5 ? 'block' : 'none'
									},
									props: {
										type: "error"
									},
									on: {
										click: () => {
											this.orderDelete(params.row.id)
										}
									}
								}, '删除订单')
							])
						}
					},
				],
				data1: [
				],
				total: 0
			},
		}
	},
	methods: {
		handleSearch (off) {
			this.loading = true;
			if (off !== 'page') {
				this.search.pageNum = 1
			}
			orderList(this.search).then((res) => {
				console.log(res)
				this.tableList.total = res.data.total;
				this.tableList.data1 = res.data.data
				this.loading = false;
			}).catch((err) => {
				this.loading = false;
			});
		},
		handleClear () {
			this.loading = false;
			this.search = {
				orderSn: '',
				receiverName: '',
				receiverPhone: '',
				createTime: null,
				status: undefined,
				pageNum: 1,
				pageSize: 10
			}
			this.handleSearch()
		},
		handleChange (limit) {
			this.search.pageSize = limit
			this.handleSearch();
		},
		orderDelete (ids) {
			this.$Modal.confirm({
				title: '是否删除订单',
				content: '<p>删除后订单将不可见</p>',
				onOk: () => {
					orderDelete(ids).then((res) => {
						this.$Message.success('删除成功')
						this.handleSearch();
					}).catch((err) => {

					});
				},
				onCancel: () => {

				}
			})

		},
		getPay (payType) {
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
		},
		getStatus (status) {
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
	},
	created () {
		this.handleSearch()
	}
}
</script>

<style scoped>
</style>