<template>
	<div class="banner">
		<img v-for="(url,i) in imgArray" :key="i" :src="url" v-show="n==i">
		<div class="banner-circle">
			<ul>
				<li v-for="(url,i) in imgArray" :key="i" :class="n==i?'selected':''"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	// 图片轮播功能
	export default {
		name: "Banner",  
		data(){
			return {
				timer: null,
				n: 0,
				imgArray: [
					require('../assets/img/1.jpg'),
					require('../assets/img/2.jpg'),
					require('../assets/img/3.jpg'),
					require('../assets/img/4.jpg'),
				]
			}
		},
		methods:{
			play(){
				this.timer = setInterval(this.autoPlay, 2000)  //2秒的定时器
			},
			autoPlay(){
				this.n++;
				if(this.n == this.imgArray.length){
					this.n = 0;
				}
			}
		}，
		mounted:function(){
			this.play();  //挂载完成后启动定时器
		},
		destroyed:function(){
			clearInterval(this.timer)  //销毁时关闭定时器
		}
	}
</script>

<style scoped>
	.banner {
		position: relative;
	}
	.banner .banner-circle {
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		color: #fff;
	}
	.banner .banner-circle li{
		display: inline-block;
		background: rgba(0,0,0,0.3);
		border-radius: 50%;
		padding: 5px;
		margin: 2px;
	}
	.banner .banner-circle ul{
		text-align: center;
	}
	.banner .banner-circle .selected {
		background:rgba(0,0,0,0.8);
	}
	.banner img{
		width: 100%;
	}
</style>