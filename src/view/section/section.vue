<template>
	<div style="position:relative">
		<Tabs v-model="index" class="tab-flex">
			<TabPane v-for="(item,index) in titleList" :key="index" :label="item.name" :name="index+''">
				<tabBar :show="true" :add="handleAdd"></tabBar>
				<TablePage
					:columns="tableList.columns"
					:data="tableList.data1"
					:total="tableList.total"
					v-model="search.page"
					:limit="search.limit"
					:handleSearch="handleSearch"
				></TablePage>
			</TabPane>
		</Tabs>

		<Button type="primary" class="btn-position" @click="handleMoadl">更改栏目名称</Button>
		<Modal v-model="modal1" title="修改栏目名称" :loading="loading" @on-ok="ok" @on-cancel="cancel">
			<div>
				<span>请输入栏目名称:</span>
				<Input v-model="titleModal.name" style="width: 300px" :maxlength="4" />
			</div>
			<div class="mg-tp">
				<span>一级分类：</span>
				<Select v-model="titleModal.firstCategoryId" style="width:150px">
					<Option v-for="item in levelOne" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<span class="mg-lf">二级分类：</span>
				<Select v-model="titleModal.secondCategoryId" style="width:150px" clearable>
					<Option v-for="item in levelTwo" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>
		</Modal>
	</div>
</template>
<script>
import { ListAll, columnUpadte, productList, productUpdate } from '../../api/section'
import { setObj } from '../../libs/tools'
import { productCategoryList } from '../../api/data'
export default {
	data () {
		return {
			index: '0',
			modal1: false,
			search: {
				page: 1,
				limit: 10
			},
			title: '',
			loading: true,
			titleList: [],
			titleModal: {
				name: '',
				firstCategoryId: 0,
				secondCategoryId: 0
			},
			levelOne: [],
			levelTwo: [],
			tableList: {
				columns: [
					{
						title: 'No.',
						key: 'id',
						align: 'center'
					},
					{
						title: '展示商品',
						key: 'productSn',
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
									width: '100px',
									height: '80px',
									padding: '10px 0'
								}
							})
						}
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
											columnCategoryId: params.row.columnCategoryId,
											creater: localStorage.userId,
											showStatus: off
										}
										productUpdate(params.row.id, data).then((res) => {
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
												name: '/sectionAdd',
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
												columnCategoryId: params.row.columnCategoryId,
												creater: localStorage.userId,
												deleteStatus: 0
											}
											productUpdate(params.row.id, data).then((res) => {
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
					}
				],
				data1: [],
				total: 0,
			}
		}
	},
	methods: {
		handleSearch (off) {
			if (off !== 'page') {
				this.search.page = 1
			}

			productList(this.titleList[this.index].id).then((res) => {
				this.tableList.data1 = res.data.data
				console.log(this.tableList.data1)
			}).catch((err) => {

			});
		},
		handleMoadl () {
			this.modal1 = true
			this.title = this.titleList[this.index];
		},
		ok () {
			if (this.titleModal.name) {
				if (this.titleModal.firstCategoryId) {
					columnUpadte(this.titleList[this.index].id, this.titleModal).then((res) => {
						this.$Message.success('修改成功')
						this.modal1 = false;
						this.ListAll();
					}).catch((err) => {
						this.loading = false
						this.$nextTick(() => {
							this.loading = true
						})
					});
				} else {
					this.loading = false
					this.$nextTick(() => {
						this.loading = true
					})
					this.$Message.warning('一级分类不允许为空')
				}
			} else {
				this.loading = false
				this.$nextTick(() => {
					this.loading = true
				})
				this.$Message.warning('栏目名称不允许为空')
			}
		},
		cancel () {
			this.title = this.titleList[this.index];
		},
		handleAdd () {
			this.$router.push({
				name: '/sectionAdd',
				query: {
					id: this.titleList[this.index].id
				}
			})
		},
		getList (id) {
			productCategoryList({ parentId: id, pageNum: 1, pageSize: 1000 }).then((res) => {
				let list = []
				res.data.data.forEach(item => {
					list.push({
						value: item.categoryId,
						label: item.categoryName
					})
				})
				if (id === 0) {
					this.levelOne = list
				} else {
					this.levelTwo = list
				}
			}).catch((err) => {

			});
		},
		ListAll (off) {
			ListAll().then((res) => {
				this.titleList = res.data.data
				if (off) {
					this.titleModal = setObj(this.titleList[0], this.titleModal)
					this.handleSearch()
				}
			}).catch((err) => {

			});
		}
	},
	computed: {
		getLeval () {
			return this.titleModal.firstCategoryId
		}
	},
	watch: {
		getLeval: {
			handler (newval) {
				this.getList(newval)
			}
		},
		index (newval) {
			this.titleModal = setObj(this.titleList[newval], this.titleModal)
			this.handleSearch();
		}
	},
	created () {
		this.ListAll(true)
		this.getList(0)
	}
}
</script>

<style>
.ivu-tabs-nav-container {
	font-size: 20px !important;
}
.ivu-tabs-tab {
	padding-left: 30px !important;
	padding-right: 30px !important;
}
.btn-position {
	position: absolute;
	top: 5px;
	left: 500px;
}
</style>