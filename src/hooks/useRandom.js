import {
    ref 
} from "vue"

var GLOBAL_MAX = undefined
var GLOBAL_MIN = undefined

var last = ref(undefined)

function useRandom() {

    var max = undefined
    var min = undefined

    var defineRange = (minValue, maxValue) => {
        max = maxValue
        min = minValue
    }
    var defineRangeGlobal = (minValue, maxValue) => {
        GLOBAL_MAX = maxValue
        GLOBAL_MIN = minValue
    }

    /**
     * 
     * @returns 得到一个与上次随机不相同的随机数。
     */
    var get = () => {
        var tmp = undefined

        if(GLOBAL_MAX == undefined || GLOBAL_MIN == undefined) {
            tmp = Math.floor(Math.random() * (max - min + 1) + min)
        } else {
            tmp = Math.floor(Math.random() * (GLOBAL_MAX - GLOBAL_MIN + 1) + GLOBAL_MIN)
        }
        
        if(tmp == last.value) {
            return get()
        }

        last.value = tmp
        
        return last.value
    }

    /**
     * 
     * @returns 得到当前的随机结果。
     */
    var getLast = () => last.value

    /**
     * 强制设置last的值为value。
     * @param {Number} value 需要设置的值。
     * @returns 
     */
    var set = (value) => last.value = value

    return {
        defineRange,
        defineRangeGlobal,
        get,
        getLast,
        set
    }
}

export {
    useRandom
}