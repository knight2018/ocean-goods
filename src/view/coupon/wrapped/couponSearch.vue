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
	</div>
</template>
<script>
export default {
    name: 'CouponSearch',
    props:{
        loading:{
            type: Boolean,
            default: false
        },
        handleSearch:{

        }
    },
	data () {
		return {
			search: {
				couponName: '',
				type: 0,
				category: 0
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
    methods:{
        handleClear(){
            this.search = {
                couponName: '',
				type: 0,
				category: 0
            }
            this.handleSearch()
        }
    }
}
</script>

<style scoped>
</style>