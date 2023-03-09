<template>
    <div>
        <header>
            <button @click="list.shuffle()">Shuffle</button>
            <button @click="start()">Random</button>
            <button @click="end()">Stop</button>
        </header>
        
        <main>
            <List></List>
            
            <ul v-if="saveList.length != 0" class="border rounded-md p-4">
                <li v-for="e in saveList" class="hover:shadow hover:bg-gray-200 px-4 py-2 rounded-md">
                    <p class="flex justify-between">
                        <h1>{{ e.name }}</h1>
                        <h2>{{ e.count }}</h2>
                    </p>
                </li>
            </ul>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import List from '../components/list.vue'
import { useList } from '../hooks/useList'
import { useRandom } from '../hooks/useRandom'

const list = useList()

var saveList = ref([])

const random = useRandom()
random.defineRange(0, list.value().length - 1)

var timer
var mode = 'linear'

function start() {
    
    if(mode === 'linear') {   
        var index = 0
        var fn = () => {
            random.set(index++)

            if(index >= list.value().length) {
                index = 0
            }

        }
    } else if(mode === 'non-linear') {
        var fn = () => {
            random.get()
        }
    }

    timer = setInterval(fn, 100)
}

function end() {
    setTimeout(() => {
        clearInterval(timer)

        var index = -1
        saveList.value.forEach(e => {
            if(e.name == list.value()[random.getLast()]) {
                index = e
            }
        })
        if(index == -1) {
            saveList.value.push({
                name: list.value()[random.getLast()],
                count: 1,
            })
        } else {
            index.count ++
        }

    }, 100)
}


</script>

<style scoped>
    button {
        @apply px-4 py-2 border rounded-md;
    }
</style>