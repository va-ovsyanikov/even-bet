<script setup lang="ts">
defineProps({
  id: {
    type: String,
    default: '0'
  },
  image: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
    <div class="card w-[15.6%]">
      <div class="card-image">
        <img :src="image" />
        <span class="card-title">{{ title }}</span>
      </div>
      <div class="card-action">
        <a href="#">{{ id }}</a>
      </div>
    </div>
</template>
