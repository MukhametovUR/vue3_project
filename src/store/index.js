import { createStore } from 'vuex'
import { postModule } from '@/store/postModule'

export default createStore({ //Создаем хранилище данных для прямого обращения к данным
    modules: { //Выводим логику проекта в отдельный модуль
        post: postModule
    }
})