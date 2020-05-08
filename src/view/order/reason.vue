<template>
	<div>
		<tabBar :show="true" :add="handleAdd"></tabBar>
		<TablePage
			:columns="tableList.columns"
			:data="tableList.data1"
			:total="tableList.total"
			v-model="search.pageNum"
			:limit="search.pageSize"
			:handleSearch="handleSearch"
			@change-limit="handleChange"
		></TablePage>
		<Modal
			v-model="modal1"
			:title="update?'修改':'添加'"
			@on-ok="ok"
			@on-cancel="cancel"
			:loading="loading"
		>
			<Form ref="formReason" :model="formReason" :rules="ruleInline" label-colon :label-width="120">
				<FormItem prop="name" label="原因类型">
					<Input v-model="formReason.name" />
				</FormItem>
				<FormItem prop="sort" label="排序">
					<InputNumber :min="0" v-model="formReason.sort" />
				</FormItem>
				<FormItem prop="status" label="是否启用">
					<i-switch v-model="formReason.status" :true-value="1" :false-value="0" />
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>
<script>
import { setObj } from '../../libs/tools'
import { ReturnReasonList, ReturnReasonAdd, ReturnReasonUpdate, returnReasonDelete } from '../../api/reason'
export default {
	data () {
		return {
			loading: true,
			modal1: false,
			update: false,
			search: {
				pageNum: 1,
				pageSize: 10
			},
			tableList: {
				columns: [
					{
						title: '编号',
						key: 'id',
						align: 'center'
					},
					{
						title: '原因类型',
						key: 'name',
						align: 'center'
					},
					{
						title: '排序',
						key: 'sort',
						align: 'center'
					},
					{
						title: '是否可用',
						key: 'status',
						align: 'center',
						render: (h, params) => {
							return h('i-switch', {
								props: {
									value: params.row.status,
									size: "large",
									trueValue: 1,
									falseValue: 0
								},
								on: {
									'on-change': (off) => {
										let data = {
											status: off
										}
										ReturnReasonUpdate(params.row.id, data).then((res) => {
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
						title: '添加时间',
						key: 'createTime',
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
											this.update = true;
											this.modal1 = true;
											this.formReason = setObj(params.row,this.formReason)
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
											returnReasonDelete(params.row.id).then((res) => {
												this.$Message.success('删除成功')
												if(this.tableList.data1.length !==1){
													this.handleSearch('page')
												}else{
													this.handleSearch()
												}
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
				data1: [],
				total: 0
			},
			formReason: {
				id: null,
				sort: 0,
				name: '',
				status: 0
			},
			ruleInline: {
				name: [
					{
						required: true, message: '请输入原因类型', trigger: 'blur,change'
					},
					{ type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur,change' },
				],
				sort: [
					{
						required: true, type: 'number', message: '请输入展示顺序', trigger: 'blur,change'
					},
				],
			}
		}
	},
	methods: {
		handleSearch (off) {
			if (off !== 'page') {
				this.search.pageNum = 1
			}
			ReturnReasonList(this.search).then((res) => {
				console.log(res)
				this.tableList.total = res.data.total;
				this.tableList.data1 = res.data.data

			}).catch((err) => {
			});
		},
		handleChange (limit) {
			this.search.pageSize = limit
			this.handleSearch();
		},
		handleAdd () {
			this.update = false;
			this.modal1 = true;
		},
		ok () {
			this.$refs.formReason.validate((valid) => {
				if (valid) {
					if (this.update) {
						ReturnReasonUpdate(this.formReason.id, this.formReason).then((res) => {
							this.$Message.success('修改成功')
							this.modal1 = false;
							this.handleSearch('page')
						}).catch((err) => {
							this.loading = false
							this.$nextTick(() => {
								this.loading = true
							})
						});
					} else {
						ReturnReasonAdd(this.formReason).then((res) => {
							this.$Message.success('添加成功')
                            this.modal1 = false;
                            this.handleSearch()
						}).catch((err) => {
							
							this.loading = false
							this.$nextTick(() => {
								this.loading = true
							})
						});
					}

				} else {
					this.loading = false
					this.$nextTick(() => {
						this.loading = true
					})
				}
			})
		},
		cancel () {
			this.formReason.name = '';
			this.formReason.sort = 0
		},

	},
	created () {
		this.handleSearch()
	},
}
</script>

<style scoped>
</style>