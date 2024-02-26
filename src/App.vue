<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
const route = useRoute()
import M from 'materialize-css'

onMounted(() => {
  M.AutoInit()
})
</script>

<template>
  <div class="app">
    <component :is="route.meta.layoutComponent"></component>
    <notifications />
  </div>
</template>

<style scoped>
</style>
