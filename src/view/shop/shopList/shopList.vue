<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<div>
					<span>商品名称：</span>
					<Input
						style="width:200px;"
						v-model="search.productName"
						@on-enter="handleSearch"
						placeholder="请输入商品名称"
					/>
				</div>
				<div class="mg-30">
					<span>商品货号：</span>
					<Input
						style="width:200px;"
						v-model="search.productSn"
						@on-enter="handleSearch"
						placeholder="请输入商品货号"
					/>
				</div>
				<div class="mg-30 flex just">
					<span>商品分类：</span>
					<Cascader filterable :data="attrList" v-model="search.productCategoryId"></Cascader>
				</div>
				<div class="mg-30">
					<span>上架状态：</span>
					<Select
						v-model="search.publishStatus"
						style="width:220px"
						clearable
						placeholder="请选择上架状态（默认全部）"
					>
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
			:getId="getSelect"
		></TablePage>
		<div>
			<Select v-model="delStatus" style="width:220px" clearable placeholder="请选择批量操作">
				<Option v-for="item in delList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<Button style="margin-left: 20px" type="primary" @click="handleBatch">批量操作</Button>
		</div>
		<Modal v-model="modalOff" title="删除数据" :loading="true" @on-ok="asyncOK">
			<p>数据无价，确定要删除数据么</p>
		</Modal>
	</div>
</template>
<script>
import { QueryArray } from '../../../libs/tools'
import { productList, PublishStatus, DeleteStatus } from '../../../api/shop'
import { productCategoryList } from '../../../api/data'
export default {
	data () {
		return {
			modalOff: false,
			search: {
				productCategoryId: undefined,
				productName: '',
				publishStatus: undefined,
				productSn: '',
				page: 1,
				limit: 10
			},
			idList: [],
			delid: [],
			statusList: [
				{
					value: 0,
					label: '下架'
				},
				{
					value: 1,
					label: '上架',
				}
			],
			delStatus: null,
			delList: [
				{
					value: 1,
					label: '删除'
				},
				{
					value: 2,
					label: '下架',
				},
				{
					value: 3,
					label: '上架',
				}
			],
			attrList: [],
			loading: false,
			tableList: {
				columns: [
					{
						title: '编号',
						key: 'productId',
						align: 'center',
						type: 'selection'
					},
					{
						title: '商品图片',
						key: 'albumPics',
						align: 'center',
						render: (h, params) => {
							return h('img', {
								attrs: {
									src: params.row.albumPics.split(',')[0]
								},
								style: {
									width: '100px',
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
						key: 'selectType',
						align: 'center',
						render: (h, params) => {
							return h('div', {}, [
								h('p', {}, `价格：${params.row.price}`),
								h('p', {
									style: {
										marginTop: '10px'
									}
								}, `货号：${params.row.productSn}`)
							])
						}
					},
					{
						title: '标签',
						key: 'publishStatus',
						align: 'center',
						render: (h, params) => {
							return h('i-switch', {
								props: {
									value: params.row.publishStatus,
									size: "large",
									trueValue: 1,
									falseValue: 0
								},
								on: {
									'on-change': (off) => {
										let status = 'down'
										if (off === 1) {
											status = 'up'
										}
										this.handleStatus([params.row.productId], status)

									}
								},
								scopedSlots: {
									open: () => h("span", "上架"),
									close: () => h("span", "下架")
								}
							})
						}
					},
					{
						title: 'SKU库存',
						key: 'inputList',
						align: 'center',
						tooltip: true
					},
					{
						title: '销量',
						key: 'sale',
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
											let obj = QueryArray(newObj.productCategoryId, this.attrList)
											console.log(obj)
											newObj.productCategoryId = [this.attrList[obj.parentIndex].value, newObj.productCategoryId + '']
											this.$router.push({
												name: '/shopAdd',
												query: {
													obj: JSON.stringify(newObj),
													id: params.row.productId
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
											this.delId = params.row.attributeId;
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
		}
	},
	methods: {
		handleAdd () {
			this.$router.push({
				name: '/shopAdd'
			})
		},
		handleBatch () {
			if (this.delStatus && this.idList.length) {
				if (this.delStatus === 1) {
					this.handleDel(this.idList)
				} else if (this.delStatus === 2) {
					this.handleStatus(this.idList)
				} else if (this.delStatus === 3) {
					this.handleStatus(this.idList, 'up')
				}
				this.idList = []
			} else {
				this.$Message.warning('请选择批量操作状态')
			}
		},
		getSelect (id) {
			console.log(id)
			let list = []
			id.forEach(item => {
				list.push(item.productId)
			})
			this.idList = list
		},
		handleClear () {
			this.loading = false;
			this.search = {
				productCategoryId: undefined,
				productName: '',
				publishStatus: undefined,
				page: 1,
				limit: 10
			}
			this.handleSearch();
		},
		handleStatus (id, off) {
			if (!Array.isArray(id)) {
				return
			}
			let publishStatus = 0
			if (off === 'up') {
				publishStatus = 1
			}
			let productIds = id;
			PublishStatus({ productIds, publishStatus }).then((res) => {
				this.$Message.success('修改成功')
				this.handleSearch()
			}).catch((err) => {

			});

		},
		handleDel (id) {
			DeleteStatus(id).then((res) => {
				this.$Message.success('删除成功')
				this.handleSearch()
			}).catch((err) => {

			});
		},
		handleSearch (off) {
			this.loading = true;
			if (off !== 'page') {
				this.search.page = 1
			}
			let { productCategoryId, productName, publishStatus, productSn } = this.search
			let pageNum = this.search.page,
				pageSize = this.search.limit;
			try {
				productCategoryId = productCategoryId[1]
			} catch (err) {
				productCategoryId = null
			}

			productList({ productCategoryId, productName, publishStatus, productSn, pageNum, pageSize }).then((res) => {
				console.log(res)
				this.tableList.data1 = res.data.data
				this.tableList.total = res.data.total
				this.loading = false
			}).catch((err) => {
				this.loading = false
			});
		},
		handleChange (limit) {
			this.search.limit = limit
			this.handleSearch()
		},
		asyncOK () {
			this.handleDel(this.delid)
			this.modalOff = false
		}
	},
	created () {
		this.handleSearch()
		productCategoryList({ parentId: 0, pageNum: 1, pageSize: 1000 }).then((res) => {
			console.log(res)
			let list = []
			res.data.data.forEach((item, index) => {
				list.push({
					value: item.categoryId + '',
					label: item.categoryName,
					children: []
				})
				productCategoryList({ parentId: item.categoryId, pageNum: 1, pageSize: 1000 }).then((reschild) => {
					reschild.data.data.forEach(items => {
						list[index].children.push({
							value: items.categoryId + '',
							label: items.categoryName,
						})
					})
					this.attrList = list;
				}).catch((err) => {

				});
			})
		}).catch((err) => {

		});
	}
}
</script>

<style scoped>
.just {
	align-items: flex-start;
}
</style>