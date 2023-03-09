<template>
    <div>
        <header class="flex gap-2 items-center py-2 md:justify-center">
            <md-filled-button label="Random" @click="start()"></md-filled-button>
            <md-text-button label="Stop" @click="end()"></md-text-button>
            <md-text-button label="Shuffle" @click="list.shuffle()"></md-text-button>
            
            
        </header>
        
        <main class="flex flex-col gap-2">
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

/**
 * list用于在li中显示所有的元素。
 */
const list = useList()

/**
 * saveList保存了已经被选中的元素，带有计数count和名称name。
 */
var saveList = ref([])

/**
 * 随机一个0到list大小的随机数。
 */
const random = useRandom()
random.defineRange(0, list.value().length - 1)

/**
 * 提供两种模式，由用户选择。
 * linear
 * non-linear
 */
var mode = false

/**
 * 用来保存计时器。
 */
var timer

/**
 * 读取本地的settings信息，提供了一个默认值。
 */
var settings = reactive(JSON.parse(localStorage.getItem('settings')) || {
    delayShowResult: 1000,
    delayNext: 250,
    linear: true,
})

/**
 * 开始随机。
 */
function start() {
    
    if(settings.linear === true) {   
        var index = 0
        var fn = () => {
            random.set(index++)

            if(index >= list.value().length) {
                index = 0
            }

        }
    } else if(settings.linear === false) {
        var fn = () => {
            random.get()
        }
    }

    timer = setInterval(fn, settings.delayNext)
}
/**
 * 结束随机。
 */
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