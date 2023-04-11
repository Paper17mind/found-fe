<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-pl-none">
        <div class="q-px-sm m-3" href="https://dbiis.org">
          <img :src="info.logo" style="height: 50px" />
        </div>
        <q-space />
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
        <!-- <q-btn v-if="!user.id" to="/login" flat stretch> Login </q-btn>
        <q-btn v-else icon="account_circle" :to="`/dashboard/profile`" flat stretch>
          <q-tooltip>
            <span>{{ user.name }}</span>
          </q-tooltip>
        </q-btn> -->
      </q-toolbar>
    </q-header>
    <q-ajax-bar color="secondary"></q-ajax-bar>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { createMetaMixin, useMeta } from "quasar";
import { useCommon } from "src/stores/storage";
import { computed, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const menu = [
      { text: "Daftar PPDB", link: "/register" },
      { text: "Info", link: "/information" },
      // { text: "Login", link: "/login" },
    ];
    const route = useRoute();
    const common = useCommon();
    const info = computed({
      get: () => common.$state.info,
      set: (v) => (common.$state.info = v),
    });
    watch(
      () => route.name,
      () =>
        useMeta({
          title: `${route.name} ${info.value.name}`,
        })
    );
    // useMeta({
    //   title: `${route.name} ${info.value.name}`,
    // });
    return {
      menu,
      info,
      user: computed({ get: () => common.$state.user }),
    };
  },
});
</script>
