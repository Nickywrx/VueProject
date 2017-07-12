<template>
	<section id="photoList">
		<!-- 图片分类导航 -->
		<ul>
			<li @click='getPhotoList(0)'>全部</li>
			<li v-for="item in photoCategorys" @click='getPhotoList(item.id)'>{{ item.title }}</li>
			
		</ul>

		<!-- 图片列表 -->
		<div>
			<div v-for="item in photoList" class="mui-card">
				<!-- <div class="mui-card-header mui-card-media" v-bind="{style:'height:40vw;background-image:url('+ item.img_url +')'}"></div> -->
				<!-- 懒加载 -->
				<a v-bind="{href:'#/photo/details/'+item.id}">
				<div>
					<img v-lazy="item.img_url"/>
				</div>

				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>{{ item.title }}</p>
						<p style="color: #333;">{{ item.zhaiyao }}</p>
					</div>
				</div>
				</a>
			</div>
			
		</div>
		
	</section>
</template>

<script>
	export default {
		data:function(){
			return {
				photoCategorys:[],
				photoList:[]
			};
		},
		created:function(){
			this.getPhotoCategory();
			this.getPhotoList();
		},
		methods:{
			// 1、获取图片分类列表
			
			getPhotoCategory:function(){
				var url='http://139.199.192.48:8888/api/getimgcategory';
				this.$http.get(url).then(function(res){
					if(res.body.status===0){
						this.photoCategorys=res.body.message;
					}
				})
			},

			// 2、获取图片列表
			getPhotoList:function(id){
				id=id||0;
				var url='http://139.199.192.48:8888/api/getimages/'+id;
				this.$http.get(url).then(function(res){
					if(res.body.status===0){
						this.photoList=res.body.message;
					}
					this.photoList.forEach(function(photo,i){
						i%=16;
						photo.img_url="../src/img/"+i+".jpg";
					})
						
					
				})
			}
		}
	}

</script>

<style scoped>
	ul,li{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	
	ul{
		padding: 4px 8px;
		overflow: hidden;
	}
	ul li{
		float: left;
		margin: 2px 4px;
		color: blue;
	}
#photoList img {
		width: 100%;
	}
	
	#photoList img[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
</style>
