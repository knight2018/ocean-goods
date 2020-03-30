<template>
	<div class="table-components">
		<Table border :columns="columns" disabled-hover :data="data"></Table>
	</div>
</template>
<script>
export default {
	name: 'ModelTable',
	props: {
        columns:{
            type: Array,
            default: []
        },
        data:{
            type: Array,
            default: []
        }
	},
	data () {
		return {
			
		}
	},
}
</script>

<style>
.table-components .ivu-table-header th {
	background: #f2f6fc; 
}
</style>