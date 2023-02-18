<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title> PPDB Dashboard </q-toolbar-title>

        <q-btn flat to="/dashboard" stretch>Dashboard</q-btn>
        <q-btn flat to="/dashboard/registrar" stretch>Pendaftar</q-btn>
        <q-btn flat to="/dashboard/students" stretch>List Siswa</q-btn>
        <q-btn flat to="/dashboard/users" stretch>List User</q-btn>
      </q-toolbar>
    </q-header>
    <q-ajax-bar color="green"></q-ajax-bar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
