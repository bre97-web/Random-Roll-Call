<script setup>
import Header from './components/header.vue'


</script>

<template>
    <Header></Header>
        
    <main>
        <router-view></router-view>
    </main>

    <!-- <div class="m-5 mt-10 flex items-center justify-center gap-10 flex-col lg:flex-row lg:w-2/3 lg:mx-auto lg:items-start">
        <div class="lg:w-1/4 text-center lg:text-right">
            <p class="font-extrabold" :class="{ 'text-8xl': isReadyToShowFocus }">{{ focusPerson }}</p>
        </div>

        <ul class="flex flex-row flex-wrap gap-2 p-4 border rounded-xl lg:w-3/4">
            <li v-for="e in persons" :key="e.id" @click="remove(e)" class="w-20 h-10 bg-white text-black border font-regular text-lg rounded-lg flex items-center justify-center select-none" :class="{ 'shadow-xl ring ring-red-500': e.isFocus }">{{ e.name }}</li>
        </ul>
    </div>

    <div class="m-5 flex items-center justify-center gap-2 flex-col sm:flex-row">
        <div class="h-96 w-full sm:w-2/5 lg:w-96 border rounded-md overflow-auto">
            <p class="m-3">
                <h1 class="font-semibold text-md">Most times by names TOP</h1>
            </p>
            <ul>
                <li v-for="(e, index) in mostTimeByNames" :key="index" class="m-5" :class="{'font-bold':index <= 2}, {'text-3xl':index==0}, {'text-2xl':index==1}, {'text-xl':index==2}">{{index + 1}}. {{e.name}} {{e.count}}</li>
            </ul>
        </div>
    </div>


    <div class="fixed bottom-5 left-0 w-full">
        <div class="flex flex-wrap items-end justify-center gap-2">
            <textarea v-model="keyWord" type="text" placeholder="Name" class="shadow-md border rounded-md h-10 outline-none focus:ring focus:shadow-lg"></textarea>
            <button id="addButton" @click="add" class="border rounded-md focus:ring font-bold w-40 h-10 shadow-md bg-white text-black hover:shadow-lg select-none">Add some person</button>
        </div>
    </div>



    <div @click="cancelSetting" class="fixed top-0 left-0 bg-black w-screen h-screen opacity-25 z-10" :class="{'hidden':!randomState.isModifying}"></div>
    <dialog open class="fixed top-5 lg:top-40 left-0 w-3/4 max-w-lg z-20 rounded-3xl shadow-xl" :class="{'hidden':!randomState.isModifying}">
        <div class="m-5 mt-2 sm:h-72 lg:h-96">
            <p class="h-20">
                <h1 class="font-bold text-4xl">Setting</h1>
                <p class="font-regular text-sm">About random setting</p>
            </p>

            <table class="border-collapse lg:border-separate lg:border-spacing-3">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>STEP Value</th>
                        <th>NEXT-STEP Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <label class="h-10 flex items-center justify-center">L0</label>
                        <td>
                            <input type="number" v-model="randomState.interval.step.l0" class="border rounded-md w-24 h-10 outline-none focus:ring">
                        </td>
                        <td>
                            <input type="number" disabled value="0" class="border rounded-md w-24 h-10 outline-none focus:ring">
                        </td>
                    </tr>
                    <tr>
                        <label class="h-10 flex items-center justify-center">L1</label>
                        <td>
                            <input type="number" v-model="randomState.interval.step.l1" class="border rounded-md w-24 h-10 outline-none focus:ring">
                        </td>
                        <td>
                            <input type="number" v-model="randomState.interval.nextStep.l1" class="border rounded-md w-24 h-10 outline-none focus:ring">
                        </td>
                    </tr>
                    <tr>
                        <label class="h-10 flex items-center justify-center">L2</label>
                        <td>
                            <input type="number" v-model="randomState.interval.step.l2" class="border rounded-md w-24 h-10 outline-none focus:ring">
                        </td>
                        <td>
                            <input type="number" v-model="randomState.interval.nextStep.l2" class="border rounded-md w-24 h-10 outline-none focus:ring">
                        </td>
                    </tr>
                    <tr>
                        <label class="h-10 flex items-center justify-center">L3</label>
                        <td>
                            <input type="number" v-model="randomState.interval.step.l3" class="border rounded-md w-24 h-10 outline-none focus:ring">
                        </td>
                        <td>
                            <input type="number" v-model="randomState.interval.nextStep.l3" class="border rounded-md w-24 h-10 outline-none focus:ring">
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="flex gap-2 absolute right-5 bottom-5">
            <button @click="cancelSetting" class="rounded-full w-24 h-10 font-bold hover:bg-blue-50 focus:bg-blue-100 focus:ring">Cancel</button>
            <button @click="applySetting" class="rounded-full w-24 h-10 font-bold hover:bg-blue-50 focus:bg-blue-100 focus:ring">Apply</button>
        </div>
    </dialog> -->


</template>