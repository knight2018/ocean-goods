<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<div>
					<span>优惠券名称：</span>
					<Input
						style="width:200px;"
						v-model="search.couponName"
						@on-enter="handleSearch"
						placeholder="请输入优惠券名称"
					/>
				</div>
				<div class="mg-30">
					<span>优惠券类型：</span>
					<Select v-model="search.type" style="width:220px" clearable placeholder="请选择优惠券类型（默认全部）">
						<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
				<div class="mg-30">
					<span>品类搜索：</span>
					<Select
						v-model="search.category"
						style="width:220px"
						clearable
						filterable
						placeholder="请选择品类搜索（默认全部）"
					>
						<Option v-for="item in categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
			</div>
		</Search>
	</div>
</template>
<script>
import { categorySetting, couponDel } from '../../../api/coupon'
export default {
	name: 'CouponSearch',
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		handleSearch: {

		},
		dataLength: {
			type: Number,
			default:0
		}
	},
	data () {
		return {
			search: {
				couponName: '',
				type: null,
				category: null
			},
			typeList: [
				{
					value: 1,
					label: '立减'
				},
				{
					value: 2,
					label: '满减'
				},
				{
					value: 3,
					label: '折扣'
				},
			],
			categoryList: [],
			columns: [
				{
					title: '编号',
					key: 'id',
					align: 'center'
				},
				{
					title: '优惠券名称',
					key: 'name',
					align: 'center'
				},
				{
					title: '金额设置',
					key: 'amountSettingName',
					align: 'center'
				},
				{
					title: '品类设置',
					key: 'categorySettingName',
					align: 'center'
				},
				{
					title: '有效期',
					key: 'days',
					tooltip: true,
					align: 'center',
					render: (h, params) => {
						return h('span', {

							//  props:{
							// 	 content: params.row.timeType ===1?`${params.row.startTime}-${params.row.endTime}`:params.row.days
							//  }
						}, params.row.timeType === 1 ? `${params.row.startTime}-${params.row.endTime}` : params.row.days)
					}
				},
				{
					title: '创建时间',
					key: 'createTime',
					tooltip: true,
					align: 'center'
				},
				{
					title: '创建人',
					key: 'creatorName',
					align: 'center'
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
										let newObj = JSON.parse(JSON.stringify(params.row))
										this.$router.push({
											name: 'couponAdd',
											query: {
												obj: JSON.stringify(newObj)
											}
										})
									}
								}
							}, '编辑'),
							h('i-button', {
								style: {
									marginLeft: '15px'
								},
								props: {
									type: "error"
								},
								on: {
									click: () => {
										couponDel(params.row.id).then((res) => {
											this.$Message.success('删除成功')
											if (this.dataLength !== 1) {
												this.handleSearch('page')
											} else {
												this.handleSearch()
											}
										}).catch((err) => {

										});
									}
								}
							}, '删除')
						])
					}
				}
			]
		}
	},
	methods: {
		handleClear () {
			this.search = {
				couponName: '',
				type: null,
				category: null
			}
			this.handleSearch()
		},
		handleAdd () {
			this.$router.push('/couponAdd')
		}
	},
	mounted () {
		let params = {
			name: '',
			pageNum: 1,
			pageSize: 1000
		}
		categorySetting(params).then((res) => {
			console.log(res)
			this.categoryList = res.data.data.map(item => {
				return {
					value: item.id,
					label: item.name
				}
			})
		}).catch((err) => {

		});
	}
}
</script>

<style scoped>
</style>