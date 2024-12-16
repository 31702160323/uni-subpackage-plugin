import { shallowRef } from 'vue';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
    const themeColor = shallowRef(uni.getStorageSync('themeColor') || '');

    function setTheme(color) {
        themeColor.value = color;
        uni.setStorageSync('themeColor', color);
    }

    return {
        themeColor,
        setTheme
    };
});
