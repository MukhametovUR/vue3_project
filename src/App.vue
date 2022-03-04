<template>

<div class="app">
    <h1>Страница с постами</h1>
    <my-button
    @click="showDialog"
    class="btn-show"
    >
    Создать пост
    </my-button>   
    <my-dialog v-model:show="dialogVisible">
        <post-form
            @create="createPost"
        >
        </post-form>
    </my-dialog>
    
     
    <post-list 
        :posts="posts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />    
    <div v-else>Идет загрузка...</div>
</div>

</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import axios from 'axios';

export default {
    components:{
        PostList, PostForm,
        MyDialog

    },
    data(){
        return {
            posts: [],
            dialogVisible:false,
            isPostsLoading: false,//Индикатор загрузки страницы
        }
    },
    methods: {
        createPost(post){
           this.posts.push(post);
           this.dialogVisible = false;
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id != post.id)
        },
        showDialog(){
            this.dialogVisible = true;
        },
        //Функция для работы с сервером при помощи Axios
        async fetchPosts() {
            try {             
                this.isPostsLoading = true;//Отображаем индикатор загрузки перед отправкой запроса   
                    const response = await 
                    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                    this.posts = response.data;
                //Делаем запрос на сервер и ответ помещаем в response
            }catch(e){
                //Отлавливаем ошибки при запросе на сервер
                alert('Ошибка')
            }finally {
              this.isPostsLoading = false;//Скрываем индикатор загрузки после получение ответа

            }
        }

    },
    mounted(){
        this.fetchPosts();//Хук для монтироание запроса из удаленного сервера
    }
}
</script>

<style>
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
}
.app {
padding: 20px;
}

.btn-show {
    margin: 15px 0;
}

</style>