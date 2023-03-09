<template>
    <header>
        <nav>
            <ul>
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/manage">List</router-link>
                </li>
                <li>
                    <router-link to="/settings">Settings</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { useList } from '../hooks/useList'

const list = useList()

</script>

<style scoped>

</style>