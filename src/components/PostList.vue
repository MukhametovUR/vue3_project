<template>

    <div v-if="posts.length > 0">
        <h3>Список пользователей</h3>
        <post-item 
        v-for="post in posts"
        :post="post" 
        class="post"
        :key="post.id"
        @remove="$emit('remove', post)"      
        >
    </post-item>
    </div>
    <h2 v-else style="color:red">
        Список пуст
    </h2>
       

</template>

<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
    props: {                //Для двухстороннего связывания
        posts: {            //То что ожидается на вход
            type: Array,    //Указываем тип данных
            requires: true, //Чем инициализируются
        }
    }
}
</script>

<style scoped>
.post {
    padding: 15px;
    margin-top: 10px;
    border: 2px solid teal;
}
</style>