<script setup>
import Nav from './components/nav.vue'


</script>

<template>
    <div>

        <Nav></Nav>
        
        <main class="px-8 py-4 max-w-lg mx-auto">
            <router-view></router-view>
        </main>
        
        <footer></footer>
    </div>
</template>