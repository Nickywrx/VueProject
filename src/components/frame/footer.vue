
<template>
	<footer id="footer">
	<!-- 使用了mui -->
	<nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item" href="#/">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item mui-active" href="#/goods/list">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">商品购买</span>
			</a>
			<a class="mui-tab-item" href="#/shopcart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{total}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a>
		</nav>
		
		<!-- 占位标签 -->
		<i></i>
	</footer>
</template>

<script>
	import { goodsBuyTotal } from '../../js/mgoodsBuyData';
	export default {
		data(){
			return {
				total:goodsBuyTotal()
			};
		}
	}
</script>

<style scoped>
	
	#footer i{
		display: block;
		height: 50px;
	}
</style>
