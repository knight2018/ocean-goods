<template>
	<div class="detalis-box">
		<Card style="width: 80%">
			<div class="title">
				<span>退货商品</span>
				<span class="mg-lf-30">订单状态：{{orderStatus}}</span>
			</div>
			<Table border class="mg-tp" :columns="columns" :data="[message]"></Table>
		</Card>
		<Card style="width: 80%" class="mg-tp">
			<span>服务单信息</span>
			<ul class="ui-box mg-tp">
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">服务单号</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.id}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">申请状态</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{getStatus(message.status)}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">订单编号</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.orderSn}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">申请时间</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.applyTime}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">用户账号</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.customerSn}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">联系人</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.returnName}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">联系电话</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.returnPhone}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">退货原因</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.reason}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">问题描述</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.description}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">凭证图片</p>
					</div>
					<div class="li-right li-box">
						<img class="padding" v-for="(item,index) in message.proofPics" :key="index" :src="item" />
					</div>
				</li>
			</ul>
			<ul class="ui-box mg-tp">
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">订单金额</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.productRealPrice}}</p>
					</div>
				</li>
				<!-- <li class="li-box">
					<div class="li-left li-box">
						<p class="padding">确认退款金额</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">
							￥
							<InputNumber :disabled="message.status!==0" :min="0" v-model="price" style="width: 200px" />
						</p>
					</div>
				</li>-->
				<li class="li-box" v-if="message.status===1 && message.status===0">
					<div class="li-left li-box">
						<p class="padding">收货人姓名</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.receiveName}}</p>
					</div>
				</li>
				<li class="li-box" v-if="message.status===1 && message.status===0">
					<div class="li-left li-box">
						<p class="padding">所在区域</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.productRealPrice}}</p>
					</div>
				</li>
				<li class="li-box" v-if="message.status===1 && message.status===0">
					<div class="li-left li-box">
						<p class="padding">详细地址</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.productRealPrice}}</p>
					</div>
				</li>
				<li class="li-box" v-if="message.status===1 && message.status===0">
					<div class="li-left li-box">
						<p class="padding">联系电话</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.returnPhone}}</p>
					</div>
				</li>
			</ul>
			<ul class="ui-box mg-tp" v-if="message.status!==0">
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">处理人员</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.operateName}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">处理时间</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.handleTime}}</p>
					</div>
				</li>
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">处理备注</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">{{message.operateNote}}</p>
					</div>
				</li>
			</ul>
			<ul class="ui-box mg-tp" v-if="message.status===2 && message.status===3">
				<li class="li-box">
					<div class="li-left li-box">
						<p class="padding">处理备注</p>
					</div>
					<div class="li-right li-box">
						<p class="padding">
							<Input v-model="remark" style="width: 200px" />
						</p>
					</div>
				</li>
			</ul>
			<div class="mg-tp flex" v-if="message.status===0">
				<Button type="primary" @click="handleMoadl('sure')">确认退货</Button>
				<Button type="error" class="mg-lf" @click="handleMoadl('none')">拒绝退货</Button>
			</div>
			<div class="mg-tp flex" v-if="message.status===1">
				<Button type="primary" @click="handleRefund">确认收货</Button>
			</div>
		</Card>
		<Modal v-model="modal1" title="退款处理" @on-ok="ok" @on-cancel="cancel">
			<div>
				<span>处理方式： 退款</span>
			</div>
			<div class="mg-tp">
				<span>处理结果：</span>
				<RadioGroup v-model="off">
					<Radio :label="1">同意退货</Radio>
					<Radio :label="0">拒绝退货</Radio>
				</RadioGroup>
			</div>
			<div class="mg-tp" v-if="off">微信支付方式：会返回到相应的支付渠道（如零钱或银行卡）如果积分或优惠券抵扣：申请维权的订单抵扣积分不会退还</div>
			<div class="mg-tp" v-show="!off">
				<span>驳回理由：</span>
				<Input
					type="textarea"
					v-model="note"
					style="width: 400px"
					:show-word-limit="true"
					:maxlength="100"
				/>
			</div>
		</Modal>
	</div>
