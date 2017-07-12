/*
先定义两个有关于localstorage存储和取值的方法
因为localStorage存取额都是字符串，我么你需要装换
 */
const GOODS_BUY='goodsBuy';

// 把获取到对象字符串解析为js对象返回
function getStorage(){
	var objStr=localStorage.getItem(GOODS_BUY)||'';
	if(objStr){
		return JSON.parse(objStr);
	}else{
		return {};
	}
	
}

// 存储指定对象
function setStorage(obj){
	var objStr=JSON.stringify(obj);
	localStorage.setItem(GOODS_BUY,objStr);
}

/*
定义存储商品购买数量与获取的方法
 */

var data=getStorage();
// 这是用户传入商品id与购买的数量
// 我们先纯粹到data中，然后把dara持久化存储
export  function goodsBuySet(id,numbers){
	data[id]=numbers
	setStorage(data);
} 


export function goodsBuyGet(id){
	return data[id];
} 

// 用于获取全部商品数量
export function goodsBuyGetAll(id){
	return data;
} 
// 商品购买总数
export function goodsBuyTotal(){
	var sum=0;
	Object.values(data).forEach(val=>{
		sum+=val;
	})
	return sum;
} 