<template>
	<main>

		<v-header></v-header>
		<!-- <v-home></v-home> -->
		<!-- 根据url自动切换 -->
		<router-view></router-view>
		<v-footer></v-footer>
		<lg-preview></lg-preview>	
	</main>
</template>

<script>
	
</script>

<style scoped>
	/*
	这里写当前这个组件的样式,默认这个样式是全局的,
	如果你想让写的样式只在当前组件生效,那么请添加一个属性scoped
	 * */
	p {
		color: red;
	}
</style>
