<template>
	<div class="detalis-box">
		<Card style="width: 80%">
			<Steps :current="index" :status="error">
				<Step :title="titleList[0]" content="待付款"></Step>
				<Step :title="titleList[1]" content="待发货"></Step>
				<Step :title="titleList[2]" content="已发货"></Step>
				<Step :title="titleList[3]" content="已完成"></Step>
			</Steps>
			<div class="content-warp">
				<div class="content-box">
					<div class="title-wrap">
						<div class="title">
							<Icon type="ios-alert" color="#ee6d6c" :size="25" />
							当前订单状态：{{getStatus(message.status)}}
						</div>
						<div>
							<Button @click="handleDel" v-if="message.status===0">删除订单</Button>
							<Button class="mg-lf" @click="handleDeliver" v-if="message.status===1">确认发货</Button>
							<!-- <Button class="mg-lf" @click="handleRemark" v-if="message.status===1">修改收货人信息</Button> -->
							<!-- <Button class="mg-lf" @click="handleRemark" v-if="message.status!==0">发送站内信</Button> -->
							<Button class="mg-lf" @click="handleRemark">备注订单</Button>
						</div>
					</div>
					<div class="content-item">
						<div class="title">
							<Icon type="ios-bookmark" :size="25" />
							<span>基本信息</span>
						</div>
						<ModelTable :columns="basicInformation" :data="[message]" />
						<ModelTable :columns="basicInformation2" :data="[message]" />
					</div>
					<div class="content-item">
						<div class="title">
							<Icon type="ios-bookmark" :size="25" />
							<span>收货人信息</span>
						</div>
						<ModelTable :columns="consignee" :data="[message]" />
					</div>
					<div class="content-item">
						<div class="title">
							<Icon type="ios-bookmark" :size="25" />
							<span>商品信息</span>
						</div>
						<ModelTable :columns="commodityInformation" :data="message.orderItemList" />
					</div>
					<div class="content-item">
						<div class="title">
							<Icon type="ios-bookmark" :size="25" />
							<span>费用信息</span>
						</div>
						<ModelTable :columns="priceInformation" :data="[message]" />
						<ModelTable :columns="priceInformation2" :data="[message]" />
					</div>
					<div class="content-item">
						<div class="title">
							<Icon type="ios-bookmark" :size="25" />
							<span>操作信息</span>
						</div>
						<ModelTable :columns="operation" :data="message.historyList" />
					</div>
				</div>
			</div>
		</Card>
		<Modal v-model="modal1" title="备注订单" @on-ok="ok" @on-cancel="cancel" :loading="loading">
			<span>操作备注：</span>
			<Input v-model="remark" type="textarea" style="width: 400px" />
		</Modal>
	</div>
</template>
<script>
import { basicInformation, basicInformation2, consignee, commodityInformation, priceInformation, priceInformation2, operation } from './columns'
import ModelTable from '../components/ModelTable'
import { getOrder, orderNote, orderDelivery } from '../../../api/order'
export default {
	components: { ModelTable },
	data () {
		return {
			index: 0,
			modal1: false,
			loading: true,
			titleList: ['进行中', '待进行', '待进行', '待进行'],
			basicInformation: basicInformation,
			basicInformation2: basicInformation2,
			consignee: consignee,
			commodityInformation: commodityInformation,
			priceInformation: priceInformation,
			priceInformation2: priceInformation2,
			operation: operation,
			message: {
				orderItemList: [],
				historyList: []
			},
			error: 'process',
			remark: ''
		}
	},
	methods: {
		getStatus (status) {
			let str = ''
			switch (status) {
				case 0:
					str = '待付款'
					break;
				case 1:
					str = '待发货'
					break;
				case 2:
					str = '已发货'
					break;
				case 3:
					str = '待评价'
					break;
				case 4:
					str = '已评价'
					break;
				case 5:
					str = '已取消'
					break;
				case 6:
					str = '无效订单'
					break;
				default:
					str = '未知'
					break;
			}
			return str
		},
		handleDel () {
			this.$Modal.confirm({
				title: '是否删除订单',
				content: '<p>删除后订单将不可见</p>',
				onOk: () => {
					orderDelete(this.message.id).then((res) => {
						this.$Message.success('删除成功')
						this.handleSearch();
					}).catch((err) => {

					});
				},
				onCancel: () => {

				}
			})

		},
		handleRemark () {
			this.modal1 = true
		},
		handleDeliver () {
			orderDelivery(this.message.id).then((res) => {
				this.$Message.success('发货成功')
				this.handleSearch(this.message.id);
			}).catch((err) => {

			});
		},
		ok () {
			let data = {
				note: this.remark,
				operater: localStorage.userId,
				operaterName: localStorage.userName,
				orderStatus: this.message.status
			}
			orderNote(this.message.id, data).then((res) => {
				this.modal1 = false
				this.$Message.success('备注成功')
				this.handleSearch(this.message.id)
			}).catch((err) => {
				this.loading = false;
				this.$nextTick(() => {
					this.loading = true
				})
			});
		},
		cancel () {

		},
		handleSearch (id) {
			getOrder(id).then((res) => {
				console.log(res)
				this.message = res.data.data	
				if (this.message.status === 5) {
					this.error = 'error'
					this.titleList[0] = '已关闭'
				} else {
					this.index = this.message.status
					let titleList = this.titleList
					for (let i = 0; i < this.index; i++) {
						titleList[i] = '已完成'
					}
					titleList[this.index] = '进行中'
					this.titleList = titleList;
				}

			}).catch((err) => {

			});
		}
	},
	mounted () {
		if (this.$route.query.id) {
			this.handleSearch(this.$route.query.id)
		} else {
			this.$router.back()
		}
	}
}
</script>

<style scoped>
.detalis-box {
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.ivu-steps-item {
	width: 25%;
	font-size: 16px;
}
.content-warp {
	padding: 0 30px;
}
.content-box {
	margin-top: 30px;
	border: 1px solid #f5f6fa;
}
.title-wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 70px;
	padding: 0 30px;
	background: #f2f6fc;
}
.title {
	font-size: 16px;
	color: #ee6d6c;
}
.content-item {
	padding: 0 30px;
	margin-top: 25px;
}
.content-item .title {
	font-size: 14px;
	color: #666;
	margin-bottom: 25px;
}
</style>