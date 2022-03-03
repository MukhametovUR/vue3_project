<template>
       <div class="post" v-for="post in posts">
        <div><strong>Название</strong> {{ post.title }}</div>
        <div><strong>Описание</strong> {{ post.body }}</div>
    </div>
</template>

<script>
export default {
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