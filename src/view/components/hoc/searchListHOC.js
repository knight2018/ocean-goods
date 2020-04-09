//前言： 我们后台业务其实相似度其实非常高，区别只是搜索条件的不同，与请求接口的不同。
//这种情况下完全可以使用一个组件，自定义搜索条件solt，跟自定义请求函数，那么在这种情况下为什么会选择这种方式来封装组件，因为我已经懒得处理loading了
const searhListHOC = (wrapped, promiseFn) => {
    return {
        data () {
            return {
                loading: false,
                result: {},
                tableList: {
                    total: 20
                },
                search:{}
            }
        },
        methods: {
            handleAdd () {
                console.log(this)
            },
            handleSearch (){

            },
            handleChange(){
                console.log('你点我干啥')
            }
        },
        mounted () {

        },
        render (h) {

            return (<div>
                <wrapped ref="wrapped" loading={this.loading} result={this.result}></wrapped>
                <tabBar show={true} add={this.handleAdd}></tabBar>
                <TablePage
                    columns={this.tableList.columns}
                    data={this.tableList.data1}
                    total={this.tableList.total}
                    v-model={this.search.page}
                    limit={this.search.limit}
                    handleSearch={this.handleSearch}
                    loading={this.loading}
                    onClick:changeLimit={this.handleChange}
                    getId={this.getSelect}
                ></TablePage>
            </div >)
        },
    }
}
export default searhListHOC;