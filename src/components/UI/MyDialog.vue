<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
             <!--Для передачи вложенного компонента в родительский используется slot  -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-dialog',
    props: { //props - отвечает за отобпвжение модального окна
        show:{
            type:Boolean,   // Флаг показать/скрыть окно
            default: false  //По умолчанию модальное окно скрыто
        }
    },
    methods: {
        hideDialog(){
            this.$emit('update:show',false)
            /*Двустороннее связывание
            Эмитим событие, называем update:show, 
            передаем значение false - скрыть диалоговое окно
            */
        }
    }
}
</script>

<style scoped>
.dialog {
    top:0;
    bottom:0;
    right:0;
    left:0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}
.dialog__content {
    margin: auto;
    background: #fff;
    border-radius: 12px;
    min-height: 30px;
    min-width: 300px;
    padding: 20px;
}
</style>