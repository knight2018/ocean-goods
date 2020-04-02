<template>
	<div class="add-box flex-de">
		<Steps :current="index" class="align-self" style="width: 65%">
			<Step :title="stepList[0]" content="填写商品信息"></Step>
			<Step :title="stepList[1]" content="填写商品促销"></Step>
			<Step :title="stepList[2]" content="填写商品属性"></Step>
		</Steps>
		<Information v-model="shopAdd" v-show="index === 0" @nextStep="handleNext"></Information>
		<Promotion
			v-model="shopAdd"
			:classify="classify"
			v-show="index === 1"
			@lastStep="handleBack"
			@nextStep="handleNext"
		></Promotion>
		<Attribute v-model="shopAdd" v-show="index === 2" @lastStep="handleBack" @handleAdd="handleAdd" :productAttributeCategoryId="productAttributeCategoryId"></Attribute>
	</div>
</template>
<script>
import { setObj } from '../../../libs/tools'
import Information from './components/Information'
import Promotion from './components/Promotion'
import Attribute from './components/Attribute'
import { productAdd, productUpdate, UpdateInfo } from '../../../api/shop'
export default {
	components: { Information, Promotion, Attribute },
	data () {
		return {
			stepList: ['进行中', '待进行', '待进行'],
			index: 0,
			classify: null,
			shopAdd: {
				creater: localStorage.userId,
				albumPics: '',
				description: '',
				detailMobileHtml: '',
				productSn: null,
				giftPoint: 0,
				price: 0,
				productAttributeCategoryId: 0,
				productAttributeValueList: [],
				productCategoryId: [], //后台不要一级，需要后期处理
				productName: '',
				promotionPrice: 0,
				publishStatus: 0,
				sort: 0,
				usePointLimit: 0,
				stock: 0,
				unit: '件',
				isLimitPurchase: 0,
				limitPurchaseCount: 0,
				skuStockList: [],
				serviceIds: [] //后台需要，切割
			},
			update: false,
			id: null,
			productAttributeCategoryId: null,
			skuStockList: []
		}
	},
	methods: {
		handleNext (classify) {
			this.$set(this.stepList, this.index, '已完成')
			this.index += 1;
			this.$set(this.stepList, this.index, '进行中')
			if (classify) {
				this.classify = classify
			}
		},
		handleBack () {
			this.$set(this.stepList, this.index, '待进行')
			this.index -= 1;
			this.$set(this.stepList, this.index, '进行中')
		},
		handleAdd () {
			let shopAdd = JSON.parse(JSON.stringify(this.shopAdd))
			shopAdd.productCategoryId =shopAdd.productCategoryId[1] //shopAdd.productCategoryId.length===2?shopAdd.productCategoryId[1]:shopAdd.productCategoryId[0]
			if (this.update) {
				productUpdate(this.id, shopAdd).then((res) => {
					this.$Message.success('修改商品成功')
					this.$router.back()
				}).catch((err) => {

				});
			} else {
				productAdd(shopAdd).then((res) => {
					this.$Message.success('添加商品成功')
					this.$router.back()
				}).catch((err) => {

				});
			}
		}
	},
	mounted () {
		if (this.$route.query.obj) {
			
			
			console.log('zhengti',this.shopAdd)
		}
		if (this.$route.query.id) {
			let obj = JSON.parse(this.$route.query.obj)
			this.update = true
			this.id = this.$route.query.id
			UpdateInfo(this.id).then((res) => {
				obj.detailMobileHtml = res.data.data.detailMobileHtml
				obj.productAttributeValueList = res.data.data.productAttributeValueList
				obj.productAttributeCategoryId = res.data.data.productAttributeCategoryId
				obj.skuStockList = res.data.data.skuStockList
				this.shopAdd = setObj(obj, this.shopAdd)
			}).catch((err) => {
				
			});
		} else {
			this.update = false
		}
	}
}
</script>

<style scoped>
.ivu-steps-item {
	width: 180px;
}
.flex-de {
	flex-direction: column;
}
.align-self {
	align-self: center;
}
</style>