<template>
	<div>
		<Card :bordered="false">
			<span style="font-size: 18px;font-weight: 600">用户基本信息</span>
			<div class="user-box">
				<span>用户信息：{{obj.id}}</span>
				<span>用户微信:{{obj.nickName}}</span>
			</div>
			<div class="user-box">
				<span>用户手机：{{obj.mobile}}</span>
			</div> 
			<div class="user-box">
				<span>用户地区:{{obj.city}}</span>
			</div>
		</Card>
		<div class="mg-tp">
			<span style="font-size: 18px;font-weight: 600">统计信息</span>
			<Table height="100" :columns="statisticsTable.columns" :data="statisticsTable.data"></Table>
		</div>
		<div class="mg-tp">
			<span style="font-size: 18px;font-weight: 600">购买记录</span>
			<Table height="300" :columns="buyTable.columns" :data="buyTable.data"></Table>
		</div>
	</div>
</template>
<script>
import { customerDetail } from '../../api/userInfo'
export default {
	data () {
		return {
			obj:{},
			statisticsTable: {
				columns: [
					{
						title: '消费总金额',
						key: 'consumeTotalAmount',
						align: 'center'
					},
					{
						title: '订单数量',
						key: 'orderTotalNum',
						align: 'center'
					},
					{
						title: '当前优惠券数',
						key: 'couponNum',
						align: 'center'
					},
					{
						title: '当前积分',
						key: 'integration',
						align: 'center'
					},
					{
						title: '参加活动数量',
						key: 'activityNum',
						align: 'center'
					}
				],
				data: []
			},
			buyTable: {
				columns: [
					{
						title: '订单编号',
						key: 'orderSn',
						align: 'center'
					},
					{
						title: '用户微信',
						key: 'endTime',
						align: 'center',
						render: (h,params)=>{
							return h('div',{},this.obj.nickName)
						}
					},
					{
						title: '商品数量',
						key: 'quantity',
						align: 'center'
					},
					{
						title: '订单金额',
						key: 'totalAmount',
						align: 'center'
					},
					{
						title: '优惠金额',
						key: 'couponAmount',
						align: 'center'
					},
					{
						title: '获得积分',
						key: 'integration',
						align: 'center'
					},
					{
						title: '实付金额',
						key: 'payAmount',
						align: 'center'
					},
					{
						title: '订单创建时间',
						key: 'createTime',
						align: 'center'
					},
				],
				data: []
			}
		}
	},
	mounted (){
		let query = this.$route.query
		if(query.id){
			customerDetail(query.id).then((res) => {
				console.log(res)
				this.obj = res.data.data
				this.statisticsTable.data = [res.data.data.statisticsInfo]
				this.buyTable.data = res.data.data.orderList
			}).catch((err) => {
				
			});
		}
		
	}
}
</script>

<style scoped>
.user-box {
	width: 500px;
	display: flex;
	justify-content: space-between;
	margin-top: 30px;
	font-size: 16px;
}
</style>