<template>
	<section id="swipe">
		
		<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="item in swipes">
			  	<a v-bind:href="item.url">
			  		<img v-bind:src="item.img" alt="">
			  	</a>
			  </mt-swipe-item>
			 
		</mt-swipe>

	</section>
</template>

<script>
	export default {
		props:['swipes']
	}
</script>

<style>
	.mint-swipe{
		height: 200px;
	}

	.mint-swipe img{
		width: 100%;
	}

</style>