</template>
<script>
import { ReturnReasonList, returnApplyRefund, returnApplyRefuse, returnApplyConfirm, ReturnReasonItem } from '../../../api/reason'
import { commodityInformation, getStatus } from '../orderDetalis/columns'
export default {
	data () {
		return {
			columns: commodityInformation,
			price: 0,
			remark: '',
			off: 1,
			modal1: false,
			orderStatus: '',
			note: '',//驳回理由
			message: {

			}
		}
	},
	methods: {
		getStatus (status) {
			let str = ''
			switch (status) {
				case 0:
					str = '待处理'
					break;
				case 1:
					str = '退货中'
					break;
				case 2:
					str = '已完成'
					break;
				case 3:
					str = '已拒绝'
					break;
				default:
					str = '未知'
					break;
			}
			return str
		},
		ok () {
			if (this.off) {
				returnApplyConfirm(this.message.id).then(res => {
					this.$Message.success('已确定退货')
					ReturnReasonItem(this.message.id).then((res) => {
						res.data.data.productAttr = res.data.data.productAttr.split(',')
						this.message = res.data.data
						this.orderStatus = getStatus(res.data.data.orderStatus)
						// this.getList();
					}).catch((err) => {

					});
				})
			} else {
				returnApplyRefuse(this.message.id, this.note).then((res) => {
					this.$Message.success('已拒绝退货')
					ReturnReasonItem(this.message.id).then((res) => {
						res.data.data.productAttr = res.data.data.productAttr.split(',')
						this.message = res.data.data
						this.orderStatus = getStatus(res.data.data.orderStatus)
						// this.getList();
					}).catch((err) => {

					});
				}).catch((err) => {

				});
			}
		},
		cancel () {
			this.note = ''
		},
		handleMoadl (off) {
			if (off === 'sure') {
				this.off = 1
			} else {
				this.off = 0
			}
			this.modal1 = true
		},
		handleRefund () {
			returnApplyRefund(this.message.id).then((res) => {
				this.$Message.success('退款成功')
				ReturnReasonItem(this.message.id).then((res) => {
					res.data.data.productAttr = res.data.data.productAttr.split(',')
					this.message = res.data.data
					this.orderStatus = getStatus(res.data.data.orderStatus)
					// this.getList();
				}).catch((err) => {

				});
			}).catch((err) => {

			});
		},
		// getList () {
		// 	ReturnReasonList({ pageNum: 1, pageSize: 100 }).then((res) => {
		// 		res.data.data.some(item => {
		// 			if (item.id == this.message.reason) {
		// 				this.$set(this.message, 'resonTxt', item.name)
		// 			}
		// 			return true
		// 		})
		// 	}).catch((err) => {
		// 	});
		// }
	},
	mounted () {
		if (this.$route.query.obj) {
			let obj = JSON.parse(this.$route.query.obj)
			obj.productAttr = obj.productAttr.split(',')
			this.message = obj
			console.log(obj)
			this.orderStatus = getStatus(obj.orderStatus)
		} else {
			this.$router.back()
		}
	// this.getList();
	}
}
</script>

<style scoped>
.detalis-box {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.title {
	font-size: 16px;
}
.back {
	background: red;
}
.ui-box {
	list-style: none;
	border: 1px solid #dcdfe6;
}
.li-box {
	display: flex;
	border-bottom: 1px solid #dcdfe6;
}
.li-box:last-child {
	border-bottom: none;
}
.li-left {
	flex: 2;
	background: #f2f6fc;
	border-right: 1px solid #dcdfe6;
}
.li-right {
	flex: 5;
}
.li-box {
	height: 45px;
	line-height: 45px;
}
.padding {
	padding-left: 20px;
}
.flex {
	display: flex;
	justify-content: center;
}
</style>