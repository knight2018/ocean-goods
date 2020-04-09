const testPromise = (wrapped, promsieFn) => {
    return {
        data () {
            return {
                loading: false,
                error: false,
                result: undefined
            }
        },
        async mounted () {
            console.log(this.$refs.wrapped)
            this.loading = true //子组件挂在，loading开始转
            this.result = await promsieFn().finally(() => {
                this.loading = false;
            })
        },
        render (h) {
            return (<div>
                <span v-show={this.error}>这是公共错误</span>
                <wrapped ref="wrapped" loading={this.loading} result={this.result}></wrapped>
                <span v-show={this.loading}>这是公共加载</span>
            </div>)
        }
    }
}
export default testPromise;