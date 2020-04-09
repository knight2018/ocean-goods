<template>
	<div class="add-box">
		<Form ref="formBanner" :model="formBanner" :rules="ruleInline" label-colon :label-width="100">
			<FormItem prop="name" label="轮播名称">
				<Input v-model="formBanner.name" style="width:300px" />
			</FormItem>
			<FormItem prop="sort" label="展示顺序">
				<InputNumber :min="0" v-model="formBanner.sort" style="width:300px" />
			</FormItem>
			<FormItem prop="pic" label="轮播图">
				<UploadImg v-model="formBanner.pic" :off="off"></UploadImg>
			</FormItem>
			<FormItem prop="showStatus" label="展示状态">
				<i-switch v-model="formBanner.showStatus" :true-value="1" :false-value="0" />
			</FormItem>
			<FormItem prop="productSn" label="展示的商品">
				<Select v-model="formBanner.productSn" style="width:200px" disabled>
					<Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button @click="handleAddShop" class="mg-lf">选择商品</Button>
			</FormItem>
			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formBanner')"
					class="mg-tp"
				>{{formBanner.id?`修改${formBanner.name}`:'添加'}}</Button>
			</FormItem>
		</Form>
		<SelectCommodity v-model="show" @on-change="handleChange" :productSn="formBanner.productSn"></SelectCommodity>
	</div>
</template>
<script>
import { setObj } from '../../libs/tools'
import { CarouselAdd, carouselUpdate } from '../../api/banner'
import { productItem } from '../../api/shop'
export default {
	data () {
		return {
			show: false,
			formBanner: {
				creater: localStorage.userId,
				name: '',
				id: null,
				sort: 1,
				pic: '',
				productSn: 0,
				showStatus: 1
			},
			off: 2,
			shopList: [],
			ruleInline: {
				name: [
					{
						required: true, message: '请输入商品名称', trigger: 'blur,change'
					},
					{ type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur,change' },
				],
				sort: [
					{
						required: true, type: 'number', message: '请输入展示顺序', trigger: 'blur,change'
					},
				],
				pic: [
					{
						required: true, message: '请上传轮播图', trigger: 'blur,change'
					}
				],
				productSn: [
					{
						required: true, type: 'number', message: '请选择商品', trigger: 'blur,change'
					}
				]
			}
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (this.formBanner.id) {
						carouselUpdate(this.formBanner.id, this.formBanner).then((res) => {
							this.$Message.success('修改成功')
							this.off = 1;
							this.$router.back()
						}).catch((err) => {

						});
					} else {
						CarouselAdd(this.formBanner).then((res) => {
							this.$Message.success('添加成功')
							this.off = 1;
							this.$nextTick(() => {
								this.$router.push({
									name: '/banner'
								})
							})

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
			this.formBanner.productSn = row.value
			console.log(this.shopList)
		},
		getShopList (id) {
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
		if (this.$route.query.obj) {
			let obj = JSON.parse(this.$route.query.obj)
			this.formBanner = setObj(obj, this.formBanner)
			this.getShopList(this.formBanner.productSn)
		}
	}
}
</script>

<style scoped>
</style>