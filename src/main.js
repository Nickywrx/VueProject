import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'

Vue.use(VueResource);
Vue.use(VueRouter);

// 引入ui
import 'mint-ui/lib/style.css';
import MintUI from 'mint-ui';
Vue.use(MintUI); //因为mintui是一个Vue组件库

// 1.4引入mui包，mui不依赖vue
import '../lib/mui/css/mui.css';
import '../lib/mui/css/icons-extra.css';
// import '../lib/mui/fonts/mui.ttf';

import App from './App.vue';
// 引入我们自己的组件

// 引入项目透露和尾部

import comHeader from './components/frame/header.vue';
import comFooter from './components/frame/footer.vue';

import comHome from './components/home/home.vue';

Vue.component('v-header',comHeader);
Vue.component('v-footer',comFooter);
Vue.component('v-numbox',comNumbox);

// 引入moment插件
import moment from 'moment';

// 引入图片预览插件
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)


// 引入新闻、图片相关组件

import comNewsList from './components/news/newsList.vue';
import comPhotoList from './components/photo/photoList.vue';

// 引入图片分享详情
import comPhotoDetails from './components/photo/photoDetails.vue';



// 引入商品相关组件
import comGoodsList from './components/goods/goodsList.vue';
import comGoodsDetails from './components/goods/goodsDetails.vue';


// 引入数字输入框组件
import comNumbox from './components/common/numbox.vue';

// 引入购物车
import comShopcart from './components/shopcart/shopcart.vue';

// 注册全局过滤器

Vue.filter('dateFormat',function(val,formatStr){
	return moment(val).format(formatStr);
})


// 3写自己的代码
var vm=new Vue({
	el:'#app',
	render:function(c){
		// 使用App是使用App.vue这个组件的视图替换#app
		return c(App);
	},
	router:new VueRouter({
		routes:[
			{ path:'/',component:comHome },
			{ path:'/news/list',component:comNewsList },
			{ path:'/photo/list',component:comPhotoList },
			{path:'/photo/details/:id',component:comPhotoDetails},
			{path:'/goods/list',component:comGoodsList},
			{path:'/goods/details/:id',component:comGoodsDetails},
			{path:'/shopcart',component:comShopcart}
		]
	})

	
})