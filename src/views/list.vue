<template>
    <div>

        

        <main class="flex flex-col gap-4">
            <ul>
                <li v-for="e, index in list.value()">
                    <p>{{ e }}</p>
                    <i @click="list.remove(e)" class="material-icons">close</i>
                </li>
            </ul>

            <nav class="flex flex-col gap-4 justify-center">
                <md-outlined-text-field label="需要添加的元素" v-model="key"></md-outlined-text-field>
                <md-filled-button @click="list.set(key)" label="提交"></md-filled-button>
            </nav>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import { useList } from '../hooks/useList'

/**
 * 用于在li中显示所有的元素。
 */
const list = useList()

/**
 * key由用户输入，这是需要被添加到list的元素信息。
 */
var key = ref('')
</script>

<style scoped>
    ul {
        @apply flex flex-col gap-2 flex-wrap;
    }
    ul li {
        @apply px-4 py-2 border rounded-md select-none flex justify-between items-center;
    }
</style>