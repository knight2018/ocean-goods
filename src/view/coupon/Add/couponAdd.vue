<template>
	<div class="add-box">
		<Form ref="formCoupon" :model="formCoupon" :rules="ruleInline" label-colon :label-width="100">
			<FormItem prop="name" label="名称">
				<Input :min="0" v-model="formCoupon.name" style="width:300px" />
			</FormItem>
			<FormItem prop="amountSettingId" label="金额选择">
				<Select v-model="formCoupon.amountSettingId" style="width:220px" placeholder="请选择金额">
					<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="categorySettingId" label="品类选择">
				<Select v-model="formCoupon.categorySettingId" style="width:220px" placeholder="请选择品类">
					<Option v-for="item in categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem label="品类选择">
				<RadioGroup v-model="formCoupon.timeType">
					<Radio :label="1">固定时间段</Radio>
					<Radio :label="2">固定天数</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="时效设置" prop="time" v-if="formCoupon.timeType===1">
				<DatePicker
					type="daterange"
					v-model="formCoupon.time"
					placeholder="Select date"
					style="width: 200px"
					:clearable="false"
				></DatePicker>
			</FormItem>

			<FormItem label="时效设置" prop="days" v-if="formCoupon.timeType===2">
				<InputNumber :formatter="value => Math.floor(value)" v-model="formCoupon.days" :min="1" />
			</FormItem>
			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formCoupon')"
					class="mg-tp"
				>{{formCoupon.id?`修改`:'添加'}}</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
import { couponAdd, couponUpdate, categorySettingAll, amountSettingAll } from '../../../api/coupon'
import { setObj } from '@/libs/tools'
export default {
	data () {
		return {
			formCoupon: {
				id: null,
				name: '',
				amountSettingId: 0,
				categorySettingId: 0,
				days: 1,
				timeType: 1,
				time: [new Date(), new Date()],
				startTime: '',
				endTime: ''
			},
			ruleInline: {
				name: [
					{
						required: true, message: '请输入优惠券名称', trigger: 'blur,change'
					},
					{ type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur,change' },
				],
				days: [
					{
						required: true, type: 'number', message: '请输入时间', trigger: 'blur,change'
					},
				],
			},
			typeList: [],
			categoryList: []
		}
	},
	methods: {
		handleChange (value) {
			this.formCoupon.amount = 0;
			this.formCoupon.minPoint = 0;
			this.formCoupon.discount = 0;
		},
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					
					this.formCoupon.startTime = this.formCoupon.time[0];
					this.formCoupon.endTime = this.formCoupon.time[1];
					console.log(this.formCoupon.time)
					if (this.formCoupon.id) {
						couponUpdate(this.formCoupon.id, this.formCoupon).then((res) => {
							this.$Message.success('修改成功')
							this.$router.replace('/couponList')
						}).catch((err) => {

						});
					} else {

						couponAdd(this.formCoupon).then((res) => {
							this.$Message.success('添加成功')
							this.$router.replace('/couponList')
						}).catch((err) => {

						});
					}
				} else {
					this.$Message.error('Fail!');
				}
			})
		},
	},
	mounted () {
		let query = this.$route.query
		if (query.obj) {
			let obj = JSON.parse(query.obj)
			this.formCoupon = setObj(obj, this.formCoupon)
			if (obj.timeType === 1) {
				this.formCoupon.time = [this.formCoupon.startTime, this.formCoupon.endTime]
			}
		}
		categorySettingAll().then(res => {
			this.categoryList = res.data.data.map(item => {
				return {
					value: item.id,
					label: item.name
				}
			})
			if (!this.formCoupon.categorySettingId) {
				this.formCoupon.categorySettingId = this.categoryList[0].value
			}
		})
		amountSettingAll().then((res) => {
			this.typeList = res.data.data.map(item => {
				return {
					value: item.id,
					label: item.name
				}
			})
			if (!this.formCoupon.amountSettingId) {
				this.formCoupon.amountSettingId = this.typeList[0].value
			}
		}).catch((err) => {

		});
	}
}
</script>

<style>
</style>