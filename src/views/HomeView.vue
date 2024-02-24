<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGameStore } from '@/stores'
import Card from '@/components/Card.vue'
import NavBar from '@/components/NavBar.vue'

const store = useGameStore()
const { gamesListFetch } = store

const gameList = computed(() => store.gameList)
onMounted(() => {
  gamesListFetch()
})
</script>

<template>
  <main>
    <NavBar />
    <button
      class="btn waves-effect waves-light sidenav-trigger absolute left-2 top-2"
      data-target="slide-out"
    >
      Side data
      <i class="material-icons right">menu</i>
    </button>
    <div class="flex flex-wrap gap-x-4 m-2">
      <Card
        v-for="{ id, attributes } in gameList.slice(0, 10)"
        :key="id"
        :id="id"
        :image="(attributes as any).image"
        :title="(attributes as any).title"
      ></Card>
    </div>
  </main>
</template>