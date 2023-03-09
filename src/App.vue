<script setup>
import Header from './components/header.vue'


</script>

<template>
    <div>

        <Header></Header>
        
        <main class="px-8">
            <router-view></router-view>
        </main>
        
        <footer></footer>
    </div>
</template>