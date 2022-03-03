<template>

<div class="app">
    <post-form
        @create="createPost"
    >
    </post-form>   
    <post-list 
        :posts="posts"
        @remove="removePost"
    >

    </post-list>
</div>

</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';


export default {
    components:{
        PostList, PostForm

    },
    data(){
        return {
            posts: [
            {id:1, title:'JavaScript1', body:'Описание поста1'},
            {id:2, title:'JavaScript2', body:'Описание поста2'},
            {id:3, title:'JavaScript3', body:'Описание поста3'},
            {id:4, title:'JavaScript4', body:'Описание поста4'},
            ],
        }
    },
    methods: {
        createPost(post){
           this.posts.push(post);
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id != post.id)
        }

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

</style>