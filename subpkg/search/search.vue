<template>
	<view>
		<view class="top">
			<uni-search-bar  v-model="list" @input="input"></uni-search-bar>
		</view>
		<view class="middle"  v-show="!flag">
			搜索历史
			<uni-icons type="trash-filled" size="30" @click="delAll"></uni-icons>
			
		</view>
		<view class="tag-view" v-for="(item,index) in hisList" :key="index"  v-show="!flag">
			{{item.name}}
		</view>
		
		<view class="" v-show="flag">
			<view class="listt"  v-for="(item,index) in title" :key="index">
					<text>
				 {{item.goods_name}}
				 </text>
			</view>
			
		</view>	
		
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
	export default {
		data() {
			return {
				list:'',
				title:'',
				flag:false,
				//防抖 的计时器对象
				timer:null,
				
			};
		},
		methods:{
			...mapMutations(['getAllhiList','delhisList']),
			async	input(e){
			this.timer &&	clearTimeout(this.timer)
				setTimeout(()=>{
					this.get(e)
				},500)
				
				
			},
			 async get(e){
				 if(e!=''){
				 	this.flag=true
				 	let {data:res}=await uni.$http.get('/api/public/v1/goods/search?query='+e)
				 	this.title=res.message.goods
					this.getAllhiList({name:e})
				 }else{
				 	this.flag=false
				 }
			 },
			 delAll(){
				 console.log(1);
				 this.delhisList()
			 }
		},
		computed:{
			...mapState(['hisList']),
		}
	}
</script>

<style lang="scss">
.top{
	background-color: #c00;
	color: #fff;;
}
.middle{
	padding-top: 5px;
	margin: auto;
	width: 90%;
	display: flex;
	justify-content: space-between;
}
.tag-view{
		display: flex;
}
.tag-view uni-tag{
	margin: 5px 10px;
}.listt{
	display: flex;
	line-height: 40px;
	justify-content: space-between;
	pad: 0 10px;
	border-bottom: 1px solid gray;
	text{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
