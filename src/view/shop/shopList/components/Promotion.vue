<template>
	<div class="box">
		<Form ref="promotion" :model="value" :rules="ruleInline" label-colon :label-width="150">
			<FormItem prop="price" label="赠送积分">
				<InputNumber v-model="value.giftPoint" :max="100000" :min="0" style="width:300px" />
			</FormItem>
			<FormItem prop="publishStatus" label="商品上架">
				<i-switch v-model="value.publishStatus" :true-value="1" :false-value="0" />
			</FormItem>
			<FormItem prop="serviceIds" label="服务保证" v-if="classify===1">
				<CheckboxGroup v-model="value.serviceIds">
					<Checkbox label="1">无忧退货</Checkbox>
					<Checkbox label="2" >快速退款</Checkbox>
					<Checkbox label="3">免费包邮</Checkbox>
				</CheckboxGroup>
			</FormItem>
			<FormItem>
				<Button class="mg-tp" @click="handleLast">上一步，填写商品信息</Button>
				<Button type="primary" @click="handleSubmit('promotion')" class="mg-tp mg-lf">下一步，填写商品属性</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
const validateArray = (rule, value, callback)=>{
    if (!Array.isArray(value) || value.length === 0) {
		callback(new Error('服务保证不允许为空'));
	} else {
		callback();
	}
}
export default {
	name: 'Promotion',
	props: {
		value: {
			type: Object,
			default: () => { }
		},
		classify: {
			type: Number,
			default: 1
		}
	},
	data () {
		return {
			ruleInline: {
                serviceIds:[
                    {
						required: true, validator: validateArray, trigger: 'blur,change'
					},
                ]
			}
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$emit('nextStep')
				} else {

				}
			})
		},
		handleLast () {
			this.$emit('lastStep')
		}
	}
}
</script>

<style scoped>
.box {
	margin-top: 40px;
}
</style>