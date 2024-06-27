import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

uni.$SDKAppID = 1600042548; // Your SDKAppID
uni.$userID = 'administrator'; // Your userID
uni.$userSig = 'eJwtjMsOgjAUBf*la0NK6UUgcQOJusCNL9Rdk1Zygy1YGvER-10ElmfmZD5kn**8h7IkIcyjZDZslMo4vOKAhdRosHVWuNpOh1ZWomlQksQPKaWcAY9Go54NWtVzAGC9GqlD-WdzP*ZREAYwVbDs*-pVLO*32OVs1ZbBqdocu5LF6eUNkVx3vMjO9rA12kBWL8j3B2OLNSs_'; // Your userSig

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	import('./TUIKit/tui-core.ts').then(mode => {
		console.log(mode);
		const TUILogin = mode.TUILogin
		TUILogin.login({
			SDKAppID: uni.$SDKAppID,
			userID: uni.$userID,
			userSig: uni.$userSig,
			useUploadPlugin: true, // If you need to send rich media messages, please set to true.
			framework: `vue2` // framework used vue2 / vue3
		}).catch(() => {});
	})
	return {
		app
	}
}
// #endif