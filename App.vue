<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			import('./TUIKit/tui-core.ts').then(mode => {
				console.log(mode);
				const TUILogin = mode.TUILogin
				TUILogin.login({
					SDKAppID: 1600042548,
					userID: 'administrator',
					userSig: 'eJwtjMsOgjAUBf*la0NK6UUgcQOJusCNL9Rdk1Zygy1YGvER-10ElmfmZD5kn**8h7IkIcyjZDZslMo4vOKAhdRosHVWuNpOh1ZWomlQksQPKaWcAY9Go54NWtVzAGC9GqlD-WdzP*ZREAYwVbDs*-pVLO*32OVs1ZbBqdocu5LF6eUNkVx3vMjO9rA12kBWL8j3B2OLNSs_',
					useUploadPlugin: true, // If you need to send rich media messages, please set to true.
					framework: `vue3` // framework used vue2 / vue3
				}).catch(() => {});
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import '@tuniao/tn-style/dist/uniapp/index.css';
</style>
