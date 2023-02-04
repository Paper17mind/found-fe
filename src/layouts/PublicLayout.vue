<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> PPDB Online </q-toolbar-title>
        <q-btn to="/register" flat stretch>Register</q-btn>
      </q-toolbar>
    </q-header>

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
