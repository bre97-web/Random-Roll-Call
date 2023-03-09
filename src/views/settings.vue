<template>
    <div class="flex flex-col gap-2">
        <label>停止后延迟显示结果</label>
        <input type="text" v-model.number="settings.delayShowResult">

        <label>随机间隔</label>
        <input type="text" v-model.number="settings.delayNext">
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

var settings = reactive(JSON.parse(localStorage.getItem('settings')) || {
    delayShowResult: 1000,
    delayNext: 250,
})

watch(settings, () => {
    localStorage.setItem('settings', JSON.stringify(settings))
})
</script>

<style scoped>
    input {
        @apply w-full border rounded-md outline-none px-4 py-2;
    }
</style>