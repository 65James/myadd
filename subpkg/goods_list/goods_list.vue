<template>
	<view>
		<!-- 商品信息 -->
		<view class="list_box" v-for="(item,index) in list" :key="index" @click="topog(item)">
			<view class="">
				<image :src="item.goods_big_logo  || img" mode=""></image>
			</view>
			<view class="">
				<view class="">{{item.goods_name}}</view>
				<text>${{item.goods_price   || pop | myprice}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pop:999999999,
				img:"http://image2.suning.cn/uimg/b2c/newcatentries/0070077759-000000000615457846_1_800x800.jpg",
				list:[],
				form:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10,
				},
				total:0,
				isLoading:false
			};
		},
		onLoad(obj){
			console.log(obj);
			this.form.cid=obj.cid
			console.log(this.form);
		},
		methods:{
			async get(callback){
				this.isLoading=true
				let {data:res}=await uni.$http.get('/api/public/v1/goods/search',this.form)
				this.isLoading=false
				callback&&callback()
				console.log(res);
				this.list=[...this.list,...res.message.goods]
				this.total=res.message.total
			},
			topog(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			}
		},
		mounted() {
			this.get()
				
		},
		filters:{
			myprice(val){
				return val.toFixed(2)
			}
		},
		onReachBottom(){
			if(this.isLoading) return  
			if(this.form.pagenum*this.form.pagesize>this.total){
				return uni.showToast({
					title:'已经没有再多的数据了'
				})
			}
			this.form.pagenum+=1
			this.get()
		},
		onPullDownRefresh(){
			console.log(1);
			this.form.pagenum=1
			this.list=[]
			this.get(()=>uni.stoPullDownRefresh)
		}
	}
</script>

<style lang="scss">
.list_box{
	display: flex;
	margin: 5px;
	border-bottom: 1px solid #c0c0c0;
	image{
		width: 100px;
		height: 100px;
	}
	text{
		color: #c00000;
	}
}
</style>
