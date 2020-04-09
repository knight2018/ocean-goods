<template>
	<div>
		<Hoc />
	</div>
</template>
<script>
import testPromise from '../components/hoc/hoc'
import TemplateWrapped from './templateWrapped'
let promiseFn = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ zz: '呀屎拉你' })
		}, 1000)
	})
}
let Hoc = testPromise(TemplateWrapped, promiseFn)
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