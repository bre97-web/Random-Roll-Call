import {
    ref, reactive
} from 'vue'


var id = 0

/**
 * list是保存了所有需要随机出结果的数组
 */
var list = reactive(
    {
        value: [
            '刘一',
            '陈二',
            '张三',
            '李四',
            '王五',
            '赵六',
        ]
    }
)


function useList() {
    
    var get = () => list
    var value = () => list.value
    /**
     * 添加元素到list
     */
    var set = (keyWord) => {
        var persons = keyWord.split(/[,_|-]/).filter(e => e != null && e !='')

        for(let e of persons) {
            list.value.push(e)
        }   
    }
    var remove = (e) => {
        list.value = list.value.filter(element => element !== e)
    }
    /**
     * 洗牌，打乱list中的元素顺序
     */
    var shuffle = () => {
        var len = list.value.length

        for(let i = 0; i < len - 1; i ++) {
            let index = parseInt(Math.random() * (len - i))
            let temp = list.value[index]
            list.value[index] = list.value[len - i - 1]
            list.value[len - i - 1] = temp
        }
    }

    return {
        get,
        value,
        set,
        remove,
        shuffle
    }
}

export {
    useList
}