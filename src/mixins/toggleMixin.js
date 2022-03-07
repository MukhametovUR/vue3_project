export default {
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
    },
    mounted(){
        console.log('mixin mounted')
    }
}