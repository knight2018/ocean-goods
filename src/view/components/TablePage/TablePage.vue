<template>
	<div class="flex just">
		<Table
			:columns="columnsPage"
			:highlight-row="highlight"
			:data="dataPage"
			@on-selection-change="getSelect"
			@on-current-change="getRow"
			ref="tables"
			style="width:100%;"
		></Table>
		<Page
			:total="totalPage"
			@on-change="handlePage"
			:page-size="limitPage"
			:current="page"
			@on-page-size-change="handleLimit"
			show-sizer
			show-total
			show-elevator
			:page-size-opts="sizeLsit"
			style="margin-top:10px"
			class="page-right"
		></Page>
	</div>
</template>

<script>
export default {
	name: "TablePage",
	props: {
		columns: {
			type: Array,
			default: () => []
		},
		data: {
			type: Array,
			default: () => []
		},
		total: {
			type: Number,
			default: 0
		},
		highlight: {
			type: Boolean,
			default: false
		},
		value: {
			type: Number,
			default: 1
		},
		limit: {
			type: Number,
			default: 10
		},
		handleSearch: {},
		getId: {}
	},
	data () {
		return {
			columnsPage: this.columns,
			dataPage: this.data,
			totalPage: this.total,
			limitPage: this.limit,
			page: this.value,
			sizeLsit: [5, 10, 20]
		};
	},
	methods: {
		handlePage (index) {
			this.page = index;
		},
		handleLimit (limit) {
			this.limitPage = limit;
		},
		getSelect (id) {
			this.getId && this.getId(id)
		},
		getRow (row) {
			this.$emit('get-row', row)
		}
	},
	watch: {
		columns (newVal) {
			this.columnsPage = newVal;
		},
		data (newVal) {
			this.dataPage = newVal;
		},
		total (newVal) {
			this.totalPage = newVal;
		},
		limit (val) {
			this.limitPage = val;
		},
		value (val) {
			this.page = val;
		},
		limitPage (val) {
			this.$emit("change-limit", val);
		},
		page (val) {
			this.$emit("input", val);
			this.handleSearch('page');
		}
	},
	created () {
	}
};
</script>

<style scoped>
.just {
	flex-direction: column;
}
.page-right {
	align-self: flex-end;
}
</style>
