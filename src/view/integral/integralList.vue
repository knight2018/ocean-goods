<template>
	<div>
		<div class="add-box">
			<Form
				ref="formIntegral"
				:model="formIntegral"
				:rules="ruleInline"
				label-colon
				:label-width="100"
			>
				<FormItem label="用户初始积分">
					<InputNumber :min="0" v-model="formIntegral.init" style="width:200px" />
				</FormItem>
				<FormItem label="积分获得规则">
					每消费
					<InputNumber :min="0" v-model="formIntegral.money" style="width:200px" />元得
					<InputNumber :min="0" v-model="formIntegral.getInit" style="width:200px" />
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmit('formIntegral')" class="mg-tp">修改</Button>
				</FormItem>
			</Form>
		</div>
		<Table :columns="tableList.columns" :data="tableList.data1"></Table>
	</div>
</template>
<script>
import { activityUpdate, integrationSetting } from '../../api/integral'
export default {
	data () {
		return {
			formIntegral: {
				id: 1,
				init: 0,
				money: 0,
				getInit: 0
			},
			ruleInline: {

			},
			tableList: {
				columns: [
					{
						title: 'No.',
						key: 'id',
						align: 'center'
					},
					{
						title: '积分规则',
						key: 'id',
						align: 'center',
						render: (h, params) => {
							return h('div', {}, `每消费${params.row.rule[0]}得${params.row.rule[1]}`)
						}
					},
				],
				data1: []
			}
		}
	},
	methods: {
		handleSubmit (name) {

			let formIntegral = JSON.parse(JSON.stringify(this.formIntegral))
			formIntegral.rule = [formIntegral.money, formIntegral.getInit].join(',')

			activityUpdate(formIntegral.id, formIntegral).then((res) => {
				this.$Message.success('修改成功')
				this.handleSearch()
			}).catch((err) => {

			});

		},
		handleSearch () {
			integrationSetting(1).then((res) => {
				console.log(res)
				res.data.data.rule = res.data.data.rule.split(',')
				let obj = res.data.data
				this.formIntegral.id = obj.id
				this.formIntegral.init = obj.init
				this.formIntegral.money = obj.rule[0] * 1
				this.formIntegral.getInit = obj.rule[1] * 1
				this.tableList.data1 = [obj] 
			}).catch((err) => {

			});
		}
	},
	mounted () {
      this.handleSearch()
	}
}
</script>

<style scoped>
</style>