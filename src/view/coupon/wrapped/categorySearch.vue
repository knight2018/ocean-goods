<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<div>
					<span>品类名称名称：</span>
					<Input
						style="width:200px;"
						v-model="search.couponName"
						@on-enter="handleSearch"
						placeholder="请输入品类名称名称"
					/>
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
				name: ''
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
					title: '品类范围',
					key: 'productCategoryNames',
					align: 'center',
                    
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
											name: 'couponCategoryAdd',
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
			]

		}
	},
	methods: {
		handleClear () {
			this.search = {
				name: ''
			}
			this.handleSearch()
        },
        handleAdd (){
            this.$router.push('/couponCategoryAdd')
        }
	}
}
</script>

<style>
</style>