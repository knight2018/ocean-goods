<template>
	<div class="add-box">
		<Form ref="formsection" :model="formsection" :rules="ruleInline" label-colon :label-width="100">
			<FormItem prop="sort" label="展示顺序">
				<InputNumber :min="0" v-model="formsection.sort" style="width:300px" />
			</FormItem>
			<FormItem prop="pic" label="栏目图">
				<UploadImg v-model="formsection.pic" :off="off"></UploadImg>
			</FormItem>
			<FormItem prop="showStatus" label="展示状态">
				<i-switch v-model="formsection.showStatus" :true-value="1" :false-value="2" />
			</FormItem>
			<FormItem prop="productSn" label="展示的商品">
				<Select v-model="formsection.productSn" style="width:200px" disabled>
					<Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button @click="handleAddShop" class="mg-lf">选择商品</Button>
			</FormItem>
			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formsection')"
					class="mg-tp"
				>{{formsection.id?`修改`:'添加'}}</Button>
			</FormItem>
		</Form>
		<SelectCommodity v-model="show" @on-change="handleChange" :productSn="formsection.productSn"></SelectCommodity>
	</div>
</template>
<script>
const validateTest = (rule, value, callback) => {
	if (!value) {
		callback(new Error('商品不允许为空'));
		return
	}
	callback()
}
import { setObj } from '../../libs/tools'
import { productAdd, productUpdate } from '../../api/section'
import { productDetial, productItem } from '../../api/shop'
export default {
	data () {
		return {
			show: false,
			formsection: {
				id: null,
				columnCategoryId: 1,
				creater: localStorage.userId,
				sort: 1,
				pic: '',
				showStatus: 1,
				productSn: 0
			},
			off: 2,
			shopList: [],
			ruleInline: {
				sort: [
					{
						required: true, type: 'number', message: '请输入展示顺序', trigger: 'blur,change'
					},
				],
				pic: [
					{
						required: true, message: '请上传栏目图', trigger: 'blur,change'
					}
				],
				productSn: [
					{
						required: true, validator: validateTest, trigger: 'blur,change'
					}
				]
			}
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (this.formsection.id) {
						productUpdate(this.formsection.id, this.formsection).then((res) => {
							this.$Message.success('添加成功')
							this.off = 1;
							this.$router.back()
						}).catch((err) => {

						});
					} else {
						productAdd(this.formsection).then((res) => {
							this.$Message.success('修改成功')
							this.off = 1;
							this.$router.back()
						}).catch((err) => {

						});
					}
				} else {
					this.$Message.error('Fail!');
				}
			})
		},
		handleAddShop () {
			this.show = true
		},
		handleChange (row) {
			this.shopList = [row]
			this.formsection.productSn = row.value
			console.log(this.shopList)
		},
		getShopList (id) {
			console.log(id)
			productItem(id).then((res) => {
				this.shopList = [
					{
						value: res.data.data.productSn,
						label: res.data.data.productName
					}
				]
			}).catch((err) => {

			});
		}
	},
	mounted () {
		console.log(this.$route.query)
		let query = this.$route.query
		if (query.id) {
			this.formsection.columnCategoryId = query.id
		}
		if (query.obj) {
			let obj = JSON.parse(query.obj)
			this.formsection = setObj(obj, this.formsection)
			this.getShopList(this.formsection.productSn)
		}
	}
}
</script>

<style scoped>
</style>

