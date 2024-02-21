<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import ItemList from '@/components/ItemList.vue'
const store = useGameStore()
const { gamesListFetch, gameOneFetch } = store
const sidenav = ref<any>(null)
const listGames = computed(() => store.games)
onMounted(() => {
  gamesListFetch()
  gameOneFetch()
  window.M.Sidenav.init(sidenav.value, {})
})
</script>

<template>
  <main>
    <aside id="slide-out" class="sidenav" ref="sidenav">
      <ul>
        <li>
          <a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a>
        </li>
        <li><a href="#!">Second Link</a></li>
        <li><div class="divider"></div></li>
        <li><a class="subheader">Subheader</a></li>
        <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
      </ul>
    </aside>
    <button
      class="btn waves-effect waves-light sidenav-trigger absolute left-2 top-2"
      data-target="slide-out"
    >
      Side data
      <i class="material-icons right">menu</i>
    </button>
    <div class="flex flex-wrap gap-x-4 m-2">
      <ItemList
        v-for="{ id, attributes } in listGames.slice(0, 10)"
        :key="id"
        :id="id"
        :image="(attributes as any).image"
        :title="(attributes as any).title"
      ></ItemList>
    </div>
  </main>
</template>
