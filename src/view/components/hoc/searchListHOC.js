//前言： 我们后台业务其实相似度其实非常高，区别只是搜索条件的不同，与请求接口的不同。
//这种情况下完全可以使用一个组件，自定义搜索条件solt，跟自定义请求函数，那么在这种情况下为什么会选择这种方式来封装组件，因为我已经懒得处理loading了
//现在我们做一个约定，由于要传入的数据比较多，我们不能一个个作为args来传入，所以我们将传递数据放在wrapped组件里面
//search是一个对象，他是作为查询条件存在的
//columns作为表格头部存在
//关于传入的promiseFn 获取的格式暂时定为后台返回的格式data:{data:[]}，如有需要可以手动更改
//跳转页面默认的wrapped默认是handleAdd
const searhListHOC = (wrapped, promiseFn) => {
    return {
        data () {
            return {
                loading: false,
                result: {},
                tableList: {
                    columns: [],
                    data1: [],
                    total: 0
                },
                search: {
                    pageNum: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            handleAdd () {
                this.$refs.wrapped.handleAdd()
            },
            handleChange (val) {
                this.search.pageSize = val
                this.handleSearch()
            },
            async handleSearch (off) {
                if (off !== 'page') {
                    this.search.pageNum = 1
                }
                let { search } = this.$refs.wrapped;
                let params = this.search
                this.loading = true;
                let result = await promiseFn({ ...params, ...search }).finally(() => {
                    this.loading = false;
                });
                this.tableList.data1 = result.data
                this.tableList.total = result.total
            }
        },
        mounted () {
            let { columns } = this.$refs.wrapped;
            this.tableList.columns = columns
            this.handleSearch()
        },
        computed: {
            getPage () {
                return this.search.pageNum
            }
        },
        watch: {
            getPage: {
                handler (val) {
                    console.log(val)
                },
                deep: true
            }
        },
        render (h) {
            return (<div>
                <wrapped ref="wrapped" loading={this.loading} handleSearch={this.handleSearch}  on={this.$listeners}></wrapped>
                <tabBar show={true} add={this.handleAdd}></tabBar>
                <TablePage
                    columns={this.tableList.columns}
                    data={this.tableList.data1}
                    total={this.tableList.total}
                    v-model={this.search.pageNum}
                    limit={this.search.pageSize}
                    handleSearch={this.handleSearch}
                    loading={this.loading}
                    on={{
                        'change-limit': this.handleChange
                    }}
                    getId={this.getSelect}
                ></TablePage>
            </div >)
        },
    }
}
export default searhListHOC;