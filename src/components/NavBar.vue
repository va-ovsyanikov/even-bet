<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
const sidenav = ref<any>(null)

const store = useUserStore()
const { userDataFetch } = store

const user = computed(() => store.user)

onMounted(() => {
  userDataFetch()
  window.M.Sidenav.init(sidenav.value, {})
})
</script>

<template>
  <aside id="slide-out" class="sidenav" ref="sidenav">
   <!-- id: {{ user[0].id }}
   Balance: {{ user[0].attributes.available }}{{ user[0].attributes.currency }}
   Bonus: {{ user[0].attributes.bonus }} -->
    <!-- <ul>
      <li>
        <a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a>
      </li>
      <li><a href="#!">Second Link</a></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Subheader</a></li>
      <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul> -->
  </aside>
</template>
