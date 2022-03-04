<template>

    <div>
        <h3>Список постов</h3>
        <transition-group name="post-list">
            <post-item 
                v-for="post in posts"
                :post="post" 
                :key="post.id"
                @remove="$emit('remove', post)"      
            />
        </transition-group>
    </div>
       

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
/* .post {
    padding: 15px;
    margin-top: 10px;
    border: 2px solid teal;
} */

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, 
.post-list-leave-active {
  transition: all 0.4s;
}
.post-list-enter-to{
  opacity: 0;
  transform: translateY(-10px);
}
.post-list-leave-to /* .list-leave-active до версии 2.1.8 */ 
{
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: transform 0.4s;
}

</style>