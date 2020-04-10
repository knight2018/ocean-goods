<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<div>
					<span>名称：</span>
					<Input
						style="width:200px;"
						v-model="search.name"
						@on-enter="handleSearch"
						placeholder="请输入名称"
					/>
				</div>
				<div class="mg-30">
					<span>优惠券类型：</span>
					<Select v-model="search.type" style="width:220px" clearable placeholder="请选择优惠券类型（默认全部）">
						<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
			</div>
		</Search>
	</div>
</template>
<script>
export default {
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		handleSearch: {

		}
	},
	data () {
		return {
			search: {
				name: '',
				type: 0
			},
			columns: [
				{
					title: '编号',
					key: 'id',
					align: 'center'
				},
				{
					title: '名称',
					key: 'name',
					align: 'center'
				},
				{
					title: '优惠券类型',
					key: 'type',
					align: 'center',
                    render:(h,params)=>{
                        return h('span',{},this.typeList[params.row.type-1].label)
                    }
				},
				{
					title: '优惠金额',
					key: 'fuck',
					align: 'center'

				},
				{
					title: '创建时间',
					key: 'createTime',
					align: 'center',

				},
				{
					title: '创建人',
					key: 'creatorName',
					align: 'center',

				},
				{
					title: '操作',
					key: 'packName',
					align: 'center',
					render: (h, params) => {
						return h('div', {
							style: {
								display: 'flex',
								justifyContent: 'center'
							}
						}, [
							h('i-button', {
								style: {
									marginLeft: '15px'
								},
								on: {
									click: () => {
										let newObj = JSON.parse(JSON.stringify(params.row))
										this.$router.push({
											name: 'moneyAdd',
											query: {
												obj: JSON.stringify(newObj)
											}
										})
									}
								}
							}, '编辑')
						])
					}
				}
			],
			typeList: [
				{
					value: 1,
					label: '立减'
				},
				{
					value: 2,
					label: '满减'
				},
				{
					value: 3,
					label: '折扣'
				},
			],

		}
	},
	methods: {
		handleClear () {
			this.search = {
				name: '',
				type: 0
			}
			this.handleSearch()
        },
        handleAdd (){
            this.$router.push('/moneyAdd')
        }
	}
}
</script>

<style>
</style>