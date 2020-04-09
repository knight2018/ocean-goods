<template>
    <div>
        <span>{{this.result?this.result.zz: ''}}</span>
        <span>这是一个简单的组件{{this.loading}}</span>
    </div>
</template>
<script>
export default {
    name:'TemplateWrapped',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        result:{
            type: Object,
            default: ()=>{}
        }
    },
   data() {
      return {
      }
   },
    mounted (){
    }
}
</script>

<style>


</style>