<template>
	<section id="photoList">
		<v-swipe :swipes="lunbos"></v-swipe>
		
		<!-- 商品购买 => Mui中的卡片视图 -->
		<div class="mui-card">
			<div class="mui-card-header">{{ details.title }}</div>
			<div class="mui-card-content mui-card-content-inner">
				<div class="price" style="color: rgb(51, 51, 51);">
					<s>市场价:￥{{ details.market_price }}</s>
					<span>销售价: </span>
					<em>￥{{ details.sell_price }}</em>
				</div>
				<div>
					<span>购买数量：</span>
					<!-- 数字输入框 -->
					<!-- 使用公共组件 -->
					<v-numbox :initNum="goodsBuyNum" @change="getGoodsBuyNum"></v-numbox>
				</div>
			</div>
			<div class="mui-card-footer">
				<button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">购买</button>
				<div></div>
				<button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined" @click="addShopcart">加入购物车</button>
			</div>
		</div>

	</section>
</template>

<script>
	import comSwipe from '../common/swipe.vue';
	import { goodsBuySet,goodsBuyGet,goodsBuyGetAll,goodsBuyTotal } from '../../js/mGoodsBuyData'
	
	export default {
		data:function(){
			return {
				lunbos:[],
				details:{},
				goodsBuyNum:goodsBuyGet(this.$route.params.id)||0
			}
		},
		created:function(){
			this.getLunbos();
			this.getGoodsDetails();

		},
		methods:{
			 // 获取轮播图数据
			getLunbos() {
				var id = this.$route.params.id;
				var url = 'http://139.199.192.48:8888/api/getthumimages/' + id;
				
				this.$http.get(url).then(rep=>{
					if(rep.body.status === 0) {
						this.lunbos = rep.body.message; 
					}
					
					// 因为接口返回的数据中，图片url地址有问题，为了项目看起来完整，
					// 所有我们手动把图片的src参数替换为我们本地图片的url。
					this.lunbos.forEach((photo, i)=>{
						i %= 16;
						photo.src = '../src/img/' + i + '.jpg';
						
						//  因为这里使用了轮播图组件，轮播图中使用的是img属性，
						// 所以做个转换，把src转为img属性。
						photo.img = photo.src;
					});
				});
			},

			// 获取商品的详细信息
			getGoodsDetails(){
				var id=this.$route.params.id;
				var url='http://139.199.192.48:8888/api/goods/getinfo/' + id;
				this.$http.get(url).then(res=>{
					if(res.body.status===0){
						this.details=res.body.message[0];
					}

					this.goodsBuyNum=goodsBuyGet(this.details.id);
				})
			},
			// 每次数字输入值变化，父都会接收修改后的值
			getGoodsBuyNum(numbers){
				this.goodsBuyNum=numbers;
			},

			// 添加购物车
			addShopcart(){
				// 以当前商品的ID为key，把该商品购买的数量存储起来
				goodsBuySet(this.details.id,this.goodsBuyNum);
				document.querySelector('.mui-badge').innerText=goodsBuyTotal();
			}
		},

		components:{
			'v-swipe':comSwipe
		}
	} 

</script>

<style scoped>
	.mui-card-footer div{
		width: 100%;
	}
	
	.mui-card-footer .mui-btn {
		padding: 8px 0;
		font-size: 16px;
	}
	
	.mui-card-content .price {
		margin-bottom: 4px;
	}
	
	.mui-card-content .price span {
		margin-left: 6px;
	}
	
	#goods-details .price em {
		font-size: 18px;
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
</style>
