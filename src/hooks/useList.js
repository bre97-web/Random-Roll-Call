import {
    reactive, watch
} from 'vue'

/**
 * list保存了需要被随机的元素。
 */
var list = reactive(
    {
        value: JSON.parse(localStorage.getItem('persons')) || [
            '刘一',
            '陈二',
            '张三',
            '李四',
            '王五',
            '赵六',
        ]
    }
)

watch(list, () => {
    localStorage.setItem('persons', JSON.stringify(list.value))
})

function useList() {

    /**
     * 
     * @returns 得到一个响应式的list对象。
     */
    var get = () => list

    /**
     * 
     * @returns 得到响应式的list对象的.value数组。
     */
    var value = () => list.value

    /**
     * 传递一个keyWord，对keyWord进行分割，将分割后的元素添加到list。
     * @param {String} keyWord 需要被添加的字符串。
     */
    var set = (keyWord) => {
        var persons = keyWord.split(/[,_|-]/).filter(e => e != null && e !='')

        for(let e of persons) {
            list.value.push(e)
        }   
    }

    /**
     * 
     * @param {Object} e 需要被移除的元素。
     */
    var remove = (e) => {
        list.value = list.value.filter(element => element !== e)
    }
    /**
     * 打乱list中的元素顺序。
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