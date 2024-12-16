<script>
import { useThemeStore } from './store/theme';
export default {
    onLaunch: function () {
        const themeStore = useThemeStore();
        console.log('App Launch', themeStore.themeColor);
        import('./TUIKit/tui-core.ts').then(({ TUILogin }) => {
            console.log(TUILogin);
            // const TUILogin = mode.TUILogin
            TUILogin.login({
                SDKAppID: uni.$SDKAppID,
                userID: uni.$userID,
                userSig: uni.$userSig,
                useUploadPlugin: true, // If you need to send rich media messages, please set to true.
                framework: `vue3` // framework used vue2 / vue3
            }).catch((error) => {
                console.log('----------', error);
            });
        });
    },
    onShow: function () {
        console.log('App Show');
    },
    onHide: function () {
        console.log('App Hide');
    }
};
</script>

<style>
/*每个页面公共css */
uni-page-body,
html,
body,
page {
    width: 100% !important;
    height: 100% !important;
    overflow: auto;
}
</style>
