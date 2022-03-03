<template>

<div class="app">
    <form @submit.prevent>
        <h4>Название поста</h4>
        <input  v-bind:value="title"
                @input="title = $event.target.value" 
                type="text" 
                class="input" 
                placeholder="Название ">
        <input v-bind:value="body" 
                @input="body = $event.target.value" 
                type="text" 
                class="input" 
                placeholder="Описание ">
        <button class="btn" @click="createPost">Создать</button>

    </form>
    <div class="post" v-for="post in posts">
        <div><strong>Название</strong> {{ post.title }}</div>
        <div><strong>Описание</strong> {{ post.body }}</div>

    </div>
</div>

</template>

<script>
export default {
    data(){
        return {
            posts: [
            {id:1, title:'JavaScript1', body:'Описание поста1'},
            {id:2, title:'JavaScript2', body:'Описание поста2'},
            {id:3, title:'JavaScript3', body:'Описание поста3'},
            {id:4, title:'JavaScript3', body:'Описание поста3'},
            ],
            title:'',
            body:''
        }
    },
    methods: {
        createPost(){
            const newPost = {
                id: Date.now(),
                title: this.title,
                body: this.body,
            }
            this.posts.push(newPost);
            this.title = '';
            this.body = '';
        },
 

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
form {
    display: flex;
    flex-direction: column;
}
.post {
    padding: 15px;
    margin-top: 10px;
    border: 2px solid teal;
}

.input {
    width: 100%;
    border: 1px solid teal;
    margin-top: 15px;
    height: 40px;
    padding-left: 10px;
}
.btn {
    align-self: flex-end;
    margin-top: 15px;
    padding: 10px 15px;
    background: none;
    color: teal;
    border-radius: 10px;
}
</style>