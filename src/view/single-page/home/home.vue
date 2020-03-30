<template>
    <!-- <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row> -->
    <canvas ref="bubble" ></canvas>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import {getToken} from '@/libs/util'
import {
        HTTPget
} from '@/api/data'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      
    }
  },
  mounted () {
		const toke = getToken()
		console.log(toke)
    // if(toke){
    //   let url = '/statistics/new_gamer_funnel_list',
    //       page = 1,
    //       limit = 1;
    //   HTTPget({url,page,limit}).then((res) => {})
    // }
		let canvas = this.$refs.bubble;
		let canvasP = canvas.parentNode.parentNode.parentNode.parentNode.firstChild.clientHeight;
		let canvasH = canvas.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.clientWidth;
    var w=document.documentElement.clientWidth-canvasH-40;
		var h=document.documentElement.clientHeight-canvasP*2-30;
			canvas.width=w;
			canvas.height=h;
			window.onresize=function(){//当窗口大小发生变化
				w=document.documentElement.clientWidth-canvasH-40;
				h=document.documentElement.clientHeight-canvasP*2-30;
				canvas.width=w;
				canvas.height=h;
			}
			var canCon=canvas.getContext("2d");
			function random(min,max){
				return Math.random()*(max-min)+min;
			}
			var colorArry = ["#e08031","#c7ceb2","#199475","#0b6e48","#044d22"];
			function Bubble(){
				/*var Bubble =new Bublle();*/
			};
			Bubble.prototype={
				init:function(){//所有的小泡泡的基本零件
					this.x=random(0,w);//浏览器的最左边到最右边
					this.y=random(0,h);//浏览器的最左边到最右边
					this.r=random(0,3);//默认圆的大小
					this.color=colorArry[Math.floor(random(0,5))];
					this.xr=random(-1,1);//正值
					this.yr=random(-1,1);//正值
					this.D=50;//鼠标周围50个px的小泡泡
				},
				draw:function(){
					canCon.beginPath();
					canCon.fillStyle=this.color;
					canCon.arc(this.x,this.y,this.r,0,Math.PI*2)
					canCon.fill();
				},
				update:function(){
					this.x+=this.xr;
					this.y+=this.yr;
					if(this.x-this.r<0||this.x+this.r>w){
						this.xr = -this.xr;
					}
					if(this.y-this.r<0||this.y+this.r>h){
						this.yr = -this.yr;
					}
					this.xD =(positionX-this.x)<0?-(positionX-this.x):(positionX-this.x);
					this.yD =(positionY-this.y)<0?-(positionY-this.y):(positionY-this.y);
					if(this.xD<this.D&&this.yD<this.D&&this.r<50){
						this.r+=1;
					}
					else if(this.r>4&&this.xD>this.D&&this.yD>this.D){
						this.r-=1;
					}
					this.draw();
				}
			}
			var bubbleArry=[];
			function create(){
				var bubble =new Bubble();
				bubble.init();
				bubble.draw();
				bubbleArry.push(bubble);
			}
		   for(var i = 0;i<500;i++){
		   	create();
		   }
		   setInterval(function(){
		   	canCon.clearRect(0,0,w,h);
		   for(var b of bubbleArry){
	          b.update();
            }
		   },1000/60);
		   var positionX,positionY;
		canvas.onmousemove=function(){
				var ev=ev||window.event;
				positionX=ev.clientX-80;
				positionY=ev.clientY-84;
		   }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>