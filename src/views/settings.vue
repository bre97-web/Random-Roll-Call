<template>
    <div class="flex flex-col gap-2">
        <md-filled-text-field label="停止后延迟显示结果" type="text" v-model.number="settings.delayShowResult"></md-filled-text-field>

        <md-filled-text-field label="随机间隔" type="text" v-model.number="settings.delayNext"></md-filled-text-field>

        <label>随机时是否连续</label>
        <md-switch name="mode" @click="settings.linear = !settings.linear"></md-switch>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

/**
 * 读取本地的settings信息，提供了一个默认值。
 */
var settings = reactive(JSON.parse(localStorage.getItem('settings')) || {
    delayShowResult: 1000,
    delayNext: 250,
    linear: true,
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