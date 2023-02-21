<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> PPDB Online </q-toolbar-title>
        <q-btn
          v-for="x in menu"
          :key="x.link"
          :to="x.link"
          flat
          stretch
          :class="{ 'bg-secondary': x.link === $route.path }"
        >
          {{ x.text }}
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-ajax-bar color="green"></q-ajax-bar>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const menu = [
      { text: "Daftar PPDB", link: "/register" },
      { text: "Info", link: "/information" },
      { text: "Login", link: "/login" },
    ];
    return {
      menu,
    };
  },
});
</script>
