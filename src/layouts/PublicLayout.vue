<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> PPDB Online </q-toolbar-title>
        <q-btn to="/register" flat stretch>Register</q-btn>
        <q-btn to="/login" flat stretch>Login</q-btn>
      </q-toolbar>
    </q-header>
    <q-ajax-bar color="green"></q-ajax-bar>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {

    },
})
</script>
