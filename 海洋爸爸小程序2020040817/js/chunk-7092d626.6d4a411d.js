(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7092d626"],{"49e1":function(t,e,o){"use strict";o.d(e,"b",(function(){return a})),o.d(e,"a",(function(){return n})),o.d(e,"c",(function(){return u}));o("7f7f");var r=o("66df"),a=function(t){var e=t.name,o=t.position,a=t.showStatus,n=t.pageNum,u=t.pageSize,s={name:e,position:o,showStatus:a,pageNum:n,pageSize:u};return r["a"].request({url:"/elasticLayer/list",params:s,method:"get"})},n=function(t){return r["a"].request({url:"/elasticLayer/create",data:t,method:"post",headers:{"content-type":"application/json"}})},u=function(t,e){return r["a"].request({url:"/elasticLayer/update/".concat(t),data:e,method:"post",headers:{"content-type":"application/json"}})}},"722d":function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"add-box"},[o("Form",{ref:"formPopup",attrs:{model:t.formPopup,rules:t.ruleInline,"label-colon":"","label-width":100}},[o("FormItem",{attrs:{prop:"name",label:"管理图名称"}},[o("Input",{staticStyle:{width:"300px"},model:{value:t.formPopup.name,callback:function(e){t.$set(t.formPopup,"name",e)},expression:"formPopup.name"}})],1),o("FormItem",{attrs:{prop:"picUrl",label:"弹层图"}},[o("UploadImg",{attrs:{off:t.off},model:{value:t.formPopup.pic,callback:function(e){t.$set(t.formPopup,"pic",e)},expression:"formPopup.pic"}})],1),o("FormItem",{attrs:{prop:"position",label:"展示位置"}},[o("Select",{staticStyle:{width:"200px"},attrs:{filterable:""},model:{value:t.formPopup.position,callback:function(e){t.$set(t.formPopup,"position",e)},expression:"formPopup.position"}},t._l(t.positionList,(function(e){return o("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])})),1)],1),o("FormItem",{attrs:{prop:"show",label:"展示状态"}},[o("i-switch",{attrs:{"true-value":1,"false-value":2},model:{value:t.formPopup.showStatus,callback:function(e){t.$set(t.formPopup,"showStatus",e)},expression:"formPopup.showStatus"}})],1),o("FormItem",{attrs:{prop:"productSn",label:"展示的商品"}},[o("Select",{staticStyle:{width:"200px"},attrs:{disabled:""},model:{value:t.formPopup.productSn,callback:function(e){t.$set(t.formPopup,"productSn",e)},expression:"formPopup.productSn"}},t._l(t.shopList,(function(e){return o("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])})),1),o("Button",{staticClass:"mg-lf",on:{click:t.handleAddShop}},[t._v("选择商品")])],1),o("FormItem",[o("Button",{staticClass:"mg-tp",attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit("formPopup")}}},[t._v(t._s(t.formPopup.id?"修改"+t.formPopup.name:"添加"))])],1)],1),o("SelectCommodity",{attrs:{productSn:t.formPopup.productSn},on:{"on-change":t.handleChange},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}})],1)},a=[],n=(o("7f7f"),o("90de")),u=o("49e1"),s=o("e692"),p={data:function(){return{show:!1,formPopup:{name:"",creater:localStorage.userId,id:null,pic:"",position:1,showStatus:1,productSn:0},positionList:[{value:1,label:"首页弹层"}],off:2,shopList:[],ruleInline:{name:[{required:!0,message:"请输入管理图名称",trigger:"blur,change"},{type:"string",max:15,message:"不能超过15个字符",trigger:"blur,change"}],pic:[{required:!0,message:"请上传弹层图",trigger:"blur,change"}],productSn:[{required:!0,type:"number",message:"请选择商品",trigger:"blur,change"}],position:[{required:!0,type:"number",message:"请选择商品",trigger:"blur,change"}]}}},methods:{handleSubmit:function(t){var e=this;this.$refs[t].validate((function(t){t?e.formPopup.id?Object(u["c"])(e.formPopup.id,e.formPopup).then((function(t){e.off=1,e.$Message.success("修改成功"),e.$router.back()})).catch((function(t){})):Object(u["a"])(e.formPopup).then((function(t){e.off=1,e.$Message.success("添加成功"),e.$router.push({name:"/popup"})})).catch((function(t){})):e.$Message.error("Fail!")}))},handleAddShop:function(){this.show=!0},handleChange:function(t){this.shopList=[t],this.formPopup.productSn=t.value},getShopList:function(t){var e=this;Object(s["e"])(t).then((function(t){e.shopList=[{value:t.data.data.productSn,label:t.data.data.productName}]})).catch((function(t){}))}},mounted:function(){if(this.$route.query.obj){var t=JSON.parse(this.$route.query.obj);this.formPopup=Object(n["h"])(t,this.formPopup),this.getShopList(this.formPopup.productSn)}}},i=p,c=o("2877"),l=Object(c["a"])(i,r,a,!1,null,"7916ff26",null);e["default"]=l.exports}}]);