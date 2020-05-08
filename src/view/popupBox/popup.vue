<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<div>
					<span>输入搜索：</span>
					<Input
						style="width:200px;"
						v-model="search.name"
						@on-enter="handleSearch"
						placeholder="请输入轮播标题"
					/>
				</div>
				<div class="mg-30">
					<span>展示位置：</span>
					<Select v-model="search.position" style="width:220px" clearable placeholder="请选择展示位置（默认全部）">
						<Option v-for="item in placeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
				<div class="mg-30">
					<span>展示状态：</span>
					<Select v-model="search.showStatus" style="width:220px" clearable placeholder="请选择展示状态（默认全部）">
						<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
			</div>
		</Search>
		<tabBar :show="true" :add="handleAdd"></tabBar>
		<TablePage
			:columns="tableList.columns"
			:data="tableList.data1"
			:total="tableList.total"
			v-model="search.page"
			:limit="search.limit"
			:handleSearch="handleSearch"
			@change-limit="handleChange"
		></TablePage>
	</div>
</template>
<script>
import { ElasticLayerList, ElasticLayerUpdate } from '../../api/popup'
export default {
	data () {
		return {
			loading: false,
			search: {
				name: '',
				position: undefined,
				showStatus: undefined,
				limit: 10,
				page: 1
			},
			tableList: {
				columns: [
					{
						title: '名称',
						key: 'name',
						align: 'center'
					},
					{
						title: '缩略图',
						key: 'pic',
						align: 'center',
						render: (h, params) => {
							return h('img', {
								attrs: {
									src: params.row.pic
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
						title: '展示商品',
						key: 'contentId',
						align: 'center'
					},
					{
						title: '创建人',
						key: 'creater',
						align: 'center'
					},
					{
						title: '创建时间',
						key: 'createTime',
						align: 'center'
					},
					{
						title: '展示状态',
						key: 'showStatus',
						align: 'center',
						render: (h, params) => {
							return h('i-switch', {
								props: {
									value: params.row.showStatus,
									size: "large",
									trueValue: 1,
									falseValue: 0
								},
								on: {
									'on-change': (off) => {
										let data = {
											showStatus: off
										}
										ElasticLayerUpdate(params.row.id, data).then((res) => {
											this.$Message.success('修改成功')
										}).catch((err) => {

										});
									}
								},
								scopedSlots: {
									open: () => h("span", "显示"),
									close: () => h("span", "关闭")
								}
							})
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
											let obj = JSON.stringify(params.row)
											this.$router.push({
												name: '/popupAdd',
												query: {
													obj
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
											let data = {
												layerStatus: 0
											}
											ElasticLayerUpdate(params.row.id, data).then((res) => {
												this.$Message.success('删除成功')
												if (this.tableList.data1.length !== 1) {
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
					},
				],
				data1: [
				],
				total: 0
			},
			modalOff: false,
			changeOff: false,
			placeList: [
				{
					value: 1,
					label: '首页弹层'
				},
				// {
				// 	value: 2,
				// 	label: '全部分类'
				// },
				// {
				// 	value: 3,
				// 	label: '购买成功'
				// },
			],
			statusList: [
				{
					value: 1,
					label: '上线'
				},
				{
					value: 2,
					label: '下线'
				},
			]
		}
	},
	methods: {
		handleSearch (off) {
			this.loading = true;
			if (off !== 'page') {
				this.search.page = 1
			}
			const { name, position, showStatus } = this.search;
			let pageNum = this.search.page,
				pageSize = this.search.limit;
			ElasticLayerList({ name, position, showStatus, pageNum, pageSize }).then((res) => {
				this.tableList.total = res.data.total;
				this.tableList.data1 = res.data.data;
			}).catch((err) => {

			});
			setTimeout(() => { this.loading = false }, 1000)
			console.log(this.search)
		},
		handleClear () {
			this.loading = false;
			this.search = {
				name: '',
				position: undefined,
				showStatus: undefined,
				limit: 10,
				page: 1
			}
		},
		handleChange (limit) {
			this.search.limit = limit
			this.handleSearch()
		},
		handleAdd () {
			this.$router.push({
				name: '/popupAdd'
			})
		}
	},
	mounted () {
		this.handleSearch()
	}
}
</script>

<style scoped>
.box {
	justify-content: center;
}
</style>