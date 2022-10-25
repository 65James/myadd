<template>
	<view class="a">
		<swiper class="add" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in list.pics" :key='index'>
				<image :src="item.pics_big_url" mode="" class="addimg" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<view class="">

			<text>{{list.goods_name}}</text>
			<view style=" color:#c00000">${{list.goods_price}}</view>


		</view>
		<!-- <rich-text :nodes="list.goods_introduce"></rich-text> -->
		<view class="" v-html="list.goods_introduce">

		</view>

		<uni-goods-nav :fill="true" class="goodsNav" :options="options" :buttonGroup="buttonGroup" @click="onClick"
			@buttonClick="buttonClick" />
	</view>
</template>

<script>
	import {maoMutations, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				id: '',
				list: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(obj) {
			console.log(obj);
			this.id = obj.goods_id
		},
		methods: {
			...mapMutations(['add']),
			preview(index) {
				console.log(1);
				console.log(this.list.pics.map(item => item.pics_big_url));
				uni.previewImage({
					current: index,
					urls: this.list.pics.map(item => item.pics_big_url)

				})
			},
			async get() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + this.id)
				console.log(res.message);
				this.list = res.message
			},
			onClick(e) {
				if(e.content.text=='购物车'){
					uni.switchTab({
						url:"/pages/cart/cart"
					})
				}
				// uni.showToast({
				// 	title: `点击${e.content.text}`,
				// 	icon: 'none'
				// })
			},
			buttonClick(e) {
				if(e.content.text=='加入购物车'){
					let obj={
						goods_id:this.list.goods_id,
						goods_name:this.list.goods_name,
						goods_price:this.list.goods_price,
						goods_pic:this.list.goods_small_logo,
						goods_flag:false,
						goods_count:1,
					}
					this.add(obj)
				}
			},
		},
		mounted() {
			this.get()
		}
	}
</script>

<style lang="scss">
	.add {
		height: 500px;
		width: 100%;
	}

	.addimg {
		height: 100%;
		width: 100%;
	}

	.a {
		padding-bottom: 50px;
	}

	.goodsNav {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
	}
</style>
