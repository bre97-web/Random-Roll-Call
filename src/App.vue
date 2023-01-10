<script>


let id = 0

export default {
    data() {
        return {
            keyWord: '',
            persons:[
                {
                    id: id++,
                    name: '刘一',
                    isFocus: false
                },
                {
                    id: id++,
                    name: '陈二',
                    isFocus: false
                },
                {
                    id: id++,
                    name: '张三',
                    isFocus: false
                },
                {
                    id: id++,
                    name: '李四',
                    isFocus: false
                },
                {
                    id: id++,
                    name: '王五',
                    isFocus: false
                },
                {
                    id: id++,
                    name: '赵六',
                    isFocus: false
                }
                
            ],
            mostTimeByNames: [],

            
            isReadyToShowFocus: true,
            last: 0,            
            
            randomState: {
                isRandom: false,
                isStopped: true,
                
                mode: {
                    param: 'linear'
                },

                isModifying:false,
                
                interval: {
                    step:{
                        l0:500,
                        l1:250,
                        l2:125,
                        l3:65
                    },
                    nextStep:{
                        l0:0,
                        l1:2000,
                        l2:4000,
                        l3:6000
                    },
                    
                },
                lastInterval: {
                    step:{
                        l0:500,
                        l1:250,
                        l2:125,
                        l3:65
                    },
                    nextStep:{
                        l0:0,
                        l1:2000,
                        l2:4000,
                        l3:6000
                    },
                },
                defaultInterval: {
                    step:{
                        l0:500,
                        l1:250,
                        l2:125,
                        l3:65
                    },
                    nextStep:{
                        l0:0,
                        l1:2000,
                        l2:4000,
                        l3:6000
                    },
                },
            },
        }
    },
    computed: {
        /**
         * 非随机状态下focusPerson是不会被获取的
         */
        focusPerson: {
            immediate: false,
            get() {
                var e = this.persons.filter(element => element.isFocus == true)

                if(e == false) {
                    return 'Wait for the next one'
                }

                return e[0].name
            }
        }
    },
    watch: {
        last: {
            handler(n) {
                if(n < 0) {
                    this.last = 0
                } else if(n > this.persons.length) {
                    this.last = this.persons.length
                } else {
                    this.last = n
                }
            }
        },
    },
    methods: {
        /**
         * 添加元素到this.persons
         */
        add() {

            var persons = this.keyWord.split(/[,_|-]/).filter(e => e != null && e !='')

            for(let e of persons) {
                this.persons.push(
                    {
                        id: id++,
                        name: e,
                        isFocus: false
                    }
                )
            }   
        },
        remove(e) {
            if(this.randomState.isRandom) {
                return
            }
            this.persons = this.persons.filter(element => element !== e)
            this.last -= 1
        },
        /**
         * 洗牌，打乱this.persons中的元素顺序
         */
        shuffle() {
            var len = this.persons.length

            for(let i = 0; i < len - 1; i ++) {
                let index = parseInt(Math.random() * (len - i))
                let temp = this.persons[index]
                this.persons[index] = this.persons[len - i - 1]
                this.persons[len - i - 1] = temp
            }
        },
        /**
         * 设置了定时器，不断为this.persons中的每一个元素依次设置isFocus值。
         */
        random() {
            this.randomState.isRandom = true
            this.randomState.isStopped = false
            this.isReadyToShowFocus = false

            if(this.persons.length <= 0) {
                this.stopRandom()
                return
            } else if(this.persons.length == 1) {
                this.last = 1
                this.persons[0].isFocus = true
                this.stopRandom()
                return
            }

            var last = -1
            var index = this.last
            var k = {}

            Object.defineProperty(k, 'index', {
                get: () => index,
                set: (val) => {
                    if(val < 0) {
                        index = this.persons.length
                    } else if(val >= this.persons.length) {
                        index = 0
                    } else {
                        index = val
                    }
                }
            })

            // 恢复this.persons的所有的isFocus值为false
            for(let e in this.persons) {
                this.persons[e].isFocus = false
            }

            function getRandom(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }

            // 随机功能
            if(this.randomState.mode.param === 'linear') {
                var randomFn = () => {
                    this.last = k.index

                    this.persons[k.index].isFocus = true
                    if(last != -1) {
                        this.persons[last].isFocus = false
                    }

                    last = k.index
                    k.index = k.index + 1
                }
            } else if(this.randomState.mode.param === 'nonLinear') {
                var randomFn = () => {
                    this.last = k.index

                    this.persons[k.index].isFocus = true
                    if(last != -1) {
                        this.persons[last].isFocus = false
                    }

                    last = k.index
                    k.index = getRandom(0, this.persons.length - 1)
                    while(last === k.index) {
                        k.index = getRandom(0, this.persons.length - 1)
                    }
                }
            }
            
            this.timer = setInterval(randomFn, this.randomState.interval.step.l0)
            this.timerOut = new Object()
            this.timerOut[0] = setTimeout(() => {
                clearInterval(this.timer)
                this.timer = setInterval(randomFn, this.randomState.interval.step.l1)
            }, this.randomState.interval.nextStep.l1);
            this.timerOut[1] = setTimeout(() => {
                clearInterval(this.timer)
                this.timer = setInterval(randomFn, this.randomState.interval.step.l2)
            }, this.randomState.interval.nextStep.l2);
            this.timerOut[2] = setTimeout(() => {
                clearInterval(this.timer)
                this.timer = setInterval(randomFn, this.randomState.interval.step.l3)
            }, this.randomState.interval.nextStep.l3);
        },
        /**
         * 清楚所有的在random中设置的定时器
         */
        stopRandom() {
            
            this.randomState.isStopped = true

            setTimeout(() => {
                this.isReadyToShowFocus = true
                this.randomState.isRandom = false

                for(let e in this.timerOut) {
                    clearTimeout(this.timerOut[e])
                }

                clearInterval(this.timer)

                this.addMostTimesByNames()
                this.sortMostTimesByNames()
            }, 2000);
            
        },
        addMostTimesByNames() {            
            var name = this.focusPerson

            for(let e in this.mostTimeByNames) {
                if(this.mostTimeByNames[e].name === name) {
                    this.mostTimeByNames[e].count += 1
                    return
                }
            }

            this.mostTimeByNames.push({
                name: this.focusPerson,
                count: 1
            })
        },
        sortMostTimesByNames() {
            this.mostTimeByNames.sort((a, b) => b.count - a.count)
        },
        openSetting() {
            this.randomState.isModifying = true
        },
        cancelSetting() {
            for(let e in this.randomState.interval.step) {
                this.randomState.interval.step[e] = this.randomState.lastInterval.step[e]
                this.randomState.interval.nextStep[e] = this.randomState.lastInterval.nextStep[e]
            }

            this.randomState.isModifying = false
        },
        applySetting() {
            for(let e in this.randomState.interval.step) {
                this.randomState.lastInterval.step[e] = this.randomState.interval.step[e]
                this.randomState.lastInterval.nextStep[e] = this.randomState.interval.nextStep[e]
            }

            this.randomState.isModifying = false
        },

    },
}

