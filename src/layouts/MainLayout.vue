<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title> PPDB Dashboard </q-toolbar-title>
        <q-btn
          flat
          v-for="x in menu"
          :key="x.link"
          :to="x.link"
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
import { api } from "src/boot/axios";
import { useCommon } from "src/stores/storage";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useCommon();
    const router = useRouter();
    function checkAuth() {
      api.get("auth/user").catch((e) => {
        store.$state.token = null;
        store.$state.user = {};
        router.push("/login");
      });
    }
    onBeforeMount(() => checkAuth());
    return {
      leftDrawerOpen,
      menu: [
        { text: "Dashboard", link: "/dashboard" },
        { text: "Pendaftar", link: "/dashboard/registrar" },
        { text: "List Siswa", link: "/dashboard/students" },
        { text: "List User", link: "/dashboard/users" },
      ],
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
