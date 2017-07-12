<template>
	<section id="goods-list">
		
		<!-- 商品列表 =》卡片视图 MUI -->
		<ul class="goods-list">
			<li v-for="item in goodsList" class="mui-col-xs-6">
				<router-link v-bind="{ to:'/goods/details/'+item.id }">
					<div class="mui-card">
						<!-- <div class="mui-card-header mui-card-media" :style="getGoodsBgStyle(item.img_url)"></div> -->
						<div>
					<img v-lazy="item.img_url"/>
				</div>
						<div class="mui-card-footer">
							<p>{{ item.title }}</p>
						</div>
						<div class="mui-card-content">
								<p class="price" style="color: #333;">
									<span>￥{{ item.sell_price }}</span>
									<s>￥{{ item.market_price }}</s>
								</p>
								<p class="tip">
									<span>热卖中</span>
									<span>剩余{{ item.stock_quantity }}件</span>
								</p>
						</div>
					</div>
				</router-link>
			</li>
			
		</ul>
		<button @click='getGoodsList(pageindex++)' type="button" class="mui-btn mui-btn-block mui-btn-outlined">加载更多....</button>
	</section>
</template>

<script>

	export default{
		data:function(){
			return {
				goodsList:[],
				pageindex:1
			}
		},
		created:function(){
			this.getGoodsList();
		},
		methods:{
			getGoodsList:function(){
				var url='http://139.199.192.48:8888/api/getgoods?pageindex=' + this.pageindex
				this.$http.get(url).then(function(res){
					this.goodsList.push.apply(this.goodsList,res.body.message);
					// this.goodsList=res.body.message;
				});
			},
			//设置图片背景 
			getGoodsBgStyle(imgurl){
				return 'height :180px; background-image:url(' + imgurl + ')'
			}
		}
	}

</script>

<style scoped>
	
	ul, li, p {
		margin: 0;
		padding: 0;
	}
	
	li {
		list-style: none;
	}
	
	.goods-list {
		overflow: hidden;
		padding: 8px 4px;
	}
	
	.goods-list li{
		float: left;
		margin-bottom: 6px;
	}
	
	.goods-list .mui-card {
		margin: 0 2px;
	}
	
	.mui-card-footer {
		height: 80px;
		overflow: hidden;
	}
	
	.mui-card-content {
		padding: 0 4px;
		text-align: center;
	}
	
	.mui-card-content .price {
		margin-bottom: 4px;
	}
	
	.mui-card-content .price span {
		color: red;
	}
	
	.mui-card-content .tip {
		overflow: hidden;
		padding: 0 8px;
	}
	
	.mui-card-content .tip span:first-child {
		float: left;
	}
	
	.mui-card-content .tip span:last-child {
		float: right;
	}
	#goods-list img{
		height: 170px;
	}
</style>