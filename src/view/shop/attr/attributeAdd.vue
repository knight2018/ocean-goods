<template>
	<div class="add-box">
		<Form
			ref="formAttribute"
			:model="formAttribute"
			:rules="ruleInline"
			label-colon
			:label-width="150"
		>
			<FormItem prop="attributeName" label="属性名称">
				<Input v-model="formAttribute.attributeName" style="width:300px" />
			</FormItem>
			<FormItem prop="attributeCategoryId" label="商品类型">
				<Select v-model="formAttribute.attributeCategoryId" style="width:200px" filterable>
					<Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</FormItem>

			<FormItem prop="selectType" label="属性是否可选">
				<RadioGroup v-model="formAttribute.selectType">
					<Radio :label="1">单选</Radio>
					<Radio :label="2">多选</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem prop="inputType" label="属性值录入方式">
				<RadioGroup v-model="formAttribute.inputType">
					<Radio :label="0">手工录入</Radio>
					<Radio :label="1">从下列列表选择</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem prop="inputList" label="属性值可选值列表" v-if="formAttribute.inputType===1">
				<Input
					type="textarea"
                    :rows="6"
					v-model="formAttribute.inputList"
					placeholder="（多个属性以回车隔开）"
					style="width:300px"
				/>
			</FormItem>
			<FormItem prop="handAddStatus" label="是否支持手动新增" v-if="formAttribute.inputType===1">
				<RadioGroup v-model="formAttribute.handAddStatus">
					<Radio :label="0">否</Radio>
					<Radio :label="1">是</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem prop="sort" label="排序">
				<InputNumber :min="0" v-model="formAttribute.sort" style="width:300px" />
			</FormItem>
			<FormItem>
				<Button
					type="primary"
					@click="handleSubmit('formAttribute')"
					class="mg-tp"
				>{{formAttribute.attributeId?`修改`:'添加'}}</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
import { AttriAdd, AttriUpdate } from '../../../api/attr'
import { productAttributeList } from '../../../api/data'
const inputListRule = (rule, value, callback) => {
	if (!value) {
		callback(new Error('不允许为空'));
		return
	}
	const num = value.indexOf(',');
	if (num !== -1) {
		callback(new Error('不允许有英文逗号'));
		return
	}
	try {
        let str = value.replace(/[\n\r]/g, ',')
        console.log(str,value)
		let arr = str.split(',')
		arr.some(item => {
			if (item === '') {
				callback(new Error('请检查多余回车'));
				return
			}
		})
		let set = new Set(arr)
		let newArr = Array.from(set)
		if(newArr.length!==arr.length){
			callback(new Error('属性不能重复'));
				return
		}
	} catch (err) {
		callback(new Error('格式错误'));
		return
	}
	callback()
}
export default {
	data () {
		return {
			id: null,
			formAttribute: {
				attributeCategoryId: null,
				attributeId: null,
				attributeName: '',
				attributeType: 0,
				handAddStatus: 0,
				inputList: '',
				inputType: 1,
				selectType: 1,
				sort: 1
			},
			shopList: [],
			ruleInline: {
				attributeName: [
					{
						required: true, message: '请输入属性名称', trigger: 'blur,change'
					},
					{ type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur,change' },
				],
				sort: [
					{
						required: true, type: 'number', message: '请输入排序', trigger: 'blur,change'
					},
				],
				attributeCategoryId: [
					{
						required: true, type: 'number', message: '请选择商品类型', trigger: 'blur,change'
					}
				],
				inputList: [
					{ required: true, validator: inputListRule, trigger: 'blur,change' }
				]
			}
		}
	},
	methods: {
		handleSubmit (name) {
			console.log('nimabi')
			this.$refs[name].validate((valid) => {

				if (valid) {
					let data = JSON.parse(JSON.stringify(this.formAttribute))
					data.inputList = data.inputList.replace(/[\n\r]/g, ',')
					if (this.formAttribute.attributeId) {
                        AttriUpdate(data.attributeId,data).then((res) => {
                            this.$Message.success('修改成功')
                            this.$router.back();
                        }).catch((err) => {
                            this.$Message.error('修改失败')
                        });
					} else {
                        AttriAdd(data).then((res) => {
                            this.$Message.success('添加成功')
                            this.$router.back();
                        }).catch((err) => {
                            this.$Message.error('添加失败')
                        });

					}
				} else {
					this.$Message.error('请输入必填项')
				}
			})
		},
	},
	computed: {
		getInputType () {
			return this.formAttribute.inputType
		}
	},
	watch: {
		getInputType(newVal){
			console.log(newVal)
		}
	},
	created () {
		if (this.$route.query.attributeCategoryId) {
            this.formAttribute.attributeCategoryId = this.$route.query.attributeCategoryId
            this.formAttribute.attributeType = this.$route.query.attributeType
		} else {
			this.$router.back();
		}
		if (this.$route.query.attributeId) {
			this.formAttribute = this.$route.query
		}
		productAttributeList({ pageNum: 1, pageSize: 1000 }).then((res) => {
			console.log(res)
			let list = []
			res.data.data.forEach(item => {
				list.push({
					value: item.attributeCategoryId,
					label: item.attributeCategoryName
				})
			})
			this.shopList = list
		}).catch((err) => {

		});
	}
}
</script>

<style>
</style>