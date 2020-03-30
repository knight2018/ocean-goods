<template>
	<div class="data-box">
		<div>
			<Icon type="md-paper" :size="25" />
			<span class="mg-lf">数据列表</span>
		</div>
        <div>
            <Button @click="add" v-if="show">添加</Button>
        </div>
	</div>
</template>
<script>
export default {
    name: 'tabBar',
    props: {
        add:{

        },
        show: {
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
.data-box{
    display: flex;
    justify-content: space-between;
    padding: 15px 30px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #515a6e;
    border-radius: 5px;
    font-size: 18px;
}
.mg-lf{
    margin-left: 10px;
}
</style>