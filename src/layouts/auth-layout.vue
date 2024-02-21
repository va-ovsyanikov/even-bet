<template>
  <div class="w-full h-[100vh] flex justify-center items-center">
    <form @submit.prevent="handleSubmit" class="w-[30rem] mx-auto">
      <div class="input-field">
        <input type="text" v-model.trim="login" />
        <label for="login">Login</label>
      </div>
      <div class="input-field">
        <input type="password" v-model.trim="password" autocomplete="on" />
        <label for="password">Password</label>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">
        Submit
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNotification } from "@kyvg/vue3-notification";

import { useAuthStore } from '@/stores/auth'
import type { IAuthParams } from '@/interface/auth.interface'
const store = useAuthStore()
const { logIn } = store
const { notify }  = useNotification()

const login = ref('')
const password = ref('')

const handleSubmit = (e: any) => {
  e.preventDefault()
  if (login.value && password.value) {
    const params: IAuthParams = {
      clientId: 'default',
      login: login.value,
      password: password.value
    }
    logIn(params)
    login.value = ''
    password.value = ''
  } else {
    notify({
      type: 'error',
      title: 'Field must be filled in'
    })
  }
}
</script>

<style scoped></style>
