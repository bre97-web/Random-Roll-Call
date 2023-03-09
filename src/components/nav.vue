<template>
    <nav class="fixed bottom-0 w-full">
        <md-navigation-bar>
            <md-navigation-tab label="主页" @click="push('/')"></md-navigation-tab>
            <md-navigation-tab label="编辑" @click="push('/manage')"></md-navigation-tab>
            <md-navigation-tab label="设置" @click="push('/settings')"></md-navigation-tab>
        </md-navigation-bar>
    </nav>
</template>

<script setup>
import { useRouter} from 'vue-router'

const router = useRouter()

function push(path) {
    router.push({
        path: path
    })
}
</script>

<style scoped>

</style>