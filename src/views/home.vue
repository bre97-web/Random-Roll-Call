<template>
    <div>
        <header>
            <button @click="list.shuffle()">Shuffle</button>
            <button @click="start()">Random</button>
            <button @click="end()">Stop</button>
            
            <select name="mode" v-model="mode">
                <option value="linear">Linear</option>
                <option value="non-linear">Non-Linear</option>
            </select>
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
import { ref, reactive } from 'vue';

import List from '../components/list.vue'
import { useList } from '../hooks/useList'
import { useRandom } from '../hooks/useRandom'

const list = useList()

var saveList = ref([])

const random = useRandom()
random.defineRange(0, list.value().length - 1)

var timer
var settings = reactive(JSON.parse(localStorage.getItem('settings')) || {
    delayShowResult: 1000,
    delayNext: 250,
})
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

    timer = setInterval(fn, settings.delayNext)
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

    }, settings.delayShowResult)
}


</script>

<style scoped>
    button {
        @apply px-4 py-2 border rounded-md;
    }
</style>