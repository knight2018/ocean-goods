<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<div>
					<span>用户姓名：</span>
					<Input
						style="width:200px;"
						v-model="search.name"
						@on-enter="handleSearch"
						placeholder="请输入用户姓名："
					/>
				</div>
			</div>
		</Search>
	</div>
</template>
<script>
import { a } from '../../../api/data'
export default {
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		handleSearch: {

		},
	},
	data () {
		return {
			search: {
				name: ''
			},
			add: true,
			columns: [
				{
					title: '用户ID',
					key: 'id',
					align: 'center'
				},
				{
					title: '用户微信',
					key: 'nickName',
					align: 'center'
				},
				{
					title: '用户手机',
					key: 'mobile',
					align: 'center'
				},
				{
					title: '上次消费时间',
					key: 'latestConsumeTime',
					align: 'center',
					render: (h, params) => {
						return h('div', {}, params.row.latestConsumeTime?a(new Date(params.row.latestConsumeTime),true):'尚未消费')
					}
				},
				{
					title: '历史订单数量',
					key: 'historyOrderNum',
					align: 'center',

				},
				{
					title: '详情',
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
											name: 'userInfo',
											query: {
												id: params.row.id
											}
										})
									}
								}
							}, '详情')
						])
					}
				}
			],
		}
	},
	methods: {
		handleClear () {
			this.search = {
				name: '',

			}
			this.handleSearch()
		},
	}
}
</script>

<style>
</style>