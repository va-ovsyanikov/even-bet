<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { useGameStore } from '@/stores';
import type { IGameIdParams } from '@/interfaces';

const store = useGameStore();

const { gameOneFetch } = store;
const { gameLink } = toRefs(store);

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});
const openGame = () => {
  const params: IGameIdParams = {
    clientId: 'default',
    gameId: String(props.id),
  };
  gameOneFetch(params);
};
watch(gameLink, link => {
  window.open(link, '_blank');
});
</script>

<template>
  <div class="card !m-0">
    <div class="card-image">
      <img class="h-[13rem]" :src="image" />
    </div>
    <div class="card-action cursor-pointer !h-[3.7rem] !py-0 flex justify-center items-center" @click="openGame">
      {{ title }}
    </div>
  </div>
</template>
