<template>
    <select v-model="modelValue" @change="changeOption" class="select">
        <option disabled value="">Выберите из списка</option>
        <option 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
        >
        {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'my-select',
    props: {// принимает modelValue как props
        modelValue: {
            type: String,// тип строка
        },
        options: {//Массив пунктов выпадающего списка select
            type: Array,
            default: ()=> []
        }
    },
    methods:{
        changeOption(event) {
             this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style scoped>
.select {
    height: 30px;
}
</style>