<template>
	<div class="box">
		<Form ref="attribute" :model="value" :rules="ruleInline" label-colon :label-width="150">
			<FormItem prop="productAttributeCategoryId" label="属性类型">
				<Select
					ref="select"
					v-model="value.productAttributeCategoryId"
					style="width:200px"
					filterable
					:label="foolabel"
				>
					<Option v-for="(item,index) in shopList" :value="item.value" :key="index">{{ item.label }}</Option>
				</Select>
			</FormItem>
			<FormItem prop="productAttributeValueList" label="商品规格">
				<Card style="width:600px">
					<div v-for="(item,index) in attrList" :key="index" class="card-list">
						<!-- inputType为1时，是选择属性，否则就只能添加 -->
						<p class="title">{{item.attributeName}}：</p>
						<div>
							<!-- selectType为1时是单选，2是多选 -->
							<div v-if="item.selectType===1">
								<RadioGroup v-model="item.check">
									<div class="flex">
										<div v-for="(items,index) in item.inputList" :key="index">
											<Radio class="font" :label="items"></Radio>
											<a class="delete" v-if="index+1>item.index" @click="handleDel(item,index)">删除</a>
										</div>
									</div>
								</RadioGroup>
							</div>
							<div v-if="item.selectType===2">
								<CheckboxGroup v-model="item.check">
									<div class="flex">
										<div v-for="(items,index) in item.inputList" :key="index">
											<Checkbox class="font" :label="items"></Checkbox>
											<a class="delete" v-if="index+1>item.index" @click="handleDel(item,index)">删除</a>
										</div>
									</div>
								</CheckboxGroup>
							</div>
						</div>
						<div class="mg-tp" v-if="item.inputType === 0 || item.handAddStatus===1">
							<Input style="width: 150px" v-model="item.name" :maxlength="10" />
							<Button class="mg-lf" @click="handleAdd(item)">添加</Button>
						</div>
					</div>
				</Card>
				<Card style="width:600px" class="mg-tp">
					<div class="bottom">
						<Table border :columns="tableList.columns" :data="tableList.data1"></Table>
						<Button class="mg-tp" type="primary" @click="handleRefresh">刷新列表</Button>
					</div>
				</Card>
			</FormItem>
			<FormItem prop="albumPics" label="商品详情主页图">
				<UploadImg v-model="value.albumPics" :off="off" :index="5"></UploadImg>
			</FormItem>
			<FormItem prop="detailHtml" label="规格参数">
				<div ref="editor" class="editor" style="width: 750px"></div>
			</FormItem>
			<FormItem>
				<Button class="mg-tp" @click="handleLast">上一步，填写商品信息</Button>
				<Button type="primary" @click="handleSubmit('attribute')" class="mg-tp mg-lf">提交</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
