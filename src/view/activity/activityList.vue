<template>
	<div>
		<Hoc />
	</div>
</template>
<script>
import searchListHOC from '../components/hoc/searchListHOC'
import ActivitySearch from './wrapped/activitySearch'
import { activityList } from '../../api/activity'
let promiseFn = (data) => {
	return new Promise((resolve,reject) => {
		activityList(data).then((res) => {
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
let Hoc = searchListHOC(ActivitySearch, promiseFn)
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