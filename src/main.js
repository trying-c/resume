import { createApp } from 'vue'
import { createPinia } from "pinia";
import ViewUIPlus from 'view-ui-plus'
import router from './router';
import './style.css'
import App from './App.vue'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import TitleBox from './components/TitleBox.vue';

const app = createApp(App)
const pinia = createPinia()

app.component(TitleBox.name, TitleBox)

app.use(pinia)
app.use(ViewUIPlus)
app.use(router)
app.mount('#app')

