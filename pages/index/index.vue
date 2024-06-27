<template>
	<view>
		<!-- 使用占位组件来引用分包的组件 -->
		<!--  https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/placeholder.html -->
		<!-- 配置方式 -->
		<!-- 1.打开pages.json -->
		<!-- 2.找到对于的页面配置 -->
		<!-- 3.在对于的页面配置的style属性中配置 componentPlaceholder -->
		<!-- 示例配置：
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "uni-app",
				"componentPlaceholder": {
					"async-echart": "view"
				},
				"mp-alipay": {
					"componentPlaceholder": {
						"async-echart": "view"
					}
				}
			}
		}
		-->
		<async-echart></async-echart>
		<view>{{ time }}</view>
		<button @click="open('/sub-pages/calendars/calendars')" tabindex="1">打开分包</button>
		<button @click="open('/sub-pagesB/calendars/calendars')" tabindex="1">打开分包2</button>
		<button @click="openConversationList">打开会话列表</button>
		<button @click="openContact">打开联系人</button>
	</view>
</template>
<script>
	import AsyncEchart from '@/sub-pages/components/async-echart/async-echart.vue';
	export default {
		components: {
			AsyncEchart
		},
		data() {
			return {
				i: 0,
				time: '',
			};
		},
		mounted() {
			console.log('-------dayjs');
			import('@/sub-pagesB/utils/day.js').then((dayjs) => {
				console.log('dayjs', dayjs);
				this.time = dayjs().format('YYYY-MM-DD');
			});
		},
		methods: {
			open(url) {
				uni.navigateTo({
					url: url
				});
			},
			// 打开会话列表
			openConversationList() {
				uni.navigateTo({
					url: '/TUIKit/components/TUIConversation/index'
				});
			},
			// 打开联系人
			openContact() {
				uni.navigateTo({
					url: '/TUIKit/components/TUIContact/index'
				});
			},
		}
	};
</script>