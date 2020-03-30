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
		<Modal v-model="modalOff" title="删除数据" :loading="loading" @on-ok="asyncOK">
			<p>数据无价，确定要删除数据么</p>
		</Modal>
	</div>
</template>
<script>
import { AttriList, AttriUpdate } from '../../../api/attr'
export default {
	data () {
		return {
			id: null,
            loading: true,
            delId: null,
            name: '',
            type: 0,
			tableList: {
				columns: [
					{
						title: '属性id',
						key: 'attributeId',
						align: 'center'
					},
					{
						title: '属性名称',
						key: 'attributeName',
						align: 'center'
					},
					{
						title: '商品类型',
						key: 'attributeCategoryId',
						align: 'center',
						render: (h, params) => {
							return h('div', {}, this.name)
						}
					},
					{
						title: '属性是否可选',
						key: 'selectType',
						align: 'center',
						render: (h, params) => {
							return h('div', {}, this.getType(params.row.selectType))
						}
					},
					{
						title: '属性值的录入方式',
						key: 'inputType',
						align: 'center',
						render: (h, params) => {
							return h('div', {}, params.row.inputType === 0 ? '手工录入' : '从列表选取')
						}
					},
					{
						title: '可选值列表',
						key: 'inputList',
                        align: 'center',
                        tooltip: true
					},
					{
						title: '排序',
						key: 'sort',
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
											let { attributeId, attributeName, selectType, inputType, sort, inputList, attributeCategoryId, handAddStatus } = params.row
											inputList = inputList.replace(/,/g, "\n")
											this.$router.push({
												name: '/attributeAdd',
												query: {
													attributeCategoryId,
													attributeId,
													attributeName,
													selectType,
													inputType,
													sort,
													inputList,
                                                    handAddStatus,
                                                    attributeType: this.type
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
			modalOff: false,
			search: {
				page: 1,
				limit: 10
			}
		}
	},
	methods: {
		handleAdd () {
			this.$router.push({
				name: '/attributeAdd',
				query: {
                    attributeCategoryId: this.id,
                    attributeType: this.type
				}
			})
		},
		asyncOK () {
            this.loading = true
            let data = {
                attributeStatus: 0
            }
            AttriUpdate(this.delId,data).then((res) => {
                this.$Message.warning('删除成功')
                this.handleSearch()
                this.modalOff = false
            }).catch((err) => {
                this.$Message.warning('删除失败')
                this.loading = false
            });
		},
		handleSearch (off) {
			this.loading = true;
			if (off !== 'page') {
				this.search.page = 1
			}
			const attributeCategoryId = this.id,
				attributeType = this.type,
				pageNum = this.page,
				pageSize = this.limit;
			AttriList({ attributeCategoryId, attributeType, pageNum, pageSize }).then((res) => {
				this.tableList.data1 = res.data.data
				this.tableList.total = res.data.total
			}).catch((err) => {

			});
		},
		handleChange (limit) {
			this.search.limit = limit
			if (this.id) {
				this.handleSearch()
			}

		},
		getType (type) {
			if (type === 0) {
				return '唯一'
			} else if (type === 1) {
				return '单选'
			} else if (type === 2) {
				return '多选'
			}
		}
	},
	created () {
		if (this.$route.query.id) {
			this.id = this.$route.query.id
            this.name = this.$route.query.name
            this.type = this.$route.query.type
            this.handleSearch()
		} else {
			this.$router.back();
		}
	}
}
</script>

<style>
</style>