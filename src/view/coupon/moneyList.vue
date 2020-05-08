<template>
	<div>
		<Hoc />
	</div>
</template>
<script>
import searchListHOC from '../components/hoc/searchListHOC'
import MoneySearch from './wrapped/moneySearch'
import { amountSetting } from '../../api/coupon'
let promiseFn = (data) => {
	return new Promise((resolve,reject) => {
		amountSetting(data).then((res) => {
            res.data.data.forEach(item => {
                if(item.type === 1){
                    item.fuck = item.amount
                }else if(item.type === 2){
                    item.fuck = `满${item.minPoint}减${item.amount}`
                }else{
                    item.fuck = `满${item.minPoint}打${item.discount*10}折`
                }
            });
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
let Hoc = searchListHOC(MoneySearch, promiseFn)
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