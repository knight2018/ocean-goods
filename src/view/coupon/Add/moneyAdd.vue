<template>
	<div class="add-box">
		<Form ref="formmoney" :model="formmoney" :rules="ruleInline" label-colon :label-width="100">
			<FormItem prop="name" label="名称">
				<Input :min="0" v-model="formmoney.name" style="width:300px" />
			</FormItem>
			<FormItem prop="pic" label="优惠券类型">
				<Select
					v-model="formmoney.type"
					@on-change="handleChange"
					style="width:220px"
					clearable
					placeholder="请选择优惠券类型（默认全部）"
				>
					<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<span>优惠金额设置：</span>
			<FormItem prop="amount" label="减" v-if="formmoney.type === 1">
				<InputNumber
					v-model="formmoney.amount"
					:min="0"
					:formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
					:parser="value => value.replace(/\￥\s?|(,*)/g, '')"
				/>
			</FormItem>
			<FormItem prop="minPoint" label="消费满" v-if="formmoney.type === 2">
				<InputNumber
					v-model="formmoney.minPoint"
					:min="0"
					:formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
					:parser="value => value.replace(/\￥\s?|(,*)/g, '')"
				/>
				<span style="margin:0 30px">减</span>
				<InputNumber
					v-model="formmoney.amount"
					:min="0"
					:formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
					:parser="value => value.replace(/\￥\s?|(,*)/g, '')"
				/>
			</FormItem>
			<FormItem prop="minPoint" label="消费满" v-if="formmoney.type === 3">
				<InputNumber
					v-model="formmoney.minPoint"
					:min="0"
					:formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
					:parser="value => value.replace(/\￥\s?|(,*)/g, '')"
				/>
				<span style="margin:0 30px">折扣</span>
				<InputNumber v-model="formmoney.discount" :min="0" :max="1" :step="0.05" :precision="2" />
			</FormItem>
			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formmoney')"
					class="mg-tp"
				>{{formmoney.id?`修改`:'添加'}}</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
import { amountSettingAdd } from '../../../api/coupon'
import { setObj } from '@/libs/tools'
export default {
	data () {
		return {
			formmoney: {
				id: null,
				name: '',
				type: 1,
				amount: 0,
				minPoint: 0,
				discount: 0
			},
			ruleInline: {
				name: [
					{
						required: true, message: '请输入管理图名称', trigger: 'blur,change'
					},
					{ type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur,change' },
				],
				amount: [
					{
						required: true, type: 'number', message: '请输入优惠金额', trigger: 'blur,change'
					},
				],
				minPoint: [
					{
						required: true, type: 'number', message: '请输入满减金额', trigger: 'blur,change'
					},
				],
			},
			typeList: [
				{
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
				},
			],
		}
	},
	methods: {
		handleChange (value) {
			this.formmoney.amount = 0;
			this.formmoney.minPoint = 0;
			this.formmoney.discount = 0;
		},
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (this.formmoney.id) {
						amountSettingUpdate(this.formmoney.id, this.formmoney).then((res) => {
							this.off = 1
							this.$Message.success('修改成功')
							this.$router.replace('/moneyList')
						}).catch((err) => {

						});
					} else {
						amountSettingAdd(this.formmoney).then((res) => {
							this.off = 1
							this.$Message.success('添加成功')
							this.$router.replace('/moneyList')
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
			this.formmoney = setObj(obj, this.formmoney)
		}
	}
}
</script>

<style>
</style>