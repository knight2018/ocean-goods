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
					<span>展示状态：</span>
					<Select v-model="search.status" style="width:200px" clearable>
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
import { CarouselList, carouselUpdate } from '../../api/banner'
export default {
	data () {
		return {
			loading: false,
			search: {
				name: '',
				status: undefined,
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
						title: '展示顺序',
						key: 'sort',
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
						key: 'productSn',
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
										carouselUpdate(params.row.id, data).then((res) => {
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
												name: '/bannerAdd',
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
											carouselStatus: 0
										}
										carouselUpdate(params.row.id, data).then((res) => {
											this.$Message.success('删除成功')
											this.handleSearch()
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
					{
						packName: 1
					}
				],
				total: 0
			},
			modalOff: false,
			changeOff: false,
			statusList: [
				{
					value: 1,
					label: '上线'
				},
				{
					value: 0,
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
			let name = this.search.name, showStatus = this.search.status, pageNum = this.search.page, pageSize = this.search.limit;
			CarouselList({ name, showStatus, pageNum, pageSize }).then((res) => {
				console.log(res)
				this.tableList.total = res.data.total;
				this.tableList.data1 = res.data.data
				this.loading = false
			}).catch((err) => {
				this.loading = false
			});
		},
		handleClear () {
			this.loading = false;
			this.search = {
				name: '',
				status: undefined,
				limit: 10,
				page: 1
			}
			this.handleSearch()
		},
		handleChange (limit) {
			this.search.limit = limit
			this.handleSearch();
		},
		handleAdd () {
			this.$router.push({
				name: '/bannerAdd'
			})
		}
	},
	created(){
		this.handleSearch()
	}
}
</script>

<style scoped>
.box {
	justify-content: center;
}
</style>