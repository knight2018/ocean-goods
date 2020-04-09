<template>
	<div>
		<Search :handleSearch="handleSearch" :handleClear="handleClear" :loading="loading">
			<div class="flex">
				<div>
					<span>优惠券名称：</span>
					<Input
						style="width:200px;"
						v-model="search.couponName"
						@on-enter="handleSearch"
						placeholder="请输入优惠券名称"
					/>
				</div>
				<div class="mg-30">
					<span>优惠券类型：</span>
					<Select v-model="search.type" style="width:220px" clearable placeholder="请选择优惠券类型（默认全部）">
						<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
				<div class="mg-30">
					<span>品类搜索：</span>
					<Select
						v-model="search.category"
						style="width:220px"
						clearable
						filterable
						placeholder="请选择品类搜索（默认全部）"
					>
						<Option v-for="item in categoryList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
			</div>
		</Search>
		<tabBar :show="true" :add="handleAdd"></tabBar>
		<TablePage
			:columns="tableList.columns"
			:data="tableList.data1"
			:total="tableList.total"
			v-model="search.page"
			:limit="search.limit"
			:handleSearch="handleSearch"
			:loading="loading"
			@change-limit="handleChange"
			:getId="getSelect"
		></TablePage>
		<Hoc />
	</div>
</template>
<script>
import searchListHOC from '../components/hoc/searchListHOC'
import TemplateWrapped from '../testHoc/templateWrapped'
let promiseFn = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ zz: '呀屎拉你' })
		}, 1000)
	})
}
let Hoc = searchListHOC(TemplateWrapped, promiseFn)
export default {
	components: { Hoc },
	data () {
		return {
         loading: false,
			search: {
				couponName: '',
				type: 0,
				category: 0
			},
			tableList: {
				columns: [],
				data1: [],
				total: 0,
				page: 1,
				limit: 10
			},
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
			categoryList: []
		}
	},
	methods: {
		async handleSearch () {
			this.loading = true
			this.loading = false
		},
		handleChange () {

		},
		getSelect () {

		},
		handleAdd () {

      },
      handleClear (){

      }
	},
	mounted () {

	}
}
</script>

<style scoped>
</style>