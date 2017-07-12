<template>
	<section id="photo-details">
		<!-- mint-ui的 -->
		<mt-cell :title="details.title" :label="getLabel()"></mt-cell>
		<!-- mui的图文表格 -->
		<ul class="mui-table-view mui-grid-view">
		        <li v-for="item in thums" class="mui-table-view-cell mui-media mui-col-xs-6">
                <img class="mui-media-object" v-preview="item.src" v-bind:src="item.src">
	        </li>
		        
		    </ul>

		    <!-- 详情 -->
		    <div v-html="details.content"></div>
	</section>
</template>

<script>
import moment from 'moment';
	export default {
		data:function(){
			return { 
				details:{},
				thums:[]
			}
		},
		created:function(){
			this.getDetails();
			this.getThums();
		},
		methods:{
			// 获取图片详情
			getDetails:function(){
				var id=this.$route.params.id;
				var url='http://139.199.192.48:8888/api/getimageInfo/'+id;
				this.$http.get(url).then(function(res){
					if(res.body.status===0){
						// 返回的数组
						this.details=res.body.message[0];
					}
				})
			},
			// 获取缩略图
			getThums(){
				var id=this.$route.params.id;
				var url='http://139.199.192.48:8888/api/getthumimages/'+id;
				this.$http.get(url).then(function(res){
					this.thums=res.body.message;
					this.thums.forEach(function(photo,i){
						i%=16;
						photo.src="../src/img/"+i+".jpg";
					})
				})
				
				
			},
			getLabel(){
				return moment(this.details.add_time).format('YYYY-DD-MM HH:SS:MM')+" 浏览"+this.details.click+"次";
			}
		}

	};
</script>

<style>
	
	#photo-details .mint-cell {
		padding: 6px;
	}
	
	#photo-details .mint-cell-text {
		color: deepskyblue
	}
	
	#photo-details .content {
		padding: 4px 6px;
		font-size: 14px;
	}
	
	.mui-table-view-cell {
		height: 110px;
	}
	
	.mui-table-view img {
		width: 100%;
	}
	
	/*
	 * 修改预览插件的一个小bug
	 * */
	.lg-preview-wrapper {
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}	

</style>
