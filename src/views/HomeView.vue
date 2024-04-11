<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import * as Sentry from '@sentry/vue';
// @ts-ignore: Unreachable code error
import Paginate from 'vuejs-paginate-next';
import { useGameStore } from '@/stores';
import PreloaderData from '@/components/PreloaderData.vue';
import CardGame from '@/components/CardGame.vue';
import SideBar from '@/components/SideBar.vue';

const router = useRouter();
const route = useRoute();

const store = useGameStore();
const { gamesListFetch } = store;

const perPage = ref(12);
const currentPage = ref(0);

const gameList = computed(() => store.gameList);
onMounted(() => {
  gamesListFetch();
});
const pageQuery = computed(() => route.query.page);
watch(pageQuery, newPageQuery => (currentPage.value = newPageQuery === undefined ? 1 : Number(newPageQuery)), {
  immediate: true,
});

const changePage = (pageNum: number) => {
  if (pageNum === 1) {
    router.push(route.path);
  } else {
    router.push(`${route.path}?page=${pageNum}`);
  }
  currentPage.value = Number(pageNum);
  throw new Error('Sentry error');
};
const getGameList = computed(() => {
  const current = currentPage.value * perPage.value;
  const start = current - perPage.value;
  return [...gameList.value].slice(start, current);
});
const getPageCount = computed(() => {
  return Math.ceil(gameList.value.length / perPage.value);
});
</script>

<template>
  <main>
    <SideBar />
    <button class="btn waves-effect waves-light sidenav-trigger absolute left-2 top-2" data-target="slide-out">
      <i class="material-icons">menu</i>
    </button>
    <PreloaderData v-if="!getGameList.length" />
    <div class="flex flex-col justify-between h-[calc(100vh-2.9rem)]">
      <div
        v-if="getGameList.length"
        class="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-4 mx-2 my-4 grid-cols-2"
      >
        <CardGame
          v-for="{ id, attributes } in getGameList"
          :key="id"
          :id="id"
          :image="(attributes as any).image"
          :title="(attributes as any).title"
        ></CardGame>
      </div>
      <div class="w-full flex justify-center">
        <Paginate
          v-if="getGameList.length"
          v-model="currentPage"
          :page-count="getPageCount"
          :margin-pages="5"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :prev-class="'page__prev__item'"
          :prev-link-class="'page__link__prev'"
          :next-link-class="'page__link__next'"
          :page-link-class="'page__link waves-effect'"
          :next-class="'page__next__item'"
          :container-class="'pagination__wrap'"
          :page-class="'page__item'"
          :click-handler="changePage"
        >
        </Paginate>
      </div>
    </div>
  </main>
</template>
<style lang="sass">
.pagination
  display: flex
  justify-content: flex-end
  padding-bottom: 50px
  &__wrap
    display: flex
    align-items: center
    list-style-type: none
.page__item.active
  .page__link
    background-color: #ee6e73
    border-radius: 0.2rem
    color: #fff
.page__link
  padding: 0.3rem 0.7rem
  cursor: pointer
  color: #000
  @media screen and (max-width: 42rem)
    padding:  0.3rem 0.35rem
.page__link__prev,
.page__link__next
  padding: 10px
  cursor: pointer
  color: #000
.page__prev__item.disabled
  .page__link__prev
    pointer-events: none
    opacity: 0.5
.page__next__item.disabled
  .page__link__next
    pointer-events: none
    opacity: 0.5
</style>
