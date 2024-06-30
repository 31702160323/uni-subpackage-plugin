<template>
    <view>
        <tn-title title="图鸟UI" mode="dot" assist-color="tn-red" />
        <tn-subsection v-model="subsectionValue">
            <tn-subsection-item title="全部" />
            <tn-subsection-item title="待发货" />
            <tn-subsection-item title="待收货" />
            <tn-subsection-item title="待评价" />
            <tn-subsection-item title="已完成" />
        </tn-subsection>
        <tn-avatar icon="logo-tuniao" type="success" />
        <tn-icon name="logo-tuniao" type="primary" />
        <tn-icon name="logo-tuniao" type="success" />
        <tn-icon name="logo-tuniao" type="danger" />
        <tn-icon name="logo-tuniao" type="warning" />
        <tn-icon name="logo-tuniao" type="info" />
        <tn-switch v-model="selectValue" />
        <tn-tag type="primary">标签</tn-tag>
        <tn-tag type="success">标签</tn-tag>
        <tn-tag type="warning">标签</tn-tag>
        <tn-tag type="danger">标签</tn-tag>
        <tn-tag type="info">标签</tn-tag>
        <tn-badge value="99" type="primary" />
        <tn-loading show type="primary" />
        <tn-loading show type="success" />
        <tn-loading show type="warning" />
        <tn-loading show type="danger" />
        <tn-loading show type="info" />
        <tn-button type="primary">按钮</tn-button>
        <tn-button type="success">按钮</tn-button>
        <tn-button type="warning">按钮</tn-button>
        <tn-button type="danger">按钮</tn-button>
        <tn-button type="info">按钮</tn-button>
        <tn-number-box v-model="numberValue" />
        <tn-loadmore status="loadmore"></tn-loadmore>
        <tn-form ref="formRef" :model="formData">
            <tn-form-item label="用户名" prop="username">
                <tn-input v-model="formData.username" />
            </tn-form-item>
            <tn-form-item label="性别" prop="selectValue">
                <tn-radio-group v-model="formData.selectValue">
                    <tn-radio label="男">男</tn-radio>
                    <tn-radio label="女">女</tn-radio>
                </tn-radio-group>
            </tn-form-item>
            <tn-form-item label="性别" prop="selectValue2">
                <TnCheckboxGroup v-model="formData.selectValue2">
                    <TnCheckbox label="value1">value1</TnCheckbox>
                    <TnCheckbox label="value2">value2</TnCheckbox>
                </TnCheckboxGroup>
            </tn-form-item>
            <tn-form-item label="性别" prop="sliderValue">
                <TnSlider v-model="formData.sliderValue" />
            </tn-form-item>
        </tn-form>
        <tn-picker v-model="pickerValue" v-model:open="openPicker" :data="pickerData" />
        <tn-date-time-picker v-model="dateTimeValue" v-model:open="openDateTimePicker" />
        <tn-image-upload v-model="imageList" :action="actionUrl" />
        <tn-rate v-model="rateValue" />
        <tn-calendar v-model="selectDate" />
        <tn-week-calendar v-model="selectDate2" />
        <tn-count-to start="0" end="1000000" thousands-separator="," />
        <tn-line-progress :percent="progressPercent" />
        <tn-count-down :time="300" />
        <tn-photo-album
            :data="[
                'https://tnuiimage.tnkjapp.com/swiper/ad1.jpg',
                'https://tnuiimage.tnkjapp.com/swiper/ad2.jpg',
                'https://tnuiimage.tnkjapp.com/swiper/ad3.jpg',
                'https://tnuiimage.tnkjapp.com/swiper/ad4.jpg',
                'https://tnuiimage.tnkjapp.com/swiper/ad5.jpg'
            ]"
        />
        <tn-count-scroll value="1000000.23" decimal-separator="." thousands-separator="," />
        <tn-swiper v-model="currentSwiperIndex" :data="swiperData" width="100%" height="420">
            <template #default="{ data }">
                <view class="swiper-data">
                    {{ data }}
                </view>
            </template>
        </tn-swiper>
        <tn-graphic-card
            :avatar="graphicData.avatar"
            :title="graphicData.title"
            :description="graphicData.description"
            :tags="graphicData.tags"
            :content="graphicData.content"
            :images="graphicData.images"
            :view-count="graphicData.viewCount"
            :comment-count="graphicData.commentCount"
            :like-count="graphicData.likeCount"
            :view-user-avatars="graphicData.viewUserAvatars"
        />
        <async-echart></async-echart>
        <tn-empty mode="data" />
        <tn-footer content="Copyright © 2023 图鸟科技" :fixed="false" />
    </view>
</template>
<script>
import AsyncEchart from '@/sub-pages/components/async-echart/async-echart.vue';

export default {
    components: { AsyncEchart },
    data() {
        return {
            subsectionValue: 0,
            numberValue: 0,
            selectValue: false,
            formData: {
                username: '',
                selectValue: '',
                selectValue2: '',
                sliderValue: 0
            },
            openPicker: false,
            pickerValue: '',
            pickerData: ['数值1', '数值2', '数值3', '数值4', '数值5'],

            openDateTimePicker: false,
            dateTimeValue: '',

            imageList: [],
            actionUrl: 'http://localhost:3000/api/upload',

            rateValue: 0,
            selectDate: '',
            selectDate2: '',
            progressPercent: 30,

            currentSwiperIndex: 0,
            swiperData: [
                'https://resource.tuniaokj.com/images/xiongjie/x14.jpg',
                'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-2.jpg',
                'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
                'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
                'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg'
            ],

            graphicData: {
                id: 1,
                avatar: 'https://tnuiimage.tnkjapp.com/uniapp_market/circle/3-image.jpg',
                title: '文章标题',
                description: '2023年6月30日',
                tags: ['标签1', '标签2'],
                content:
                    '看看打开打开年份记得当年开始放假哦额外欺骗人u饿哦漂亮放佛怕打雷舒服呢我脾气破费了发多少呢；否，可能打飞机哦喷泉哦怕可能地方打开螺丝粉年份的肌肤看能否。',
                images: [
                    'https://tnuiimage.tnkjapp.com/swiper/ad1.jpg',
                    'https://tnuiimage.tnkjapp.com/swiper/ad2.jpg',
                    'https://tnuiimage.tnkjapp.com/swiper/ad3.jpg',
                    'https://tnuiimage.tnkjapp.com/swiper/ad4.jpg'
                ],
                viewCount: 100,
                commentCount: 101,
                likeCount: 102,
                viewUserAvatars: [
                    'https://tnuiimage.tnkjapp.com/avatar/normal/1.png',
                    'https://tnuiimage.tnkjapp.com/avatar/normal/2.png',
                    'https://tnuiimage.tnkjapp.com/avatar/normal/3.png',
                    'https://tnuiimage.tnkjapp.com/avatar/normal/4.png',
                    'https://tnuiimage.tnkjapp.com/avatar/normal/5.png',
                    'https://tnuiimage.tnkjapp.com/avatar/normal/6.png',
                    'https://tnuiimage.tnkjapp.com/avatar/normal/7.png',
                    'https://tnuiimage.tnkjapp.com/avatar/normal/8.png'
                ]
            }
        };
    },
    mounted() {
    },
    methods: {
    }
};
</script>

<style lang="scss">
	@import '@tuniao/tn-style/dist/uniapp/index.css';
.swiper-container {
    width: 100%;
    height: 420rpx;

    .swiper-data {
        width: 100%;
        height: 100%;
        border-radius: 30rpx;

        .image {
            width: 100%;
            height: 100%;
            border-radius: inherit;
        }
    }
}
</style>
