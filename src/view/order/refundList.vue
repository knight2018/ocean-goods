<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<!-- <div class="mg-tp">
					<span>输入搜索：</span>
					<Input
						style="width:200px;"
						v-model="search.orderSn"
						@on-enter="handleSearch"
						placeholder="服务单号"
					/>
				</div>-->
				<div class="mg-30 mg-tp">
					<span>处理状态：</span>
					<Select v-model="search.status" style="width:200px" clearable>
						<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
				<div class="mg-30 mg-tp">
					<span>申请时间：</span>
					<DatePicker
						type="date"
						v-model="search.applyTime"
						placeholder="Select date"
						style="width: 200px"
					></DatePicker>
				</div>
				<div class="mg-30 mg-tp">
					<span>操作人员：</span>
					<Input
						style="width:200px;"
						v-model="search.operateName"
						@on-enter="handleSearch"
						placeholder="操作人员"
					/>
				</div>
				<div class="mg-30 mg-tp">
					<span>处理时间：</span>
					<DatePicker
						type="date"
						v-model="search.handleTime"
						placeholder="Select date"
						style="width: 200px"
					></DatePicker>
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
import { returnApply } from '../../api/refundList'
export default {
	data () {
		return {
			loading: false,
			search: {
				applyTime: undefined,
				handleTime: undefined,
				operateName: '',
				status: undefined,
				pageNum: 1,
				pageSize: 10
			},
			statusList: [
				{
					value: 0,
					label: '待处理'
				},
				{
					value: 1,
					label: '退货中'
				},
				{
					value: 2,
					label: '已完成'
				},
				{
					value: 3,
					label: '已拒绝'
				}
			],
			tableList: {
				columns: [
					{
						title: '服务单号',
						key: 'id',
						align: 'center'
					},
					{
						title: '申请时间',
						key: 'applyTime',
						align: 'center'
					},
					{
						title: '用户账号',
						key: 'customerSn',
						align: 'center'
					},
					{
						title: '退款金额',
						key: 'returnAmount',
						align: 'center'
					},
					{
						title: '申请状态',
						key: 'status',
						align: 'center',
						render: (h, params) => {
							return h('span', {}, this.getStatus(params.row.status))
						}
					},
					{
						title: '处理时间',
						key: 'handleTime',
						align: 'center',
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
                                            let obj = JSON.stringify(params.row)
                                            this.$router.push({
                                                name: '/refundDetails',
                                                query:{
                                                    obj
                                                }
                                            })
										}
									}
								}, '查看详情'),
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
			returnApply(this.search).then((res) => {
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
				applyTime: undefined,
				handleTime: undefined,
				operateName: '',
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
		getStatus (status) {
			let str = ''
			switch (status) {
				case 0:
					str = '待处理'
					break;
				case 1:
					str = '退货中'
					break;
				case 2:
					str = '已完成'
					break;
				case 3:
					str = '已拒绝'
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
	},
}
</script>

<style scoped>
</style>