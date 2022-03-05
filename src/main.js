import { createApp } from 'vue';
import App from './App';
import components from '@/components/UI';
import router from "@/router/router";


const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});


//Создание экземпляра приложения и монтирование в теге div index.html
app
    .use(router)
    .mount('#app');  //Возвращает экземпляр приложения
