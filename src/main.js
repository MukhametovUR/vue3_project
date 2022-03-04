import {createApp} from 'vue';
import App from './App';
import components from '@/components/UI/index.js';


const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});


//Создание экземпляра приложения и монтирование в теге div index.html
app.mount('#app');  //Возвращает экземпляр приложения