import E from "wangeditor";
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
import { productAttributeList } from '../../../../api/data'
import { getToken } from '@/libs/util'
import { AttriList } from '../../../../api/attr'
import { isArray } from 'util';
export default {
	name: 'Attribute',
	props: {
		value: {
			type: Object,
			default: () => { }
		},
		productAttributeCategoryId: {
			type: Number,
			default: undefined
		}
	},
	data () {
		return {
			star: false,
			ruleInline: {
				productAttributeCategoryId: [
					{
						required: true, type: 'number', message: '请选择属性类型', trigger: 'blur,change'
					},
				],
				albumPics: [
					{
						required: true, type: 'string', message: '请上传图片', trigger: 'blur,change'
					},
				]
			},
			shopList: [
			],
			columnsStar: [
				{
					title: '销售价格',
					key: 'price',
					align: 'center',
					width: 100,
					render: (h, params) => {
						return h('InputNumber', {
							style: {
								width: '90%'
							},
							props: {
								value: params.row.price
							},
							on: {
								'on-change': (event) => {
									console.log(event)
									this.tableList.data1[params.index].price = typeof event === 'object' ? event.target.value : event
								}
							}
						})
					}
				},
				{
					title: '商品库存',
					key: 'stock',
					align: 'center',
					width: 100,
					render: (h, params) => {
						return h('InputNumber', {
							style: {
								width: '90%'
							},
							props: {
								value: params.row.stock
							},
							on: {
								'on-change': (event) => {
									this.tableList.data1[params.index].stock =  typeof event === 'object' ? event.target.value : event
								}
							}
						})
					}
				},
				{
					title: '库存预警值',
					key: 'lowStock',
					align: 'center',
					width: 100,
					render: (h, params) => {
						return h('InputNumber', {
							style: {
								width: '90%'
							},
							props: {
								value: params.row.lowStock
							},
							on: {
								'on-change': (event) => {
									this.tableList.data1[params.index].lowStock =  typeof event === 'object' ? event.target.value : event
								}
							}
						})
					}
				},
				{
					title: 'sku编号',
					key: 'skuCode',
					align: 'center',
					width: 80,
					tooltip: true
				},
				{
					title: '操作',
					key: 'price',
					align: 'center',
					width: 70,
					render: (h, params) => {
						return h('a', {
							on: {
								click: () => {
									this.tableList.data1.splice(params.index, 1)
								}
							}
						}, '删除')
					}
				}
			],
			tableList: {
				columns: [

				],
				data1: []
			},
			attrList: [],
			name: '',
			off: 2,
			editor: null,
			clear: false,
			foolabel: ''
		}
	},
	methods: {
		handleSubmit (name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.value.detailMobileHtml = this.editor.txt.html();
					let list = []
					let off = true
					if (!this.attrList.length) {
						off = false
					}
					this.attrList.forEach(item => {
						if (Array.isArray(item.check)) {
							if (item.check.length) {
								list.push({
									productAttributeId: item.attributeId,
									value: item.check.join(',')
								})
							} else {
								off = false
							}

						} else {
							if (item.check) {
								list.push({
									productAttributeId: item.attributeId,
									value: item.check
								})
							} else {
								off = false
							}

						}
					})
					if (!off) {
						this.$Message.error('请填写完整商品规格')
						return
					}
					this.value.productAttributeValueList = list
					this.value.skuStockList = this.tableList.data1
					this.off = 1
					this.$emit('handleAdd')
				} else {
					this.$Message.error('请填写完整参数')
				}
			})
		},
		handleLast () {
			this.$emit('lastStep')
		},
		handleAdd (item) {
			let off = item.inputList.some(items => {

				if (item.name == items) {
					return true
				}
			})
			if (!item.name) {
				this.$Message.warning('属性值不能为空')
				return
			}
			if (off) {
				this.$Message.warning('属性值不能重复')
				return
			}
			item.inputList.push(item.name)
			item.name = ''
			// this.$forceUpdate();
		},
		handleDel (item, index) {
			if (Array.isArray(item.check)) {
				let ind = undefined;
				item.check.some((name, nameIndex) => {
					if (name === item.inputList[index]) {
						ind = nameIndex
						return true
					}
				})
				if (ind !== undefined) {
					item.check.splice(ind, 1)
				}
			} else {
				if (item.check === item.inputList[index]) {
					item.check = ''
				}
			}
			item.inputList.splice(index, 1)
		},
		handleStarTable (off) {
			let columnsStar = [...this.columnsStar]
			let obj = {}
			this.attrList.forEach((item, index) => {
				columnsStar.unshift({
					title: item.attributeName,
					key: `sp${index + 1}`,
					align: 'center',
					width: 80,
					resizable: true
				})
				obj[`sp${index + 1}`] = Array.isArray(item.check) ? item.check : item.check.split(',')
			})
			if (!off) {
				let data = this.handleStarData(obj)
				this.tableList.data1 = data;
			}
			this.$set(this.tableList, 'columns', columnsStar)
		},
		//生成table的data
		handleStarData (obj) {
			let data = []
			let arr = Object.keys(obj)
			if (arr.length) {
				let off = arr.some(item => {
					if (obj[item].length === 0) {
						return true
					}
				})
				if (off) {
					this.$Message.error('请选择商品规格')
					return []
				}
				if (arr.length === 1) {
					obj['sp1'].forEach(sp1 => {
						data.push({
							sp1
						})
					})
				} else if (arr.length === 2) {
					obj['sp1'].forEach(sp1 => {
						obj['sp2'].forEach(sp2 => {
							data.push({
								sp1,
								sp2
							})
						})
					})
				} else if (arr.length === 3) {
					obj['sp1'].forEach(sp1 => {
						obj['sp2'].forEach(sp2 => {
							obj['sp3'].forEach(sp3 => {
								data.push({
									sp1,
									sp2,
									sp3
								})
							})
						})
					})
				}
			} else {
				this.$Message.error('请添加商品规格')
			}
			data.forEach(item => {
				item.lowStock = '';
				item.price = '';
				item.stock = '';
				item.skuCode = '';
			})
			return data
		},
		handleRefresh () {
			this.$Modal.confirm({
				title: '是否刷新列表',
				content: '<p>刷新列表会导致数据清空</p>',
				onOk: () => {
					this.handleStarTable()
				},
				onCancel: () => {

				}
			})
		}
	},
	computed: {
		getid () {
			return this.value.productAttributeCategoryId
		},
		getHtml () {
			return this.value.detailMobileHtml
		},
		getSku () {
			return this.value.skuStockList
		}
	},
	beforeDestroy () {

	},

	watch: {
		getid: {
			handler (newVal) {

				AttriList({ attributeCategoryId: newVal, attributeType: 0, pageNum: 1, pageSize: 1000 }).then((res) => {

					res.data.data.forEach(item => {
						item.name = ''
						//单选是radio需要绑定的是字符串，多选则需要绑定数组
						if (item.selectType === 1) {
							item.check = ''
						} else {
							item.check = []
						}
						// 0是需要手动添加，inputList强制清空
						if (item.inputType === 0) {
							item.inputList = [];
						} else {
							item.inputList = item.inputList.split(',')
							let list = []
							let setList = []
							item.inputList.forEach(item => {
								list.push(item)
							})
							item.inputList = list
						}

						item.index = item.inputList.length
						let set;
						console.log('我看看你刷新了几次', this.value.productAttributeValueList.length)
						if (this.value.productAttributeValueList.length) {
							this.value.productAttributeValueList.forEach(items => {
								if (item.attributeId === items.productAttributeId) {
									if (item.selectType === 1) {
										item.check = items.value
										set = new Set([item.check])
									} else {
										item.check = items.value.split(',')
										set = new Set([...item.check])
									}
									item.inputList = new Set([...item.inputList, ...set]);
									item.inputList = Array.from(item.inputList)
								}
							})
						}
					})
					this.attrList = res.data.data
					if (this.star) {
						this.handleStarTable(true)
						this.star = false
					}

				}).catch((err) => {

				});
			}
		},
		getHtml: {
			handler (newVal) {
				if (this.value.detailMobileHtml) {
					this.editor.txt.html(this.value.detailMobileHtml)
				}
			}
		},
		getSku: {
			handler (newval) {

				if (newval.length) {
					// this.handleStarTable()
					this.$set(this.tableList, 'data1', [...newval])
					console.log(this.tableList, '监听之后')
					this.star = true
				}
			},
			deep: true
		}

		// productAttributeCategoryId (newval){
		// 	console.log('你到底是什么类型的',newval)

		// 	this.value.productAttributeCategoryId = ''
		// 	// this.refs.select.setQuery(this.productAttributeCategoryId);
		// },
	},
	mounted () {
		this.editor = new E(this.$refs.editor);
		console.log(this.editor.customConfig, 'nimabi')
		this.editor.customConfig.uploadImgShowBase64 = false;
		this.editor.customConfig.pasteIgnoreImg = true
		this.editor.customConfig.uploadFileName = 'file'
		this.editor.customConfig.uploadImgServer = `${baseUrl}/file/upload`
		this.editor.customConfig.uploadImgHeaders = {
			'Authorization': getToken()
		};
		this.editor.customConfig.showLinkImg = false
		this.editor.customConfig.uploadImgHooks = {
			before: function (xhr, editor, files) {

			},
			success: function (xhr, editor, result) {
				console.log("上传成功");
			},
			fail: function (xhr, editor, result) {
				console.log(xhr, editor, result);
			},
			error: function (xhr, editor) {
				console.log("上传出错");
			},
			timeout: function (xhr, editor) {
				console.log("上传超时");
			},
			customInsert: function (insertImg, result, editor) {

				let { url } = result.data
				insertImg(url)

				// result 必须是一个 JSON 格式字符串！！！否则报错
			}
		}
		this.editor.create();
		console.log(this.value.productAttributeValueList.length, '页面挂在时的长度')
		if (this.value.detailMobileHtml) {
			this.editor.txt.html(this.value.detailMobileHtml)
		}

	},
	created () {
		productAttributeList({ pageNum: 1, pageSize: 1000 }).then((res) => {
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

<style scoped>
.box {
	margin-top: 40px;
}
.card-list {
	margin-top: 40px;
}
.card-list:first-child {
	margin-top: 0;
}
.font {
	font-size: 14px;
	margin-left: 10px;
}
.title {
	font-size: 16px;
	color: #333;
}
.delete {
	white-space: nowrap;
}
.flex {
	display: flex;
	flex-wrap: wrap;
}
</style>