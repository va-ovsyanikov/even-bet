<template>
  <div class="h-[100vh] flex justify-center items-center">
    <form @submit.prevent="handleSubmit" class="sm:w-[30rem] w-[90%]">
      <div class="input-field">
        <input type="text" v-model.trim="name" />
        <label for="login">Name</label>
      </div>
      <div class="input-field">
        <input type="password" v-model.trim="password" autocomplete="on" />
        <label for="password">Password</label>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">
        Login
        <i class="material-icons right">exit_to_app</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';

import { useAuthStore } from '@/stores';
import type { IAuthParams } from '@/interfaces';
const store = useAuthStore();
const { logIn } = store;
const { notify } = useNotification();

const name = ref('');
const password = ref('');

const handleSubmit = (e: any) => {
  e.preventDefault();
  if (name.value && password.value) {
    const params: IAuthParams = {
      clientId: 'default',
      login: name.value,
      password: password.value,
    };
    logIn(params);
  } else {
    notify({
      type: 'error',
      title: 'Field must be filled in',
    });
  }
};
</script>

<style scoped></style>
