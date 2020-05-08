<template>
	<div class="box">
		<Form ref="information" :model="value" :rules="ruleInline" label-colon :label-width="150">
			<FormItem prop="productCategoryId" label="商品分类">
				<Cascader filterable :data="shopList" v-model="value.productCategoryId"></Cascader>
			</FormItem>
			<FormItem prop="productName" label="商品名称">
				<Input v-model="value.productName" style="width:300px" />
			</FormItem>
			<!-- <FormItem prop="price" label="商品售价">
				<InputNumber v-model="value.price" :max="100000" :min="0" style="width:300px" />
			</FormItem> -->
			<!-- <FormItem prop="stock" label="商品库存">
				<InputNumber v-model="value.stock" :min="0" :max="100000" style="width:300px" />
			</FormItem> -->
			<FormItem prop="unit" label="计量单位">
				<Input v-model="value.unit" style="width:300px" />
			</FormItem>
			<FormItem prop="isLimitPurchase" label="是否开启限购">
				<RadioGroup v-model="value.isLimitPurchase">
					<Radio :label="1">是</Radio>
					<Radio :label="0">否</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem prop="limitPurchaseCount" label="单人限购数量" v-if="value.isLimitPurchase===1">
				<InputNumber v-model="value.limitPurchaseCount" style="width:300px" :min="0" :max="1000" />
			</FormItem>
			<FormItem prop="attributeName" label="排序">
				<InputNumber v-model="value.sort" style="width:300px" />
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('information')" class="mg-tp">下一步，填写商品促销</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
const verifyId = (rule, value, callback) => {
	if (!Array.isArray(value) || value.length === 0) {
		callback(new Error('商品分类不允许为空'));
	} else if (value.length === 1) {
		callback(new Error('请选择二级分类'));
	} else {
		callback();
	}
}
const validateFloat = (rule, value, callback) => {
	if (value === 0) {
		return callback(new Error("不允许为0"));
	}
	if (/^(([1-9]\d{0,5})|0)(\.\d{0,2})?$/.test(value)) {
		callback();
	} else {
		return callback(new Error("请输入正确的价格，小数点后最多两位"));
	}
};

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
import { productCategoryList } from '../../../../api/data'
import { QueryArray } from '../../../../libs/tools'
export default {
	name: 'Information',
	props: {
		value: {
			type: Object,
			default: () => { }
		}
	},
	data () {
		return {
			ruleInline: {
				productName: [
					{
						required: true, message: '请输入商品名称', trigger: 'blur,change'
					},
					{ type: 'string', max: 30, message: '不能超过30个字符', trigger: 'blur,change' },
				],
				sort: [
					{
						required: true, type: 'number', message: '请输入排序', trigger: 'blur,change'
					},
				],
				price: [
					{
						required: true, validator: validateFloat, trigger: 'blur,change'
					},
				],
				productCategoryId: [
					{
						required: true, validator: verifyId, trigger: 'blur,change'
					}
				],
				stock: [
					{
						required: true, validator: validateInt, trigger: 'blur,change'
					},
				],
				limitPurchaseCount: [
					{
						required: true, validator: validateInt, trigger: 'blur,change'
					},
				]
			},
			shopList: []
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					let obj = QueryArray(this.value.productCategoryId[1], this.shopList)
					let classify = obj.child.classify //0实体 1虚拟
					console.log(classify,'???')
					this.$emit('nextStep', classify)
				} else {

				}
			})
		}
	},
	created () {
		productCategoryList({ parentId: 0, pageNum: 1, pageSize: 1000 }).then((res) => {
			let list = []
			res.data.data.forEach((item, index) => {
				list.push({
					value: item.categoryId + '',
					label: item.categoryName,
					children: []
				})
				productCategoryList({ parentId: item.categoryId, pageNum: 1, pageSize: 1000 }).then((reschild) => {
					reschild.data.data.forEach(items => {
						list[index].children.push({
							value: items.categoryId + '',
							label: items.categoryName,
							classify: items.classify
						})
					})
					this.shopList = list;
				}).catch((err) => {

				});
			})
		}).catch((err) => {

		});
	}
}
</script>

<style scoped>
.box {
	margin-top: 40px;
}
</style>