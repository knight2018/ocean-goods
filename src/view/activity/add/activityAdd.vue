<template>
	<div class="add-box">
		<Form ref="formActivity" :model="formActivity" :rules="ruleInline" label-colon :label-width="120">
			<FormItem prop="name" label="活动名称">
				<Input v-model="formActivity.name" style="width:300px" />
			</FormItem>

			<FormItem props="time" label="活动时间">
				<DatePicker
					type="daterange"
					v-model="formActivity.time"
					placeholder="Select date"
					style="width: 200px"
					:clearable="false"
				></DatePicker>
			</FormItem>
            <FormItem  label="当前状态">
                <div style="color: #333" v-if="formActivity.status===0">未开始</div>
                <div style="color:#20db89" v-if="formActivity.status===1">已开始</div>
                <div style="color: red" v-if="formActivity.status===2">已结束</div>
            </FormItem>
			<FormItem prop="activityLimit" label="活动限制">
				<CheckboxGroup v-model="formActivity.activityLimit">
					<Checkbox :label="1">参与折扣活动不能参加</Checkbox>
					<Checkbox :label="2">使用积分不能参与</Checkbox>
					<Checkbox :label="3">使用其他优惠券不能参与（互斥）</Checkbox>
				</CheckboxGroup>
			</FormItem>
			<div style="font-weight:600">优惠券领取设置</div>
			<Divider />
			<FormItem label="添加优惠券">
				<Select v-model="couponId" style="width:220px" placeholder="请选择优惠券">
					<Option v-for="item in couponList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button type="primary" @click="handleAdd" class="mg-lf">新增</Button>
			</FormItem>
			<Table :columns="columns" :data="data1" style="width:100%;"></Table>
			<FormItem prop="target" label="优惠券领取对象">
				<RadioGroup v-model="formActivity.target">
					<Radio :label="1">全部</Radio>
					<Radio :label="2">新用户</Radio>
					<Radio :label="3">老用户</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem prop="getLimit" label="是否限领">
				<RadioGroup v-model="formActivity.getLimit">
					<Radio :label="0">是</Radio>
					<Radio :label="1">否</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem prop="perCount" label="每人限领" v-if="formActivity.getLimit===0">
				<InputNumber v-model="formActivity.perCount" :min="0" />
			</FormItem>
			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formActivity')"
					class="mg-tp"
				>{{formActivity.id?`修改`:'添加'}}</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
const validateArray = (rule, value, callback) => {
	if (value.length) {
		callback()
		return
	}
	callback(new Error('不允许不选'));

}

import { activityAdd, activityUpdate, activityDetail } from '../../../api/activity'
import { couponList } from '../../../api/coupon'
import { setObj } from '@/libs/tools'
export default {
	data () {
		return {
			formActivity: {
				id: null,
				activityLimit: [],
				couponIds: 0,
				time: [new Date(), new Date()],
				getLimit: 0,
				name: '',
				perCount: 0,
				target: 1,
                type: 1,
                status: 0
			},
			ruleInline: {
				name: [
					{
						required: true, message: '请输入优惠券名称', trigger: 'blur,change'
					},
					{ type: 'string', max: 20, message: '不能超过20个字符', trigger: 'blur,change' },
				],
				perCount: [
					{
						required: true, type: 'number', message: '请输限领数量', trigger: 'blur,change'
					},
				],
				activityLimit: [
					{
						required: true, validator: validateArray, trigger: 'blur,change'
					}
				],
				time: [
					{
						required: true, validator: validateArray, trigger: 'blur,change'
					}
				],
			},

			couponId: 0,
			original: [],
			couponList: [],
			columns: [
				{
					title: '编号',
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
				},
				{
					title: '创建时间',
					key: 'createTime',
					tooltip: true,
					align: 'center'
				},
				{
					title: '创建人',
					key: 'creatorName',
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
								props: {
									type: "error"
								},
								on: {
									click: () => {
										console.log(this)
										this.data1.splice(params.index, 1)
									}
								}
							}, '删除')
						])
					}
				}
			],
			data1: []
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (!this.data1.length) { this.$Message.error('请选择优惠券'); return }
					let formActivity = JSON.parse(JSON.stringify(this.formActivity))
					formActivity.couponIds = this.data1.map((item) => item.id).join(',')
					formActivity.activityLimit = formActivity.activityLimit.join(',')
					formActivity.startTime = formActivity.time[0];
					formActivity.endTime = formActivity.time[1]
					if (this.formActivity.id) {

						activityUpdate(this.formActivity.id, formActivity).then((res) => {
							this.$Message.success('修改成功')
							this.$router.replace('/activityList')
						}).catch((err) => {

						});
					} else {

						activityAdd(formActivity).then((res) => {
							this.$Message.success('添加成功')
							this.$router.replace('/activityList')
						}).catch((err) => {

						});
					}
				} else {
					this.$Message.error('Fail!');
				}
			})
		},
		handleAdd () {
			let obj = this.original[this.couponId]
			if (this.data1.some(item => {
				if (item.id === obj.id) {
					return true
				}
			})) { this.$Message.error('这玩意已经添加过了'); return }

			this.data1.push(obj)

		}
	},
	mounted () {
		couponList({ pageNum: 1, pageSize: 1000 }).then((res) => {
			this.original = res.data.data
			this.couponList = res.data.data.map((item, index) => {
				return {
					value: index,
					label: item.name
				}
			})
		}).catch((err) => {

		});
		let query = this.$route.query
		if (query.id) {
            activityDetail(query.id).then((res) => {
                console.log(res)
                this.data1 = res.data.data.couponDetailList
                res.data.data.time = [res.data.data.startTime,res.data.data.endTime]
                res.data.data.activityLimit = res.data.data.activityLimit.split(',')
                res.data.data.activityLimit = res.data.data.activityLimit.map(item=>item*1)
                this.formActivity = setObj(res.data.data,this.formActivity)
            }).catch((err) => {
                
            });
		}
	}
}
</script>

<style>
</style>