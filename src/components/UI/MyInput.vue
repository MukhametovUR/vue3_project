<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String,Number] 
        // props принимает либо строку, либо число
    },
    methods:{
        updateInput(event){
            this.$emit('update:modelValue', event.target.value) 
            //Используется для обновление модели
        }
    }
}
    
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    margin-top: 15px;
    height: 40px;
    padding-left: 10px;
}

</style>