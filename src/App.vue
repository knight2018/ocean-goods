<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.relative{
  position: relative;
}
#app {
  .size;
}
.mg-lf {
  margin-left: 15px;
}
.mg-tp {
  margin-top: 15px;
}
.mg-lf-30{
  margin-left: 30px;
}
.right {
  position: absolute;
  right: 20px;
}
.center {
  position: absolute;
  left: 50%;
  margin-left: -50px;
  margin-top: 15px;
}
.flex{
  display: flex;
  flex-wrap: wrap;
}
.add-box {
  display: flex;
  justify-content: center;
  align-items: center;
	width: 900px;
	height: auto;
	padding: 30px;
	margin: 10px auto;
	border: 1px solid #ebeef5;
	background-color: #fff;
	color: #515a6e;
	border-radius: 5px;
}
</style>
