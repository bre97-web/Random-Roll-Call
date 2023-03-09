<template>
    <div>
        <ul>
            
            <li v-for="e, index in list.value()">
                <p>{{ e }}</p>
                <i @click="list.remove(e)" class="material-icons">close</i>
            </li>
        </ul>


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
    ul {
        @apply flex flex-col gap-2 flex-wrap;
    }
    ul li {
        @apply px-4 py-2 border rounded-md select-none flex justify-between items-center;
    }
</style>