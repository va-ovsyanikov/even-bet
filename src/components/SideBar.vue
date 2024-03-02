<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs } from 'vue';
import { useUserStore } from '@/stores';
const sidenav = ref<any>(null);
const time = ref(0);

const store = useUserStore();
const { userDataFetch } = store;
const { user } = toRefs(store);

time.value = setInterval(() => {
  userDataFetch();
}, 30000);

onUnmounted(() => {
  clearInterval(time.value);
});

onMounted(() => {
  userDataFetch();
  window.M.Sidenav.init(sidenav.value, {});
});
</script>

<template>
  <aside id="slide-out" class="sidenav" ref="sidenav">
    <img src="/avatar.jpg" alt="avatar" />
    <div class="pl-2 pt-2">
      <strong>id:</strong> {{ user[0]?.id }}<br />
      <strong>Balance:</strong> {{ user[0]?.attributes.available }}{{ user[0]?.attributes.currency }} <br />
      <strong>Bonus:</strong> {{ user[0]?.attributes.bonus }}
    </div>
  </aside>
</template>
