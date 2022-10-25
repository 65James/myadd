<template>
	<view>
		<view class="add">
			<input type="text"  @click="gotusearch()">
		</view>
	</view>
</template>

<script>
	export default {
		name: "my_app",
		data() {
			return {
			};
		},
		methods:{
			gotusearch(){
				console.log(1);
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.add {
		background-color: #c00;
	}
</style>
