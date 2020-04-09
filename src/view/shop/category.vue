<template>
	<div>
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
		<Modal v-model="modalOff" title="删除数据" :loading="true" @on-ok="asyncOK">
			<p>数据无价，确定要删除数据么</p>
		</Modal>
	</div>
</template>
<script>
import { productCategoryList, productCategoryUpdate, productCategoryDelete } from '../../api/data'
export default {
	data () {
		return {
			parentId: 0,
			id: null,
			modalOff: false,
			tableList: {
				columns: [
					{
						title: '编号',
						key: 'categoryId',
						align: 'center'
					},
					{
						title: '分类名称',
						key: 'categoryName',
						align: 'center'
					},
					{
						title: '级别',
						key: 'categoryLevel',
						align: 'center'
					},
					{
						title: '商品数量',
						key: 'productCount',
						align: 'center'
					},
					{
						title: '创建时间',
						key: 'createTime',
						align: 'center'
					},
					{
						title: '是否显示',
						key: 'packName',
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
										this.productCategory(params.row.categoryId, data)
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
						title: '排序',
						key: 'sort',
						align: 'center'
					},
					{
						title: '设置',
						key: 'packName',
						align: 'center',
						render: (h, params) => {
							return h('i-button', {
								style: {
									marginLeft: '15px'
								},
								props: {
									disabled: this.parentId !== 0
								},
								on: {
									click: () => {
										this.$router.push({
											name: '/category',
											query: {
												id: params.row.categoryId
											}
										})
									}
								}
							}, '查看下级')
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
											// const { categoryId, categoryName, classify, showStatus, sort, parentId } = params.row
											let obj = JSON.stringify(params.row)
											console.log(params.row)
											this.$router.push({
												name: '/categoryAdd',
												query: {
													// categoryId: categoryId,
													id: params.row.parentId,
													// categoryName,
													// classify,
													// showStatus,
													// sort,
													// parentId
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
											this.id = params.row.categoryId;
											this.modalOff = true
										}
									}
								}, '删除')
							])
						}
					}
				],
				data1: [],
				total: 0
			},
			search: {
				page: 1,
				limit: 10
			}
		}
	},
	methods: {
		handleChange (limit) {
			this.search.limit = limit
			this.handleSearch()
		},
		handleSearch (off) {
			this.loading = true;
			if (off !== 'page') {
				this.search.page = 1
			}
			const parentId = this.parentId,
				pageNum = this.search.page,
				pageSize = this.search.limit;
			productCategoryList({ parentId, pageNum, pageSize }).then((res) => {
				console.log(res)
				this.tableList.data1 = res.data.data
				this.tableList.total = res.data.total
				this.loading = false
			}).catch((err) => {
				this.loading = false
			});
		},
		async productCategory (categoryId, data, off) {
			if (off) {
				productCategoryDelete(categoryId,data).then((res) => {
					this.callback()
					this.handleSearch()
					this.$Message.warning('删除成功')
				}).catch((err) => {

				});
			} else {
				productCategoryUpdate(categoryId, data).then((res) => {
					this.$Message.success('修改成功')
				}).catch((err) => {

				});
			}


		},
		callback () {
			this.modalOff = false;
		},
		asyncOK () {
			let data = {
				categoryStatus: 0,
				showStatus: 0
			}

			this.productCategory(this.id, data, true)
		},
		handleAdd () {
			this.$router.push({
				name: '/categoryAdd',
				query: {
					id: this.parentId
				}
			})
		}
	},
	watch: {
		$route (route) {
			if (this.$route.query.id) {
				this.parentId = this.$route.query.id
			} else {
				this.parentId = 0
			}
			this.handleSearch()
		}
	},
	mounted () {
		if (this.$route.query.id) {
			this.parentId = this.$route.query.id
		} else {
			this.parentId = 0
		}
		
		this.handleSearch()
	}
}
</script>

<style scoped>
</style>