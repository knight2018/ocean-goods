<template>
	<div class="add-box">
		<Form ref="formPopup" :model="formPopup" :rules="ruleInline" label-colon :label-width="100">
			<FormItem prop="name" label="管理图名称">
				<Input v-model="formPopup.name" style="width:300px" />
			</FormItem>
			<FormItem prop="picUrl" label="弹层图">
				<UploadImg v-model="formPopup.pic" :off="off"></UploadImg>
			</FormItem>
			<FormItem prop="position" label="展示位置">
				<Select v-model="formPopup.position" style="width:200px" filterable>
					<Option v-for="item in positionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="show" label="展示状态">
				<i-switch v-model="formPopup.showStatus" :true-value="1" :false-value="2" />
			</FormItem>
			<FormItem prop="productSn" label="展示的商品">
				<Select v-model="formPopup.productSn" style="width:200px" disabled>
					<Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button @click="handleAddShop" class="mg-lf">选择商品</Button>
			</FormItem>
			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formPopup')"
					class="mg-tp"
				>{{formPopup.id?`修改${formPopup.name}`:'添加'}}</Button>
			</FormItem>
		</Form>
		<SelectCommodity v-model="show" @on-change="handleChange" :productSn="formPopup.productSn"></SelectCommodity>
	</div>
</template>
<script>
import { setObj } from '../../libs/tools'
import { ElasticLayerAdd, ElasticLayerUpdate } from '../../api/popup'
import { productItem } from '../../api/shop'
export default {
	data () {
		return {
			show: false,
			formPopup: {
				name: '',
				creater: localStorage.userId,
				id: null,
				pic: '',
				position: 1,
				showStatus: 1,
				productSn: 0
			},
			positionList: [
				{
					value: 1,
					label: '首页弹层'
				}
			],
			off: 2,
			shopList: [],
			ruleInline: {
				name: [
					{
						required: true, message: '请输入管理图名称', trigger: 'blur,change'
					},
					{ type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur,change' },
				],
				pic: [
					{
						required: true, message: '请上传弹层图', trigger: 'blur,change'
					}
				],
				productSn: [
					{
						required: true, type: 'number', message: '请选择商品', trigger: 'blur,change'
					}
				],
				position: [
					{
						required: true, type: 'number', message: '请选择商品', trigger: 'blur,change'
					}
				],
			}
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {

					if (this.formPopup.id) {
						ElasticLayerUpdate(this.formPopup.id,this.formPopup).then((res) => {
							this.off = 1
							this.$Message.success('修改成功')
							this.$router.back()
						}).catch((err) => {
							
						});
					} else {
						ElasticLayerAdd(this.formPopup).then((res) => {
							this.off = 1
							this.$Message.success('添加成功')
							this.$router.push({
								name: '/popup'
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
			this.formPopup.productSn = row.value
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
			let query = JSON.parse(this.$route.query.obj)
			this.formPopup = setObj(query, this.formPopup)
			this.getShopList(this.formPopup.productSn)
		}

	}
}
</script>

<style scoped>
</style>