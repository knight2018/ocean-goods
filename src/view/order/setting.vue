<template>
	<div class="add-box">
		<Form ref="formSetting" :model="formSetting" :rules="ruleInline" label-colon :label-width="120">
			<FormItem prop="flashOrderOvertime" label="秒杀订单超过">
				<div class="flex">
					<Input size="large" v-model="formSetting.flashOrderOvertime" style="width:300px">
						<span slot="append">分</span>
					</Input>
					<span class="mg-lf">未付款，自动关闭</span>
				</div>
			</FormItem>
			<FormItem prop="normalOrderOvertime" label="正常订单超过">
                <div class="flex">
					<Input size="large" v-model="formSetting.normalOrderOvertime" style="width:300px">
						<span slot="append">分</span>
					</Input>
					<span class="mg-lf">未付款，自动关闭</span>
				</div>
			</FormItem>
			<FormItem prop="confirmOvertime" label="发货超过">
                 <div class="flex">
					<Input size="large" v-model="formSetting.confirmOvertime" style="width:300px">
						<span slot="append">天</span>
					</Input>
					<span class="mg-lf">未收货，订单自动完成</span>
				</div>
			</FormItem>
			<FormItem prop="finishOvertime" label="订单完成超过">
                 <div class="flex">
					<Input size="large" v-model="formSetting.finishOvertime" style="width:300px">
						<span slot="append">天</span>
					</Input>
					<span class="mg-lf">自动结束交易，不能申请售后</span>
				</div>
			</FormItem>
			<FormItem prop="commentOvertime" label="订单完成超过">
                 <div class="flex">
					<Input size="large" v-model="formSetting.commentOvertime" style="width:300px">
						<span slot="append">天</span>
					</Input>
					<span class="mg-lf">自动五星好评</span>
				</div>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formSetting')" class="mg-tp">提交</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
const validateInt = (rule, value, callback) => {
	if (value === 0) {
		return callback(new Error("不允许为0"));
	}
	if (/^[0-9]+$/.test(value)) {
		callback();
	} else {
		return callback(new Error("请输入正确的整数"));
	}
};
import { setObj } from '../../libs/tools'
import { orderSetting, update } from '../../api/orderSetting'
export default {
	data () {
		return {
			formSetting: {
				commentOvertime: 0,
				confirmOvertime: 0,
				finishOvertime: 0,
				flashOrderOvertime: 0,
				normalOrderOvertime: 0
			},
			ruleInline: {
                commentOvertime: [
					{
						required: true, validator: validateInt, trigger: 'blur,change'
					},
                ],
                confirmOvertime: [
					{
						required: true, validator: validateInt, trigger: 'blur,change'
					},
                ],
                finishOvertime: [
					{
						required: true, validator: validateInt, trigger: 'blur,change'
					},
                ],
                flashOrderOvertime: [
					{
						required: true, validator: validateInt, trigger: 'blur,change'
					},
                ],
                normalOrderOvertime: [
					{
						required: true, validator: validateInt, trigger: 'blur,change'
					},
				],
            }
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					update(this.formSetting).then((res) => {
						this.$Message.success('修改成功')
					}).catch((err) => {

					});
				} else {

				}
			})
		}
	},
	created () {
		orderSetting().then((res) => {
			this.formSetting = setObj(res.data.data, this.formSetting)
		}).catch((err) => {

		});
	}
}
</script>

<style>
</style>