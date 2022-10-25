<template>
	<view>
		<!-- 轮播图 -->
		<swiper autoplay>
			<swiper-item v-for="item in list" :key="item.goods_id">
				<!-- <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?  goods_id=' + item.goods_id"> -->
				<navigator :url="item.navigator_url.replace('pages','subpkg')
							.replace('main','goods_detail') ">
					<image :src="item.image_src" alt=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in title" :key="i">
				<image :src="item.image_src" class="nav-img" @click="toCate(item)"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="" v-for="(item,index) in add" :key="index">
			<!--  -->
			<view class="">
				<image :src="item.floor_title.image_src" mode="" style="height: 60rpx;"></image>
			
				<view class="add">
					<!-- 左侧大图 -->
					<view class="">
						<image :src="item.product_list[0].image_src" mode="widthFix"  :style="{width:item.product_list[0].image_width+'rpx'}"></image>
					</view>
					<!-- 右侧小图 -->
					<view class="right">
						<view class="" @click="gotoGoods(ite)" v-show="k!=0" v-for="(ite,k) in item.product_list" :key="k">
							<image :src="ite.image_src" mode="widthFix" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [], // 轮播图
				title: [], //
				add: []
			};
		},
		methods: {
			async getadd() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(res.message)
				this.list = res.message
				if (res.meta.status != 200) return uni.$showMsg()
			},
			async gettitle() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				console.log(res.message)
				if (res.meta.status != 200) return uni.$showMsg()
				this.title = res.message
			},
			toCate(item) {
				if (item.name == "分类") {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			async setadd() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				console.log(res);
				if (res.meta.status != 200) return uni.$showMsg()
				this.add = res.message
			},
			// 跳转商品列表
			gotoGoods(d){
				console.log(d.navigator_url.substring(17));
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list'+d.navigator_url.substring(17)
				})
			}
		},
		mounted() {
			this.getadd()
			this.setadd()
			this.gettitle()

			// uni.$http.get('/api/public/v1/home/swiperdata').then(res=>{
			// 	console.log(res.data.message);
			// 	this.list=res.data.message
			// 	if(res.meta.status!=200) return uni.$showMsg()
			// })
		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}
	.add{
		display: flex;
		justify-content: space-around;
	}
	.right{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
</style>
