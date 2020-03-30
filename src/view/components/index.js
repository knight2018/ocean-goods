import UploadImg from './UploadImg'
import Search from './search'
import tabBar from './tabBar'
import TablePage from './TablePage'
import SelectCommodity from './selectCommodity'
const myCom = {
    UploadImg,
    Search,
    tabBar,
    TablePage,
    SelectCommodity
}

const install = function(Vue) {
    Object.keys(myCom).forEach(key => {
        Vue.component(key, myCom[key]);
    });
}
export default {
    install
}