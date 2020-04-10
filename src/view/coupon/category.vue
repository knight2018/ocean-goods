<template>
	<div>
		<Hoc />
	</div>
</template>
<script>
import searchListHOC from '../components/hoc/searchListHOC'
import CategorySearch from './wrapped/categorySearch'
let promiseFn = (data) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ zz: '呀屎拉你' })
		}, 1000)
	})
}
let Hoc = searchListHOC(CategorySearch, promiseFn)
export default {
	components: { Hoc },
	data () {
		return {
         
		}
	},
	methods: {
   }
}
</script>

<style scoped>
</style>