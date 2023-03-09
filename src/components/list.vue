<template>
    <ul>
        <li v-for="e, index in list.value()">{{ e + index }} {{ index == random.getLast() }}</li>
    </ul>
</template>

<script setup>
import { useList } from '../hooks/useList'
import { useRandom } from '../hooks/useRandom'
const random = useRandom()

const list = useList()
</script>

<style scoped>

</style>