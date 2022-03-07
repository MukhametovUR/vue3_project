<template>

<div>
    <h1> {{ $store.state.post.limit }}</h1>
    {{$store.commit("post/setLoading")}}
    <h1>Страница с постами</h1>
    <div>
        <my-button @click="$store.commit('incrementLikes')">Лайн</my-button>
        <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>

    </div>
    <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
        v-focus
    >
    </my-input>
    <div class="app__btns">
        <my-button
            @click="showDialog"
            class="btn-show"
        >
        Создать пост
        </my-button>

        <!-- <my-select
            v-model="selectedSort"
            :options="sortOptions"
        >
        </my-select> -->
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
    <div v-intersection="loadMorePosts" class="observer"></div>
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
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios';
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";

import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
export default {
    components:{
         MyInput,
        MySelect,
        MyButton,
        PostList, 
        PostForm
    },
    data(){
        return {
            dialogVisible: false
        }
    },
    methods: {
    ...mapMutations({
        setPage: 'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
        loadMorePosts: 'post/loadMorePosts',
        fetchPosts: 'post/fetchPosts'
        }),
        createPost(post) {
        this.posts.push(post);
        this.dialogVisible = false;
        },
        removePost(post) {
        this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
        this.dialogVisible = true;
        },
        //Функция для работы с сервером при помощи Axios
       

    },
    mounted(){
        this.fetchPosts();
           
    },
    computed:{
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
          ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })
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