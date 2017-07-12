<template>
	<div id="tmpl">
		
		<div v-for="item in goodsBuyList" class="row">
			<mt-switch class="switch" v-model="item.isSelected"></mt-switch>
			<img class="img" :src="item.thumb_path">
			<div class="inforight">
				<h4>{{ item.title }}</h4>
				<div class="bottom">
					<ul>
						<li>￥{{ item.sell_price }}</li>
						<li>
							<v-numbox :initNum="goodsBuyTotal[item.id]"></v-numbox>
						</li>
						<li><a href="javascript:void(0)">删除</a></li>
					</ul>
				</div>
			</div>
		</div>

		<div id="total">
			<div class="desc">
				<ul>
					<li>总计（不含运费）</li>
					<li>已勾选商品{{ selectedGoodsCount }}件,总价:￥{{ selectedGoodsPrice }}元</li>
				</ul>
			</div>
			<div id="button">
				<mt-button  type="danger" size="small">去结算</mt-button>
			</div>
		</div>
		
	</div>
</template>

<script>
	 import { goodsBuyGetAll } from '../../js/mGoodsBuyData';
	export default {
		
		data() {
			return {
				goodsBuyList:[],
				goodsBuyTotal:goodsBuyGetAll()
			};
		},
		
		created() {
			this.getGoodsBuyList();
		},
		
		methods: {
			// 获取所有商品的信息
			getGoodsBuyList(){
				var ids=Object.keys(this.goodsBuyTotal).join(',');
				var url='http://139.199.192.48:8888/api/goods/getshopcarlist/'+ids;
				this.$http.get(url).then(res=>{
					if(res.body.status===0){

						res.body.message.forEach(obj=>{
							obj.isSelected=true;
						})
						this.goodsBuyList=res.body.message;
					}
					this.goodsBuyList.forEach(function(photo,i){
						i%=16;
						photo.thumb_path="../src/img/"+i+".jpg";
					})
				})
			}
		},

		computed:{
			selectedGoodsCount(){
				var sum=0;
				var tempObj={};
				this.goodsBuyList.forEach((goods,i)=>{
					tempObj[goods.id]=goods.isSelected;	
					})

				for(var id in this.goodsBuyTotal){
					if(tempObj[id]){
						sum+=this.goodsBuyTotal[id];
					}
					
				}
				return sum;
			},
			selectedGoodsPrice(){
				var sum=0;
					this.goodsBuyList.forEach((goods,i)=>{
						if(goods.isSelected){
							sum+=goods.sell_price*this.goodsBuyTotal[goods.id]
						}
					})
				return sum;
			}


		}
		
	};
</script>

<style scoped>
	.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 102px;
		display: flex;
		padding: 5px;
	}

	.switch{
		flex:0 0 52px;
	}

	.img{
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}

	.inforight{
		margin-left: 5px;
		flex:1;
	}
	
	.inforight ul{
		padding-left: 0px;
	}
	
	.inforight li{
		list-style: none;
		display: inline-block;
	}

	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}

	.bottom li:first-child{
		color:red;
		margin-right: 5px;
	}

	.bottom li:last-child{
		margin-left: 5px;
	}
	
	#total{
		height: 100px;
		background-color: rgba(0,0,0,0.1);
		display: flex;
		padding: 5px;;
	}

	#total ul {
	 padding-left: 0px;
	}
	
	#total li{
		list-style: none;
		font-size: 14px;
	}

	#button{
		flex:0 0 60px;
		margin: 30px 0 0 0 ;
	}

	.desc{

		flex:1;
	}
</style>