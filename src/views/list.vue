<template>
    <div>
        <textarea v-model="key" name="persons" cols="30" rows="10"></textarea>
        <input @click="list.set(key)" type="submit" value="Submit">
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import { useList } from '../hooks/useList'

const list = useList()

var key = ref('')

watch(list.value(), () => {
    console.log("Changed");
})
</script>

<style scoped>

</style>