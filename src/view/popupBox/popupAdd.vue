<template>
	<div class="add-box">
		<Form ref="formPopup" :model="formPopup" :rules="ruleInline" label-colon :label-width="120">
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
			<!-- <FormItem prop="type" label="选择类型">
				<RadioGroup v-model="formPopup.type" @on-change="handleIsCoupon">
					<Radio :label="1">商品</Radio>
					<Radio :label="2">优惠券</Radio>
				</RadioGroup>
			</FormItem> -->
			<FormItem prop="contentId" label="展示的商品" v-if="formPopup.type === 1">
				<Select v-model="formPopup.contentId" style="width:200px" disabled>
					<Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button @click="handleAddShop" class="mg-lf">选择商品</Button>
			</FormItem>
			<FormItem prop="contentId" label="展示的优惠券" v-if="formPopup.type === 2">
				<Select v-model="formPopup.contentId" style="width:200px" disabled>
					<Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button @click="handleAddShop" class="mg-lf">添加优惠券</Button>
			</FormItem>
			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formPopup')"
					class="mg-tp"
				>{{formPopup.id?`修改${formPopup.name}`:'添加'}}</Button>
			</FormItem>
		</Form>
		<SelectCommodity
			v-model="show"
			:isCoupon="formPopup.type"
			@on-change="handleChange"
			:productSn="formPopup.contentId"
			v-if="formPopup.type === 1"
		></SelectCommodity>
		<SelectCoupon
			v-model="show"
			:isCoupon="formPopup.type"
			@on-change="handleChange"
			:productSn="formPopup.contentId"
			v-else
		></SelectCoupon>
	</div>
</template>
<script>
import { setObj } from '../../libs/tools'
import { ElasticLayerAdd, ElasticLayerUpdate } from '../../api/popup'
import { productDetial, productItem } from '../../api/shop'
import { couponItem } from '../../api/coupon'
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
				type: 1, //1是商品，2是优惠券
				contentId: 0
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
				contentId: [
					{
						required: true, type: 'number', message: '请选择商品或优惠券', trigger: 'blur,change'
					}
				],
				position: [
					{
						required: true, type: 'number', message: '请选择展示位置', trigger: 'blur,change'
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
						ElasticLayerUpdate(this.formPopup.id, this.formPopup).then((res) => {
							this.off = 1
							this.$Message.success('修改成功')
							this.$nextTick(() => {
								this.$router.replace({
									name: '/popup'
								})
							})

						}).catch((err) => {

						});
					} else {
						ElasticLayerAdd(this.formPopup).then((res) => {
							this.off = 1
							console.log(this.off)
							this.$Message.success('添加成功')
							this.$nextTick(() => {
								this.$router.replace({
									name: '/popup'
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
			console.log(row)
			this.formPopup.contentId = row.value
		},
		getShopList (id) {
			console.log('执行了', this.formPopup.type)
			if (this.formPopup.type === 2) {

				couponItem(id).then((res) => {
					console.log('youhuijuan', res)
					this.shopList = [
						{
							value: res.data.data.id,
							label: res.data.data.name
						}
					]
				}).catch((err) => {

				});
			} else {
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
		handleIsCoupon (e) {
			this.formPopup.contentId = null;
			this.shopList = []
		}
	},
	watch: {
		off (val) {
			console.log('你特么什么时候改变了', val)
		}
	},
	mounted () {
		if (this.$route.query.obj) {
			let query = JSON.parse(this.$route.query.obj)
			this.formPopup = setObj(query, this.formPopup)
			console.log(this.formPopup)
			this.getShopList(this.formPopup.contentId)
		}

	}
}
</script>

<style scoped>
</style>