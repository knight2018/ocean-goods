<template>
	<Hoc></Hoc>
</template>
<script>import searchListHOC from '../components/hoc/searchListHOC'
import UsreSearch from './wrapped/usreSearch'
import { customerList } from '../../api/userInfo'
let promiseFn = (data) => {
	return new Promise((resolve, reject) => {
		customerList(data).then((res) => {
			let params = {
				data: res.data.data,
				total: res.data.total
			}
			resolve(params)
		}).catch((err) => {
			reject(err)
		});
	})
}
let Hoc = searchListHOC(UsreSearch, promiseFn)
export default {
	components: { Hoc },
	data () {
		return {
		}
	},
}
</script>

<style>
</style>