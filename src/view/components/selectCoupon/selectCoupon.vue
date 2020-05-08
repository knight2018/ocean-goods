<template>
	<div class="modal-wrap" @click="handleShow" v-if="modal1">
		<div @click.stop="handleNull">
			<Scroll class="modal-box" :height="850">
				<div class="modal-title">
					<span>添加优惠券</span>
				</div>
				<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
					<div>
						<span>优惠券名称：</span>
						<Input
							style="width:200px;"
							v-model="search.couponName"
							@on-enter="handleSearch"
							placeholder="请输入优惠券名称："
						/>
					</div>
					<div class="flex mg-tp">
						<div>
							<span>优惠券类型:</span>
							<Select v-model="search.type" style="width:200px" clearable>
								<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</div>
					</div>
					<div class="flex mg-tp">
						<div>
							<span>优惠券品类:</span>
							<Select v-model="search.category" style="width:200px" clearable>
								<Option v-for="item in categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</div>
					</div>
				</Search>
				<div class="shopping-box">
					<span>选中优惠券:</span>
                    <span style="margin-left: 15px" v-show="row.name">{{row.name}}</span>
					
				</div>
				<TablePage
					:columns="tableList.columns"
					:data="tableList.data1"
					:total="tableList.total"
					v-model="search.page"
					:limit="search.limit"
					:handleSearch="handleSearch"
					@change-limit="handleChange"
					:highlight="true"
					@get-row="getRow"
					style="margin-top: 20px;"
				></TablePage>
				<Button type="primary" style="margin-top:30px" @click="handleSure">确定</Button>
			</Scroll>
		</div>
	</div>
</template>
<script>
import { categorySettingAll, couponList } from '../../../api/coupon'
export default {
	name: 'selectCommodity',
	props: {
		value: {
			type: Boolean,
			default: false
		},
		productSn: {
			type: Number,
			default: null
		}
	},
	data () {
		return {
			modal1: this.value,
			loading: false,
			search: {
				couponName: '',
				type: '',
				category: '',
				pageSize: 5,
				pageNum: 1
			},
			row: {
				productName: ''
			},
			tableList: {
				columns: [
					{
						title: 'No.',
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
					}
				],
				data1: [],
				total: 0
			},
			categoryList: [],
			typeList: [{
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
			}]
		}
	},

	methods: {
		handleShow () {
			this.modal1 = !this.modal1
		},
		handleNull () {
            return false
		},
		handleSearch (off) {
			this.loading = true
			if (off !== 'page') {
				this.search.pageNum = 1
			}
			couponList(this.search).then((res) => {
				this.tableList.total = res.data.total;
				res.data.data.some(item => {
					if (item.productSn === this.productSn) {
						item._highlight = true
						return
					}
                })
                console.log(res.data.data)
				this.tableList.data1 = res.data.data;
				this.loading = false
			}).catch((err) => {
				this.loading = false
			});
		},
		handleChange (limit) {
			this.search.limit = limit
			this.handleSearch();
		},
		getRow (row) {
			console.log(row)
			this.row = row
		},
		handleClear () {
			this.loading = false
			this.search = {
				couponName: '',
				type: '',
				category: '',
				pageSize: 5,
				pageNum: 1
			}
		},
		getList () {
			categorySettingAll().then((res) => {
				console.log('zheshires', res)
				this.categoryList = res.data.data.map(item => {
					return {
						value: item.id,
						label: item.name
					}
				})
			}).catch((err) => {

			});
		},
		handleSure () {
			if (this.row.id) {
				let select = {
					value: this.row.id,
					label: this.row.name
				}
				this.modal1 = false;
				this.$emit('on-change', select)
			} else {
				this.$Message.error('请选择优惠券')
			}

		}
	},
	watch: {
		value (newval) {
			this.modal1 = newval
		},
		modal1 (newval) {
			this.$emit('input', newval)
		},
		productSn (newVal) {
			if (newVal) {
				// productItem(newVal).then((res) => {
				// 	this.row = res.data.data
				// }).catch((err) => {

				// });
			}

		}
	},
	created () {
		this.getList()
		this.handleSearch()
	}
}
</script>

<style scoped>
.modal-wrap {
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: 999;
	background-color: rgba(55, 55, 55, 0.6);
}
.modal-box {
	width: 1000px;
	padding: 30px;
	background-color: white;
	font-size: 14px;
}
.modal-title {
	padding-bottom: 14px;
	border-bottom: 1px solid #e5e5e5;
}
.shopping-box {
	margin: 20px auto;
	width: 300px;
}
.shopping-flex {
	display: flex;
}
.shopping-img {
	width: 100px;
	height: 80px;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 20px;
}
</style>