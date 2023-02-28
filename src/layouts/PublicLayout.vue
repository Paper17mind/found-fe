<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title v-if="$route.path === '/register'">
          Form Pendaftaran {{ info.name }}
        </q-toolbar-title>
        <q-toolbar-title v-else>
          {{ info.name }}
        </q-toolbar-title>
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
        <q-btn v-if="!user.id" to="/login" flat stretch> Login </q-btn>
        <q-btn v-else icon="account_circle" :to="`/dashboard/profile`" flat stretch>
          <q-tooltip>
            <span>{{ user.name }}</span>
          </q-tooltip>
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
import { useCommon } from "src/stores/storage";
import { computed, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const menu = [
      { text: "Daftar PPDB", link: "/register" },
      { text: "Info", link: "/information" },
      // { text: "Login", link: "/login" },
    ];
    const common = useCommon();
    const info = computed({
      get: () => common.$state.info,
      set: (v) => (common.$state.info = v),
    });
    return {
      menu,
      info,
      user: computed({ get: () => common.$state.user }),
    };
  },
});
</script>
