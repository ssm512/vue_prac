import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue' // 최상위 컴포넌트 App.vue를 import
import router from './router'

const app = createApp(App) // App을 인수 받는 createApp 매서드를 실행.

app.use(router)

app.mount('#app') // 인스턴스 id가 'app'인 요소(#app)에 마운트
