<template>
    <ul>
        <li v-for="e, index in list.value()" :class="{'ring': index == random.getLast()}">{{ e }}</li>
    </ul>
</template>

<script setup>
import { useList } from '../hooks/useList'
import { useRandom } from '../hooks/useRandom'

/**
 * 用于显示聚焦环。
 */
const random = useRandom()

/**
 * 用于在li中显示所有的元素
 */
const list = useList()
</script>

<style scoped>
    ul {
        @apply flex gap-2 flex-wrap;
    }
    ul li {
        @apply px-4 py-2 border rounded-md select-none ring-red-500;
    }
</style>