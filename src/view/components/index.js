import UploadImg from './UploadImg'
import Search from './search'
import tabBar from './tabBar'
import TablePage from './TablePage'
import SelectCommodity from './selectCommodity'
import SelectCoupon from './selectCoupon'
const myCom = {
    UploadImg,
    Search,
    tabBar,
    TablePage,
    SelectCommodity,
    SelectCoupon
}

const install = function(Vue) {
    Object.keys(myCom).forEach(key => {
        Vue.component(key, myCom[key]);
    });
}
export default {
    install
}