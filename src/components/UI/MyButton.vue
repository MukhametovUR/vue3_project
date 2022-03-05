<template>
    <button class="btn">
        <slot></slot>
        
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style>
.btn {
    align-self: flex-end;
    margin-top: 15px;
    padding: 10px 15px;
    background: none;
    color: teal;
    border-radius: 5px;
}
</style>