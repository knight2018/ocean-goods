<template>
	<div class="add-box">
		<Form ref="formCategory" :model="formCategory" :rules="ruleInline" label-colon :label-width="100">
			<FormItem prop="name" label="名称">
				<Input :min="0" v-model="formCategory.name" style="width:300px" />
			</FormItem>
			<FormItem label="品类选择">
				<RadioGroup v-model="formCategory.level" @on-change="handleChange">
					<Radio :label="1">一级</Radio>
					<Radio :label="2">二级</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="请选择分类" v-if="formCategory.level===1">
				<Select v-model="category" style="width:220px" clearable placeholder="请选择分类">
					<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button type="primary" @click="handleAdd" class="mg-lf">添加分类</Button>
			</FormItem>
			<FormItem label="请选择分类" v-if="formCategory.level===2">
				<div style="display:flex">
					<Cascader :data="data4" :load-data="loadData" v-model="secondary"></Cascader>
					<Button type="primary" @click="handleAdd" class="mg-lf">添加分类</Button>
				</div>
			</FormItem>
			<FormItem label="已选择分类">
				<div v-for="(item, index) in formCategory.productCategoryIds" :key="item.id" class="child-top">
					<span style="flex:1">{{item.name}}</span>
					<Button type="warning" @click="handleDel(index)" size="small">删除</Button>
				</div>
			</FormItem>

			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formCategory')"
					class="mg-tp"
				>{{formCategory.id?`修改`:'添加'}}</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
import { categorySettingAdd, categoryUpdate } from '../../../api/coupon'
import { productCategoryList } from '../../../api/data'
import { setObj } from '@/libs/tools'
export default {
	data () {
		return {
			formCategory: {
				id: null,
				name: '',
				level: 1,
				productCategoryIds: []
			},
			ruleInline: {
				name: [
					{
						required: true, message: '请输入品类名称', trigger: 'blur,change'
					},
					{ type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur,change' },
				],
			},
			category: '',
			typeList: [],
			data4: [],
			secondary: []
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					let formCategory = JSON.parse(JSON.stringify(this.formCategory))
					formCategory.productCategoryIds = formCategory.productCategoryIds.map((item) => { return item.id }).join(',')
					if (this.formCategory.id) {

						categoryUpdate(formCategory.id, formCategory).then((res) => {
							this.$Message.success('修改成功')
							this.$router.replace('/couponCategory')
						}).catch((err) => {

						});
					} else {
						categorySettingAdd(formCategory).then((res) => {
							this.$Message.success('添加成功')
							this.$router.replace('/couponCategory')
						}).catch((err) => {

						});
					}
				} else {
					this.$Message.error('Fail!');
				}
			})
		},
		handleChange () {
			this.$set(this.formCategory, 'productCategoryIds', [])
		},
		handleAdd () {
			if (this.formCategory.level === 1 && this.category) {
				if (this.formCategory.productCategoryIds.some(item => { if (item.id === this.category) { return true } })) {
					this.$Message.error('这个类别你已经添加过了')
					return
				}
				let name;
				this.typeList.some(item => { if (item.value === this.category) return name = item.label })
				this.formCategory.productCategoryIds.push({
					id: this.category,
					name
				})
			} else if (this.data4.length > 1) {
				if (this.formCategory.productCategoryIds.some(item => { if (item.id === this.secondary[1]) { return true } })) {
					this.$Message.error('这个类别你已经添加过了')
					return
				}
				let name;
				this.data4.forEach(item => { console.log(item.value, this.secondary[0]); if (item.value === this.secondary[0]) item.children.some(items => { if (items.value === this.secondary[1]) return name = items.label }) })
				console.log(name)
				this.formCategory.productCategoryIds.push({
					id: this.secondary[1],
					name
				})
			}
		},
		handleDel (index) {
			this.formCategory.productCategoryIds.splice(index, 1)
		},
		async loadData (item, callback) {
			item.loading = true;
			let result = await this.handleType(item.value).finally(res => {
				item.loading = false;
			})
			result.forEach(items => {
				item.children.push({
					value: items.categoryId,
					label: items.categoryName
				})
			})
			callback();

		},
		handleType (id) {
			return new Promise((resolve, reject) => {
				productCategoryList({ parentId: id, pageNum: 1, pageSize: 1000 }).then((res) => {
					resolve(res.data.data)
				}).catch((err) => {
					reject(err)
				});
			})

		}

	},
	async mounted () {
		let query = this.$route.query
		if (query.obj) {
			let obj = JSON.parse(query.obj)
			let productCategoryIds = []
			obj.productCategoryNames = obj.productCategoryNames.split(',')
			obj.productCategoryIds.split(',').forEach((item, index) => {
				productCategoryIds.push({
					id: item * 1,
					name: obj.productCategoryNames[index]
				})
			})
			obj.productCategoryIds = productCategoryIds;
			this.formCategory = setObj(obj, this.formCategory)
		}
		let result = await this.handleType(0).finally(res => {

		})

		result.forEach(item => {
			this.typeList.push({
				value: item.categoryId,
				label: item.categoryName
			})
			this.data4.push({
				value: item.categoryId,
				label: item.categoryName,
				children: [],
				loading: false
			})
		})
	}
}
</script>

<style scoped>
.child-top {
	display: flex;
	margin-top: 20px;
}
.child-top:first-child {
	margin-top: 0;
}
</style>