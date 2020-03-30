<template>
	<div class="modal-wrap" @click="handleShow" v-if="modal1">
		<div @click.stop="handleNull">
			<Scroll class="modal-box" :height="850">
				<div class="modal-title">
					<span>添加商品</span>
				</div>
				<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
					<div>
						<span>商品名称：</span>
						<Input
							style="width:200px;"
							v-model="search.name"
							@on-enter="handleSearch"
							placeholder="请输入商品名称"
						/>
					</div>
					<div class="flex mg-tp">
						<div>
							<span>一级分类：</span>
							<Select
								v-model="search.firstCategoryId"
								style="width:200px"
								clearable
								@on-change="handleIdchange"
							>
								<Option v-for="item in leaveOne" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</div>
						<div class="mg-30">
							<span>二级分类：</span>
							<Select v-model="search.secondCategoryId" style="width:200px" clearable>
								<Option v-for="item in leaveTwo" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</div>
					</div>
				</Search>
				<div class="shopping-box">
					<span>选中商品:</span>
					<div class="shopping-flex" v-show="row.productName">
						<img :src="row.albumPics" class="shopping-img" />
						<div class="content">
							<p>{{row.productName}}</p>
							<p>{{row.price}}</p>
						</div>
					</div>
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
import { productCategoryList } from '../../../api/data'
import { productList2, productItem } from '../../../api/shop'
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
				name: '',
				firstCategoryId: '',
				secondCategoryId: '',
				limit: 5,
				page: 1
			},
			row: {
				productName: '',
				albumPics: '',
				price: ''
			},
			leaveOne: [],
			leaveTwo: [],
			tableList: {
				columns: [
					{
						title: '商品名称',
						key: 'productName',
						align: 'center'
					},
					{
						title: '商品图片',
						key: 'albumPics',
						align: 'center',
						render: (h, params) => {
							return h('img', {
								attrs: {
									src: params.row.albumPics,
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
						title: '商品价格',
						key: 'price',
						align: 'center'
					}
				],
				data1: [
					{
						id: 2,
						productName: '你猜',
						price: 888,
						albumPics: 'http://haiyang-admin.oss-cn-shenzhen.aliyuncs.com/admin/15765534010982.jpg'
					}
				],
				total: 0
			},
			statusList: []
		}
	},

	methods: {
		handleIdchange (val) {
			this.search.secondCategoryId = 0
			this.getList(val)
		},
		handleShow () {
			this.modal1 = !this.modal1
		},
		handleNull () {

		},
		handleSearch (off) {
			this.loading = true
			if (off !== 'page') {
				this.search.page = 1
			}
			let productName = this.search.name,
				pageNum = this.search.page,
				pageSize = this.search.limit;
			let { firstCategoryId, secondCategoryId } = this.search
			productList2({ productName, firstCategoryId, secondCategoryId, pageNum, pageSize }).then((res) => {
				this.tableList.total = res.data.total;
				res.data.data.some(item=>{
					if(item.productSn === this.productSn){
						item._highlight= true
						return 
					}
				})
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
				name: '',
				firstCategoryId: 0,
				secondCategoryId: 0,
				limit: 5,
				page: 1
			}
		},
		getList (id) {
			productCategoryList({ parentId: id, pageNum: 1, pageSize: 1000 }).then((res) => {
				console.log(res)
				let list = []
				res.data.data.forEach(item => {
					list.push({
						value: item.categoryId,
						label: item.categoryName
					})
				})
				if (id === 0) {
					this.leaveOne = list
				} else {
					this.leaveTwo = list
				}
			}).catch((err) => {

			});
		},
		handleSure () {

			if (this.row.productSn) {
				let select = {
					value: this.row.productSn,
					label: this.row.productName
				}
				this.modal1 = false;
				this.$emit('on-change', select)
			} else {
				this.$Message.error('请选择商品')
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
				productItem(newVal).then((res) => {
					this.row = res.data.data
				}).catch((err) => {

				});
			}

		}
	},
	created () {
		this.getList(0)
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