</script>

<template>
    <div class="m-5">
        <div class="flex gap-2 items-center justify-center flex-wrap select-none">
            <button @click="shuffle"    class="rounded-md focus:ring font-bold w-28 h-10 shadow-md bg-blue-500 text-white hover:shadow-lg">Shuffle</button>
            <button @click="random"     class="rounded-md focus:ring font-bold w-44 h-10 shadow-md bg-blue-500 text-white hover:shadow-lg" :disabled="randomState.isRandom" :class="{ 'contrast-50': randomState.isRandom }">Random a people</button>
            <button @click="stopRandom" class="rounded-md focus:ring font-bold w-24 h-10 shadow-md bg-red-500  text-white hover:shadow-lg" :disabled="randomState.isStopped" :class="{ 'contrast-50': randomState.isStopped }">Stop</button>
            
            <select v-model="randomState.mode.param" name="mode" :disabled="randomState.isRandom" class="border rounded-md w-32 h-10 outline-none focus:ring">
                <option type="radio" value="linear">Linear</option>
                <option type="radio" value="nonLinear">Non-Linear</option>
            </select>
            
            <button @click="openSetting" class="rounded-md focus:ring font-medium w-24 h-10 shadow-md bg-orange-500 text-white hover:shadow-lg" :disabled="randomState.isRandom" :class="{ 'contrast-50': randomState.isRandom }">Setting</button>
        </div>
    </div>
        
    <div class="m-5 mt-10 flex items-center justify-center gap-10 flex-col lg:flex-row lg:w-2/3 lg:mx-auto lg:items-start">
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
    </dialog>


</template>