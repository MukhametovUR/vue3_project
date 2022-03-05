<template>

<div>
    <h1>Страница с постами</h1>
    <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
    >
    </my-input>
    <div class="app__btns">
        <my-button
            @click="showDialog"
            class="btn-show"
        >
        Создать пост
        </my-button>

        <my-select
            v-model="selectedSort"
            :options="sortOptions"
        >
        </my-select>
    </div>   
    <my-dialog v-model:show="dialogVisible">
        <post-form
            @create="createPost"
        >
        </post-form>
    </my-dialog>
    
     
    <post-list 
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />    
    <div v-else>Идет загрузка...</div>
    <div ref="observer" class="observer"></div>
    <!-- <div class="page__wrapper">
        <div 
            v-for="pageNumber in totalPages" 
            :key="pageNumber"
            class="page"
            :class="{
                'current-page':page === pageNumber
                }"
            @click="changePage(pageNumber)"
        > 
            {{ pageNumber }} 
        </div>
    </div> -->
</div>

</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import axios from 'axios';
import MyInput from '@/components/UI/MyInput.vue';

export default {
    components:{
        PostList, 
        PostForm,
        MyDialog, 
        MyInput

    },
    data(){
        return {
            posts: [],
            dialogVisible:false,
            isPostsLoading: false,//Индикатор загрузки страницы
            selectedSort: '',
            searchQuery:'',
            page:1,
            limit:10,
            totalPages: 0,
            sortOptions: [
                {value:'title', name:'По названию'},
                {value:'body', name:'По описанию'}
            ]
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
        changePage(pageNumber){
            this.page = pageNumber;
        },
        //Функция для работы с сервером при помощи Axios
        async fetchPosts() {
            try {             
                this.isPostsLoading = true;//Отображаем индикатор загрузки перед отправкой запроса   
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = response.data;
                //Делаем запрос на сервер и ответ помещаем в response
            }catch(e){
                //Отлавливаем ошибки при запросе на сервер
                alert('Ошибка')
            }finally {
              this.isPostsLoading = false;//Скрываем индикатор загрузки после получение ответа
            }
        },
        async loadMorePosts() {
            try { 
                this.page += 1;            
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = [...this.posts, ...response.data];
                //Делаем запрос на сервер и ответ помещаем в response
            }catch(e){
                //Отлавливаем ошибки при запросе на сервер
                alert('Ошибка')
            }
        },

    },
    mounted(){
        this.fetchPosts();//Хук для монтироание запроса из удаленного сервера
        console.log(this.$refs.observer);//Прямое обращение к DOM элементу             

       const options = {
            root: document.querySelector('#scrollArea'),
            rootMargin: '0px',
            threshold: 1.0
        }
            const callback = (entries, observer) => {
                if (entries[0].isIntersecting && this.page < this.totalPages){
                    this.loadMorePosts();
                }
            
        };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.observer);
        },
    computed:{
        sortedPosts() {
            return [...this.posts].sort((post1, post2)=> post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            // Массив с постами разворачивапм в другой массив для сортировки нового массива
        },
        sortedAndSearchedPosts(){
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        // page(){
        //     this.fetchPosts();
        // }
    },
    /*
    watch:{//Функция наблюдатель
        selectedSort(newValue){ //Функция наблюдатель должна иметь такое название как и модель в компоненте
            this.posts.sort((post1, post2)=> {
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            
            // Сравниваем название одного поста с другим
            // Либо описани одного поста с другим
            // При помощи ?.localeCompare - сравниваем  строки
            
            })
        }
    }
    */
}
</script>

<style>
.btn-show {
    margin: 15px 0;
}
.app__btns {
    margin:15px 0;
    display: flex;
    justify-content: space-between;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 3px solid teal;
}
.observer {
    height: 50px;
    background: green;
}
</style>