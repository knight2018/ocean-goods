<template>
	<div class="add-box">
		<Form ref="formCategory" :model="formCategory" :rules="ruleInline" label-colon :label-width="120">
			<FormItem prop="categoryName" label="分类名称">
				<Input v-model="formCategory.categoryName" style="width:300px" />
			</FormItem>
			<FormItem prop="parentId" label="上级分类">
				<Select v-model="formCategory.parentId" style="width:200px" :disabled="disbaled">
					<Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="sort" label="排序">
				<InputNumber :min="0" v-model="formCategory.sort" style="width:300px" />
			</FormItem>
			<FormItem prop="showStatus" label="是否显示">
				<i-switch v-model="formCategory.showStatus" :true-value="1" :false-value="0" />
			</FormItem>
			<FormItem prop="classify" label="实体/虚拟" v-show="formCategory.parentId">
				<i-switch v-model="formCategory.classify" :true-value="1" :false-value="2" size="large">
					<span slot="open">实体</span>
					<span slot="close">虚拟</span>
				</i-switch>
			</FormItem>
			<!-- <FormItem prop="backgroundColor" label="背景颜色" v-if="formCategory.parentId == 0">
				<Input v-model="formCategory.backgroundColor" placeholder="例：#ffffff" style="width:300px" />
			</FormItem>
			<FormItem prop="fontColor" label="字体颜色" v-if="formCategory.parentId == 0">
				<Input v-model="formCategory.fontColor" placeholder="例：#ffffff" style="width:300px" />
			</FormItem> -->
			<FormItem prop="icon" label="一级分类图片" v-if="formCategory.parentId == 0">
				<UploadImg v-model="formCategory.icon" :off="off"></UploadImg>	
			</FormItem>
			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formCategory')"
					class="mg-tp"
				>{{categoryId?`修改`:'添加'}}</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
import { setObj } from '../../libs/tools'
import { productCategoryList, productCategoryAdd, productCategoryUpdate } from '../../api/data'

const inputListRule = (rule, value, callback)=>{
	if (!value) {
		callback(new Error('不允许为空'));
		return
	}
	let reg = /^#[\da-f]{3}([\da-f]{3})?$/i
	if(reg.test(value)){
		callback()
	}else{
		callback(new Error('不符合十六进制颜色规则'));
	}
}
export default {
	data () {
		return {
			categoryId: null,
			disbaled: false,
			off: 2,
			formCategory: {
				categoryLevel: 1,
				categoryName: '',
				classify: 2,
				parentId: 0,
				showStatus: 0,
				backgroundColor: '',
				fontColor: '',
				icon: '',
				sort: 1
			},
			shopList: [
				{
					value: 0,
					label: '无上级分类'
				}
			],
			ruleInline: {
				categoryName: [
					{
						required: true, message: '请输入分类名称', trigger: 'blur,change'
					},
					{ type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur,change' },
				],
				sort: [
					{
						required: true, type: 'number', message: '请输入排序', trigger: 'blur,change'
					},
				],
				parentId: [
					{
						required: true, type: 'number', message: '请选择分类', trigger: 'blur,change'
					}
				],
				icon: [
					{
						required: true, message: '请上传一级分类图', trigger: 'blur,change'
					}
				],
				backgroundColor: [
					{ required: true, validator: inputListRule, trigger: 'blur,change' }
				],
				fontColor: [
					{ required: true, validator: inputListRule, trigger: 'blur,change' }
				]
			}
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					let data = this.formCategory
					if (this.formCategory.parentId === 0) {
						this.formCategory.categoryLevel = 1;
						data.classify = 0;
					} else {
						this.formCategory.categoryLevel = 2;
					}
					if (this.categoryId) {
						productCategoryUpdate(this.categoryId, data).then((res) => {
							this.$Message.success('修改成功')
							this.off = 1
							this.$router.back()

						}).catch((err) => {
						});
					} else {
						productCategoryAdd(this.formCategory).then((res) => {
							console.log(res)
							this.$Message.success('添加成功')
							this.off = 1
							this.$router.back()
							// this.$router.push({ name: '/category' })
						}).catch((err) => {
						});
					}

				} else {
					this.$Message.error('请添加必传参数!');
				}
			})
		},
	},
	//有图片一定要在mouted赋值
	mounted () {
		if (this.$route.query.obj) {
			let obj = JSON.parse(this.$route.query.obj)
			this.formCategory = setObj(obj, this.formCategory)
			this.categoryId = obj.categoryId;
		}
		this.formCategory.parentId = this.$route.query.id
		// if (this.$route.query.categoryId) {
		// 	let query = this.$route.query;
		// 	this.categoryId = query.categoryId;
		// 	this.formCategory.categoryName = query.categoryName;
		// 	this.formCategory.classify = query.classify;
		// 	this.formCategory.showStatus = query.showStatus;
		// 	this.formCategory.sort = query.sort
		// }
		if (this.$route.query.id === 0 && this.categoryId) {
			this.disbaled = true;
			this.formCategory.classify = 2
		}
		
		let parentId = 0,
			pageNum = 1,
			pageSize = 100;
		productCategoryList({ parentId, pageNum, pageSize }).then((res) => {
			let list = []
			if (this.$route.query.id === 0) {
				list.push({
					value: 0,
					label: '无上级分类'
				})
			}
			res.data.data.forEach(item => {
				list.push({
					value: item.categoryId,
					label: item.categoryName
				})
			})
			this.shopList = list;
			this.formCategory.parentId = this.$route.query.id
		}).catch((err) => {

		});
	}
}
</script>

<style scoped>
</style>