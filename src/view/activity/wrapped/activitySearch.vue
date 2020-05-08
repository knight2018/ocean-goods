<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<div>
					<span>活动名称：</span>
					<Input
						style="width:200px;"
						v-model="search.name"
						@on-enter="handleSearch"
						placeholder="请输入活动名称"
					/>
				</div>
				<div class="mg-30">
					<span>活动状态：</span>
					<Select v-model="search.status" style="width:220px" clearable placeholder="请选择活动状态（默认全部）">
						<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
			</div>
		</Search>
	</div>
</template>
<script>
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
				name: '',
				status: null
			},
			columns: [
				{
					title: '编号',
					key: 'id',
					align: 'center'
				},
				{
					title: '活动名称',
					key: 'name',
					align: 'center'
				},
				{
					title: '活动有效期',
					key: 'endTime',
					align: 'center'
				},
				{
					title: '活动状态',
					key: 'status',
					align: 'center'
				},
				{
					title: '创建时间',
					key: 'createTime',
					align: 'center',

				},
				{
					title: '创建人',
					key: 'creatorName',
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
										this.$router.push({
											name: 'activityAdd',
											query: {
												id: params.row.id
											}
										})
									}
								}
							}, '编辑')
						])
					}
				}
			],
			typeList: [
				{
					value: 1,
					label: '上线'
				},
				{
					value: 2,
					label: '下线'
				},
				{
					value: 0,
					label: '未开始'
				}
			]
		}
	},
	methods: {
		handleClear () {
			this.search = {
				name: '',
				status: null
			}
			this.handleSearch()
		},
		handleAdd () {
			this.$router.push('/activityAdd')
		}
	}
}
</script>

<style>
</style>    