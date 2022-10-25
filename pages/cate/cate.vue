<template>
	<view>
		<view class="cate">
			<scroll-view scroll-y class="cateLeft" :style="{height:scrollHeight+'px',width:'120px'}">
				<view class="cateLeftv" :class="{active:active==index}" @click="appid(index,item)"
					v-for="(item,index) in list" :key="index">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<scroll-view class="cateLeft" :style="{height:scrollHeight+'px',width:'100%'}">
				
				<view class="poop" >
					  <view class="text" >
					 	{{title.cat_name}} 
					 </view>
					 <view class="titleRight">
					 	<view @click="goToList(item)" class="titleRightto" v-for="(item,index) in title.children" :key="index">
					 		<image :src="item.cat_icon" mode="" style="width: 60px;height: 60px;"></image>
							<text >{{item.cat_name}}</text>
					 	</view>
					 </view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				active: 0,
				scrollHeight: 0,
				title: [], //二级导航
			};
		},
		methods: {
			async getlist() {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				console.log(res);
				this.list = res.message
				this.title = res.message[0].children[0]
			},
			appid(index, item) {
				this.active = index
				console.log(item.children);
				this.title =item.children[0]
			},
			goToList(item){
				console.log(item);
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?cid="+item.cat_id
				})
			}
		},
		mounted() {
			this.getlist()
			// uni.getSystemInfo({
			//  success: (res)=> {
			//   console.log(res.windowHeight)
			// this.scrollHeight=res.windowHeight
			//  },
			// });
			let res = uni.getSystemInfoSync()
			this.scrollHeight = res.windowHeight

		}
	}
</script>

<style lang="scss">
	.cate {
		display: flex;
		justify-content: space-between;

		.cateLeftv {
			width: 120px;
			line-height: 60px;
			text-align: center;
			overflow: auto;

			&.active {
				background-color: #fff;
				// border-left-: ;
				// border-left:2px solid #c00000;
				position: relative;

				&::before {
					position: absolute;

					content: '';
					display: block;
					background-color: #c00000;
					width: 3px;
					height: 30px;
					top: 50%;
					left: 1px;
					transform: translateY(-50%);
				}
			}
		}

	}
	.text{
		line-height: 60px;
		text-align: center;
		
	}
	.titleRight{
		margin-left: 25px;
		display: flex;
		// justify-content: space-around;
		flex-wrap: wrap;
		.titleRightto{
			display: flex;
			flex-direction: column;
			width: 32%;
			position: 10px;
		}
	}
	.poop{
		background-color: #fff;
		height: 100%;
	}
</style>
