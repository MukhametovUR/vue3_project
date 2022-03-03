<template>
      <form @submit.prevent>
        <h4>Название поста</h4>
        <my-input  
            v-model:value="post.title"
            @input="post.title = $event.target.value" 
            type="text" 
            placeholder="Название "
        />
        <my-input 
            v-model:value="post.body"
            @input="post.body = $event.target.value" 
            type="text" 
            placeholder="Описание "
        />
        <my-button 
            class="btn" 
            @click="createPost"
        >
        Создать
        </my-button>
    </form>
</template>

<script>

export default {
    data(){
       return {
            post: {
                title:'',
                body: '',
            }
       }
    },
    methods:{
        createPost(){
            this.post.id = Date.now(),
            this.$emit('create', this.post);
            this.post = {
                title:'',
                body: '',
            }
        },
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

</style>