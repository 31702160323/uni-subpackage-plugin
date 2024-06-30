<template>
    <view>
        <tn-title title="图鸟UI" mode="dot" assist-color="tn-red" />
        <view>{{ time }}</view>
        <tn-button type="primary">按钮</tn-button>
        <tn-button type="success">按钮</tn-button>
        <tn-button type="warning">按钮</tn-button>
        <tn-button type="danger">按钮</tn-button>
        <tn-button type="info">按钮</tn-button>
        <tn-loadmore status="loadmore"></tn-loadmore>
        <tn-number-box v-model="numberValue" />
        <async-echart></async-echart>
    </view>
</template>
<script>
import AsyncEchart from '@/sub-pages/components/async-echart/async-echart.vue';

export default {
    components: { AsyncEchart },
    data() {
        return {
            numberValue: 0,
            time: '',
		};
    },
    mounted() {
        import('@/sub-pagesB/utils/day.js').then(({dayjs}) => {
            this.time = dayjs().format('YYYY-MM-DD');
        });
    },
    methods: {
    }
};
</script>

<style>
	@import '@tuniao/tn-style/dist/uniapp/index.css';
</style>
