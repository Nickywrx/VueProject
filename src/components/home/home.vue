<template>
	<section id="home">
	
		<v-swipe :swipes="lunbos"></v-swipe>
		
		<!-- 九宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#/news/list">
		            		<router-link to="/news/list">
		            			<span class="mui-icon mui-icon-extra mui-icon-extra-order"></span>
		                    	<div class="mui-media-body">新闻资讯</div>
		            		</router-link>
		                    </a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            		<router-link to="photo/list">
		            			<span class="mui-icon mui-icon mui-icon-image"><span class="mui-badge">5</span></span>
		                    	<div class="mui-media-body">图片分享</div>
		            		</router-link>
		                    </a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">Chat</div></a></li>
		            
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">搜一搜</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">联系我们</div></a></li>
		           
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-info"></span>
		                    <div class="mui-media-body">关于我们</div></a></li>
		          
		        </ul>

	</section>
</template>

<script>
	import comSwipe from '../common/swipe.vue';
	 export default {
		data(){
			return {
				lunbos:[]
			};
		},
		created(){
			this.getLunbos();

		},
		methods: {
    // 获取轮播图数据
		    getLunbos: function () {
		      var url = 'http://139.199.192.48:8888/api/getlunbo'
		      this.$http.get(url).then(function (res) {
		        // console.log(res.body);对象
		        if (res.body.status === 0) {
		          this.lunbos = res.body.message;
		        }
		      })
		    }
		  },
		  // 用来定义子组件
		  components:{
		  	'v-swipe':comSwipe
		  }
	 };
</script>

<style scoped>
	
	
</style>
