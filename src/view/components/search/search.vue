<template>
	<div class="search-box">
		<div class="search-title">
			<div class="search-left">
				<Icon type="ios-search" :size="28" />
				<span class="font mg-10" >筛选搜索</span>
			</div>
			<div class="search-right">
				<Button @click="handleClear">重置</Button>
				<Button type="primary" @click="handleSearch" icon="ios-search" class="mg-lf" :loading="loading">查询结果</Button>
			</div>
		</div>
        <div class="content">
            <slot></slot>
        </div>
	</div>
</template>
<script>
export default {
	name: 'Search',
	props: {
		handleSearch: {

		},
		handleClear: {

		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
		}
	},
}
</script>

<style scoped>
.search-box {
    width: 100%;
    padding: 30px;
	border: 1px solid #ebeef5;
	background-color: #fff;
    color: #515a6e;
    border-radius: 5px;
}
.search-title{
    display: flex;
    justify-content:space-between;
}
.font{
    font-size: 18px;
}
.mg-lf{
    margin-left: 20px;
}
.content{
    width: 90%;
    padding: 20px 0;
    margin: 0 auto;
    font-size: 16px;
}
.mg-30{
    margin-left: 30px;
}
.mg-10{
    margin-left: 10px;
}
</style>