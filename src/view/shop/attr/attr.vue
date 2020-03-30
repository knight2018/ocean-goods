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
		<Modal v-model="addOff" :title="update?'修改类型':'添加类型'" :loading="true" @on-ok="asyncAdd">
			<Form ref="formAttr" :model="formAttr" :rules="ruleInline" label-colon :label-width="100">
				<FormItem prop="attributeCategoryName" label="商品类型">
					<Input v-model="formAttr.attributeCategoryName" style="width:300px" />
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>
<script>
import { productAttributeList, productAttributeAdd, productAttributeUpdate } from '../../../api/data'
export default {
	data () {
		return {
			modalOff: false,
			update: false,
			addOff: false,
			id: null,
			formAttr: {
				attributeCategoryName: ''
			},
			ruleInline: {
				attributeCategoryName: [
					{
						required: true, message: '请输入商品类型', trigger: 'blur,change'
					},
					{ type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur,change' },
				]
			},
			tableList: {
				columns: [
					{
						title: '编号',
						key: 'attributeCategoryId',
						align: 'center'
					},
					{
						title: '类型名称',
						key: 'attributeCategoryName',
						align: 'center'
					},
					{
						title: '属性数量',
						key: 'attributeCount',
						align: 'center'
					},
					{
						title: '参数数量',
						key: 'paramCount',
						align: 'center'
					},
					{
						title: '设置',
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
									props: {
										
									},
									on: {
										click: () => {
											this.$router.push({
												name: '/attribute',
												query: {
                                       id: params.row.attributeCategoryId,
                                       name: params.row.attributeCategoryName,
                                       type: 0
												}
											})
										}
									}
								}, '属性列表'),
								h('i-button', {
									style: {
										marginLeft: '15px'
									},
									props: {
									
									},
									on: {
										click: () => {
											this.$router.push({
												name: '/attribute',
												query: {
                                       id: params.row.attributeCategoryId,
                                       name: params.row.attributeCategoryName,
                                       type: 1
												}
											})
										}
									}
								}, '参数列表')
							])
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
											this.formAttr.attributeCategoryName = params.row.attributeCategoryName;
											this.id = params.row.attributeCategoryId;
											this.addOff = true;
											this.update = true;
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
											this.id = params.row.attributeCategoryId;
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
			const pageNum = this.search.page,
				pageSize = this.search.limit;
			productAttributeList({ pageNum, pageSize }).then((res) => {
				console.log(res)
				this.tableList.data1 = res.data.data
				this.tableList.total = res.data.total
				this.loading = false
			}).catch((err) => {
				this.loading = false
			});
		},
		asyncOK () {
			let data = {
				categoryStatus: 0
			}
			productAttributeUpdate(this.id, data).then((res) => {
				this.$Message.warning('刪除成功')
            this.modalOff = false;
             this.handleSearch()
			}).catch((err) => {
				this.modalOff = false;
			});
		},
		asyncAdd () {
			this.$refs.formAttr.validate((valid) => {
				if (valid) {
					if (this.update) {
						productAttributeUpdate(this.id, this.formAttr).then((res) => {
							this.addOff = false
                     this.$Message.success('修改成功')
                     this.handleSearch()
						}).catch((err) => {
							this.addOff = false
						});
					} else {
						productAttributeAdd(this.formAttr).then((res) => {
                     this.addOff = false
                     this.handleSearch()
							this.$Message.success('添加成功')
						}).catch((err) => {
							this.addOff = false
						});
					}
				} else {
					this.$Message.error('请输入参数')
				}
			})

		},
		handleAdd () {
			this.addOff = true;
			this.update = false;
			this.formAttr.attributeCategoryName = ''
		}
	},
	created (){
		this.handleSearch();
	}
}
</script>

<style>
</style>