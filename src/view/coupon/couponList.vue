<template>
	<div>
		<Hoc />
	</div>
</template>
<script>
import searchListHOC from '../components/hoc/searchListHOC'
import CouponSearch from './wrapped/couponSearch'
import { couponList } from '../../api/coupon'
let promiseFn = (data) => {
	return new Promise((resolve,reject) => {
		couponList(data).then((res) => {
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
let Hoc = searchListHOC(CouponSearch, promiseFn)
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